# Basic test cases

## Core logic
**1. Correct amount calculation:**  
Enter `1000 USD` → “You receive” auto-updates to correct `ETH` amount based on rate.

**2. Recalculate after token change:**  
Change send/receive tokens → receive amount recalculates correctly each time.

**3. Reverse button function:**  
Click swap icon → send/receive tokens and values are swapped properly.

**4. Input validation:**  
Typing letters/symbols in “You send” → ignored (only digits + one decimal allowed).

## Execution & balance
**1. Successful swap:**  
With enough balance → click “Swap” → shows “Processing…”, then “Swap Successful”, resets after a few seconds.

**2. Insufficient balance:**  
Enter amount > balance → button turns red, text “Insufficient Balance”, no transaction.

**3. Empty input:**  
No amount entered → swap button disabled, shows “Enter an amount”.