import { Actions, PluginOptions } from 'gatsby';

export interface CustomPluginOptions extends PluginOptions {
  path: string;
  persistedQueries: string[];
  graphqlSchema: string;
  serviceUrl: string;
  endpoint: string;
}

export type DataSet = {
  type: string;
  data: any[];
  err: string;
};

export type GatsbyNodeUtils = {
  createNode: Actions['createNode'];
  createNodeId: (this: void, input: string) => string;
  createContentDigest: (this: void, input: string | object) => string;
  createParentChildLink: Actions['createParentChildLink'];
};

export type CreateSourceNodes = {
  nodeUtils: GatsbyNodeUtils;
  type: DataSet['type'];
  data?: DataSet['data'];
  error?: DataSet['err'];
};
