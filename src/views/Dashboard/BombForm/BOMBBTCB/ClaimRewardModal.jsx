import React, { useState } from 'react';
import Bshare from '../../../../assets/img/bshares.png';
import BOMBBTCBClaimReward from './Components/BOMBBTCBClaimReward';

const Modal = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <button className="flex p-1 text-4 border-white border rounded-3xl" onClick={() => setShowModal(true)}>
        <div className="mr-6 ml-1"> Claim</div>
        <img className="h-[20px] w-[20px]" src={Bshare} alt="Uparrow" />
      </button>
      {showModal ? (
        <>
          <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-100 outline-none focus:outline-none">
            <div className="relative w-auto my-4 mx-auto max-w-3xl">
              <div className="border-0 rounded-md shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <BOMBBTCBClaimReward />
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-10  text-sm outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default Modal;
