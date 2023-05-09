import type { CreateSourceNodes } from '../types/customTypes';

/**
 * Function to create gatsby source nodes
 *
 * @param {Object} nodeUtils an object containing the default gatsby utils to create source nodes
 * @param {String} name a name for the source node
 * @param {Array} data an array of data to create source nodes from
 * @param {String} error an error message
 */
/** */

const createSourceNodes = ({ nodeUtils, type, data, error }: CreateSourceNodes) => {
  const { createNode, createNodeId, createContentDigest } = nodeUtils;

  if (error) {
    console.error('Error being thrown in createSourceNodes: ', error);

    return;
  }

  if (!data) {
    console.error('No data being passed to createSourceNodes');

    return;
  }

  data.forEach(item => {
    createNode({
      ...item,
      id: createNodeId(`${type.toLowerCase()}-${item.internalName}`),
      parent: null,
      children: [],
      internal: {
        type,
        contentDigest: createContentDigest(item),
      },
    });
  });
};

export default createSourceNodes;
