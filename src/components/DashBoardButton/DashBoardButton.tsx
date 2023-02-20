import React from 'react';
import MetamaskFox from '../../assets/img/metamask-fox.svg';
import TokenSymbol from '../TokenSymbol';

interface DashboardButtonInfo {
  imageUrl?: string;
  text?: string;
}

const DashBoardButton: React.FC<DashboardButtonInfo> = ({ imageUrl, text }) => {
  return (
    <>
      <button className="flex p-1 text-4 border-white border rounded-3xl">
        <div className="mr-6 ml-1"> {text}</div>
        <img className='h-[20px] w-[20px]' src={imageUrl} alt="Uparrow" />
      </button>
    </>
  );
};

export default DashBoardButton;