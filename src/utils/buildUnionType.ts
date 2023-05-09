import type { NodePluginSchema } from 'gatsby';

const buildUnionType = ({ schema, componentTypes }: { schema: NodePluginSchema; componentTypes: string[] }) =>
  schema.buildUnionType({
    name: 'Components',
    types: componentTypes,
    resolveType: value => value.__typename || null,
  });

export default buildUnionType;
