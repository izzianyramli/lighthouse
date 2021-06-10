import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";
import { Card } from "components/Card/Card.jsx";
import { StatsCard } from "components/StatsCard/StatsCard.jsx";
import { Tasks } from "components/Tasks/Tasks.jsx";
import axios from 'axios';

const date = new Date();

class UserDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      company: [],
      project: [],
      lighthouse: [],
      timePassed: '',
    };
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
    this.fetchCompanyData();
    this.fetchProjectData();
    this.interval = setInterval(() => {
      this.humanizeDateTime();
    }, 2000);
  };

  componentWillUnmount() {
    clearInterval(this.interval);
    this.interval = null;
  }

  fetchCompanyData() {
    axios.get('/Company/602f0b2b2d925c5ba0817c7d')
      .then(res => {
        console.log('Company data: ', res.data.lighthouseDetails);
        // if (res.data.project !== undefined) {
        //   console.log('project: ', res.data.project);
        // };
        this.setState({
          company: res.data,
          // project: res.data.lighthouseDetails[0].projects,
          lighthouse: res.data.lighthouseDetails
        });
        console.log('company: ', this.state.company);
      })
      .catch(err => console.log('Error fetching company data: ', err));
  };

  fetchProjectData() {
    axios.get('/Lighthouse')
      .then(res => {
        for (const [, value] of Object.entries(res.data)) {
          // console.log(key, value)
          if (value.owner === "602f0b2b2d925c5ba0817c7d") {
            // if (value.projects.lighthouse.id === this.state.lighthouse.id) {
            console.log(value.projects);
            this.setState({ project: value.projects });
          }
        }
      })
  }

  currencyFormat(num) {
    return 'RM ' + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1, ')
  };

  humanizeDateTime = async () => {
    const datetimeDiff = new Date() - date;
    // console.log('dateTimeDiffer: ', datetimeDiff);
    if (datetimeDiff < 120000) {
      return this.setState({ timePassed: 'Updated just a moment ago' });
    } else if (datetimeDiff >= 120000) {
      return (this.setState({ timePassed: `Updated ${(datetimeDiff / 60000).toFixed(0)} minutes ago` }))
    } else if (datetimeDiff >= 3600000) {
      return (this.setState({ timePassed: `Last updated on ${new Date(date).toLocaleString()}` }))
    }
  }

  render() {
    var { project, company } = this.state;
    var projectCost = 0;
    var i;
    if (project !== undefined) {
      for (i = 0; i <= project.length - 1; i++) {
        if (project[i].totalCost !== undefined) {
          projectCost += project[i].totalCost
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
                <h2><b>
                  {company.companyName}
                </b></h2>
              </div>
            </Col>
          </Row>
          <Row>
            <Col lg={3} sm={6}>
              {this.state.project !== undefined ?
                <StatsCard
                  bigIcon={<i className="pe-7s-server text-info" />}
                  statsText="Projects"
                  statsValue={this.state.project.length}
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
              <StatsCard
                bigIcon={<i className="pe-7s-check text-success"></i>
                }
                statsText="Progress tasks"
                statsValue={this.state.company.length}
                statsIcon={<i className="fa fa-refresh" />}
                statsIconText={timePassed}
              />
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
          <Row>
            <Col>
              <Card
                title="Tasks"
                category="Backend development"
                stats="Updated 3 minutes ago"
                statsIcon="fa fa-history"
                content={
                  <div className="table-full-width">
                    <table className="table">
                      <Tasks />
                    </table>
                  </div>
                }
              />

            </Col>
          </Row>
        </Grid>
      </div >
    );
  }
}

export default UserDashboard;