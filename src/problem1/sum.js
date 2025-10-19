const readline = require('readline');
const { sum_to_n_a, sum_to_n_b, sum_to_n_c } = require('./solution.js');

const colors = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  cyan: "\x1b[36m",
  magenta: "\x1b[35m"
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const methods = {
  '1': { name: 'Loop', func: sum_to_n_a },
  '2': { name: 'Reduce', func: sum_to_n_b },
  '3': { name: 'Math Formula', func: sum_to_n_c }
};

console.log(`${colors.green}Choose a summation method:${colors.reset}`);
console.log(`  ${colors.cyan}1.${colors.reset} Use a for-loop`);
console.log(`  ${colors.cyan}2.${colors.reset} Use Array.reduce()`);
console.log(`  ${colors.cyan}3.${colors.reset} Use the mathematical formula`);

const question = (query) => {
  return new Promise(resolve => rl.question(query, resolve));
};

async function main() {
  const choice = await question(`${colors.yellow}Enter your choice (1, 2, or 3): ${colors.reset}`);
  const selected = methods[choice];

  if (!selected) {
    console.log(`\n${colors.red}Invalid choice. Exiting.${colors.reset}`);
    rl.close();
    return;
  }

  const numberInput = await question(`${colors.yellow}Enter a natural number: ${colors.reset}`);
  const n = parseInt(numberInput, 10);

  if (isNaN(n) || n < 0) {
    console.log(`\n${colors.red}Invalid input. Please enter a non-negative integer.${colors.reset}`);
    rl.close();
    return;
  }

  const result = selected.func(n);

  console.log(`\n${colors.cyan}Method: ${colors.bright}${selected.name}${colors.reset}`);
  console.log(`${colors.cyan}Result: ${colors.bright}${result}${colors.reset}`);
  console.log(`\n${colors.green}--- Function Source ---${colors.reset}`);
  console.log(`${colors.magenta}${selected.func.toString()}${colors.reset}`);
  console.log(`${colors.green}-----------------------${colors.reset}`);

  rl.close();
}

main();