/**
 * We want to add our application to a global reachable object that we implicitly can
 * reference later down the line when we want to "turn on" all of the applications.
 * Look to the src/core/mount.js file.
 *
 * @param {object} options
 * @param {string} options.appName - Name of the application. This has to be the same in the DOM as well as in your .mount.js file.
 * @param {ReactNode} options.app - The React app/component that should be the start point of your application. This should be your applications .entry.js.
 */
function addMount({ appName, app }) {
  // If our global namespace container isn't initialized we want to opt out.
  if (!window.ddbReact?.apps) {
    return;
  }
  // window.ddbReact.apps is our container for all of our available applications.
  window.ddbReact.apps = {
    ...window.ddbReact.apps,
    [appName]: app
  };
}

export default addMount;
