import React from 'react';
import styled from 'styled-components';
import MiniPledgeForm from './MiniPledgeForm.jsx';

class RewardTier extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false,
      limited: false,
    };

    this.handleWidgetClick = this.handleWidgetClick.bind(this);
    this.checkLimited = this.checkLimited.bind(this);
    this.renderView = this.renderView.bind(this);
  }

  componentDidMount() {
    this.checkLimited();
  }

  handleWidgetClick() {
    this.setState({
      clicked: true,
    });
  }

  checkLimited() {
    const { reward } = this.props;
    if (reward.islimited) {
      this.setState({
        limited: true,
      });
    }
  }

  renderLimited() {
    const { limited } = this.state;
    const { reward } = this.props;

    if (limited === true) {
      const leftover = reward.limitCount - reward.backers;

      return (
        <LimitedWrapper className="limitedWrapper">
          {`Limited (${leftover} left of ${reward.limitcount})`}
        </LimitedWrapper>
      );
    }
    return (
      <DivWrapper />
    );
  }

  renderView() {
    const { clicked } = this.state;
    const { reward } = this.props;
    const { projectCurrency } = this.props;

    if (clicked === true) {
      return (
        <DivWrapper>
          <MiniPledgeForm reward={reward} projectCurrency={projectCurrency} />
        </DivWrapper>
      );
    }
    return (
      <Overlay className="overlay" onClick={this.handleWidgetClick}>Select this reward</Overlay>
    );
  }

  render() {
    const { reward } = this.props;
    const { projectCurrency } = this.props;

    return (
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
          {this.renderLimited()}
          <BackersWrapper className="backers">
            {`${reward.backers} backers`}
          </BackersWrapper>
        </DivWrapper>
        {this.renderView()}
      </RewardWrapper>
    );
  }
}

// styled components for RewardTier component
const RewardWrapper = styled.div`
  position: relative;
  width: 65%;
  border: solid 1px;
  border-color: rgb(192, 192, 192);
  margin-bottom: 20px;
`;

const Overlay = styled.div`
  background-color: rgba(0, 158, 116, 0.0);
  color: rgba(255, 255, 255, 0.0);
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  font-size: 18px;
  font-family: 'Barlow', sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;

  :hover {
    background-color: rgba(0, 158, 116, 0.75);
    color: rgba(255, 255, 255, 1.0);
    cursor: pointer;
  }
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
  margin-left: 10%;
`;

const FlexWrapper = styled.div`
  display: flex;
  align-items: baseline;
  margin-top: 2%;
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

const LimitedWrapper = styled.div`
  font-family: 'Raleway', sans-serif;
  font-size: 12px;
  margin-top: 15px;
  color: rgb(255, 81, 81);
`;

const ContentWrapper = styled.div`
  font-family: 'Montserrat', sans-serif;
  font-size: 14px;
`;

export default RewardTier;
