import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import RewardTier from './RewardTier.jsx';
import PledgeWidget from './PledgeWidget.jsx';
import LimitedGone from './LimitedGone.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projectRewards: [],
      currentProject: null,
      projectCurrency: '',
    };

    this.fetchRewards = this.fetchRewards.bind(this);
    this.renderLimited = this.renderLimited.bind(this);
  }

  componentDidMount() {
    this.fetchRewards();
  }

  fetchRewards() {
    let projectId = window.location.pathname;
    projectId = Number(projectId.slice(1, -1)) || 1;
    // const projectId = '/10';
    axios.get(`http://54.218.70.101/api/${projectId}/rewards`)
      .then((res) => {
        this.setState({
          projectRewards: res.data,
          currentProject: projectId,
          projectCurrency: res.data[0].location,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // fetchCurrency() {
  //   let projectId = window.location.pathname;
  //   projectId = Number(projectId.slice(1, -1)) || 1;
  //   // const projectId = '/10';
  //   axios.get(`/api/${projectId}/currency`)
  //     .then((res) => {
  //       this.setState({
  //         projectCurrency: res.data,
  //       });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }

  renderLimited() {
    const { projectRewards } = this.state;
    const { currentProject } = this.state;
    const { projectCurrency } = this.state;
    const limitedRewards = projectRewards.filter(reward => (
      (reward.limitcount !== null) && (reward.limitcount === reward.backers)
    ));

    if (limitedRewards.length) {
      return (
        <div>
          <StyledHeader>
            All gone!
          </StyledHeader>
          {limitedRewards.map(reward => (
            <LimitedGone key={`${currentProject}${reward.id}`} reward={reward} projectCurrency={projectCurrency} />
          ))}
        </div>
      );
    }
    return (
      <div />
    );
  }

  render() {
    let { projectRewards } = this.state;
    const { currentProject } = this.state;
    const { projectCurrency } = this.state;

    projectRewards = projectRewards.filter(reward => (
      (reward.limitcount === null || reward.limitcount !== reward.backers)
    ));

    return (
      <div>
        <StyledHeader>Support</StyledHeader>
        <StyledPledgeWidget className="pledgeWidget">
          <PledgeWidget projectId={currentProject} projectCurrency={projectCurrency} />
        </StyledPledgeWidget>
        <div>
          {projectRewards.map(reward => (
            <RewardTier key={`${currentProject}${reward.pledgeamount}`} reward={reward} projectCurrency={projectCurrency} />
          ))}
        </div>
        {this.renderLimited()}
      </div>
    );
  }
}

// styled components for App component
const StyledHeader = styled.h1`
  font-family: 'Raleway', sans-serif;
  font-size: 24px;
  margin-left: 5px;
  margin-bottom: 10%;
`;

const StyledPledgeWidget = styled.div`
  margin-bottom: 20px;
  width: 63%;
  border: solid 1px;
  border-color: rgb(192, 192, 192);
  padding: 1%;

  :hover {
    cursor: pointer;
  }
`;

export default App;
