/*!

=========================================================
* Light Bootstrap Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { Component } from "react";
import ChartistGraph from "react-chartist";
import { Grid, Row, Col } from "react-bootstrap";

import { Card } from "components/Card/Card.jsx";
import { StatsCard } from "components/StatsCard/StatsCard.jsx";
import { Tasks } from "components/Tasks/Tasks.jsx";
import {
  dataPie,
  legendPie,
  dataSales,
  optionsSales,
  responsiveSales,
  legendSales,
  dataBar,
  optionsBar,
  responsiveBar,
  legendBar
} from "variables/Variables.jsx";
import axios from 'axios';

const date = new Date();

class Dashboard extends Component {
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
    this.fecthCompanyData();
    this.fetchProjectData();
    this.fetchLighthouse();
    this.interval = setInterval(() => {
      this.humanizeDateTime();
    }, 2000);
  };

  componentWillUnmount() {
    clearInterval(this.interval);
    this.interval = null;
  }

  fecthCompanyData() {
    axios.get('/Company')
      .then(res => {
        // console.log('Company data: ', res.data);
        this.setState({ company: res.data });
        // console.log(res.data[0].location);
      })
      .catch(err => console.log('Error fetching company data: ', err));
  };

  fetchProjectData() {
    axios.get('/Project')
      .then(res => {
        // console.log('Project data: ', res.data);
        this.setState({ project: res.data });
        // const {project} = this.state;
        // console.log(project);

        // if (this.state.project !== undefined) {
        //   for (var i=0; i=project.length;i++) {
        //     // if (project.totalCost !== undefined) {
        //       console.log(project[i].totalCost);
        //     // };
        //   };
        // };
        // console.log(this.state.project);
      })
      .catch(err => console.log('Error fetching project data: ', err));
  };

  fetchLighthouse() {
    axios.get('/Lighthouse')
      .then(res => {
        // console.log('Lighthouse data: ', res.data);
        this.setState({ lighthouse: res.data });

      })
      .catch(err => console.log('Error fetching lighthouse data, err: ', err));
  };

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
      // return (this.setState({ timePassed: `Last updated on ${new Date(date).getDate()}/${new Date(date).getMonth()}/${new Date(date).getFullYear()} at ${new Date(date).getHours()}:${new Date(date).getMinutes()}` }));
      return (this.setState({ timePassed: `Last updated on ${new Date(date).toLocaleString()}` }))
    }
  }

  render() {
    var { project, company } = this.state;
    var projectCost = 0;
    var i;
    for (i = 0; i <= project.length - 1; i++) {
      if (project[i].totalCost !== undefined) {
        projectCost += project[i].totalCost
      };
    };

    var companyLocation = {
      labels: [
        "California",
        "Johor",
        "Kuala Lumpur",
        "Melaka",
        "Negeri Sembilan",
        "Penang",
        "Selangor",
        "Perak",
        "Terengganu"
      ],
      series: [1, 7, 8, 10, 15, 18, 19, 30, 14]
    };
    var companyLegend = {
      names: [
        "California",
        "Johor",
        "Kuala Lumpur",
        "Melaka",
        "Negeri Sembilan",
        "Penang",
        "Selangor",
        "Perak",
        "Terengganu"
      ],
      types: [
        "info",
        "danger",
        "warning",
        "purple",
        "success",
        // "success",
        // "warning",
        // "danger",
        // "info"
      ]
    }

    // const date = new Date();
    // console.log(date);
    const { timePassed } = this.state;
    // console.log('timePassed: ', timePassed);
    // for (i = 0; i <= company.length - 1; i++) {
    //   if (company[i].location !== undefined) {
    //     // companyLocation.labels.push(company[i].location);
    //     companyLocation.series.push(i);
    //     // companyLegend.names.push(company[i].location);
    //     // companyLegend.types.push("info");
    //   };
    // };

    // console.log(companyLocation);
    // console.log(company[20])
    // if (company !== undefined) {
    //   console.log(company[20]);
    //   console.log(company[20].updatedAt);
    // };
    // console.log(new Date(new Date() - new Date(1613717887407)));

    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col lg={4} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-culture text-info" />}
                statsText="Lighthouse Projects"
                statsValue={this.state.lighthouse.length}
                statsIcon={<i className="fa fa-refresh" />}
                statsIconText={timePassed}
              />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="fa fa-building-o text-success" />}
                statsText="Company Involved"
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
            <Col md={8}>
              <Card
                statsIcon="fa fa-refresh"
                id="chartHours"
                title="Source of Registration"
                category="Company registrations"
                stats={timePassed}
                content={
                  <div className="ct-chart">
                    <ChartistGraph
                      data={dataSales}
                      type="Bar"
                      options={optionsSales}
                      responsiveOptions={responsiveSales}
                    />
                  </div>
                }
              // legend={
              //   <div className="legend">{this.createLegend(legendSales)}</div>
              // }
              />
            </Col>
            <Col md={4}>
              <Card
                statsIcon="fa fa-refresh"
                title="Company Locations"
                category="Registered company"
                stats={timePassed}
                content={
                  <div
                    id="chartPreferences"
                    className="ct-chart ct-perfect-fourth"
                  >
                    <ChartistGraph
                      data={companyLocation}
                      type="Pie"
                    />
                  </div>
                }
              // legend={
              //   <div className="legend">{this.createLegend(companyLegend)}</div>
              // }
              />
            </Col>
          </Row>

        </Grid>
      </div>
    );
  }
}

export default Dashboard;

// function PieChart() {
//   var data = {
//     series: [5, 3, 4]
//   };

//   var sum = function (a, b) { return a + b };

//   new Chartist.Pie('.ct-chart', data, {
//     labelInterpolationFnc: function (value) {
//       return Math.round(value / data.series.reduce(sum) * 100) + '%';
//     }
//   });
// }


{/* <Row>
            <Col md={6}>
              <Card
                id="chartActivity"
                title="2014 Sales"
                category="All products including Taxes"
                stats="Data information certified"
                statsIcon="fa fa-check"
                content={
                  <div className="ct-chart">
                    <ChartistGraph
                      data={dataBar}
                      type="Bar"
                      options={optionsBar}
                      responsiveOptions={responsiveBar}
                    />
                  </div>
                }
                legend={
                  <div className="legend">{this.createLegend(legendBar)}</div>
                }
              />
            </Col>

            <Col md={6}>
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
          </Row> */}