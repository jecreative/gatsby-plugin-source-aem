/**
 * Function that invokes the AEM Headless client.
 *
 * @param {String} persistedQueryName the fully qualified name of the persisted query
 * @returns the GraphQL data or an error message
 */

const fetchPersistedQuery = async (aemClient:any, persistedQueryName: string) => {
  let data;
  let err;

  try {
    const response = await aemClient.runPersistedQuery(persistedQueryName);
    data = response?.data;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log('Error running persisted query: ', e);
  }

  return { data, err };
};

const fetchData = async (aemClient: any, path: string, query: string) => {
  const { data, err } = await fetchPersistedQuery(aemClient, `${path}/${query}`);

  return { data, err };
};

export default fetchData;
