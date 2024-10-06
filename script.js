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
