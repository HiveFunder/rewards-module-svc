import React from 'react';
import styled from 'styled-components';

const LimitedGone = ({ reward, projectCurrency }) => (
  <div>
    <RewardWrapper>
      <DivWrapper id={`${reward.id}`} className="rewardTier">
        <TitleWrapper className="pledgeAmount">
          {`Pledge ${projectCurrency} ${reward.pledgeamount} or more`}
        </TitleWrapper>
        <RewardName className="rewardName">{reward.name}</RewardName>
        <RewardDesc className="rewardDesc">{reward.description}</RewardDesc>
        <div className="rewardItems">
          <GenericWrapper>INCLUDES:</GenericWrapper>
          <ul>
            <ListWrapper className="rewardItem1">{reward.item1}</ListWrapper>
            <ListWrapper className="rewardItem2">{reward.item2}</ListWrapper>
            <ListWrapper className="rewardItem3">{reward.item3}</ListWrapper>
          </ul>
        </div>
        <FlexWrapper>
          <div className="estDeliv">
            <GenericWrapper>ESTIMATED DELIVERY</GenericWrapper>
            <ContentWrapper>{reward.estdeliv}</ContentWrapper>
          </div>
          <ShipsWrapper className="shipsTo">
            <GenericWrapper>SHIPS TO</GenericWrapper>
            <ContentWrapper>{reward.shipsto}</ContentWrapper>
          </ShipsWrapper>
        </FlexWrapper>
        <NAWrapper className="rewardAvail">Reward no longer available</NAWrapper>
        <BackersWrapper className="backers">
          {`${reward.backers} backers`}
        </BackersWrapper>
      </DivWrapper>
    </RewardWrapper>
  </div>
);

// styled components for LimitedGone component
const RewardWrapper = styled.div`
  position: relative;
  width: 100%;
  border: solid 1px;
  margin-bottom: 20px;
`;

const DivWrapper = styled.div`
  margin: 15px;
`;

const TitleWrapper = styled.div`
  font-family: 'Barlow', sans-serif;
  font-size: 22px;
`;

const RewardName = styled.div`
  font-family: 'Barlow', sans-serif;
  font-size: 20px;
  margin-top: 15px;
`;

const RewardDesc = styled.div`
  font-family: 'Montserrat', sans-serif;
  font-size: 14px;
  margin-top: 10px;
`;

const ListWrapper = styled.li`
  font-family: 'Montserrat', sans-serif;
  font-size: 14px;
`;

const FlexWrapper = styled.div`
  display: flex;
  align-items: baseline;
`;

const ShipsWrapper = styled.div`
  width: 40%;
  margin-left: 15%;
`;

const BackersWrapper = styled.div`
  font-family: 'Raleway', sans-serif;
  font-size: 10px;
`;

const GenericWrapper = styled.div`
  font-family: 'Raleway', sans-serif;
  font-size: 10px;
  margin-top: 10px;
`;

const ContentWrapper = styled.div`
  font-family: 'Montserrat', sans-serif;
  font-size: 14px;
`;

const NAWrapper = styled.div`
  font-family: 'Barlow', sans-serif;
  font-size: 14px;
  font-weight: 600;
  margin-top: 8%;
  margin-bottom: 8%;
  width: 65%;
  padding: 3%;
  display: flex;
  justify-content: center;
  background-color: rgb(232, 232, 232);
`;

export default LimitedGone;
