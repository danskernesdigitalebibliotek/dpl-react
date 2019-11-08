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

path: `./src/apps/my-new-application/my-new-application.js`

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

path: `./src/apps/my-new-application/my-new-application.entry.js`

```javascript
import React from "react";
import PropTypes from "prop-types";
import MyNewApplication from './my-new-application.js'

export function MyNewApplicationEntry() {
  return <MyNewApplication text='Might be from a server?' />
}

export default MyNewApplicationEntry;
```

3. Create the mount.

path: `./src/apps/my-new-application/my-new-application.mount.js`

```javascript
import init from "../../core/mount.js";
import MyNewApplication from "./mynewapplication.entry.js";

init({ mountName: "my-new-application", app: MyNewApplication });
```

4. Add the mount point.

path: `./mount-points.json`

```json
{
  "add-to-checklist": [
    "add-to-checklist-container-1"
  ],
  "checklist": [
    "checklist-container-1"
  ],
  "my-new-application": [
      "the-id-of-the-dom-element",
      "maybe-another-dom-element-for-a-second-app"
  ]
}
```

5. Add a story for local development.

path: `./src/apps/my-new-application/my-new-application.stories.js`

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

6. Run the development environment.

```bash
  yarn dev
```

7. Voila! You browser should have opened and a StoryBook environment is ready for you to tinker around.

### Style your application.

1. Create an application specific stylesheet.

path: `./src/apps/my-new-application/my-new-application.scss`

```scss
.warm {
  color: maroon;
}
```

2. Add the class to your application.

path: `./src/apps/my-new-application/my-new-application.js`


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

path: `./src/apps/my-new-application/my-new-application.stories.js`

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

path: `./src/components/atoms/my-new-atom/my-new-atom.js`

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

path: `./src/components/atoms/my-new-atom/my-new-atom.scss`

```scss
.btn {
    color: blue;
}
```

3. Import the atom's styles into the component stylesheet.

path: `./src/components/components.scss`

```scss
@import 'atoms/button/button.scss';
@import 'atoms/my-new-atom/my-new-atom.scss';
```

4. Create a story for your atom.

path: `./src/components/atoms/my-new-atom/my-new-atom.stories.js`

```javascript
import React from "react";
import MyNewAtom from "./my-new-atom.js";

export default { title: "Atoms|My new atom" };

export function withText() {
  return <MyNewAtom>Cick me!</MyNewAtom>;
}
```

5. Import the atom into the applications or other components where you would want to use it.

path: `./src/apps/my-new-application/my-new-application.js`

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
