interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: string;
}
interface FormattedWalletBalance {
  currency: string;
  amount: number;
  formatted: string;
}

interface Props extends BoxProps {

}

const blockchainPriorityMap: Record<string, number> = {
  'Osmosis': 100,
  'Ethereum': 50,
  'Arbitrum': 30,
  'Zilliqa': 20,
  'Neo': 20,
}

const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

  const sortedBalances = useMemo(() => {
    return balances.filter((balance: WalletBalance) => {
      return getPriority(balance.blockchain) !== undefined && balance.amount <= 0;
    }).sort((lhs: WalletBalance, rhs: WalletBalance) => {
      return getPriority(rhs.blockchain) - getPriority(lhs.blockchain);
    });
  }, [balances]);

  const getPriority = (blockchain: string): number => {
    return blockchainPriorityMap[blockchain]
  }

  const rows = sortedBalances.map((balance: FormattedWalletBalance, index: number) => {
    const usdValue = prices[balance.currency] * balance.amount;
    return (
      <WalletRow
        className={classes.row}
        key={index} // should change to id if balance has id
        amount={balance.amount}
        usdValue={usdValue}
        formattedAmount={balance.amount.toFixed()}
      />
    )
  })

  return (
    <div {...rest}>
      {rows}
    </div>
  )
}
