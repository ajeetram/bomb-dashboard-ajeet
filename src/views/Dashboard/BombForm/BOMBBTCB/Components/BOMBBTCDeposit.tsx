import React, { useMemo, useContext } from 'react';
import styled from 'styled-components';

import { Button, Card, CardContent, Typography } from '@material-ui/core';
import CardIcon from '../../../../../components/CardIcon';
import { AddIcon } from '../../../../../components/icons';

import IconButton from '../../../../../components/IconButton';
import Label from '../../../../../components/Label';
import Value from '../../../../../components/Value';
import { ThemeContext } from 'styled-components';

import useApprove, { ApprovalState } from '../../../../../hooks/useApprove';
import useModal from '../../../../../hooks/useModal';
import useStake from '../UseComponent/useStake';
import useStakedBalance from '../../../../../hooks/useStakedBalance';
import useStakedTokenPriceInDollars from '../../../../../hooks/useStakedTokenPriceInDollars';
import useTokenBalance from '../../../../../hooks/useTokenBalance';
import { getDisplayBalance } from '../../../../../utils/formatBalance';
import DepositModal from '../../Bank/components/DepositModal';
import TokenSymbol from '../../../../../components/TokenSymbol';
import useBombFinance from '../../../../../hooks/useBombFinance';
const address = '0x1083926054069AaD75d7238E9B809b0eF9d94e5B';

//----BOMB-BTCB-LP---DATA----//
const name= 'Earn BSHARE by BOMB-BTCB LP';
const poolId= 1;
const contract= 'BombBtcbLPBShareRewardPool';
const depositTokenName= 'BOMB-BTCB-LP';
const earnTokenName= 'BSHARE';
const finished= false;

const Stake: React.FC = () => {
  const closedForStaking = false;
  const bombFinance = useBombFinance();
  const [approveStatus, approve] = useApprove(bombFinance.BBOMB_BTCB, address);
  console.log('Bank Address :', bombFinance.BBOMB_BTCB);
  const { color: themeColor } = useContext(ThemeContext);
  const tokenBalance = useTokenBalance(bombFinance.BBOMB_BTCB);
  const stakedBalance = useStakedBalance(contract, poolId);
  const stakedTokenPriceInDollars = useStakedTokenPriceInDollars(depositTokenName, bombFinance.BNB);
  const tokenPriceInDollars = useMemo(
    () => (stakedTokenPriceInDollars ? stakedTokenPriceInDollars : null),
    [stakedTokenPriceInDollars],
  );
  const earnedInDollars = (Number(tokenPriceInDollars) * Number(getDisplayBalance(stakedBalance, 18))).toFixed(2);
  const { onStake } = useStake();
  const [onPresentDeposit, onDismissDeposit] = useModal(
    <DepositModal
      max={tokenBalance}
      decimals={18}
      onConfirm={(amount) => {
        if (Number(amount) <= 0 || isNaN(Number(amount))) return;
        onStake(amount);
        onDismissDeposit();
      }}
      tokenName={depositTokenName}
    />,
  );

  return (
    <Card>
      <CardContent>
        <StyledCardContentInner>
          <CardIcon>
            <TokenSymbol symbol="BOMB-BTCB-LP" />
          </CardIcon>
          <Label text={'BOMB-BTCB-LP'} variant="yellow" />
          <StyledCardActions>
            {approveStatus !== ApprovalState.APPROVED ? (
              <Button
                disabled={
                  closedForStaking || approveStatus === ApprovalState.PENDING || approveStatus === ApprovalState.UNKNOWN
                }
                onClick={approve}
                className={
                  closedForStaking || approveStatus === ApprovalState.PENDING || approveStatus === ApprovalState.UNKNOWN
                    ? 'shinyButtonDisabled'
                    : 'shinyButton'
                }
                style={{ marginTop: '20px' }}
              >
                {`Approve ${depositTokenName}`}
              </Button>
            ) : (
              <div>
                <StyledActionSpacer />
                <StyledActionSpacer />
                <IconButton disabled={closedForStaking} onClick={() => (closedForStaking ? null : onPresentDeposit())}>
                  <AddIcon />
                </IconButton>
                <p>Click + for</p>
                <p>Deposit</p>
              </div>
            )}
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
  margin-top: 28px;
  width: 100%;
`;

const StyledActionSpacer = styled.div`
  height: ${(props) => props.theme.spacing[4]}px;
  width: ${(props) => props.theme.spacing[4]}px;
`;

const StyledCardContentInner = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
`;

export default Stake;
