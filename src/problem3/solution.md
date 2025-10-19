Here is a simple review of the problems in the old code.

### Problem 1: Slow and Buggy Sorting Code

**Old Code:**

```typescript
const sortedBalances = useMemo(() => {
  return balances.filter((balance: WalletBalance) => {
	  const balancePriority = getPriority(balance.blockchain);
	  if (lhsPriority > -99) { // Bug: lhsPriority is not defined
	     if (balance.amount <= 0) {
	       return true;
	     }
	  }
	  return false
	}).sort((lhs: WalletBalance, rhs: WalletBalance) => {
		const leftPriority = getPriority(lhs.blockchain);
	  const rightPriority = getPriority(rhs.blockchain);
	  if (leftPriority > rightPriority) {
	    return -1;
	  } else if (rightPriority > leftPriority) {
	    return 1;
	  }
  });
}, [balances, prices]);
```

**What was wrong:**

* **Bug:** The code uses a variable `lhsPriority` that does not exist. This will crash the app.
* **Wrong Logic:** The code keeps balances with an amount of 0 or less. This is strange. We usually want to show balances that have money.
* **Slow Code:** The `getPriority` function is called many times for the same thing. This makes the code slow.
* **Another Slow Problem:** The code re-runs when `prices` change, but it doesn't use `prices` at all. This is a waste.

**New Code (Better):**

```typescript
const sortedBalances = useMemo(() => {
  return balances
    .filter(balance => {
      const priority = getPriority(balance.blockchain);
      // Keep balances with priority and positive amount
      return priority > -99 && balance.amount > 0;
    })
    .sort((lhs, rhs) => {
      const leftPriority = getPriority(lhs.blockchain);
      const rightPriority = getPriority(rhs.blockchain);
      // Sort with highest priority first
      return rightPriority - leftPriority;
    });
}, [balances]);
```

### Problem 2: Extra Work and Unused Variable

**Old Code:**

```typescript
const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
  return {
    ...balance,
    formatted: balance.amount.toFixed()
  }
})

const rows = sortedBalances.map((balance: FormattedWalletBalance, index: number) => {
  // ...
})
```

**What was wrong:**
The code creates a list called `formattedBalances` but never uses it. Then it loops over `sortedBalances` a second time to create `rows`. This is extra work for nothing.

**New Code (Better):**
Just loop one time to create `rows`. Do all the work inside this one loop.

```typescript
const rows = sortedBalances.map(balance => {
  const price = prices[balance.currency] || 0;
  const usdValue = price * balance.amount;

  return (
    <WalletRow
      className={classes.row}
      key={balance.currency}
      amount={balance.amount}
      usdValue={usdValue}
      formattedAmount={balance.amount.toFixed()}
    />
  );
});
```

### Problem 3: Using List Index for `key`

**Old Code:**

```typescript
const rows = sortedBalances.map((balance: FormattedWalletBalance, index: number) => {
  return (
    <WalletRow 
      className={classes.row}
      key={index} // This is not good
      //...
    />
  )
})
```

**What was wrong:**
Using the list `index` for the `key` is bad in React. When the list order changes, React gets confused and can show the wrong thing on the screen. A `key` should be a unique ID that does not change, like `balance.currency`.

**New Code (Better):**

```typescript
return (
  <WalletRow
    className={classes.row}
    key={balance.currency} // Good: Use a unique ID
    amount={balance.amount}
    usdValue={usdValue}
    formattedAmount={balance.amount.toFixed()}
  />
);
```

### Problem 4: Wrong and Unsafe Types

**Old Code:**

```typescript
interface WalletBalance {
  currency: string;
  amount: number;
}
// 'blockchain' is missing.

const getPriority = (blockchain: any): number => {
  // ...
}
// 'any' is not safe.

interface Props extends BoxProps {}
// 'BoxProps' was not safe.
```

**What was wrong:**

* The type for `WalletBalance` was missing the `blockchain` property.
* The `getPriority` function used `any`, which is not safe and can hide bugs.
* The `Props` type was not safe because it allowed any property.

**New Code (Better):**
Make all types clear and safe. This helps find bugs early.

```typescript
// Define what a 'Blockchain' can be.
type Blockchain = 'Osmosis' | 'Ethereum' | 'Arbitrum' | 'Zilliqa' | 'Neo' | 'Other';

// Add the missing 'blockchain' property.
interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: Blockchain;
}

// Use the safe 'Blockchain' type.
const getPriority = (blockchain: Blockchain): number => {
  // ...
};

// Use safe types from React.
interface Props extends React.HTMLAttributes<HTMLDivElement> {}
```