import pino from 'pino';
import {
  NewrelicLogAPITransportOption,
  endpointEnum,
} from '@harusame0616/pino-newrelic-log-api-transport';

const options: NewrelicLogAPITransportOption = {
  // Set the environment variable NEW_RELIC_LICENSE_KEY to the license key or set the license key as an argument.
  // If both are set, the argument takes precedence.
  // licenseKey: 'YOUR_LICENSE_KEY',

  // select any endpoint string or one of us, eu , fedRAMP in the endpointEnum
  // https://docs.newrelic.com/jp/docs/logs/log-api/introduction-log-api/#endpoint
  endpoint: endpointEnum.us,

  // Authentication is performed using SearchParameter instead of headers.
  // false if omitted.
  // This is for some cloud providers that do not allow custom headers.
  // https://docs.newrelic.com/jp/docs/logs/log-api/introduction-log-api/#authentication
  headerLessAuth: false,
};

const logger = pino({
  messageKey: 'message',
  errorKey: 'error',
  level: 'info',
  base: {
    entity: {
      // your app name
      name: process.env.NEW_RELIC_APP_NAME,
    },
  },
  formatters: {
    level: (label) => ({ level: label }),
  },
  transport: {
    target: '@harusame0616/pino-newrelic-log-api-transport',
    options: options,
  },
});

logger.info('info level log');
