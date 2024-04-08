export function curry(fn) {
  // ...args collects arguments as array (rest)
  return function curriedFunc(...args) {
    // if yes, spread args elements to pass into fn (spread).
    if (args.length >= fn.length) return fn(...args);
    // if not, return a function that collects the next arguments passed in nextArgs and recursively call curriedFunc,
    return (...nextArgs) => curriedFunc(...args, ...nextArgs);
  };
}
