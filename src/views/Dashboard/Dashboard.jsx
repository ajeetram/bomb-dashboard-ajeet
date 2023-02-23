import React, { useMemo, useState } from 'react';
import Page from '../../components/Page';
import { createGlobalStyle } from 'styled-components';
import BombForm from './DashboardElements/BombForm';
import moment from 'moment';
import BombInfo from '../../components/BombInfo';
import useBombStats from '../../hooks/useBombStats';
import useLpStats from '../../hooks/useLpStats';
import useLpStatsBTC from '../../hooks/useLpStatsBTC';
import useModal from '../../hooks/useModal';
import useZap from '../../hooks/useZap';
import useBondStats from '../../hooks/useBondStats';
import usebShareStats from '../../hooks/usebShareStats';
import useTotalValueLocked from '../../hooks/useTotalValueLocked';
import { roundAndFormatNumber } from '../../0x';
import ZapModal from '../Bank/components/ZapModal';
import { makeStyles } from '@material-ui/core/styles';
import { Helmet } from 'react-helmet';
import BshareImage from '../../assets/img/bshares.png';
import BbondImage from '../../assets/img/bbond.png';
import DocumentImage from '../../assets/img/documentImage.png';
import DiscordLogo from '../../assets/img/discordLogo.png';
import HomeImage from '../../assets/img/background.jpg';
import BBond from './DashboardElements/Bond';
import useEarningsOnBoardroom from '../../../src/hooks/useEarningsOnBoardroom';
import { getDisplayBalance } from '../../../src/utils/formatBalance';
import useStakedBalanceOnBoardroom from '../../hooks/useStakedBalanceOnBoardroom';
import useCurrentEpoch from '../../hooks/useCurrentEpoch';
import BombImage from '../../assets/img/bomb.png';
import useTreasuryAllocationTimes from '../../hooks/useTreasuryAllocationTimes';
import useTotalStakedOnBoardroom from '../../hooks/useTotalStakedOnBoardroom';
import ProgressCountdown from '../../views/Boardroom/components/ProgressCountdown';
import BShareDeposit from './BoardRoom/BShareDepositeModal';
import BShareWithdraw from './BoardRoom/BShareWithdrawModal';
import BShareClaimReward from './BoardRoom/BShareClaimRewardModal';

const BackgroundImage = createGlobalStyle`
  body {
    background: url(${HomeImage}) repeat !important;
    background-size: cover !important;
    background-color: #171923;
  } `;
const TITLE = 'bomb.money | BTC pegged algocoin';

const useStyles = makeStyles((theme) => ({
  button: {
    [theme.breakpoints.down('415')]: {
      marginTop: '10px',
    },
  },
}));

const Dashboard = () => {
  const TVL = useTotalValueLocked();
  const bombStats = useBombStats();
  const bShareStats = usebShareStats();
  const tBondStats = useBondStats();

  //------BoardRoom Section-----//
  const earnings = useEarningsOnBoardroom();
  const stakedBalance = useStakedBalanceOnBoardroom();
  const currentEpoch = useCurrentEpoch();
  const totalStaked = useTotalStakedOnBoardroom();

  const tokenPriceInDollars = useMemo(
    () => (bombStats ? Number(bombStats.priceInDollars).toFixed(2) : null),
    [bombStats],
  );

  const earnedInDollars = (Number(tokenPriceInDollars) * Number(getDisplayBalance(earnings))).toFixed(2);
  const { to } = useTreasuryAllocationTimes();

  const buyBombAddress = //'https://app.1inch.io/#/56/swap/BTCB/BOMB';
    //  'https://pancakeswap.finance/swap?inputCurrency=0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c&outputCurrency=' +
    'https://app.bogged.finance/bsc/swap?tokenIn=0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c&tokenOut=0x522348779DCb2911539e76A1042aA922F9C47Ee3';
  //https://pancakeswap.finance/swap?outputCurrency=0x531780FAcE85306877D7e1F05d713D1B50a37F7A';

  const bombPriceInDollars = useMemo(
    () => (bombStats ? Number(bombStats.priceInDollars).toFixed(2) : null),
    [bombStats],
  );
  const bombPriceInBNB = useMemo(() => (bombStats ? Number(bombStats.tokenInFtm).toFixed(4) : null), [bombStats]);
  const bombCirculatingSupply = useMemo(() => (bombStats ? String(bombStats.circulatingSupply) : null), [bombStats]);
  const bombTotalSupply = useMemo(() => (bombStats ? String(bombStats.totalSupply) : null), [bombStats]);

  const bSharePriceInDollars = useMemo(
    () => (bShareStats ? Number(bShareStats.priceInDollars).toFixed(2) : null),
    [bShareStats],
  );
  const bSharePriceInBNB = useMemo(
    () => (bShareStats ? Number(bShareStats.tokenInFtm).toFixed(4) : null),
    [bShareStats],
  );
  const bShareCirculatingSupply = useMemo(
    () => (bShareStats ? String(bShareStats.circulatingSupply) : null),
    [bShareStats],
  );
  const bShareTotalSupply = useMemo(() => (bShareStats ? String(bShareStats.totalSupply) : null), [bShareStats]);

  const tBondPriceInDollars = useMemo(
    () => (tBondStats ? Number(tBondStats.priceInDollars).toFixed(2) : null),
    [tBondStats],
  );
  const tBondPriceInBNB = useMemo(() => (tBondStats ? Number(tBondStats.tokenInFtm).toFixed(4) : null), [tBondStats]);
  const tBondCirculatingSupply = useMemo(
    () => (tBondStats ? String(tBondStats.circulatingSupply) : null),
    [tBondStats],
  );
  const tBondTotalSupply = useMemo(() => (tBondStats ? String(tBondStats.totalSupply) : null), [tBondStats]);

  const bombLpZap = useZap({ depositTokenName: 'BOMB-BTCB-LP' });


  const [onPresentBombZap, onDissmissBombZap] = useModal(
    <ZapModal
      decimals={18}
      onConfirm={(zappingToken, tokenName, amount) => {
        if (Number(amount) <= 0 || isNaN(Number(amount))) return;
        bombLpZap.onZap(zappingToken, tokenName, amount);
        onDissmissBombZap();
      }}
      tokenName={'BOMB-BTCB-LP'}
    />,
  );

  


  return (
    <Page>
      <Helmet>
        <title>{TITLE}</title>
      </Helmet>
      {/* <BackgroundImage /> */}

      <div className="bg-[#20254380] text-center text-white font-[400] text-[22px] py-2 rounded-lg">
        Bomb Finance Summary
        <hr className="border-[#C3C5CBBF]" />
      </div>

      {/*Component 1 : Bomb Finance Summary Component */}
      <div className="grid grid-cols-2 bg-[#20254380]  rounded-lg">
        {/*cloumn 1 of the Bomb Finance Summary gird {Current Supply Total price component} */}
        <div className="flex flex-col ">
          <div className="flex text-white text-sm mt-6 mx-36 justify-between">
            <h6>Current Supply</h6>
            <h6>Total Supply</h6>
            <h6>Price</h6>
          </div>

          <hr className="border-[#C3C5CBBF]" />

          <BombInfo
            imageUrl={BombImage}
            token="BTC"
            investmentAsset="$BOMB"
            currentSupply={roundAndFormatNumber(bombCirculatingSupply, 2)}
            totalSupply={roundAndFormatNumber(bombTotalSupply, 2)}
            price={bombPriceInDollars}
            priceBTCB={bombPriceInBNB}
          />
          <hr className="border-[#C3C5CBBF]" />

          <BombInfo
            imageUrl={BshareImage}
            token="BNB"
            investmentAsset="$BSHARE"
            currentSupply={roundAndFormatNumber(bShareCirculatingSupply, 2)}
            totalSupply={bShareTotalSupply}
            price={bSharePriceInDollars}
            priceBTCB={bSharePriceInBNB}
          />
          <hr className="border-[#C3C5CBBF]" />

          <BombInfo
            imageUrl={BbondImage}
            token="BTC"
            investmentAsset="$BBOND"
            currentSupply={roundAndFormatNumber(tBondCirculatingSupply, 2)}
            totalSupply={roundAndFormatNumber(tBondTotalSupply, 2)}
            price={tBondPriceInDollars}
            priceBTCB={tBondPriceInBNB}
          />
          <hr className="border-[#C3C5CBBF]" />
        </div>

        {/*column 2 of the Bomb Finance Summary gird Current Expoch Component*/}
        <div className="justify-self-end p-3 ">
          <div className="flex flex-col items-center text-white text-lg">
            <h6>Current Epoch</h6>
            <h6 className="text-4xl">{Number(currentEpoch)}</h6>
          </div>

          <hr className="border-[#C3C5CBBF] " />

          <div className="flex flex-col items-center text-white text-lg">
            <h6 className="text-4xl">
              <ProgressCountdown base={moment().toDate()} hideBar={true} deadline={to} description="Next Epoch" />
            </h6>
            <h6>Next Epoch in</h6>
          </div>

          <hr className="border-[#C3C5CBBF]" />

          <div className="flex flex-col items-center text-gray-400 font-light  ">
            <h6>
              Live Twap : <span className="text-[#00E8A2]">1.17</span>
            </h6>
            <h6>
              TVL : <span className="text-[#00E8A2]">${TVL}</span>
            </h6>
            <h6>
              Last Epoch TWAP : <span className="text-[#00E8A2]">1.22</span>
            </h6>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 my-5 gap-6 text-white  ">
        {/* 2/3 part of the grid */}
        <div className="col-span-2 grid grid-cols-2 gap-2">
          <a className="col-span-2 place-self-end mr-4 ">Read Investment Strategy {'>'} </a>

          {/* Investment Now  Button */}
          <a
            href={buyBombAddress}
            className=" text-center bg-[#00ADE8] col-span-2 rounded-md font-extrabold text-2xl p-2"
          >
            Invest Now
          </a>

          {/*Chat on Discord tag */}
          <a
            className="mt-1 text-center p-2 justify-center items-center flex bg-[#FFFFFF] rounded-md bg-opacity-50	text-black font-semibold"
            href="http://discord.bomb.money/"
          >
            <img src={DiscordLogo} alt="documentImage" />
            <h6 className="ml-2"> Chat On Discord</h6>
          </a>

          {/*Reas Docs tag */}
          <a
            className="mt-1 text-center p-2 justify-center items-center flex bg-[#FFFFFF] rounded-md bg-opacity-50	text-black font-semibold"
            href="https://docs.bomb.money/"
          >
            <img src={DocumentImage} alt="documentImage" />
            <h6 className="ml-2"> Read Docs</h6>
          </a>

          {/* BoardRoom Component */}
          <div className="col-span-2 bg-[#23284B]  bg-opacity-75 border border-[#728CDF] pr-10 pl-6 py-2 text-base rounded-lg">
            <div className="flex">
              <img className="h-12 w-12" src={BshareImage} alt="Bomb Share" />
              <div className="mr-auto">
                <h6 className="font-bold text-2xl">BoardRoom</h6>
                <h6>Stake BSHARE and earn BOMB every epoch</h6>
              </div>
              <div className="mt-auto text-[16px]"> TVL : $1,008,430</div>
            </div>

            <hr className="border-[#C3C5CB] bg-opacity-50 my-2" />

            {/* Total Staked Class*/}
            <h6 className="flex justify-end ">
              Total Staked :{' '}
              <span>
                <img className="h-[20px] w-[20px]" src={BshareImage} />
              </span>{' '}
              {getDisplayBalance(totalStaked)}
            </h6>

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
                  {getDisplayBalance(stakedBalance)}
                </div>
                {`≈ $${tokenPriceInDollars}`}
              </div>

              {/** Earned Componnet */}
              <div className="w-24">
                Earned :{/* The Image and Text */}
                <div className="flex ">
                  <img className="w-[20px] h-[20px]" src={BombImage} alt="" />
                  {getDisplayBalance(earnings)}
                </div>
                {`≈ $${earnedInDollars}`}
              </div>

              {/* //-----Deposit-----Withdraw----Claim Rewards Functions-----// */}
              <div className="grid grid-cols-2 gap-y-2">
                <div className="col-span-1 place-self-center">
                  <BShareDeposit />
                </div>
                <div className="col-span-1 place-self-center">
                  <BShareWithdraw />
                </div>
                <div className="col-span-2 place-self-center">
                  <BShareClaimReward />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/*1/3 part of the grid */}
        <div className="bg-[#23284B] bg-opacity-75 border border-[#728CDF] font-extrabold rounded-md p-2">
          Latest News
        </div>
      </div>

      {/* ///--------BOMB-FORM------Section----// */}
      <BombForm />
      {/* ///--------BOND------Section----// */}
      <BBond />
    </Page>
  );
};

export default Dashboard;
