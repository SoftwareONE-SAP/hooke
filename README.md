# Hook*e*

A lightweight Meteor package that allows you to add Hooks to meteors routing layer, giving you the ability have 3rd party services such call your meteor server.

## Setup and Installation

You can install Hook*e* using the follwoing command:

```bash
meteor add centiq:hooke
```

If you are using this package within another package than simply add the following to your `onUse` call:

```js
api.use("centiq:hooke")
```

## Using Hook*e*

**Note**: All hooks are expected to be server side only!

### Basic Usage

Create a new file within your `/server/` directory called `hooks.js`

```js

// Create A new GET endpoint within the _hook namespace
Hooke.get("ping", function(req, res, next){
	res.end("pong")
});

```

Documentation for `req` and `res` please see [NodeJS's HTTP library](https://nodejs.org/api/http.html)


You can now open your browser and visit [http://localhost/_hooke/ping](http://localhost/_hooke/ping) and see the pong reply.

## API

#### `Hooke.get(action, callback)` 

Listens for incoming `GET` on `/_hooke/<action>` endpoint and calls the callback associated with the endpoint

#### `Hooke.post(action, callback)`

Listens for incoming `POST` on `/_hooke/<action>` endpoint and calls the callback associated with the endpoint

#### `Hooke.put(action, callback)`

Listens for incoming `PUT` on `/_hooke/<action>` endpoint and calls the callback associated with the endpoint

#### `Hooke.delete(action, callback)`

Listens for incoming `DELETE` on `/_hooke/<action>` endpoint and calls the callback associated with the endpoint

#### `Hooke.patch(action, callback)`

Listens for incoming `PATCH` on `/_hooke/<action>` endpoint and calls the callback associated with the endpoint
