import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";
import { Card } from "components/Card/Card.jsx";
import { StatsCard } from "components/StatsCard/StatsCard.jsx";
import { Tasks } from "components/Tasks/Tasks.jsx";
import axios from 'axios';
import UserLighthouse from "views/Lighthouse/UserLighthouseProject";

const date = new Date();

class UserDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      company: [],
      project: [],
      lighthouse: [],
      timePassed: '',
      userProfile: [],
    };
    this.fetchUserData = this.fetchUserData.bind(this);
    this.fetchCompanyData = this.fetchCompanyData.bind(this);
    this.fetchLighthouseProjects = this.fetchLighthouseProjects.bind(this);
  };

  createLegend(json) {
    var legend = [];
    for (var i = 0; i < json["names"].length; i++) {
      var type = "fa fa-circle text-" + json["types"][i];
      legend.push(<i className={type} key={i} />);
      legend.push(" ");
      legend.push(json["names"][i]);
    }
    return legend;
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.humanizeDateTime();
    }, 2000);
    const userId = localStorage.getItem("userId");
    this.fetchUserData(userId);
  };

  componentWillUnmount() {
    clearInterval(this.interval);
    this.interval = null;
  }

  fetchUserData(user) {
    axios.get(`/Account/${user}`)
      .then((res) => {
        this.setState({ userProfile: res.data });
        this.fetchCompanyData(res.data.companyName);
      })
  }

  fetchCompanyData(companyName) {
    axios.get(`/Company/?companyName=${companyName}`)
      .then(res => {
        this.setState({
          company: res.data[0],
          lighthouse: res.data[0].lighthouseDetails
        });
        if (res.data[0].lighthouseDetails !== undefined) {
          this.fetchLighthouseProjects(res.data[0].lighthouseDetails[0].id);
        } else {
          this.fetchLighthouseProjects(null);
        }
      })
      .catch(err => console.log('Error fetching company data: ', err));
  };

  fetchLighthouseProjects(lighthouseId) {
    if (lighthouseId !== undefined) {
      axios.get(`/Lighthouse/${lighthouseId}`)
        .then(res => {
          this.setState({ project: res.data.projects });
        })
    }
  }

  currencyFormat(num) {
    return 'RM ' + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1, ')
  };

  humanizeDateTime = async () => {
    const datetimeDiff = new Date() - date;
    if (datetimeDiff < 120000) {
      return this.setState({ timePassed: 'Updated just a moment ago' });
    } else if (datetimeDiff >= 120000) {
      return (this.setState({ timePassed: `Updated ${(datetimeDiff / 60000).toFixed(0)} minutes ago` }))
    } else if (datetimeDiff >= 3600000) {
      return (this.setState({ timePassed: `Last updated on ${new Date(date).toLocaleString()}` }))
    }
  }

  render() {
    var { project, userProfile } = this.state;
    var projectCost = 0;
    var projectUpdates = 0;
    var i;
    if (project !== undefined) {
      for (i = 0; i <= project.length - 1; i++) {
        if (project[i].totalCost !== undefined) {
          projectCost += project[i].totalCost
        };
        if (project[i].projectUpdate !== undefined) {
          projectUpdates += project[i].projectUpdate.length
        };
      }
    };

    const { timePassed } = this.state;

    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col>
              <div className="typo-line">
                <h3>Hello, {userProfile.firstName} {userProfile.lastName}</h3>
                <h2><b>
                  {userProfile.companyName}
                </b></h2>
              </div>
            </Col>
          </Row>
          <Row>
            <Col lg={3} sm={6}>
              {project !== undefined ?
                <StatsCard
                  bigIcon={<i className="pe-7s-server text-info" />}
                  statsText="Projects"
                  statsValue={project.length}
                  statsIcon={<i className="fa fa-refresh" />}
                  statsIconText={timePassed}
                />
                :
                <StatsCard
                  bigIcon={<i className="pe-7s-server text-info" />}
                  statsText="Projects"
                  statsValue="0"
                  statsIcon={<i className="fa fa-refresh" />}
                  statsIconText={timePassed}
                />
              }

            </Col>
            <Col lg={4} sm={6}>
              {/* {project.projectUpdate !== undefined ? */}
              <StatsCard
                bigIcon={<i className="pe-7s-check text-success"></i>
                }
                statsText="Progress tasks"
                statsValue={projectUpdates}
                statsIcon={<i className="fa fa-refresh" />}
                statsIconText={timePassed}
              />
              {/* :
                <StatsCard
                  bigIcon={<i className="pe-7s-check text-success" />}
                  statsText="Progress Tasks"
                  statsValue="0"
                  statsIcon={<i className="fa fa-refresh" />}
                  statsIconText={timePassed}
                /> */}
              {/* } */}
            </Col>
            <Col lg={5} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-wallet text-warning" />}
                statsText="Projects Cost"
                statsValue={this.currencyFormat(projectCost)}
                statsIcon={<i className="fa fa-refresh" />}
                statsIconText={timePassed}
              />
            </Col>
          </Row>
          <UserLighthouse />
          {/* <Row>
            <Col>
              <Card
                title="Companies involved"
                stats={timePassed}
                statsIcon={<i className="fa fa-refresh" />}
                content={
                  <div className="table-full-width">
                    <table className="table">
                      <Tasks />
                    </table>
                  </div>
                }
              />
            </Col>
          </Row> */}
        </Grid>
      </div >
    );
  }
}

export default UserDashboard;