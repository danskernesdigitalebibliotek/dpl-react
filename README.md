![https://raw.githubusercontent.com/reload/ddb-react/master/logo.png](https://raw.githubusercontent.com/reload/ddb-react/master/logo.png)

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Development](#development)
  - [Requirements](#requirements)
    - [Retrieving an access token](#retrieving-an-access-token)
  - [Installation](#installation)
  - [Create a new application](#create-a-new-application)
  - [Style your application](#style-your-application)
  - [Cross application components](#cross-application-components)
    - [Creating an atom](#creating-an-atom)
    - [Creating a component](#creating-a-component)
  - [Editor example configuration](#editor-example-configuration)
- [Production](#production)
  - [Naive app mount](#naive-app-mount)
  - [Access data attributes](#access-data-attributes)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Development

### Requirements

* [make](https://www.gnu.org/software/make/)
* [Docker](https://www.docker.com/products/docker-desktop)
* [Dory](https://github.com/FreedomBen/dory)
* `.token` file in the root of the project containing a valid Adgangsplatformen token for a patron. This is used in the communication with [OpenPlatform](https://openplatform.dbc.dk/v3/), [MaterialList](https://github.com/reload/material-list) and [FollowSearches](https://github.com/reload/follow-searches). ___(optional, you might not need or want live data.)___

#### Retrieving an access token

The [OAuth access token must be retrieved from Adgangsplatformen](https://github.com/DBCDK/hejmdal/blob/master/docs/oauth2.md), a single sign-on solution for public libraries in Denmark. 

Usage of Adgangsplatformen requires a valid client id and secret which must be
obtained from your library partner or directly from DBC, the company responsible
for running Adgangsplatfomen.

Example for retrieving an access token using password grant:

```bash
curl -X POST https://login.bib.dk/oauth/token -d 'grant_type=password&password=[patron-password]&username=[patron-username]&agency=[patron-library-agency-id]&client_id=[client-id]&client_secret=[client-secret]'
```

This will return a data structure containing the access token:

```json
{
    "access_token":"abcd1234",
    "token_type":"Bearer",
    "expires_in":2591999
}
```

We have a make target for retrieving an access token.
You still need the valid client id and client secret as described above.

```bash
make token
```

### Installation

```bash
make up
```

When storybook is started, you can access it at: [ddb-react.docker](http://ddb-react.docker)

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
</details>

__Voila!__ You browser should have opened and a storybook environment is ready for you to tinker around.

### Style your application

<details>
  <summary>1. Create an application specific stylesheet</summary>

```scss
// ./src/apps/my-new-application/my-new-application.scss
.ddb-warm {
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

### Cross application components

If the component is simple enough to be a primitive you would use in multiple occassions it's called an 'atom'. Such as a button or a link.
If it's more specific that that and to be used across apps we just call it
a component. An example would be some type of media presented alongside a header and some text.

The process when creating an atom or a component is more or less similar, but some structuaral differences might be needed.

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
.ddb-btn {
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
  <summary>5. Import the atom into the applications or other components where you would want to use it</summary>

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

Repeat all of the same steps as with an atom but place it in it's own directory inside `components`.

Such as `./src/components/my-new-component/my-new-component.jsx`

### Editor example configuration

If you use [Code](https://github.com/microsoft/vscode) we provide some easy to use and nice defaults for this project.
They are located in `.vscode.example`. Simple rename the directory from `.vscode.example` to `.vscode` and you are good to go.
This overwrites your global user settings for this workspace and suggests som extensions you might want.

## Production

### Naive app mount

So let's say you wanted to make use of an application in Drupal, WordPress etc.
A simple naive example of the required artifacts needed looks like this:

<details>
  <summary>HTML Example</summary>

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Naive mount</title>
    <link rel="stylesheet" href="/dist/components.css">
</head>
<body>
    <b>Here be dragons!</b>
    <div data-ddb-app='add-to-checklist' data-text="Chromatic dragon"></div>
    <div data-ddb-app='a-none-existing-app'></div>

    <script>
      // This key is not used for actual validation but merely as a way to adjust the interface accordingly.
      // Additional keys will be injected into the "ddbReact" container object at a later stage in mount.js.
      window.ddbReact = {
        userAuthenticated: true // But only "true" if the user is actually authenticated.
      }
    </script>
    
    <!-- Load order og scripts is of importance here -->
    <script src="/dist/runtime.js"></script>
    <script src="/dist/bundle.js"></script>
    <script src="/dist/mount.js"></script>
    <!-- After the necesssary scrips you can start loading applications -->
    <script src="/dist/add-to-checklist.js"></script>
    <script>
      // For making successfull requests to the different services we need a valid token
      // to be stored in localStorage of the client browser.
      // The key should be "ddb-token".
      // This is only for local testing. Not in production environments.
      window.localStorage.setItem("ddb-token", "XXXXXXXXXXXXXXXXXXXXXX");

      // If this function isn't called no apps will display.
      // An app will only be displayed if there is a container for it
      // and a corresonding application loaded.
      window.ddbReact.mount(document);
    </script>
</body>
</html>
```
</details>

As a minimum you will need the `runtime.js` and `bundle.js`.
For styling of atoms and components you will need to import `components.css`.

Each application also has it's own JavaScript artifact and it might have a css artifact as well. Such as `add-to-checklist.jsx` and `add-to-checklist.css`.

To mount the application you need a html element with the correct data attribute.

```html
<div data-ddb-app='add-to-checklist'></div>
```

The name of the data attribute should be `data-ddb-app` and the value should be the name of the application. The appName you have assigned it in the applications `.mount.js` file.


### Access data attributes

As stated above, every application needs the corresponding `data-ddb-app` attribute to even be mounted and shown on the page.
Additional data attributes can be passed if neccessary. Examples would be contextuel id's etc.
Normally these would be passed in by the server ex. Drupal, Wordpress etc.

```html
<div data-ddb-app='add-to-checklist' data-id="870970-basis:54172613"></div>
```

The above `data-id` would be accessed as `props.id` in the entrypoint of an application.

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

To fake this in our development environment we need to pass these same data attributes into
out entrypoint.

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
