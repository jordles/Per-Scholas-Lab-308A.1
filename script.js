/* -------------------------------------------------------------------------- */
/*                           PART 1: STACK OVERFLOW                           */
/* -------------------------------------------------------------------------- */
console.group("Part 1: Stack Overflow");
// Declare a global counter variable.
// Create a simple function that increments the variable, and then calls itself recursively.
// Surround the initial function call in a try/catch block.
// Within the catch, log the error and the value of the counter variable.

let counter = 0;

function recursiveCounter() {
  counter++;
  try {
    recursiveCounter();
  } catch (error) {
    console.log(error);
    console.log(counter);
  }
}

recursiveCounter();

console.groupEnd();


/* -------------------------------------------------------------------------- */
/*                             PART2: TRAMPOLINES                             */
/* -------------------------------------------------------------------------- */

console.group("Part 2: Trampolines");

// Write a recursive function that completely flattens an array of nested arrays, regardless of how deeply nested the arrays are.

function recursiveFlatten(arr, result = []) {
  arr.forEach(el => {
    if(Array.isArray(el)) {
      recursiveFlatten(el, result);
    } else {
      result.push(el);
    }
  })

  return result;
}

//another solution with reduce
/* function recursiveFlatten(arr) {
  return arr.reduce((acc, el) => {
    if (Array.isArray(el)) {
      acc.push(...recursiveFlatten(el));
    } else {
      acc.push(el);
    }
    return acc;
  }, []);
} */

console.log(recursiveFlatten([1, [2, [3, [4]]]]));

// Once your recursive function is complete, trampoline it.

//TRAMPOLINE IS IMPLEMENTING TAIL RECURSION (THUNK; a function that wraps the next step of the computation)...
//TAIL RECURSION IS BASICALLY MAKING THE RECURSIVE CALL THE ONLY LAST THING IN YOUR FUNCTION
//In trampoline, we convert all nested function calls into a sequential number of functional calls. We wrap the recursive function into a loop and it calls that recursive function until it no more recursive calls are left. 

//by nesting a function inside the recursion call, it is delayed and does not immediately call the recursion. 
const trampoline = (f, ...args) => {
  let result = f(...args);
  while (typeof result === "function") {
    result = result();
  }
  return result;
}
console.log("Converting it to a trampoline function...")
trampoline(recursiveFlatten, [1, [2, [3, [4]]]]);

console.groupEnd();

