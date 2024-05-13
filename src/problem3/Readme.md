List out the computational inefficiencies and anti-patterns found in the code block:

1. Switch case will loop to find the exact case matching with the input and also make function do more than one thing. Use a map object and get priority from it to improve performance. 
2. With number -99, it is a magic number. So that, -99 is unmeaningful number. I removed it and check priority with `undefined`.
3. In sortedBalances, the deep conditional in filter is unnecessary. So I combine the conditions into one condition and return it. In here I see `balance.amount <= 0`, is it a bug?
4. In sort function of sortedBalances, it sorts items in array with descending priority order. It simple change the return value to `rightPriority - leftPriority`.
5. Remove prices in dependencies of useMemo because the callback function does not use prices.
6. formattedBalances is unused, so I remove it. The formatted property will be calculate when render list of WalletRow.
7. Remember declare full fields of `WalletBalance`. It misses `blockchain`.
