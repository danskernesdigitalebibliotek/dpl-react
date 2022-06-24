<!-- markdownlint-disable-next-line first-line-h1 -->
![https://raw.githubusercontent.com/danskernesdigitalebibliotek/dpl-react/master/logo.png](https://raw.githubusercontent.com/danskernesdigitalebibliotek/dpl-react/master/logo.png)

[![codecov](https://codecov.io/gh/danskernesdigitalebibliotek/dpl-react/branch/master/graph/badge.svg)](https://codecov.io/gh/danskernesdigitalebibliotek/dpl-react)

A set of React components and applications providing self-service features for
Danish public libraries.

<!-- markdownlint-disable -->
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Development](#development)
  - [Requirements](#requirements)
  - [Development - alternative (no docker)](#development---alternative-no-docker)
    - [Howto](#howto)
    - [Access tokens](#access-tokens)
    - [Library token](#library-token)
  - [Installation](#installation)
  - [Standard and style](#standard-and-style)
    - [JavaScript + JSX](#javascript--jsx)
      - [Named functions Vs. Anonymous arrow functions](#named-functions-vs-anonymous-arrow-functions)
  - [Create a new application](#create-a-new-application)
    - [Application state-machine](#application-state-machine)
  - [Style your application](#style-your-application)
  - [Style using the dpl design system library](#style-using-the-dpl-design-system-library)
  - [Cross application components](#cross-application-components)
    - [Creating an atom](#creating-an-atom)
    - [Creating a component](#creating-a-component)
  - [Editor example configuration](#editor-example-configuration)
- [Usage](#usage)
  - [Naive app mount](#naive-app-mount)
    - [Data attributes and props](#data-attributes-and-props)
- [Extending the project](#extending-the-project)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->
<!-- markdownlint-enable -->

<!-- markdownlint-disable-next-line first-heading-h1 -->
## Development

### Requirements

- [go-task](https://github.com/go-task/task)
- [Docker](https://www.docker.com/products/docker-desktop)
- [Dory](https://github.com/FreedomBen/dory)

### Development - alternative (no docker)

#### Howto

- Run: sudo vim /etc/hosts
- Add as the last line in the doc: 127.0.0.1 dpl-react.docker
- Now storybook can be started by sudo yarn start:storybook:dev

- Now you need to make sure that your node version is the right one
  for the project whenever a terminal is opened
- (it is specified in the package.json file)
- if you then wish to log in through adgangsplatformen, you need to change
  your url to: <http://ddb-react.docker/> - this avoids getting log in errors
- (note: if you enter adgangsplatform again after signing it, you will get
  signed out, and need to log in again. This is not a bug, as you stay logged
  in otherwise.)

#### Access tokens

Access token must be retrieved from [Adgangsplatformen](https://github.com/DBCDK/hejmdal/blob/master/docs/oauth2.md),
a single sign-on solution for public libraries in Denmark, and [OpenPlatform](https://openplatform.dbc.dk/v3/),
an API for danish libraries.

Usage of these systems require a valid client id and secret which must be
obtained from your library partner or directly from DBC, the company responsible
for running Adgangsplatformen and OpenPlatform.

This project include a client id that matches the storybook setup which can be
used for development purposes.  You can use the `/auth` story to sign in to
Adgangsplatformen for the storybook context.

#### Library token

To test the apps that is indifferent to wether the user is authenticated or not
it is possible to set a library token via the library component in Storybook.
Workflow:

- Retrieve a library token via [OpenPlatform](https://openplatform.dbc.dk/v3/)
- Insert the library token in the Library Token story in storybook

### Installation

Using go-task to handle the project. Before you can install the project you need
to create the file `~/.npmrc` to access the github package registry as described
[here](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry#authenticating-with-a-personal-access-token)
using a personal access token.

```bash
task dev:start
```

When storybook is started, you can access it at: [dpl-react.docker](http://dpl-react.docker)

### Standard and style

#### JavaScript + JSX

For static code analysis we make use of the [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
and for formatting we make use of [Prettier](https://github.com/prettier/prettier)
with the default configuration. The above choices have been influenced by a
multitude of factors:

- Historically Drupal core have been making use of the Airbnb JavaScript Style
  Guide.
- Airbnb's standard is comparatively the [best known](https://github.com/airbnb/javascript/stargazers)
  and one of the [most used](https://github.com/airbnb/javascript/network/dependents?package_id=UGFja2FnZS0xODIxMTAxOA%3D%3D)
  in the JavaScript coding standard landscape.

This makes future adoption easier for onboarding contributors and support is to
be expected for a long time.

##### Named functions Vs. Anonymous arrow functions

AirBnB's only guideline towards this is that anonymous arrow function are
preferred over the normal anonymous function notation.

When you must use an anonymous function (as when passing an inline callback),
use arrow function notation.

> Why? It creates a version of the function that executes in the context of
> this, which is usually what you want, and is a more concise syntax.
>
> Why not? If you have a fairly complicated function, you might move that logic
> out into its own named function expression.

[Reference](https://github.com/airbnb/javascript#arrows--use-them)

This project stick to the above guideline as well. If we need to pass a function
as part of a callback or in a promise chain and we on top of that need to pass
some contextual variables that is not passed implicit from either the callback
or the previous link in the promise chain we want to make use of an anonymous
arrow function as our default.

This comes with the build in disclaimer that if an anonymous function isn't
required the implementer should heavily consider moving the logic out into it's
own named function expression.

The named function is primarily desired due to it's easier to debug nature in
stacktraces.

### Create a new application

<details>
  <summary>1. Create a new application component</summary>

```javascript
// ./src/apps/my-new-application/my-new-application.jsx
import React from "react";
import PropTypes from "prop-types";

export function MyNewApplication({ text }) {
  return (
      <h2>{text}</h2>
  );
}

MyNewApplication.defaultProps = {
  text: "The fastest man alive!"
};

MyNewApplication.propTypes = {
  text: PropTypes.string
};

export default MyNewApplication;
```

</details>

<details>
  <summary>2. Create the entry component</summary>

```javascript
// ./src/apps/my-new-application/my-new-application.entry.jsx
import React from "react";
import PropTypes from "prop-types";
import MyNewApplication from "./my-new-application";

// The props of an entry is all of the data attributes that were
// set on the DOM element. See the section on "Naive app mount." for
// an example.
export function MyNewApplicationEntry(props) {
  return <MyNewApplication text='Might be from a server?' />;
}

export default MyNewApplicationEntry;
```

</details>

<details>
  <summary>3. Create the mount</summary>

```javascript
// ./src/apps/my-new-application/my-new-application.mount.js
import addMount from "../../core/addMount";
import MyNewApplication from "./my-new-application.entry";

addMount({ appName: "my-new-application", app: MyNewApplication });
```

</details>

<details>
  <summary>4. Add a story for local development</summary>

```javascript
// ./src/apps/my-new-application/my-new-application.dev.jsx
import React from "react";
import MyNewApplicationEntry from "./my-new-application.entry";
import MyNewApplication from "./my-new-application";

export default { title: "Apps|My new application" };

export function Entry() {
  // Testing the version that will be shipped.
  return <MyNewApplicationEntry />;
}

export function WithoutData() {
  // Play around with the application itself without server side data.
  return <MyNewApplication />;
}

```

</details>

<details>
  <summary>5. Run the development environment</summary>

```bash
  yarn dev
```

OR depending on your dev environment (docker or not)

```bash
  sudo yarn dev
```

</details>

__Voila!__ You browser should have opened and a storybook environment is ready
for you to tinker around.

#### Application state-machine

Most applications will have multiple internal states, so to aid consistency,
it's recommended to:

``` javascript
  const [status, setStatus] = useState("<initial state>");
```

and use the following states where appropriate:

`initial`: Initial state for applications that require some sort of
initialization, such as making a request to see if a material can be ordered,
before rendering the order button. Errors in initialization can go directly to
the failed state, or add custom states for communication different error
conditions to the user. Should render either nothing or as a
skeleton/spinner/message.

`ready`: The general "ready state". Applications that doesn't need
initialization (a generic button for instance) can use `ready` as the initial
state set in the `useState` call. This is basically the main waiting state.

`processing`: The application is taking some action. For buttons this will be
the state used when the user has clicked the button and the application is
waiting for reply from the back end. More advanced applications may use it while
doing backend requests, if reflecting the processing in the UI is desired.
Applications using optimistic feedback will render this state the same as the
`finished` state.

`failed`: Processing failed. The application renders an error message.

`finished`: End state for one-shot actions. Communicates success to the user.

Applications can use additional states if desired, but prefer the above if
appropriate.

### Style your application

<details>
  <summary>1. Create an application specific stylesheet</summary>

```scss
// ./src/apps/my-new-application/my-new-application.scss
.dpl-warm {
  color: maroon;
}
```

</details>

<details>
  <summary>2. Add the class to your application</summary>

```javascript
// ./src/apps/my-new-application/my-new-application.jsx
import React from "react";
import PropTypes from "prop-types";

export function MyNewApplication({ text }) {
  return (
      <h2 className='warm'>{text}</h2>
  );
}

MyNewApplication.defaultProps = {
  text: "The fastest man alive!"
};

MyNewApplication.propTypes = {
  text: PropTypes.string
};

export default MyNewApplication;
```

</details>

<details>
  <summary>3. Import the scss into your story</summary>

```javascript
// ./src/apps/my-new-application/my-new-application.dev.jsx
import React from "react";
import MyNewApplicationEntry from "./my-new-application.entry";
import MyNewApplication from "./my-new-application";

import './my-new-application.scss';

export default { title: "Apps|My new application" };

export function Entry() {
  // Testing the version that will be shipped.
  return <MyNewApplicationEntry />;
}

export function WithoutData() {
  // Play around with the application itself without server side data.
  return <MyNewApplication />;
}
```

</details>

__Cowabunga!__ You now got styling in your application

### Style using the dpl design system library

If you need to use styling created by this project's sister repository -
[the design system](https://github.com/danskernesdigitalebibliotek/dpl-design-system)
-you can run:

```bash
yarn add @danskernesdigitalebibliotek/dpl-design-system@latest
```

This command installs the latest released version of the package. Whenever a
new version of the design system package is released, it is necessary
to reinstall the package in this project using the same command to get the
newest styling, because yarn adds a specific version number to the package name
in package.json.

If you need published but unreleased code from a specific branch, you can also
use thebranch name, replacing all special characters with dashes (-). For
example if you want the latest styling from a branch called
"feature/availability-label", you would run:

```bash
yarn add @danskernesdigitalebibliotek/dpl-design-system@feature-availability-label
```

### Cross application components

If the component is simple enough to be a primitive you would use in multiple
occasions it's called an 'atom'. Such as a button or a link. If it's more
specific that that and to be used across apps we just call it a component. An
example would be some type of media presented alongside a header and some text.

The process when creating an atom or a component is more or less similar, but
some structural differences might be needed.

#### Creating an atom

<details>
  <summary>1. Create the atom</summary>

```javascript
// ./src/components/atoms/my-new-atom/my-new-atom.jsx
import React from "react";
import PropTypes from 'prop-types';

/**
 * A simple button.
 *
 * @export
 * @param {object} props
 * @returns {ReactNode}
 */
export function MyNewAtom({ className, children }) {
  return <button className={`btn ${className}`}>{children}</button>;
}

MyNewAtom.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired
}

MyNewAtom.defaultProps = {
  className: ""
}

export default MyNewAtom;
```

</details>

<details>
  <summary>2. Create styles for the atom</summary>

```scss
// ./src/components/atoms/my-new-atom/my-new-atom.scss
.dpl-btn {
    color: blue;
}
```

</details>

<details>
  <summary>3. Import the atom's styles into the component stylesheet</summary>

```scss
// ./src/components/components.scss
@import 'atoms/button/button.scss';
@import 'atoms/my-new-atom/my-new-atom.scss';
```

</details>

<details>
  <summary>4. Create a story for your atom</summary>

```javascript
// ./src/components/atoms/my-new-atom/my-new-atom.dev.jsx
import React from "react";
import MyNewAtom from "./my-new-atom";

export default { title: "Atoms|My new atom" };

export function WithText() {
  return <MyNewAtom>Cick me!</MyNewAtom>;
}
```

</details>

<details>
  <summary>5. Import the atom into the applications or other components where
you would want to use it</summary>

```javascript
// ./src/apps/my-new-application/my-new-application.jsx
import React, {Fragment} from "react";
import PropTypes from "prop-types";

import MyNewAtom from "../../components/atom/my-new-atom/my-new-atom"

export function MyNewApplication({ text }) {
  return (
      <Fragment>
        <h2 className='warm'>{text}</h2>
        <MyNewAtom className='additional-class' />
      </Fragment>
  );
}

MyNewApplication.defaultProps = {
  text: "The fastest man alive!"
};

MyNewApplication.propTypes = {
  text: PropTypes.string
};

export default MyNewApplication;
```

</details>

__Finito!__ You now know how to share code across applications

#### Creating a component

Repeat all of the same steps as with an atom but place it in it's own directory
inside `components`.

Such as `./src/components/my-new-component/my-new-component.jsx`

### Editor example configuration

If you use [Code](https://github.com/microsoft/vscode) we provide some easy to
use and nice defaults for this project. They are located in `.vscode.example`.
Simply rename the directory from `.vscode.example` to `.vscode` and you are good
to go. This overwrites your global user settings for this workspace and suggests
som extensions you might want.

## Usage

There are two ways to use the components provided by this project:

1. As standalone JavaScript applications mounted within HTML pages generated by
   a separate system.
2. As components within a larger JavaScript application (Under development)

### Naive app mount

So let's say you wanted to make use of an application within an existing HTML
page such as what might be generated serverside by platforms like Drupal,
WordPress etc.

For this use case you should download the `dist.zip` package from
[the latest release of the project](/danskernesdigitalebibliotek/dpl-react/releases/latest)
and unzip somewhere within the web root of your project. The package contains a
set of artifacts needed to use one or more applications within an HTML page.

<details>
  <summary>HTML Example</summary>

A simple example of the required artifacts and how they are used looks like
this:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Naive mount</title>
    <!-- Include CSS files to provide default styling -->
    <link rel="stylesheet" href="/dist/components.css">
</head>
<body>
    <b>Here be dragons!</b>
    <!-- Data attributes will be camelCased on the react side aka.
         props.errorText and props.text -->
    <div data-dpl-app='add-to-checklist' data-text="Chromatic dragon"
         data-error-text="Minor mistake"></div>
    <div data-dpl-app='a-none-existing-app'></div>

    <!-- Load order og scripts is of importance here -->
    <script src="/dist/runtime.js"></script>
    <script src="/dist/bundle.js"></script>
    <script src="/dist/mount.js"></script>
    <!-- After the necessary scripts you can start loading applications -->
    <script src="/dist/add-to-checklist.js"></script>
    <script>
      // For making successful requests to the different services we need one or
      // more valid tokens.
     window.dplReact.setToken("user","XXXXXXXXXXXXXXXXXXXXXX");
     window.dplReact.setToken("library","YYYYYYYYYYYYYYYYYYYYYY");

      // If this function isn't called no apps will display.
      // An app will only be displayed if there is a container for it
      // and a corresponding application loaded.
      window.dplReact.mount(document);
    </script>
</body>
</html>
```

</details>

As a minimum you will need the `runtime.js` and `bundle.js`. For styling
of atoms and components you will need to import `components.css`.

Each application also has its own JavaScript artifact and it might have a CSS
artifact as well. Such as `add-to-checklist.js` and `add-to-checklist.css`.

To mount the application you need an HTML element with the correct data
attribute.

```html
<div data-dpl-app='add-to-checklist'></div>
```

The name of the data attribute should be `data-dpl-app` and the value should be
the name of the application - the value of the `appName` parameter assigned in
the application `.mount.js` file.

#### Data attributes and props

As stated above, every application needs the corresponding `data-dpl-app`
attribute to even be mounted and shown on the page. Additional data attributes
can be passed if necessary. Examples would be contextual ids etc. Normally these
would be passed in by the serverside platform e.g. Drupal, Wordpress etc.

```html
<div data-dpl-app='add-to-checklist' data-id="870970-basis:54172613"
     data-error-text="A mistake was made"></div>
```

The above `data-id` would be accessed as `props.id` and `data-error-text` as
`props.errorText` in the entrypoint of an application.

<details>
  <summary>Example</summary>

```javascript
// ./src/apps/my-new-application/my-new-application.entry.jsx
import React from "react";
import PropTypes from "prop-types";
import MyNewApplication from './my-new-application.jsx';

export function MyNewApplicationEntry({ id }) {
  return (
    <MyNewApplication
      // 870970-basis:54172613
      id={id}
    />
}

export default MyNewApplicationEntry;
```

</details>

To fake this in our development environment we need to pass these same data
attributes into our entrypoint.

<details>
  <summary>Example</summary>

```javascript
// ./src/apps/my-new-application/my-new-application.dev.jsx
import React from "react";
import MyNewApplicationEntry from "./my-new-application.entry";
import MyNewApplication from "./my-new-application";

export default { title: "Apps|My new application" };

export function Entry() {
  // Testing the version that will be shipped.
  return <MyNewApplicationEntry id="870970-basis:54172613" />;
}

export function WithoutData() {
  // Play around with the application itself without server side data.
  return <MyNewApplication />;
}

```

</details>

## Extending the project

If you want to extend this project - either by introducing new components or
expand the functionality of the existing ones - and your changes can be
implemented in a way that is valuable to users in general, please submit pull
requests.

Even if that is not the case and you have special needs the infrastructure of
the project should also be helpful to you.

In such a situation you should fork this project and extend it to your own needs
by [implementing new applications](#create-a-new-application). New applications
can reuse various levels of infrastructure provided by the project such as:

1. [Integration with various webservices](src/core)
2. [User authentication and token management](src/core)
3. [Visual atoms or components](#cross-application-components)
4. Visual representations of [existing applications](src/apps)
5. [Styling using SCSS](#style-your-application)
6. Test infrastructure
7. [Application mounting](src/core)

Once the customization is complete the result can be packaged for distribution
by pushing the changes to the forked repository:

1. Changes pushed to the `master` branch of the forked repository will
   automatically update the latest release of the fork.
2. Tags pushed to the forked repository also will be published as new releases
   in the fork.

The result can be [used in the same ways as the original project](#usage).
