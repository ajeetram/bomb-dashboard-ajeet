import React, { useMemo } from 'react';
import styled from 'styled-components';

import { Button, Card, CardContent, Typography } from '@material-ui/core';
// import Button from '../../../components/Button';
// import Card from '../../../components/Card';
// import CardContent from '../../../components/CardContent';
import CardIcon from '../../../../../components/CardIcon';
import Value from '../../../../../components/Value';
import useEarnings from '../../../../../hooks/useEarnings';
import useHarvest from '../UseComponent/useHarvest';

import { getDisplayBalance } from '../../../../../utils/formatBalance';
import TokenSymbol from '../../../../../components/TokenSymbol';
import useBombStats from '../../../../../hooks/useBombStats';
import useShareStats from '../../../../../hooks/usebShareStats';

//----BOMB-BTCB-LP---DATA----//

const name= 'Earn BSHARE by BOMB-BTCB LP';
const poolId= 1;
const contract= 'BombBtcbLPBShareRewardPool';
const earnTokenName= 'BSHARE';


const Harvest: React.FC = () => {
  const earnings = useEarnings(contract, earnTokenName, poolId);
  const { onReward } = useHarvest();
  const bombStats = useBombStats();
  const tShareStats = useShareStats();

  const tokenName = earnTokenName === 'BSHARE' ? 'BSHARE' : 'BOMB';
  const tokenStats = earnTokenName === 'BSHARE' ? tShareStats : bombStats;
  const tokenPriceInDollars = useMemo(
    () => (tokenStats ? Number(tokenStats.priceInDollars).toFixed(2) : null),
    [tokenStats],
  );
  const earnedInDollars = (Number(tokenPriceInDollars) * Number(getDisplayBalance(earnings))).toFixed(2);
  return (
    <Card>
      <CardContent>
        <StyledCardContentInner>
          <StyledCardHeader>
            <CardIcon>
              <TokenSymbol symbol="BSHARE" />
            </CardIcon>
            <Value value={getDisplayBalance(earnings)} />
            <Typography style={{ textTransform: 'uppercase', color: '#fffff' }}>{`≈ $${earnedInDollars}`}</Typography>
            {/* <Label text={`≈ $${earnedInDollars}`} /> */}
            <Typography style={{ textTransform: 'uppercase', color: '#f9d749' }}>{`${tokenName} Earned`}</Typography>
            {/* <Label text={`${tokenName} Earned`} /> */}
          </StyledCardHeader>
          <StyledCardActions>
            <Button
              onClick={onReward}
              disabled={earnings.eq(0)}
              className={earnings.eq(0) ? 'shinyButtonDisabled' : 'shinyButton'}
            >
              Claim
            </Button>
          </StyledCardActions>
        </StyledCardContentInner>
      </CardContent>
    </Card>
  );
};

const StyledCardHeader = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`;
const StyledCardActions = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${(props) => props.theme.spacing[6]}px;
  width: 100%;
`;

const StyledCardContentInner = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
`;

export default Harvest;
