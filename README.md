# pino-newrelic-log-api-transport

A [Pino v7+ transport](https://getpino.io/#/docs/transports?id=v7-transports) to send log to newrelic with [Logs API](https://docs.newrelic.com/docs/logs/log-api/introduction-log-api/).

**Caution**

```
newrelic has an automatic log forwarding feature.
Consider using the official nodejs agent.
https://docs.newrelic.com/jp/docs/apm/agents/nodejs-agent/installation-configuration/install-nodejs-agent
```

If for some reason you cannot use the automatic log forwarding feature with nodejs agent, please use it.

## Installation

```bash
pnpm  pino-newrelic-log-api-transport
```

## Usage

```ts
import pino from 'pino';
import {
  NewrelicLogAPITransportOption,
  endpointEnum,
} from 'pino-newrelic-log-api-transport';

const options: NewrelicLogAPITransportOption = {
  // licenseKey: <YOUR_LICENSE_KEY> or set NEWRELIC_LICENSE_KEY in environment variables
  endpoint: endpointEnum.us,
};

const logger = pino({
  messageKey: 'message',
  errorKey: 'error',
  level: 'info',
  base: {
    entity: {
      // your app name
      name: process.env.NEWRELIC_APP_NAME,
    },
  },
  formatters: {
    level: (label) => ({ level: label }),
  },
  transport: {
    target: 'pino-newrelic-log-api-transport',
    options: options,
  },
});

logger.info('info level log');
```

**※ If you are using the nextjs app router you may need to add "pino" to serverComponentsExternalPackages in next.config.**

https://github.com/vercel/next.js/discussions/46987#discussioncomment-6986115

and run bellow

```bash
NEWRELIC_LICENSE_KEY=YOUR_LICENSE NEWRELIC_APP_NAME=YOUR_APP_NAME node YOUR_APP
```
