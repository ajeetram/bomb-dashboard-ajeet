// import React from 'react'
// import BombImage from '../../../assets/img/bomb.png';
// import DashBoardButton from '../../../components/DashBoardButton';
// import BshareImage from '../../../assets/img/bshares.png';
// import BbondImage from '../../../assets/img/bbond.png';
// import DocumentImage from '../../../assets/img/documentImage.png'
// import DiscordLogo from '../../../assets/img/discordLogo.png'
// import UpArrowImage from '../../../assets/img/arrowUpCircle.png'
// import DownArrowImage from '../../../assets/img/arrowDownCircle.png'
// import BombBTCLpImage from '../../../assets/img/bomb-btc-lp-512.png'


// const component2 = () => {

//     const buyBombAddress = //'https://app.1inch.io/#/56/swap/BTCB/BOMB';
//     //  'https://pancakeswap.finance/swap?inputCurrency=0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c&outputCurrency=' +
//     'https://app.bogged.finance/bsc/swap?tokenIn=0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c&tokenOut=0x522348779DCb2911539e76A1042aA922F9C47Ee3';
//   //https://pancakeswap.finance/swap?outputCurrency=0x531780FAcE85306877D7e1F05d713D1B50a37F7A';

//     return (
//         <>
//             {/*Component 2: Read Investment Startegy component */}
//             {/* The logic is that divided the grid into two parts and and then made one part another grid */}

//             <div className='grid grid-cols-3 my-5 gap-6 text-white  '>

//                 {/* 2/3 part of the grid */}
//                 <div className='col-span-2 grid grid-cols-2 gap-2'>

//                     <a className='col-span-2 place-self-end mr-4 '>Read Investment Strategy {'>'} </a>

//                     {/* Investment Now  Button */}
//                     <a href={buyBombAddress} className=' text-center bg-[#00ADE8] col-span-2 rounded-md font-extrabold text-2xl p-2'>Invest Now</a>

//                     {/*Chat on Discord tag */}
//                     <a className='mt-1 text-center p-2 justify-center items-center flex bg-[#FFFFFF] rounded-md bg-opacity-50	text-black font-semibold' href="https://docs.bomb.money/">
//                         <img src={DiscordLogo} alt="documentImage" />
//                         <h6 className='ml-2'> Chat On Discord</h6>
//                     </a>

//                     {/*Reas Docs tag */}
//                     <a className='mt-1 text-center p-2 justify-center items-center flex bg-[#FFFFFF] rounded-md bg-opacity-50	text-black font-semibold' href="https://docs.bomb.money/">
//                         <img src={DocumentImage} alt="documentImage" />
//                         <h6 className='ml-2'> Read Docs</h6>
//                     </a>

//                     {/* BoardRoom Component */}
//                     <div className='col-span-2 bg-[#23284B]  bg-opacity-75 border border-[#728CDF] pr-10 pl-6 py-2 text-base'>

//                         <div className='flex'>
//                             <img className='h-12 w-12' src={BshareImage} alt="Bomb Share" />
//                             <div className='mr-auto'>
//                                 <h6 className='font-bold text-2xl'>BoardRoom</h6>
//                                 <h6>Stake BSHARE and earn BOMB every epoch</h6>
//                             </div>
//                             <div className='mt-auto text-[16px]'> TVL : $1,008,430</div>

//                         </div>


//                         <hr className='border-[#C3C5CB] bg-opacity-50 my-2' />

//                         {/* Total Staked Class*/}
//                         <h6 className='flex justify-end '>Total Staked : <span><img className='h-[20px] w-[20px]' src={BshareImage} /></span> 7232</h6>

//                         {/* 4 component flexbox */}
//                         <div className=' flex justify-between mt-4 '>

//                             <div>
//                                 Daily Returns:
//                                 <br />
//                                 <h6 className='font-semibold text-2xl'>2%</h6>
//                             </div>

//                             {/** Your Stake Componnet */}
//                             <div className='w-24'>
//                                 Your Stake :
//                                 {/* The Image and Text */}
//                                 <div className='flex '>
//                                     <img className='w-[20px] h-[20px]' src={BshareImage} alt="" />
//                                     6.0000
//                                 </div>
//                                 ≈ $1171.62
//                             </div>

//                             {/** Earned Componnet */}
//                             <div className='w-24'>
//                                 Earned :
//                                 {/* The Image and Text */}
//                                 <div className='flex '>
//                                     <img className='w-[20px] h-[20px]' src={BombImage} alt="" />
//                                     6.4413
//                                 </div>
//                                 ≈ $298.88
//                             </div>

//                             <div className='grid grid-cols-2 gap-y-2'>
//                                 <div className='col-span-1 place-self-center'><DashBoardButton text="Deposit" imageUrl={UpArrowImage} /></div>
//                                 <div className='col-span-1 place-self-center'><DashBoardButton text="Withdraw" imageUrl={DownArrowImage} /></div>
//                                 <div className='col-span-2 place-self-center'><DashBoardButton text="Claim Rewards" imageUrl={BombImage} /></div>
//                             </div>

//                         </div>

//                     </div>

//                 </div>

//                 {/*1/3 part of the grid */}
//                 <div className='bg-[#23284B] bg-opacity-75 border border-[#728CDF] font-extrabold rounded-md p-2'>
//                     Latest News
//                 </div>

//             </div>

//         </>
//     )
// }

// export default component2