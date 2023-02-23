import React from 'react';
import BbondImage from '../../../assets/img/bbond.png';
import BBondPurchaseModal from '../BBOND/BBONDPurchasseModal';
import BBondRedeemModal from '../BBOND/BBONDRedeemModal';
import useTokenBalance from '../../../hooks/useTokenBalance';
import { getDisplayBalance } from '../../../utils/formatBalance';
import useBombFinance from '../../../hooks/useBombFinance';

const Bond = () => {
  const bombFinance = useBombFinance();
  const bondBalance = useTokenBalance(bombFinance?.BBOND);

  return (
    <>
      {/* Component 4 : Bonds */}

      <div className="flex flex-col text-white text-[20px] rounded-lg">
        {/* Bbonds Component */}
        <div className="col-span-2 bg-[#23284B]  bg-opacity-75 border border-[#728CDF] pr-10 pl-6 py-4 text-base rounded-lg">
          <div className="flex">
            <img className="h-12 w-12" src={BbondImage} alt="Bomb Share" />
            <div className="mr-auto">
              <h6 className="font-bold text-2xl">Bonds</h6>
              <h6>BBOND can be purchased only on contraction periods, when TWAP of BOMB is below 1</h6>
            </div>
          </div>

          {/* 3 component flexbox */}
          <div className=" flex justify-around mt-4 ">
            {/* Currnet Price */}
            <div className="self-center">
              Current Price: (Bomb)^2
              <br />
              <h6 className="font-semibold text-2xl ">BBond = 6.2872 BTCB</h6>
            </div>

            {/** Available to Redeem */}
            <div className="self-center">
              Available to redeem:
              {/* The Image and Text */}
              <div className="flex text-4xl ">
                <img className="w-[40px] h-[40px]" src={BbondImage} alt="BBondImage" />
                <span className="font-semibold ">{getDisplayBalance(bondBalance)}</span>
              </div>
            </div>

            {/** Purchase BBond Component */}
            <div className="flex flex-col text-[16px] ">
              <div className="flex justify-between p-2">
                <div>
                  <span className="font-semibold ">Purchase BBond</span>
                  <br />
                  Bomb is over peg
                </div>

                <div className=" place-self-center mx-2">
                  <BBondPurchaseModal />
                </div>
              </div>

              <hr className="border-[#C3C5CBBF]" />

              <div className="flex justify-between p-2">
                <div>
                  <span className="font-semibold">Reedem</span>
                  <br />
                  Bomb is over peg
                </div>

                <div className=" place-self-center mx-2">
                  <BBondRedeemModal />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Bond;
