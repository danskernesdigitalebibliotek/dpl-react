![https://raw.githubusercontent.com/reload/ddb-react/master/logo.png](https://raw.githubusercontent.com/reload/ddb-react/master/logo.png)

## Installation

```bash
yarn install
```

## Development

```bash
yarn dev
```

### Create a new application.

1. Create a new application component.

`./src/apps/my-new-application/my-new-application.js`

```javascript
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

2. Create the entry component.

`./src/apps/my-new-application/my-new-application.entry.js`

```javascript
import React from "react";
import PropTypes from "prop-types";
import MyNewApplication from './my-new-application.js'

// The props of an entry is all of the data attributes that were
// set on the DOM element. See the section on "Naive app mount." for
// an example.
export function MyNewApplicationEntry(props) {
  return <MyNewApplication text='Might be from a server?' />
}

export default MyNewApplicationEntry;
```

3. Create the mount.

`./src/apps/my-new-application/my-new-application.mount.js`

```javascript
import mount from "../../core/mount.js";
import MyNewApplication from "./mynewapplication.entry.js";

mount({ appName: "my-new-application", app: MyNewApplication });
```

4. Add a story for local development.

`./src/apps/my-new-application/my-new-application.stories.js`

```javascript
import React from "react";
import MyNewApplicationEntry from "./my-new-application.entry.js";
import MyNewApplication from "./my-new-application.js"

export default { title: "Apps|My new application" };

export function entry() {
  // Testing the version that will be shipped.
  return <MyNewApplicationEntry />;
}

export function withoutData() {
  // Play around with the application itself without server side data.
  return <MyNewApplication />;
}

```

5. Run the development environment.

```bash
  yarn dev
```

6. Voila! You browser should have opened and a StoryBook environment is ready for you to tinker around.

### Style your application.

1. Create an application specific stylesheet.

`./src/apps/my-new-application/my-new-application.scss`

```scss
.warm {
  color: maroon;
}
```

2. Add the class to your application.

`./src/apps/my-new-application/my-new-application.js`


```javascript
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

3. Import the scss into your story.

`./src/apps/my-new-application/my-new-application.stories.js`

```javascript
import React from "react";
import MyNewApplicationEntry from "./my-new-application.entry.js";
import MyNewApplication from "./my-new-application.js"

import './my-new-application.scss'

export default { title: "Apps|My new application" };

export function entry() {
  // Testing the version that will be shipped.
  return <MyNewApplicationEntry />;
}

export function withoutData() {
  // Play around with the application itself without server side data.
  return <MyNewApplication />;
}
```

4. Cowabunga! You now got styling in your application.

### Create a component for use across applications.

If the component is simple enough to be a primitive you would use in multiple occassions it's called an 'atom'. Such as a button or a link.
If it's more specific that that and to be used across apps we just call it
a component. An example would be some type of media presented alongside a header and some text.

The process when creating an atom or a component is more or less similar, but some structuaral differences might be needed.

#### Creating an atom.

1. Create the atom.

`./src/components/atoms/my-new-atom/my-new-atom.js`

```javascript
import React from "react";
import { string } from 'prop-types'

/**
 * A simple button.
 *
 * @export
 * @param {Object} props
 * @returns {ReactNode}
 */
export function MyNewAtom({ className, ...rest }) {
  return <button className={`btn ${className}`} {...rest} />;
}

MyNewAtom.propTypes = {
  className: string
}

export default MyNewAtom;
```

2. Create styles for the atom.

`./src/components/atoms/my-new-atom/my-new-atom.scss`

```scss
.btn {
    color: blue;
}
```

3. Import the atom's styles into the component stylesheet.

`./src/components/components.scss`

```scss
@import 'atoms/button/button.scss';
@import 'atoms/my-new-atom/my-new-atom.scss';
```

4. Create a story for your atom.

`./src/components/atoms/my-new-atom/my-new-atom.stories.js`

```javascript
import React from "react";
import MyNewAtom from "./my-new-atom.js";

export default { title: "Atoms|My new atom" };

export function withText() {
  return <MyNewAtom>Cick me!</MyNewAtom>;
}
```

5. Import the atom into the applications or other components where you would want to use it.

`./src/apps/my-new-application/my-new-application.js`

```javascript
import React, {Fragment} from "react";
import PropTypes from "prop-types";

import MyNewAtom from '../../components/atom/my-new-atom/my-new-atom.js'

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

6. Finito! You now know how to share code across applications.

#### Creating a component.

Repeat all of the same steps as with an atom but place it in it's own directory inside `components`.

Such as `./src/components/my-new-component/my-new-component.js`

### Naive app mount.

So let's say you wanted to make use of an application in Drupal, WordPress etc.
A simple naive example of the required artifacts needed looks like this:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Naive mount</title>
    <link rel="stylesheet" href="/dist/components.css">
    <link rel="stylesheet" href="/dist/add-to-checklist.css">
</head>
<body>
    <b>Here be dragons!</b>
    <div data-ddb-app='add-to-checklist' data-ddb-whatever-value="Chromatic dragon"></div>
    <div data-ddb-app='add-to-checklist'></div>
    <script src="/dist/runtime.js"></script>
    <script src="/dist/bundle.js"></script>
    <script src="/dist/add-to-checklist.js"></script>
</body>
</html>
```

As a minimum you will need the `runtime.js` and `bundle.js`.
For styling of atoms and components you will need to import `components.css`.

Each application also has it's own JavaScript artifact and it might have a css artifact as well. Such as `add-to-checklist.js` and `add-to-checklist.css`.

To mount the application you need a html element with the correct data attribute.

```html
<div data-ddb-app='add-to-checklist'></div>
```

The name of the data attribute should be `data-ddb-app` and the value should be the name of the application. The appName you have assigned it in the applications `.mount.js` file.
