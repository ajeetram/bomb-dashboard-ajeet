import {useCallback} from 'react';
import useBombFinance from '../../../../../hooks/useBombFinance';
import useHandleTransactionReceipt from '../../../../../hooks/useHandleTransactionReceipt';


const poolId= 0;  
const contract= 'BshareBnbLPBShareRewardPool';
const earnTokenName='BSHARE';

const useHarvest = () => {
  const bombFinance = useBombFinance();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleReward = useCallback(() => {
    handleTransactionReceipt(
      bombFinance.harvest(contract, poolId),
      `Claim ${earnTokenName} from ${contract}`,
    );
  }, [bombFinance, handleTransactionReceipt]);

  return {onReward: handleReward};
};

export default useHarvest;
