const { resolve } = require("path");

let creditLimit = 5000;

/***
 *
 * Input: amount which is the money to loan out
 * Return: promise of the loan which may or may not be fulfilled
 *
*/

const loanOut = function(amount) {
  return new Promise((resolve, reject) => {
    if (creditLimit > 0) {
      creditLimit -= amount;
      resolve(amount);
      return;
    }
    if ((creditLimit > 0) && creditLimit < amount) {
      amount = creditLimit;
      creditLimit = 0;
      resolve(amount);
    }
    reject('Insufficient fund!');

  });
     
};


console.log("Asking for $150, which should be okay ...");
loanOut(150)
  .then((amountReceived) => {
    console.log(`\t-> I got $${amountReceived} loan from the bank! Remaining Credit Limit: $${creditLimit}`);
  })
  .catch((err) => {
    console.log(`\t-> Error: ${err}!`);
  });