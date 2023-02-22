import React, { useMemo, useContext } from 'react';
import styled from 'styled-components';

import { Button, Card, CardContent, Typography } from '@material-ui/core';
import CardIcon from '../../../../../components/CardIcon';
import { RemoveIcon } from '../../../../../components/icons';
import IconButton from '../../../../../components/IconButton';
import Value from '../../../../../components/Value';
import { ThemeContext } from 'styled-components';

import useApprove, { ApprovalState } from '../../../../../hooks/useApprove';
import useModal from '../../../../../hooks/useModal';
import useStakedBalance from '../../../../../hooks/useStakedBalance';
import useStakedTokenPriceInDollars from '../../../../../hooks/useStakedTokenPriceInDollars';
import useTokenBalance from '../../../../../hooks/useTokenBalance';
import useWithdraw from '../UseComponent/useWithdraw';
import bombFinance from '../../../../../bomb-finance';
import DepositModal from '../../Bank/components/DepositModal';
import WithdrawModal from '../../Bank/components/WithdrawModal';
import TokenSymbol from '../../../../../components/TokenSymbol';
import useBombFinance from '../../../../../hooks/useBombFinance';
import Label from '../../../../../components/Label';


//----BOMB-BTCB-LP---DATA----//
const address = '0x1083926054069AaD75d7238E9B809b0eF9d94e5B';
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
  const stakedBalance = useStakedBalance(contract, poolId);
  const { onWithdraw } = useWithdraw();

  const [onPresentWithdraw, onDismissWithdraw] = useModal(
    <WithdrawModal
      max={stakedBalance}
      decimals={18}
      onConfirm={(amount) => {
        if (Number(amount) <= 0 || isNaN(Number(amount))) return;
        onWithdraw(amount);
        onDismissWithdraw();
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
                <IconButton onClick={onPresentWithdraw}>
                  <RemoveIcon />
                </IconButton>
                <p>Click - for</p>
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
