import { AEMHeadless } from '@adobe/aem-headless-client-nodejs';

const initializeAemClient = (serviceUrl: string, endpoint: string) => {
  const client = new AEMHeadless({
    serviceURL: serviceUrl,
    endpoint,
  });

  return client;
};

export default initializeAemClient;
