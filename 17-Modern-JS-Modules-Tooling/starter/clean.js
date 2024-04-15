const budget = [
  { value: 250, description: 'Sold old TV 📺', user: 'jonas' },
  { value: -45, description: 'Groceries 🥑', user: 'jonas' },
  { value: 3500, description: 'Monthly salary 👩‍💻', user: 'jonas' },
  { value: 300, description: 'Freelancing 👩‍💻', user: 'jonas' },
  { value: -1100, description: 'New iPhone 📱', user: 'jonas' },
  { value: -20, description: 'Candy 🍭', user: 'matilda' },
  { value: -125, description: 'Toys 🚂', user: 'matilda' },
  { value: -1800, description: 'New Laptop 💻', user: 'jonas' },
];

const spendingLimits = {
  jonas: 1500,
  matilda: 100,
};

const getLimit = (limits, user) => limits?.[user] ?? 0;

// Pure funciton :D
const addExpense = function (
  state,
  limits,
  value,
  description,
  user = 'jonas'
) {
  const cleanUser = user.toLowerCase(); 
  return value <= getLimit(limits, cleanUser) ? [...state, { value: -value, description, cleanUser }] : state;
};

const newBudget1 = addExpense(budget, spendingLimits, 10, 'Pizza 🍕');
console.log('aver newBudget1 ', newBudget1);

const newBudget2 = addExpense(newBudget1, spendingLimits, 100, 'Going to movies 🍿', 'Matilda');
console.log('aver newBudget2 ', newBudget2);

const newBudget3 = addExpense(newBudget2, spendingLimits, 200, 'Stuff', 'Jay');



const checkExpenses = function (state, limits, ) {
  return state.map(entry => {
    return entry.value < -getLimit(limits, entry.user) ? {...entry, flag: 'limit'} : entry;
  }) 
  // for (const entry of budget)
  //   if (entry.value < -getLimit(limit, entry.user)) entry.flag = 'limit';
};
const finalBudget = checkExpenses(newBudget3, spendingLimits);
console.log('aver finalBudget ', finalBudget);

const logBigExpenses = function (state, bigLimit) {
  // let output = '';
  // for (const entry of budget) {
  //   output += entry.value <= -bigLimit ? `${entry.description.slice(-2)} / ` : '';
  // }
  // output = output.slice(0, -2); // Remove last '/ '
  // console.log(output);

  const bigExpenses = state.filter(entry =>  entry.value <= -bigLimit).map(entry => entry.description.slice(-2)).join('/');
  console.log('aver bigExpenses ', bigExpenses);
};

logBigExpenses(finalBudget, 100);
