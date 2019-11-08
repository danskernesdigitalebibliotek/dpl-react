import { createElement } from "react";
import { render } from "react-dom";
import mountPoints from "../../mount-points.json";

/**
 * An opinionated abstraction on top of react-dom's
 * render function. If we at some point want to change the
 * render target to be some other thing than react-dom we
 * only need to change it here.
 * https://reactjs.org/docs/react-dom.html#render
 *
 * @export
 * @param {Object} options
 * @param {ReactNode} options.app - The ReactNode we want to render.
 * @param {string} options.domId - The identifier of the DOM element we want the application to be rendered in.
 * @returns {function}
 */
export function mount({ app, domId }) {
  return render(createElement(app), document.getElementById(domId));
}

/**
 * Allows us to have multiple seperate instances of the same app
 * on each SSR page.
 *
 * @export
 * @param {Object} options
 * @param {string} options.mountName - Name of the actual mount. Not the id but the name that inhibits a collection of mount points.
 * @param {ReactNode} options.app - The ReactNode we want to render.
 */
export function init({ mountName, app }) {
  if (mountPoints[mountName]) {
    mountPoints[mountName].forEach(function initMount(id) {
      mount({ app, domId: id });
    });
  }
}

export default init;
