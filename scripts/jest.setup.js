// eslint-disable-next-line
import "mutationobserver-shim";

// this is just a little hack to silence a warning.
// Some of our UI is optimistic and returns responses besides the order of async/await.
// Therefore we want to quell some errors that isn't really valid.
const originalError = console.error;
beforeAll(() => {
  // eslint-disable-next-line
  console.error = (...args) => {
    if (/Warning.*not wrapped in act/.test(args[0])) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  // eslint-disable-next-line
  console.error = originalError;
});
