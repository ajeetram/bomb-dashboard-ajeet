import React, {useMemo} from 'react';
import styled from 'styled-components';

import {Box, Button, Card, CardContent} from '@material-ui/core';
import CardIcon from '../../../components/CardIcon';
import {AddIcon} from '../../../components/icons';
import IconButton from '../../../components/IconButton';
import Label from '../../../components/Label';
import Value from '../../../components/Value';

import useApprove, {ApprovalState} from '../../../hooks/useApprove';
import useModal from '../../../hooks/useModal';
import useTokenBalance from '../../../hooks/useTokenBalance';
import DepositModal from './DepositModal';
import useBombFinance from '../../../hooks/useBombFinance';
import TokenSymbol from '../../../components/TokenSymbol';
import useStakeToBoardroom from '../../../hooks/useStakeToBoardroom';


const Deposit: React.FC = () => {
  const bombFinance = useBombFinance();
  const [approveStatus, approve] = useApprove(bombFinance.BSHARE, bombFinance.contracts.Boardroom.address);
  const tokenBalance = useTokenBalance(bombFinance.BSHARE);

  const {onStake} = useStakeToBoardroom();
  const [onPresentDeposit, onDismissDeposit] = useModal(
    <DepositModal
      max={tokenBalance}
      onConfirm={(value) => {
        onStake(value);
        onDismissDeposit();
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
                <Label text={"BSHARE"} variant="yellow" />
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
                <IconButton onClick={onPresentDeposit}>
                    <AddIcon />
                  </IconButton>
                  <p>Click + for</p>
                  <p>Deposit</p>
                </div>
                 
                </>
              )}
            </StyledCardActions>
          </StyledCardContentInner>
        </CardContent>
      </Card>
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

export default Deposit;
