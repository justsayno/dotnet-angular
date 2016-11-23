# Dotnet Angular

[![Dependency Status](https://david-dm.org/justsayno/dotnet-angular/status.svg)](https://david-dm.org/justsayno/dotnet-angular#info=dependencies) [![devDependency Status](https://david-dm.org/justsayno/dotnet-angular/dev-status.svg)](https://david-dm.org/justsayno/dotnet-angular#info=devDependencies)

This workflow serves as a starting point for building Angular 1.x applications using Webpack and .NET Core. 

* Heavily commented webpack configuration with reasonable defaults.
* ES6, and ES7 support with babel.
* Source maps included in all builds.
* Development server with live reload.
* Production builds with cache busting.
* Testing environment using karma to run tests and jasmine as the framework.
* Code coverage when tests are run.
* No gulp and no grunt, just npm scripts.
* Integration with a shell .NET core application (including publishing)
* SASS stylesheets (inludes MaterializeCss out of the box)

> NOTE: Make sure you're using the latest version of Node.js and NPM. I recommend using
> [NVM for windows](https://github.com/coreybutler/nvm-windows) or [NVM](https://github.com/creationix/nvm)
> And you need the [.NET Core CLI](https://docs.microsoft.com/en-us/dotnet/articles/core/tools/) 

### Quick start

> Clone/Download the repo then edit `app.js` inside [`/src/index.js`](/src/index.js)

```bash
# clone the repo
$ git clone https://github.com/justsayno/dotnet-angular my-app

# change directory to your app
$ cd my-app

# install the dependencies with npm and dotnet CLI
$ npm install

# start the server
$ npm start
```

go to [http://localhost:3000](http://localhost:3000) in your browser.

# Table of Contents

* [Getting Started](#getting-started)
    * [Dependencies](#dependencies)
    * [Installing](#installing)
    * [Running the app](#running-the-app)
    * [Developing](#developing)
    * [Testing](#testing)
* [License](#license)

# Getting Started

## Dependencies

What you need to run this app:
* `node` and `npm` (Use [NVM for Windows](https://github.com/coreybutler/nvm-windows) or [NVM](https://github.com/creationix/nvm)) Ensure you're running Node (`v4.1.x`+) and NPM (`2.14.x`+)
* [.NET Core CLI](https://docs.microsoft.com/en-us/dotnet/articles/core/tools/) 

**Recommended**

It is recomended to use develop using [Visual Studio Code](https://code.visualstudio.com/) with the following extentions:

- [Eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [C#](https://marketplace.visualstudio.com/items?itemName=k--kato.docomment)

## Installing

* `clone` this repo
* `npm install` to install all dependencies via npm and dotnet cli

## Running the app

After you have installed all dependencies you can now run the app with:
```bash
npm start
```

It will start a local server using `webpack-dev-server` which will watch, build (in-memory), and reload for you. The port will be displayed to you as `http://localhost:3000`.

## Developing

### Build files

* Development build with webpack dev server and live reloading: 

```bash
npm start
```

* Build and serve bundled application from .NET server

```bash
npm run start:dist
```

* One off build of frontend assets

```bash
npm run build
```

* Build and package the front end assests with the .NET core application in the `release` folder

```bash
npm run dotnet-publish
```

## Testing

#### 1. Unit Tests

* single run: `npm test`
* live mode (TDD style): `npm run test-watch`

# License

[MIT](/LICENSE)
