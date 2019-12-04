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
  // window.ddbApps is our container for all of our available applications.
  const apps = window.ddbApps || {};
  apps[appName] = app;
  window.ddbApps = apps;
}

export default addMount;
