import {useCallback} from 'react';
import useBombFinance from '../../../../../hooks/useBombFinance';
import useHandleTransactionReceipt from '../../../../../hooks/useHandleTransactionReceipt';
import {parseUnits} from 'ethers/lib/utils';

const poolId= 0;  
const contract= 'BshareBnbLPBShareRewardPool';
const depositTokenName = 'BOMB-BNB-LP';

const useStake = () => {
  const bombFinance = useBombFinance();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleStake = useCallback(
    (amount: string) => {
      const amountBn = parseUnits(amount, 18);
      handleTransactionReceipt(
        bombFinance.stake(contract, poolId, amountBn),
        `Stake ${amount} ${depositTokenName} to ${contract}`,
      );
    },
    [bombFinance, handleTransactionReceipt],
  );
  return {onStake: handleStake};
};

export default useStake;
