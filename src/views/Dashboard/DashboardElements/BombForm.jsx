import React,{useMemo} from 'react';
import BombImage from '../../../assets/img/bomb.png';
import DashBoardButton from '../../../components/DashBoardButton';
import BshareImage from '../../../assets/img/bshares.png';
import BombBTCLpImage from '../../../assets/img/bomb-btc-lp-512.png';
import BshareBNBImage from '../../../assets/img/bshare-bnb-LP.png';
import Deposit from '../BombForm/BOMBBTCB/DepositModal';
import Withdraw from '../BombForm/BOMBBTCB/WithdrawModal';
import ClaimReward from '../BombForm/BOMBBTCB/ClaimRewardModal';
import {getDisplayBalance} from '../../../utils/formatBalance';
import useStakedBalance from '../../../hooks/useStakedBalance'
import useStakedTokenPriceInDollars from '../../../hooks/useStakedTokenPriceInDollars'
import BNBBSHAREClaimReward from '../BombForm/BSHARE_BNB/ClaimRewardModal';
import BNBBSHAREDeposit from '../BombForm/BSHARE_BNB/DepositModal';
import BNBBSHAREWithdraw from '../BombForm/BSHARE_BNB/WithdrawModal';
import useBombFinance from '../../../hooks/useBombFinance';
import useBombStats from '../../../hooks/useBombStats';
import useShareStats from '../../../hooks/usebShareStats';
import useEarnings from '../../../hooks/useEarnings';
//----BSHARE-BNB---DATA----//
const BNBBSHAREPoolId = 0;
const BNBBSHAREContract = 'BshareBnbLPBShareRewardPool';
const BNBBSHAREearnTokenName = 'BSHARE';
const BNBBSHAREDepositTokenName = 'BOMB-BNB-LP';
//----BOMB-BTCB---DATA----//
const BOMBBTCBPoolId = 1;
const BOMBBTCBContract = 'BombBtcbLPBShareRewardPool';
const BOMBBTCBearnTokenName = 'BSHARE';
const BOMBBTCBDepositTokenName = 'BOMB-BTCB-LP';

const Component3 = () => {
  const bombFinance = useBombFinance();
  
  const BOMBBTCBstakedBalance = useStakedBalance(BOMBBTCBContract, BOMBBTCBPoolId);
  const BOMBBTCBstakedTokenPriceInDollars = useStakedTokenPriceInDollars(BOMBBTCBDepositTokenName, bombFinance?.BBOMB_BTCB);
  const BOMBBTCBStaketokenPriceInDollars = useMemo(
    () => (BOMBBTCBstakedTokenPriceInDollars ? BOMBBTCBstakedTokenPriceInDollars : null),
    [BOMBBTCBstakedTokenPriceInDollars],
  );

  const bombStats = useBombStats();
  const tShareStats = useShareStats();
  const tokenName = BNBBSHAREearnTokenName === 'BSHARE' ? 'BSHARE' : 'BOMB';
  const tokenStats = BNBBSHAREearnTokenName === 'BSHARE' ? tShareStats : bombStats;
  const BOMBBTCBtokenPriceInDollars = useMemo(
    () => (tokenStats ? Number(tokenStats.priceInDollars).toFixed(2) : null),
    [tokenStats],
  );
  const BOMBBTCBearnings = useEarnings(BOMBBTCBContract, BOMBBTCBearnTokenName, BOMBBTCBPoolId);
  const BOMBBTCBearnedInDollars = (Number(BOMBBTCBtokenPriceInDollars) * Number(getDisplayBalance(BOMBBTCBearnings))).toFixed(2);

  const BNBBSHAREstakedBalance = useStakedBalance(BNBBSHAREContract, BNBBSHAREPoolId);
  const BNBBSHAREstakedTokenPriceInDollars = useStakedTokenPriceInDollars(BNBBSHAREDepositTokenName, bombFinance?.BNB);
  const BNBBSHAREStaketokenPriceInDollars = useMemo(
    () => (BNBBSHAREstakedTokenPriceInDollars ? BNBBSHAREstakedTokenPriceInDollars : null),
    [BNBBSHAREstakedTokenPriceInDollars],
  );
  
  const BNBBSHAREtokenPriceInDollars = useMemo(
    () => (tokenStats ? Number(tokenStats.priceInDollars).toFixed(2) : null),
    [tokenStats],
  );
  const BNBBSHAREearnings = useEarnings(BNBBSHAREContract, BNBBSHAREearnTokenName, BNBBSHAREPoolId);
  const BNBBSHAREearnedInDollars = (Number(BNBBSHAREtokenPriceInDollars) * Number(getDisplayBalance(BNBBSHAREearnings))).toFixed(2);
  return (
    <div className="flex flex-col text-white text-[18px] bg-[#23284B] rounded-lg bg-opacity-75 border border-[#728CDF] my-4">
      <div className="flex justify-between text-[20px] p-4">
        <div>
          <span className="font-bold text-[#00E8A2]">Bomb Farms</span>
          <br />
          Stake your LP tokens in our farms to start earning $BSHARE
        </div>
        <div>
          <div className="col-span-2 place-self-center">
            <DashBoardButton text="Claim All" imageUrl={BshareImage} />
          </div>
        </div>
      </div>

      {/* BombBTCB Component */}
      <div className="col-span-2  pr-10 pl-6 py-2 text-base">
        <div className="flex">
          <img className="h-6 w-6" src={BombBTCLpImage} alt="Bomb Share" />
          <div className="mr-auto">
            <h6 className="font-bold text-2xl">BOMB-BTCB</h6>
          </div>
          <div className="mt-auto text-[16px]"> TVL : $1,008,430</div>
        </div>

        <hr className="border-[#C3C5CB] bg-opacity-50 my-2" />

        {/* 4 component flexbox */}
        <div className=" flex justify-between mt-4 ">
          <div>
            Daily Returns:
            <br />
            <h6 className="font-semibold text-2xl">2%</h6>
          </div>

          {/** Your Stake Componnet */}
          <div className="w-24">
            Your Stake :{/* The Image and Text */}
            <div className="flex ">
              <img className="w-[20px] h-[20px]" src={BshareImage} alt="" />
              {
                getDisplayBalance(BOMBBTCBstakedBalance, 18)
              }
            </div>
            {`≈ $${BOMBBTCBStaketokenPriceInDollars}`}
          </div>

          {/** Earned Componnet */}
          <div className="w-24">
            Earned :{/* The Image and Text */}
            <div className="flex ">
              <img className="w-[20px] h-[20px]" src={BombImage} alt="" />
              {getDisplayBalance(BOMBBTCBearnings)}
            </div>
            {`≈ $${BOMBBTCBearnedInDollars}`} 
          </div>

          <div className="flex justify-between ">
            <div className=" place-self-center mx-2">
              <Deposit />
            </div>
            <div className=" place-self-center mx-2">
              <Withdraw />
            </div>
            <div className=" place-self-center mx-2">
              <ClaimReward />
            </div>
          </div>
        </div>
      </div>

      {/* Blue Horizontal Line for separtion */}
      <hr className="border-[#00ADE8] " />

      {/* BombBTCB Component */}
      <div className="col-span-2 pr-10 pl-6 py-2 text-base mt-4">
        <div className="flex">
          <img className="h-6 w-6" src={BshareBNBImage} alt="Bomb Share" />
          <div className="mr-auto">
            <h6 className="font-bold text-2xl">Bshare-BNB</h6>
          </div>
          <div className="mt-auto text-[16px]"> TVL : $1,008,430</div>
        </div>

        <hr className="border-[#C3C5CB] bg-opacity-50 my-2" />

        {/* 4 component flexbox */}
        <div className=" flex justify-between mt-4 ">
          <div>
            Daily Returns:
            <br />
            <h6 className="font-semibold text-2xl">2%</h6>
          </div>

          {/** Your Stake Component */}
          <div className="w-24">
            Your Stake :{/* The Image and Text */}
            <div className="flex ">
              <img className="w-[20px] h-[20px]" src={BshareImage} alt="" />
              {getDisplayBalance(BNBBSHAREstakedBalance, 18)}
            </div>
            {`≈ $${BNBBSHAREStaketokenPriceInDollars}`}
          </div>

          {/** Earned Component */}
          <div className="w-24">
            Earned :{/* The Image and Text */}
            <div className="flex ">
              <img className="w-[20px] h-[20px]" src={BshareImage} alt="" />
              {getDisplayBalance(BNBBSHAREearnings)}
            </div>
            {`≈ $${BNBBSHAREearnedInDollars}`} 
          </div>

          <div className="flex justify-between ">
            <div className=" place-self-center mx-2">
              <BNBBSHAREDeposit />
            </div>
            <div className=" place-self-center mx-2">
              <BNBBSHAREWithdraw />
            </div>
            <div className=" place-self-center mx-2">
              <BNBBSHAREClaimReward />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Component3;
