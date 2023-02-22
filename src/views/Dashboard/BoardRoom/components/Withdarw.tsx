import React, {useMemo} from 'react';
import styled from 'styled-components';

import {Box, Button, Card, CardContent, Typography} from '@material-ui/core';
import CardIcon from '../../../../components/CardIcon';
import {RemoveIcon} from '../../../../components/icons';
import IconButton from '../../../../components/IconButton';
import Label from '../../../../components/Label';
import Value from '../../../../components/Value';

import useApprove, {ApprovalState} from '../../../../hooks/useApprove';
import useModal from '../../../../hooks/useModal';
import useWithdrawCheck from '../../../../hooks/boardroom/useWithdrawCheck';
import WithdrawModal from './WithdrawModal';
import useBombFinance from '../../../../hooks/useBombFinance';
import ProgressCountdown from './ProgressCountdown';
import useStakedBalanceOnBoardroom from '../../../../hooks/useStakedBalanceOnBoardroom';
import useUnstakeTimerBoardroom from '../../../../hooks/boardroom/useUnstakeTimerBoardroom';
import TokenSymbol from '../../../../components/TokenSymbol';
import useStakeToBoardroom from '../../../../hooks/useStakeToBoardroom';
import useWithdrawFromBoardroom from '../../../../hooks/useWithdrawFromBoardroom';

const Withdraw: React.FC = () => {
  const bombFinance = useBombFinance();
  const [approveStatus, approve] = useApprove(bombFinance.BSHARE, bombFinance.contracts.Boardroom.address);
  const stakedBalance = useStakedBalanceOnBoardroom();
  const {from, to} = useUnstakeTimerBoardroom();

  const {onStake} = useStakeToBoardroom();
  const {onWithdraw} = useWithdrawFromBoardroom();
  const canWithdrawFromBoardroom = useWithdrawCheck();
  const [onPresentWithdraw, onDismissWithdraw] = useModal(
    <WithdrawModal
      max={stakedBalance}
      onConfirm={(value) => {
        onWithdraw(value);
        onDismissWithdraw();
      }}
      tokenName={'BShare'}
    />,
  );

  return (
    <Box>
      <Card>
        <CardContent>
          <StyledCardContentInner>
            <StyledCardHeader>
              <CardIcon>
                <TokenSymbol symbol="BSHARE" />
              </CardIcon>
               {
                approveStatus !== ApprovalState.APPROVED ?<Label text={'BSHARE'} variant="yellow" />:
                <Label text={'BSHARE'} variant="yellow" />
               }
            </StyledCardHeader>
            <StyledCardActions>
              {approveStatus !== ApprovalState.APPROVED ? (
                <Button
                  disabled={approveStatus !== ApprovalState.NOT_APPROVED}
                  className={approveStatus === ApprovalState.NOT_APPROVED ? 'shinyButton' : 'shinyButtonDisabled'}
                  style={{marginTop: '20px'}}
                  onClick={approve}
                >
                  Approve BSHARE
                </Button>
              ) : (
                <>
                <div>
                  <IconButton disabled={!canWithdrawFromBoardroom} onClick={onPresentWithdraw}>
                    <RemoveIcon color={!canWithdrawFromBoardroom ? '' : 'yellow'} />
                  </IconButton>
                  <p>Click - for</p>
                  <p>Withdraw</p>
                  <StyledActionSpacer />
                  </div>
                </>
              )}
            </StyledCardActions>
          </StyledCardContentInner>
        </CardContent>
      </Card>
      <Box mt={2} style={{color: '#FFF'}}>
        {canWithdrawFromBoardroom ? (
          ''
        ) : (
          <Card>
            <CardContent>
              <Typography style={{textAlign: 'center'}}>Withdraw possible in</Typography>
              <ProgressCountdown hideBar={true} base={from} deadline={to} description="Withdraw available in" />
            </CardContent>
          </Card>
        )}
      </Box>
    </Box>
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

export default Withdraw;
