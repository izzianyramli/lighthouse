import React, { Component } from "react";
import ChartistGraph from "react-chartist";
import { Grid, Row, Col } from "react-bootstrap";

import { Card } from "components/Card/Card.jsx";
import { StatsCard } from "components/StatsCard/StatsCard.jsx";
import axios from 'axios';

const date = new Date();

class AdminDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      company: [],
      project: [],
      lighthouse: [],
      timePassed: '',
      totalLocation: [],
    };
  };

  createLegend(json) {
    var legend = [];
    // console.log('json: ', json);
    for (var i = 0; i < json["names"].length; i++) {
      // var type = "fa fa-circle" + json["types"][i];
      var type = "fa fa-circle";
      var colors = json["colorType"][i];
      legend.push(<i className={type} key={i} style={{ color: colors }} />);
      legend.push(" ");
      legend.push(json["names"][i]);
    }
    return legend;
  }

  // var companyLocation = {
  // labels: locations["names"],
  // series: locationData.push(this.getLocationData(locations["names"])),
  // };

  componentDidMount() {
    this.fetchCompanyData();
    this.fetchProjectData();
    this.fetchLighthouse();
    this.interval = setInterval(() => {
      this.humanizeDateTime();
    }, 2000);
    this.getLocationData();
  };

  componentWillUnmount() {
    clearInterval(this.interval);
    this.interval = null;
  }

  fetchCompanyData() {
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
        this.setState({ project: res.data });
      })
      .catch(err => console.log('Error fetching project data: ', err));
  };

  fetchLighthouse() {
    axios.get('/Lighthouse')
      .then(res => {
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
      return (this.setState({ timePassed: `Last updated on ${new Date(date).toLocaleString()}` }))
    }
  }

  getLocationData(location) {
    axios.get(`/company?location=${location}`)
      .then(res => {
        return (res.data.length);
      })
  }

  render() {
    var { project } = this.state;
    var projectCost = 0;
    var i;
    for (i = 0; i <= project.length - 1; i++) {
      if (project[i].totalCost !== undefined) {
        projectCost += project[i].totalCost
      };
    };


    var locations = {
      names: [
        "Johor",
        "Kuala Lumpur",
        "Melaka",
        "Negeri Sembilan",
        "Penang",
        "Selangor",
        "Perak",
        "Terengganu"
      ],
      colorType: [
        "blue",
        "red",
        "green",
        "purple",
        "yellow",
        "orange",
        "brown",
        "pink",
        "grey",
      ],
    }

    var companyLocation = {
      labels: locations["names"],
      series: [1, 2, 0, 0, 0, 0, 0, 0, 0]
    };

    var sourceLegend = {
      names: ["MIDA Engagement", "Online Registration", "MIDA Potential Companies"],
      colorType: ["blue", "red", "orange"]
    };

    var responsive = [
      [
        "screen and (max-width: 640px)",
        {
          axisX: {
            labelInterpolationFnc: function (value) {
              return value[0];
            }
          }
        }
      ]
    ];

    // Data for Line Chart
    var sourceRegistration = {
      labels: [
        "MIDA Engagement",
        "Online Registration",
        "MIDA Potential Companies"
      ],
      series: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
      ]
    };

    var options = {
      low: 0,
      high: 40,
      showArea: false,
      height: "245px",
      axisX: {
        showGrid: false,
        labelInterpolationFnc: function (value, index) {
          return index % 2 === 0 ? value : null;
        }
      },
      // axisX: {
      //   labelInterpolationFnc: function (value, index) {
      //     return index % 2 === 0 ? value : null;
      //   }
      // },
      lineSmooth: true,
      showLine: true,
      showPoint: true,
      fullWidth: true,
      chartPadding: {
        right: 50
      }
    };

    const { timePassed } = this.state;

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
                      data={sourceRegistration}
                      type="Bar"
                      options={options}
                      responsiveOptions={responsive}
                      distributeSeries={true}
                    />
                  </div>
                }
                legend={
                  <div className="legend">{this.createLegend(sourceLegend)}</div>
                }
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
                legend={
                  <div className="legend">{this.createLegend(locations)}</div>
                }
              />
            </Col>
          </Row>

        </Grid>
      </div>
    );
  }
}

export default AdminDashboard;