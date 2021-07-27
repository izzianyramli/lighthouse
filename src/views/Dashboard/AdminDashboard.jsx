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
      userProfile: [],
      sourceOnline: 0,
      sourcePotential: 0,
      sourceEngagement: 0,
      locationJohor: 0,
      locationKualaLumpur: 0,
      locationMelaka: 0,
      locationNegeriSembilan: 0,
      locationPenang: 0,
      locationSelangor: 0,
      locationPerak: 0,
      locationTerengganu: 0,
    };
    this.fetchCompanyData = this.fetchCompanyData.bind(this);
    this.fetchLighthouse = this.fetchLighthouse.bind(this);
    this.fetchProjectData = this.fetchProjectData.bind(this);
    this.fetchUserData = this.fetchUserData.bind(this);
    this.getSourceCompany = this.getSourceCompany.bind(this);
    this.getLocationCompany = this.getLocationCompany.bind(this);
  };

  createLegend(json) {
    var legend = [];
    for (var i = 0; i < json["names"].length; i++) {
      var type = "fa fa-circle";
      var colors = json["colorType"][i];
      legend.push(<i className={type} key={i} style={{ color: colors }} />);
      legend.push(" ");
      legend.push(json["names"][i]);
    }
    return legend;
  }

  componentDidMount() {
    this.fetchCompanyData();
    this.fetchProjectData();
    this.fetchLighthouse();
    this.interval = setInterval(() => {
      this.humanizeDateTime();
    }, 2000);
    const adminId = localStorage.getItem("userId");
    this.fetchUserData(adminId);
    this.getSourceCompany();
    this.getLocationCompany();
  };

  componentWillUnmount() {
    clearInterval(this.interval);
    this.interval = null;
  };

  fetchUserData(user) {
    axios.get(`/Account/${user}`)
      .then((res) => {
        this.setState({ userProfile: res.data });
        // console.log(this.state.userId, res.data.companyName);
      })
  };

  fetchCompanyData() {
    axios.get('/Company')
      .then(res => {
        this.setState({ company: res.data });
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
    if (datetimeDiff < 120000) {
      return this.setState({ timePassed: 'Updated just a moment ago' });
    } else if (datetimeDiff >= 120000) {
      return (this.setState({ timePassed: `Updated ${(datetimeDiff / 60000).toFixed(0)} minutes ago` }))
    } else if (datetimeDiff >= 3600000) {
      return (this.setState({ timePassed: `Last updated on ${new Date(date).toLocaleString()}` }))
    }
  }

  getSourceCompany() {
    axios.get('/count/company-source')
      .then((res) => {
        this.setState({
          sourceEngagement: res.data[0]['MIDAEngagement'],
          sourceOnline: res.data[0]['OnlineRegistration'],
          sourcePotential: res.data[0]['MIDAPotential']
        });
      })
  }

  getLocationCompany() {
    axios.get('/count/company-location')
      .then((res) => {
        this.setState({
          locationJohor: res.data[0]['Johor'],
          locationKualaLumpur: res.data[0]['KualaLumpur'],
          locationMelaka: res.data[0]['Melaka'],
          locationNegeriSembilan: res.data[0]['NegeriSembilan'],
          locationPenang: res.data[0]['Penang'],
          locationPerak: res.data[0]['Perak'],
          locationSelangor: res.data[0]['Selangor'],
          locationTerengganu: res.data[0]['Terengganu'],
        });
      })
  }

  render() {
    var { project, userProfile } = this.state;
    var projectCost = 0;
    var i;
    for (i = 0; i <= project.length - 1; i++) {
      if (project[i].totalCost !== undefined) {
        projectCost += project[i].totalCost
      };
    };

    // Data for Bar Chart
    var sourceRegistration = {
      labels: [
        "MIDA Engagement",
        "Online Registration",
        "MIDA Potential Companies"
      ],
      series: [[this.state.sourceEngagement, this.state.sourceOnline, this.state.sourcePotential]]
    };

    var barOptions = {
      low: 0,
      width: "100%",
      high: 10,
      height: "100%",
    };

    // Data for pie chart
    var locationsLegend = {
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
      ],
    };

    let pieCompanyLocation = {
      labels: ["Johor", "Kuala Lumpur", "Melaka", "Negeri Sembilan", "Penang", "Selangor", "Perak", "Terengganu"],
      // series: [
      //   {
      //     value: this.state.locationJohor,
      //     name: "Johor"
      //   },
      //   {
      //     value: this.state.locationKualaLumpur,
      //     name: "Kuala Lumpur"
      //   },
      //   {
      //     value: this.state.locationMelaka,
      //     name: "Melaka"
      //   },
      //   {
      //     value: this.state.locationNegeriSembilan,
      //     name: "Negeri Sembilan"
      //   },
      //   {
      //     value: this.state.locationPenang,
      //     name: "Penang"
      //   },
      //   {
      //     value: this.state.locationSelangor,
      //     name: "Selangor"
      //   },
      //   {
      //     value: this.state.locationPerak,
      //     name: "Perak"
      //   },
      //   {
      //     value: this.state.locationTerengganu,
      //     name: "Terengganu"
      //   },
      // ]
      series: [
        this.state.locationJohor,
        this.state.locationKualaLumpur,
        this.state.locationMelaka,
        this.state.locationNegeriSembilan,
        this.state.locationPenang,
        this.state.locationSelangor,
        this.state.locationPerak,
        this.state.locationTerengganu
      ]
    };

    var pieOptions = {
      labelInterpolationFnc: function (value) {
        return value[0]
      },
      total: this.state.company.length
    };

    var pieResponsiveOptions = [
      ['screen and (min-width: 640px)', {
        chartPadding: 30,
        labelOffset: 100,
        labelDirection: 'explode',
        labelInterpolationFnc: function (value) {
          return value;
          // return Math.round(value / pieCompanyLocation.series.reduce(sum) * 100) + '%';
        },

      }],
      ['screen and (min-width: 1024px)', {
        labelOffset: 80,
        chartPadding: 20
      }]
    ];

    const { timePassed } = this.state;

    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col>
              <div className="typo-line">
                <h3>Hello, {userProfile.firstName} {userProfile.lastName}</h3>
              </div>
            </Col>
          </Row>
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
                      options={barOptions}
                    />
                  </div>
                }
              // legend={
              //   <div className="legend">{this.createLegend(sourceLegend)}</div>
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
                      data={pieCompanyLocation}
                      type="Pie"
                      options={pieOptions}
                      responsiveOptions={pieResponsiveOptions}
                    />
                  </div>
                }
                // legend={
                //   <div className="legend">{this.createLegend(locationsLegend)}</div>
                // }
              />
            </Col>
          </Row>

        </Grid>
      </div>
    );
  }
}

export default AdminDashboard;