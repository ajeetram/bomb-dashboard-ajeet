import React from 'react'
import BombImage from '../../../assets/img/bomb.png';
import DashBoardButton from '../../../components/DashBoardButton';
import BshareImage from '../../../assets/img/bshares.png';
import UpArrowImage from '../../../assets/img/arrowUpCircle.png'
import DownArrowImage from '../../../assets/img/arrowDownCircle.png'
import BombBTCLpImage from '../../../assets/img/bomb-btc-lp-512.png'
import BshareBNBImage from '../../../assets/img/bshare-bnb-LP.png'

const Component3 = () => {
  return (
       
       <div className='flex flex-col text-white text-[18px] bg-[#23284B] rounded-lg bg-opacity-75 border border-[#728CDF] my-4'>

       <div className='flex justify-between text-[20px] p-4'>
         <div>
           <span className='font-bold text-[#00E8A2]'>Bomb Farms</span>
           <br />
           Stake your LP tokens in our farms to start earning $BSHARE
         </div>
         <div>
           <div className='col-span-2 place-self-center'><DashBoardButton text="Claim All" imageUrl={BshareImage} /></div>
         </div>
       </div>


       {/* BombBTCB Component */}
       <div className='col-span-2  pr-10 pl-6 py-2 text-base'>

         <div className='flex'>
           <img className='h-6 w-6' src={BombBTCLpImage} alt="Bomb Share" />
           <div className='mr-auto'>
             <h6 className='font-bold text-2xl'>BOMB-BTCB</h6>
           </div>
           <div className='mt-auto text-[16px]'> TVL : $1,008,430</div>

         </div>


         <hr className='border-[#C3C5CB] bg-opacity-50 my-2' />


         {/* 4 component flexbox */}
         <div className=' flex justify-between mt-4 '>

           <div>
             Daily Returns:
             <br />
             <h6 className='font-semibold text-2xl'>2%</h6>
           </div>

           {/** Your Stake Componnet */}
           <div className='w-24'>
             Your Stake :
             {/* The Image and Text */}
             <div className='flex '>
               <img className='w-[20px] h-[20px]' src={BshareImage} alt="" />
               124.21
             </div>
             ≈ $1171.62
           </div>

           {/** Earned Componnet */}
           <div className='w-24'>
             Earned :
             {/* The Image and Text */}
             <div className='flex '>
               <img className='w-[20px] h-[20px]' src={BombImage} alt="" />
               6.4413
             </div>
             ≈ $298.88
           </div>

           <div className='flex justify-between '>
             <div className=' place-self-center mx-2'><DashBoardButton text="Deposit" imageUrl={UpArrowImage} /></div>
             <div className=' place-self-center mx-2'><DashBoardButton text="Withdraw" imageUrl={DownArrowImage} /></div>
             <div className=' place-self-center mx-2'><DashBoardButton text="Claim Rewards" imageUrl={BombImage} /></div>
           </div>

         </div>


       </div>

       {/* Blue Horizontal Line for separtion */}
       <hr className='border-[#00ADE8] ' />


       {/* BombBTCB Component */}
       <div className='col-span-2 pr-10 pl-6 py-2 text-base mt-4'>

         <div className='flex'>
           <img className='h-6 w-6' src={BshareBNBImage} alt="Bomb Share" />
           <div className='mr-auto'>
             <h6 className='font-bold text-2xl'>Bshare-BNB</h6>
           </div>
           <div className='mt-auto text-[16px]'> TVL : $1,008,430</div>

         </div>


         <hr className='border-[#C3C5CB] bg-opacity-50 my-2' />


         {/* 4 component flexbox */}
         <div className=' flex justify-between mt-4 '>

           <div>
             Daily Returns:
             <br />
             <h6 className='font-semibold text-2xl'>2%</h6>
           </div>

           {/** Your Stake Component */}
           <div className='w-24'>
             Your Stake :
             {/* The Image and Text */}
             <div className='flex '>
               <img className='w-[20px] h-[20px]' src={BshareImage} alt="" />
               124.21
             </div>
             ≈ $1171.62
           </div>

           {/** Earned Component */}
           <div className='w-24'>
             Earned :
             {/* The Image and Text */}
             <div className='flex '>
               <img className='w-[20px] h-[20px]' src={BshareImage} alt="" />
               6.4413
             </div>
             ≈ $298.88
           </div>

           <div className='flex justify-between '>
             <div className=' place-self-center mx-2'><DashBoardButton text="Deposit" imageUrl={UpArrowImage} /></div>
             <div className=' place-self-center mx-2'><DashBoardButton text="Withdraw" imageUrl={DownArrowImage} /></div>
             <div className=' place-self-center mx-2'><DashBoardButton text="Claim Rewards" imageUrl={BshareImage} /></div>
           </div>

         </div>
       </div>
     </div>

  )
}

export default Component3