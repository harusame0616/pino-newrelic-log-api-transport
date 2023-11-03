import build from 'pino-abstract-transport';

export const endpointEnum = {
  eu: 'https://log-api.eu.newrelic.com/log/v1',
  us: 'https://log-api.newrelic.com/log/v1',
  fedRAMP: 'https://gov-log-api.newrelic.com/log/v1',
};

type EndpointEnum = typeof endpointEnum;
type Endpoint = EndpointEnum[keyof EndpointEnum];

export type NewrelicLogAPITransportOption = {
  licenseKey?: string;
  endpoint: Endpoint | string;
  headerLessAuth?: boolean;
};

export default async function newRelicTransport({
  licenseKey,
  endpoint,
  headerLessAuth = false,
}: NewrelicLogAPITransportOption) {
  const apiKey = licenseKey ?? process.env.NEWRELIC_LICENSE_KEY;
  if (!apiKey) {
    throw new Error(
      'License key must be provided as licenseKey option or in process.env.NEWRELIC_LICENSE_KEY'
    );
  }

  const endpointUrl = new URL(endpoint);
  const headers: HeadersInit = {
    'content-type': 'application/json',
  };

  if (headerLessAuth) {
    endpointUrl.searchParams.set('Api-Key', apiKey);
  } else {
    headers['api-key'] = apiKey;
  }

  return build(async (source) => {
    for await (const obj of source) {
      try {
        await fetch(endpoint, {
          body: JSON.stringify(obj),
          headers,
          method: 'POST',
        });
      } catch (e) {
        console.error(e);
      }
    }
  });
}
