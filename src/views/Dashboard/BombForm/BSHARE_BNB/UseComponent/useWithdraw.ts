import {useCallback} from 'react';
import useBombFinance from '../../../../../hooks/useBombFinance';
import useHandleTransactionReceipt from '../../../../../hooks/useHandleTransactionReceipt';
import {parseUnits} from 'ethers/lib/utils';

const poolId= 0;  
const contract= 'BshareBnbLPBShareRewardPool';
const depositTokenName = 'BOMB-BNB-LP';

const useWithdraw = () => {
  const bombFinance = useBombFinance();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleWithdraw = useCallback(
    (amount: string) => {
      const amountBn = parseUnits(amount, 18);
      handleTransactionReceipt(
        bombFinance.unstake(contract, poolId, amountBn),
        `Withdraw ${amount} ${depositTokenName} from ${contract}`,
      );
    },
    [bombFinance, handleTransactionReceipt],
  );
  return {onWithdraw: handleWithdraw};
};

export default useWithdraw;
