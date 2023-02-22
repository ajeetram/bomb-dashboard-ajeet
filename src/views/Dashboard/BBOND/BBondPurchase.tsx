import React, {useCallback, useMemo} from 'react';
import {createGlobalStyle} from 'styled-components';
import ExchangeCard from '../../Bond/components/ExchangeCard';
import styled from 'styled-components';
import useBondStats from '../../../hooks/useBondStats';
//import useBombStats from '../../hooks/useBombStats';
import useBombFinance from '../../../hooks/useBombFinance';
import useCashPriceInLastTWAP from '../../../hooks/useCashPriceInLastTWAP';
import {useTransactionAdder} from '../../../state/transactions/hooks';
import useBondsPurchasable from '../../../hooks/useBondsPurchasable';
import {getDisplayBalance} from '../../../utils/formatBalance';
import { BOND_REDEEM_PRICE, BOND_REDEEM_PRICE_BN } from '../../../bomb-finance/constants';
import { Alert } from '@material-ui/lab';


import HomeImage from '../../../assets/img/background.jpg';
import { Grid, Box } from '@material-ui/core';

const BackgroundImage = createGlobalStyle`
  body {
    background: url(${HomeImage}) repeat !important;
    background-size: cover !important;
    background-color: #171923;
  }
`;
const TITLE = 'bomb.money | Bonds'

const Bond: React.FC = () => {
  const bombFinance = useBombFinance();
  const addTransaction = useTransactionAdder();
  const bondStat = useBondStats();
  //const bombStat = useBombStats();
  const cashPrice = useCashPriceInLastTWAP();

  const bondsPurchasable = useBondsPurchasable();
  
  const handleBuyBonds = useCallback(
    async (amount: string) => {
      const tx = await bombFinance.buyBonds(amount);
      addTransaction(tx, {
        summary: `Buy ${Number(amount).toFixed(2)} BBOND with ${amount} BOMB`,
      });
    },
    [bombFinance, addTransaction],
  );

  const isBondRedeemable = useMemo(() => cashPrice.gt(BOND_REDEEM_PRICE_BN), [cashPrice]);
  const isBondPurchasable = useMemo(() => Number(bondStat?.tokenInFtm) < 1.01, [bondStat]);
  const isBondPayingPremium = useMemo(() => Number(bondStat?.tokenInFtm) >= 1.1, [bondStat]);
// console.log("bondstat", Number(bondStat?.tokenInFtm))


  return (
  
   <div>
      <BackgroundImage />
            {isBondPayingPremium === false ? (


              <Box mt={5}>
                <Grid item xs={12} sm={12} justify="center" style={{ margin: '18px', display: 'flex' }}>
                <Alert variant="filled" severity="error">
                    <b>
                      Claiming below 1.1 peg will not receive a redemption bonus, claim wisely!</b>
              </Alert>
            
              </Grid>
              </Box>
            ) : <></>}
          
            <StyledBond>
              <StyledCardWrapper>
              <ExchangeCard
                  action="Purchase"
                  fromToken={bombFinance.BOMB}
                  fromTokenName="BOMB"
                  toToken={bombFinance.BBOND}
                  toTokenName="BBOND"
                  priceDesc={
                    !isBondPurchasable
                      ? 'BOMB is over peg'
                      : getDisplayBalance(bondsPurchasable, 18, 4) + ' BBOND available for purchase'
                  }
                  onExchange={handleBuyBonds}
                  disabled={!bondStat || isBondRedeemable}
                />
              </StyledCardWrapper>
            </StyledBond>
            </div>
    
  );
};

const StyledBond = styled.div`
  display: flex;
  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: center;
  }
`;

const StyledCardWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 80%;
  }
`;

const StyledStatsWrapper = styled.div`
  display: flex;
  flex: 0.8;
  margin: 0 20px;
  flex-direction: column;

  @media (max-width: 768px) {
    width: 80%;
    margin: 16px 0;
  }
`;

export default Bond;
