/**
 * Like `walkDecls` but you can pass an `async` function and know when
 * they are all finished. Useful if that `Promise` is returned from the
 * creation of your `Plugin`
 *
 * Note: The behavior where you can return `false` from the `walkDecls`
 * callback to terminate iteration does not work with this utility,
 * since all declarations are being handled essentially in parallel
 *
 * @param {object} obj the thing to call `walkDecls` on
 * @param {string|RegExp} prop the property to filter declarations on
 * @param {function} cb the async function to call
 * @return {Promise} resolves when all callbacks are complete
 */
function asyncWalkDecls(obj, prop, cb) {
  const promises = [];

  obj.walkDecls(prop, (...args) => {
    const done = new Promise(async resolve => {
      const result = await cb(...args);

      resolve(result);
    });

    promises.push(done);
  });

  return Promise.all(promises);
}

module.exports = asyncWalkDecls;
