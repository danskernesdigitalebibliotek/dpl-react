# React Code guidelines

The following guidelines describe best practices for developing code for React
components for the Danish Public Libraries CMS project. The guidelines should
help achieve:

* A stable, secure and high quality foundation for building and maintaining
  client-side JavaScript components for library websites
* Consistency across multiple developers participating in the project
* The best possible conditions for sharing components between library websites
* The best possible conditions for the individual library website to customize
  configuration and appearance

Contributions to the DDB React project will be reviewed by members of the Core
team. These guidelines should inform contributors about what to expect in such a
review. If a review comment cannot be traced back to one of these guidelines it
indicates that the guidelines should be updated to ensure transparency.

## Coding standards

The project follows the [Airbnb JavaScript Style Guide](https://airbnb.io/javascript/)
and [Airbnb React/JSX Style Guide](https://airbnb.io/javascript/react/). This
choice is based on multiple factors:

1. Historically the community of developers working with DDB
   [has ties to the Drupal project](https://github.com/ding2/ding2/).
   [Drupal has adopted the Airbnb JavaScript Style Guide](https://www.drupal.org/node/2873849)
   so this choice should ensure consistency between the two projects.
2. Airbnb's standard is one of the best known and most used in the JavaScript
   ccoding standard landscape.
3. Airbnb’s standard is both comprehensive and well documented.
4. Airbnb’s standards cover both JavaScript in general React/JSX specifically.
   This avoids potential conflicts between multiple standards.

The following lists significant areas where the project either intentionally
expands or deviates from the official standards or areas which developers should
be especially aware of.

### General

* The default language for all code and comments is English.
* Components must be compatible with the latest stable version of the following
  browsers:
  * Desktop
    * Microsoft Edge
    * Google Chrome
    * Safari
    * Firefox
  * Mobile
    * Google Chrome
    * Safari
    * Firefox
    * Samsung Browser

### JavaScript

#### Named functions vs. anonymous arrow functions

AirBnB's only guideline towards this is that
[anonymous arrow function nation is preferred over the normal anonymous function
notation](https://airbnb.io/javascript/#arrows--use-them).

This project sticks to the above guideline as well. If we need to pass a
function as part of a callback or in a promise chain and we on top of that need
to pass some contextual variables that are not passed implicitly from either the
callback or the previous link in the promise chain we want to make use of an
anonymous arrow function as our default.

This comes with the build in disclaimer that if an anonymous function isn't
required the implementer should heavily consider moving the logic out into its
own named function expression.

The named function is primarily desired due to it's easier to debug nature in
stacktraces.

### React

* Configuration must be passed as props for components. This allows the host
  system to modify how a component works when it is inserted.
* All components should be provided with [skeleton screens](https://www.lukew.com/ff/entry.asp?1797).
  This ensures that the user interface reflects the final state even when data
  is loaded asynchronously. This reduces load time frustration.
* Components should be [optimistic](https://www.smashingmagazine.com/2016/11/true-lies-of-optimistic-user-interfaces/).
  Unless we have reason to believe that an operation may fail we should provide
  fast response to users.
* All interface text must be implemented as props for components. This allows
  the host system to provide a suitable translation/version when using the
  component.

### CSS

* All classes must have the dpl- prefix. This makes them distinguishable from
  classes provided by the host system.
* Class names should follow the [Block-Element-Modifier architecture](http://getbem.com/introduction/).
* Components must use and/or provide a default style sheet which at least
  provides a minimum of styling showing the purpose of the component.
* Elements must be provided with meaningful classes even though they are not
  targeted by the default style sheet. This helps host systems provide
  additional styling of the components. Consider how the component consists of
  blocks and elements with modifiers and how these can be nested within each
  other.
* Components must use SCSS for styling. The project uses [PostCSS](http://sass-lang.com/libsass)
  and [PostCSS-SCSS](https://github.com/Igosuki/compass-mixins) within Webpack for
  processing.

### HTML

* Components must use semantic HTML5 markup.
* Components must provide configuration to set a top headline level for the
  component. This helps provide a proper document outline to ensure the
  accessibility of the system.

## Naming

### Files

Files provided by components must be placed in the following folders and have
the extensions defined here.

* Components (React applications)
  * apps/[component-name]/[component-name].jsx
    * Core JSX component.
  * components/[component-name]/[component-name].scss
    * Stylesheet for the component.
  * apps/[component-name]/[component-name].entry.jsx
    * Main application entrypoint.
    * This will usually also be where state management is implemented.
    * This must _not_ include the default stylesheet.
  * apps/[component-name]/[component-name].dev.jsx
    * Storybook entry for the component.
    * If the component has a stylesheet this must also be included here.
  * apps/[component-name]/[component-name].mount.js
    * Code for registering the application to be booted when a page is loaded on
      the host system.
  * apps/[component-name]/[component-name].test.js
    * Test of the component implemented with [Cypress](https://www.cypress.io/)
* Reusable elements (React components)
  * components/[component-name]/[component-name].dev.jsx
  * components/[component-name]/[component-name].jsx
  * components/[component-name]/[component-name].scss
* Reusable functions and classes
  * core/[function].js
  * core/[Class].js

## Third party code

The project uses [Yarn](https://classic.yarnpkg.com/lang/en/) as a package
manager to handle code which is developed outside the project repository. Such
code must not be committed to the Core project repository.

When specifying third party package versions the project follows these
guidelines:

* Use the [^ next significant release operator](https://getcomposer.org/doc/articles/versions.md#next-significant-release-operators)
  for packages which follow semantic versioning.
* The version specified must be the latest known working and secure version. We
  do not want accidental downgrades.
* We want to allow easy updates to all working releases within the same major
  version.
* Packages which are not intended to be executed at runtime in the production
  environment should be marked as development dependencies.

### Reusing dependencies

Components must reuse existing dependencies in the project before adding new
ones which provide similar functionality. This ensures consistency and avoids
unnecessary increases in the package size of the project.

The reasoning behind the choice of key dependencies have been documented in
[the architecture directory](../architecture).

### Altering third party code

The project uses patches rather than forks to modify third party packages. This
makes maintenance of modified packages easier and avoids a collection of forked
repositories within the project.

* Use an appropriate method for the corresponding package manager for managing
  the patch.
* Patches should be external by default. In rare cases it may be needed to
  commit them as a part of the project.
* When providing a patch you must document the origin of the patch e.g. through
  an url in a commit comment or preferably in the package manager configuration
  for the project.

## Code comments

Code comments which describe _what_ an implementation does should only be used
for complex implementations usually consisting of multiple loops, conditional
statements etc.

Inline code comments should focus on _why_ an unusual implementation has been
implemented the way it is. This may include references to such things as
business requirements, odd system behavior or browser inconsistencies.

## Commit messages

Commit messages in the version control system help all developers understand the
current state of the code base, how it has evolved and the context of each
change. This is especially important for a project which is expected to have a
long lifetime.

Commit messages must follow these guidelines:

1. Each line must not be more than 72 characters long
2. The first line of your commit message (the subject) must contain a short
   summary of the change. The subject should be kept around 50 characters long.
3. The subject must be followed by a blank line
4. Subsequent lines (the body) should explain what you have changed and why the
   change is necessary. This provides context for other developers who have not
   been part of the development process. The larger the change the more
   description in the body is expected.
5. If the commit is a result of an issue in a public issue tracker,
   platform.dandigbib.dk, then the subject must start with the issue number
   followed by a colon (:). If the commit is a result of a private issue tracker
   then the issue id must be kept in the commit body.

When creating a pull request the pull request description should not contain any
information that is not already available in the commit messages.

Developers are encouraged to read [_How to Write a Git Commit Message_ by Chris Beams](https://chris.beams.io/posts/git-commit/).

## Tool support

The project aims to automate compliance checks as much as possible using static
code analysis tools. This should make it easier for developers to check
contributions before submitting them for review and thus make the review process
easier.

The following tools pay a key part here:

1. [Eslint](https://eslint.org/) with the following rulesets and plugins:
    1. [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
    2. [Airbnb React/JSX Style Guide](https://github.com/airbnb/javascript/tree/master/react)
    3. [Prettier](https://prettier.io/)
    4. [Cypress](https://github.com/cypress-io/eslint-plugin-cypress)
2. [Stylelint](https://stylelint.io/) with the following rulesets and plugins
    5. [Recommended SCSS](https://github.com/kristerkari/stylelint-config-recommended-scss)
    6. [Prettier](https://github.com/prettier/stylelint-prettier)
    7. [BEM support](https://www.npmjs.com/package/@namics/stylelint-bem)

In general all tools must be able to run locally. This allows developers to get
quick feedback on their work.

Tools which provide automated fixes are preferred. This reduces the burden of
keeping code compliant for developers.

Code which is to be exempt from these standards must be marked accordingly in
the codebase - usually through inline comments ([Eslint](https://eslint.org/docs/user-guide/configuring#disabling-rules-with-inline-comments),
[Stylelint](https://stylelint.io/user-guide/ignore-code)). This must also
include a human readable reasoning. This ensures that deviations do not affect
future analysis and the project should always pass through static analysis.

If there are discrepancies between the automated checks and the standards
defined here then developers are encouraged to point this out so the automated
checks or these standards can be updated accordingly.
