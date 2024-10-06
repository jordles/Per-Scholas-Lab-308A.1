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

/* -------------------------------------------------------------------------- */
/*                         PART 3: DEFERRED EXECUTION                         */
/* -------------------------------------------------------------------------- */
// Create a simple HTML element to hold text. Cache this HTML element into a JavaScript variable.
// Write a function that takes a parameter n and adds a list of all prime numbers between one and n to your HTML element.
// Once complete, use the alert() method to alert the user that the calculation is finished.

console.group("Part 3: Deferred Execution");
const element = document.createElement("p");
document.body.appendChild(element);

const isPrime = (num) => {
  if (num <= 1) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) return false;
  }
  return true;
};
// Function to display prime numbers up to n using trampoline
const displayPrimes = (n, current = 2) => {
  // If current exceeds n, show alert and stop recursion
  if (current > n) {
      return () => {
          alert('Calculation finished!');
      };
  }

  // If current is prime, display it
  if (isPrime(current)) {
      element.textContent += current + '\n'; // Add prime number to the div
  }

  // Use setTimeout to allow browser rendering and return the next function call
  return () => {
      setTimeout(() => trampoline(displayPrimes, n, current + 1), 0);
  };
};

// Start the calculation with n equal to 10,000
trampoline(displayPrimes, 10000);
console.groupEnd();
