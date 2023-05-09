import buildUnionType from './utils/buildUnionType';
import createSourceNodes from './utils/createSourceNodes';
import fetchData from './utils/usePersistedQueries';

import type { CustomPluginOptions } from './types/customTypes';
import type { GatsbyNode } from 'gatsby';
import initializeAemClient from './utils/aemHeadlessClient';

export const onPluginInit: GatsbyNode['onPluginInit'] = async ({ reporter }, pluginOptions: CustomPluginOptions) => {
  const { path, persistedQueries, serviceUrl, endpoint } = pluginOptions;

  if (!path || !persistedQueries || !serviceUrl || !endpoint) {
    reporter.panic('gatsby-plugin-source-aem: Missing required options.');
  }
};

export const pluginOptionsSchema: GatsbyNode['pluginOptionsSchema'] = ({ Joi }) =>
  Joi.object({
    path: Joi.string().required().description('Path to the AEM instance graphql endpoint folder. e.g. snowflake-site'),
    persistedQueries: Joi.array()
      .items(Joi.string())
      .required()
      .description('The persisted queries to fetch data from AEM.'),
    graphqlSchema: Joi.string().required().description('The graphql schema to use for the AEM instance.'),
    serviceUrl: Joi.string().required().description('The AEM instance service url.'),
    endpoint: Joi.string().required().description('The AEM instance endpoint.'),
  });

export const createSchemaCustomization: GatsbyNode['createSchemaCustomization'] = (
  { actions, schema },
  pluginOptions: CustomPluginOptions,
) => {
  const { createTypes } = actions;
  const { graphqlSchema } = pluginOptions;

  const componentTypes = graphqlSchema
    .split('type ')
    .filter(type => type.startsWith('Component'))
    .map(type => type.split(' ')[0]);

  createTypes(graphqlSchema);
  createTypes([buildUnionType({ schema, componentTypes })]);
};

export const sourceNodes: GatsbyNode['sourceNodes'] = async (
  { actions, createNodeId, createContentDigest },
  pluginOptions: CustomPluginOptions,
) => {
  const { path, persistedQueries, serviceUrl, endpoint } = pluginOptions;
  const { createNode, createParentChildLink } = actions;

  try {
    if (!path || !persistedQueries || !serviceUrl || !endpoint) {
      throw new Error('gatsby-plugin-source-aem: Missing required options.');
    }
    const aemClient = initializeAemClient(serviceUrl, endpoint)
    const nodeUtils = { createNode, createNodeId, createContentDigest, createParentChildLink };

    const dataSet = await Promise.all(
      persistedQueries.map(async query => {
        const { data, err } = await fetchData(aemClient, path, query);

        const key = Object.keys(data).find(k => k.includes('List'));

        if (key) {
          const type = data?.[key]?.__typename?.replace('Results', '');

          return {
            type,
            data: data?.[key]?.items,
            err,
          };
        }
      }),
    );

    dataSet.forEach(item => {
      if (!item) {
        return;
      }
      createSourceNodes({ nodeUtils, type: item.type, data: item.data, error: item.err });
    });
  } catch (error) {
    console.error(error);
  }
};
