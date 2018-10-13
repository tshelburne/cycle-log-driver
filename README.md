cycle-log-driver
====================

[![CircleCI](https://circleci.com/gh/tshelburne/cycle-log-driver.svg?style=svg)](https://circleci.com/gh/tshelburne/cycle-log-driver)

Logging driver for [CycleJS](https://cycle.js.org/) that enables simple client-side log.

## Usage

```js
npm install --save cycle-log-driver
```

Big picture, the log driver consumes a stream of shapes `{name, (message|messages), color?}`,
and creates a nice log in the console to review those items after they've passed through the
stream. The log driver creation function also takes a configuration for log output to include,
making it much easier to change logging depending on the environment (for instance, not logging
in production).

```js
import {run} from '@cycle/run'
import makeLogDriver from 'cycle-log-driver'

function main(sources) {
	return {
		// other stuff...,
		log: xs.merge(
			props_.map(props => ({name: `state`, message: props, color: `#4286f4`})),
			event_.map(event => ({name: `action`, message: event, color: `#4cc456`})),
			request_.map(({url, method}) => ({
				name: `request`,
				message: `${method} ${url}`,
				color: `#cca23b`,
			})),
			sources.http.select().flatten().map(({request, status, body}) => ({
				name: `response`,
				messages: [`${request.method} ${request.url}`, status, body],
				color: `#f94f31`,
			}))
		),
	}
}

run(main, {
	// other stuff...,
	log: makeLogDriver({include: [`state`, `action`, `request`, `response`]}),
})
```
