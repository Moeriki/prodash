'use strict';

// private

function proWrap(func, { arity, calleesIndices }) {
  if (iterateeIndex != null && !arity) {
    throw new Error('Inconcievable! (001)');
  }
  if (iterateeIndex != null && arrayIndices.length !== 1) {
    throw new Error('Inconcievable! (002)');
  }
  return function proWrapped(...args) {
    const [{ concurrency = Infinity } = {}] = args.splice(arity);
    // const concurrency = args[arity] && args[arity].concurrency || Infinity;
    const arrays = arrayIndices.map((arrayIndex) => args[arrayIndex]);
    const iteratee = iterateeIndex && args[iterateeIndex];
    const promiseses = arrays.map((array) => Array(array.length));
    arrays.forEach((array, arrayIndex) => {
      array.forEach((item, itemIndex) => {
        promiseses[arrayIndex][itemIndex] = Promise
          .resolve(promiseses[arrayIndex][itemIndex - concurrency])
          .then(() => Promise.resolve(item))
          // .then((resolvedItem) => {
          //   if (!iteratee) {
          //     return resolvedItem;
          //   }
          //   return iteratee(resolvedItem, itemIndex, array);
          // })
        ;
      });
    });
    if (iteratee) {
      if (promiseses.length !== 1) {
        throw new Error('Inconcievable! (003)');
      }
      Promise.all(promiseses[0]).then((items) => {

      })
    }
    // return Promise.all(
    //   promiseses.map((promises, index) => Promise.all(promises)
    //     .then((results) => {
    //       args[arrayIndices[index]] = results;
    //       return results;
    //     })
    //   )
    // ).then(() => {
    //   if (!func) {

    //   }
    //   if (iterateeIndex) {
    //     args[iterateeIndex] = ($0, index) => results[index];
    //   }
    //   return func(...args);
    // });
  }
}

module.exports = proWrap;
