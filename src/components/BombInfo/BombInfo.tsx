import React from 'react';
import MetamaskFox from '../../assets/img/metamask-fox.svg';
import TokenSymbol from '../TokenSymbol';


interface BombInfo {
  imageUrl?: string;
  symbols?: string;
  token?:string;
  investmentAsset: string;
  currentSupply: number;
  totalSupply: number;
  price: number;
  priceBTCB:number
}

const BombInfo: React.FC<BombInfo> = ({imageUrl, token, investmentAsset, currentSupply, totalSupply, price,priceBTCB }) => {
  
    
    return (
    <>
      <div className="flex justify-around text-white p-2">
        <div className='flex'>
        <div className='flex bg-[#363746] h-6 w-6 rounded-full justify-center items-center'><img src={imageUrl} alt="Bomb.money" style={{ maxHeight: '20px' }} /></div> {/*<img src={imageUrl} alt="Bomb.money" style={{ maxHeight: '20px' }} />*/}
        <h6>{investmentAsset}</h6>
        </div>
        <h6>{currentSupply}</h6>
        <h6 className='text-center'>{totalSupply}</h6>
        <div className='flex flex-col items-center'>
            <h6>${price}</h6>
            <h6>{priceBTCB }{token}</h6>
        </div>
        <img src={MetamaskFox} alt="" />
      </div>
    </>
  );
};

export default BombInfo;