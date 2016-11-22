## Cucumbers on Vine Hill

[Everyone's invited](features/step_definitions/weather_report_steps.js) to my party:

On the [client](app/client.js) side:

* [hyperdom](https://github.com/featurist/hyperdom) renders the HTML
* [httpism](https://github.com/featurist/httpism) talks to the server

Over in the [server](app/server.js) crew:

* [express](https://github.com/expressjs/express) powers the web API

Driving it all with [executable scenarios](features/step_definitions/weather_report_steps.js):

* [cucumber-electron](https://github.com/featurist/cucumber-electron) is a browser, but also a node
* [browser-monkey](https://github.com/featurist/browser-monkey) interacts with web pages
* [vinehill](https://github.com/dereke/vinehill) cuts out the HTTP to keep tests fast and repeatable
