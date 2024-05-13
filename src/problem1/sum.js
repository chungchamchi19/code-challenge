var sum_to_n_a = function(n) {
  return n * (n + 1) / 2;
};

var sum_to_n_b = function(n) {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
};

const executeStack = (x) => {
  while (typeof x == 'function') x = x()
  return x;
}

const stackFunc = (f) => {
  return (...args) => {
    return () => {
      return f(...args);
    };
  };
};

var sum_to_n_c = function(n) {
  const f = stackFunc((a, n) => {
    if (n === 0) {
      return a;
    }
    return f(a + n, n - 1);
  });
  return executeStack(f(0, n));
};

const n = 10000;
console.log('sum_to_n_a', sum_to_n_a(n));
console.log('sum_to_n_b', sum_to_n_b(n));
console.log('sum_to_n_c', sum_to_n_c(n));

// note that sum_to_n_c is slower than sum_to_n_a and sum_to_n_b. If use recursive in sum_to_n_c with large number, it will cause stack overflow error. So that, we need to push the function to the stack and execute it later.
