import React, { Component } from 'react';
import { Grid, Row, Col, Table, OverlayTrigger, Tooltip } from 'react-bootstrap';
import Card from 'components/Card/Card';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Dialog, DialogContent, DialogContentText, makeStyles, Button } from '@material-ui/core';
import { green, red } from '@material-ui/core/colors';
import { CancelOutlined, CheckCircleOutlineOutlined, Add as AddIcon } from '@material-ui/icons';
import io from 'assets/sailsSocket';

const lighthouseInfo = [
    "Model",
    "Type",
    "Productivity",
    "Sustainability",
    "Agility",
    "Speed to Market",
    "Customization",
    "Projects"
    // "Others"
];

class UserLighthouse extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lighthouse: [],
            lighthouseId: "",
            openDialog: false,
            dialogMessage: '',
            dialogColor: null,
            project: [],
            companyId: '',
        };
        // this.fetchProjectData = this.fetchProjectData.bind(this);
        this.fetchCompanyData = this.fetchCompanyData.bind(this);
        this.fetchUserData = this.fetchUserData.bind(this);
    };

    componentDidMount() {
        // this.fetchProjectData();
        const userId = localStorage.getItem("userId");
        this.fetchUserData(userId);
    };

    handleCloseDialog = (event, reason) => {
        event.preventDefault();
        if (reason === 'clickaway') {
            return;
        }
        this.setState({ openDialog: false });
    }

    fetchUserData(user) {
        axios.get(`/Account/${user}`)
            .then((res) => {
                this.setState({ userProfile: res.data });
                this.fetchCompanyData(res.data.companyName);
                // console.log(res.data.companyName);
            })
    }

    fetchCompanyData(companyName) {
        axios.get(`/Company?companyName=${companyName}`)
            .then(res => {
                this.setState({ companyId: res.data[0].id });
                if (res.data[0].lighthouseDetails !== undefined)
                    this.setState({
                        lighthouseId: res.data[0].lighthouseDetails.id,
                        lighthouse: res.data[0].lighthouseDetails,
                    });
                // console.log(res.data[0]);
            })
            .catch(err => console.log('Error fetching company data: ', err));
    };

    deleteLighthouse(lighthouseId) {
        axios.delete(`/Lighthouse/${lighthouseId}`)
            .then(() => {
                this.setState({
                    openDialog: true,
                    dialogMessage: 'Lighthouse project deleted',
                    dialogColor: green[500],
                });
            })
            .catch(() => {
                this.setState({
                    openDialog: true,
                    dialogMessage: 'Failed to delete lighthouse project',
                    dialogColor: red[500],
                })
            })
    };

    fetchProjectData(lighthouseId) {
        var totalProject = 0;
        // if (this.state.lighthouseId !== '')
        axios.get(`/Lighthouse/${lighthouseId}`)
            .then(res => {
                totalProject = res.data.projects.length;
            })
        return totalProject;
    }

    render() {
        const view = <Tooltip id="edit_tooltip">View</Tooltip>;
        const remove = <Tooltip id="remove_tooltip">Delete</Tooltip>;
        const classes = makeStyles((theme) => ({
            textField: {
                marginLeft: theme.spacing(1),
                marginRight: theme.spacing(1),
                width: 750,
            },
            button: {
                margin: theme.spacing(1),
            },
            root: {
                '& .MuiTextField-root': {
                    margin: theme.spacing(1),
                    width: '20ch',
                    minWidth: 300,
                },
                '& > .fa': {
                    margin: theme.spacing(2),
                    marginRight: -90,
                    marginLeft: 90,
                },
                display: 'flex',
                flexWrap: 'wrap',
            },
            label: {
                fontSize: 13,
                margin: theme.spacing(0),
                marginBottom: 12,
            },
            title: {
                fontSize: 20,
                margin: theme.spacing(1),
            },
        }));

        return (
            <div className="content">
                <Grid fluid>
                    <Row>
                        <Col md={12}>
                            <Card
                                title="List of Lighthouse Projects"
                                ctTableFullWidth
                                ctTableResponsive
                                content={
                                    <div>
                                        &nbsp;&nbsp;&nbsp;
                                        <Button
                                            color="primary"
                                            variant="outlined"
                                            className={classes.button}
                                            // onClick={() => this.handleAddDetails()}
                                            href={`/user/add-lighthouse/${this.state.companyId}`}
                                        >
                                            <AddIcon /> &nbsp;
                                            Add New Lighthouse
                                        </Button>
                                        <Table striped hover>
                                            <thead>
                                                <tr>
                                                    <th><center><b>No.</b></center></th>
                                                    {lighthouseInfo !== undefined && lighthouseInfo.map((info, key) => {
                                                        return <th key={key}><center><b>{info}</b></center></th>
                                                    })}
                                                    <th><center><b>Actions</b></center></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.state.lighthouse !== undefined && this.state.lighthouse.map((lighthouse, key) => {
                                                    return (
                                                        <tr key={key}>
                                                            <td><center>{key + 1}.</center></td>
                                                            <td><center>{lighthouse.lighthouseModel}</center></td>
                                                            <td><center>{lighthouse.lighthouseType}</center></td>
                                                            <td><center>{lighthouse.productivity}</center></td>
                                                            {lighthouse.sustainability !== undefined ?
                                                                <td><center>{lighthouse.sustainability}</center></td>
                                                                :
                                                                <td><center>null</center></td>
                                                            }
                                                            {lighthouse.agility !== undefined ?
                                                                <td><center>{lighthouse.agility}</center></td>
                                                                :
                                                                <td><center>null</center></td>
                                                            }

                                                            <td><center>{lighthouse.speedToMarket}</center></td>
                                                            <td><center>{lighthouse.customization}</center></td>
                                                            <td><center>{this.fetchProjectData(lighthouse.id)}</center></td>
                                                            {/* <td><center>{lighthouse.others}</center></td> */}
                                                            <td className="td-actions text-right"><center>
                                                                <OverlayTrigger placement="top" overlay={view}>
                                                                    <Link to={{
                                                                        pathname: `/user/lighthouse-info/${lighthouse.id}`,

                                                                    }}
                                                                    >
                                                                        <Button bsStyle="info" simple type="button" bsSize="large">
                                                                            <i className="fa fa-external-link" />
                                                                        </Button>

                                                                    </Link>
                                                                </OverlayTrigger>
                                                                <OverlayTrigger placement="top" overlay={remove}>
                                                                    <Button bsStyle="danger" simple type="button" bsSize="large" onClick={() => this.deleteLighthouse(lighthouse.id)}>
                                                                        <i className="fa fa-trash-o" />
                                                                    </Button>
                                                                </OverlayTrigger>
                                                            </center></td>
                                                        </tr>
                                                    )
                                                })}
                                            </tbody>
                                        </Table>
                                        <Dialog
                                            open={this.state.openDialog}
                                            onBackdropClick={this.handleCloseDialog}
                                            aria-describedby="alert-dialog-description"
                                        >
                                            <DialogContent>
                                                <center>
                                                    {this.state.dialogColor === green[500] ?
                                                        <div className={classes.root}>
                                                            <CheckCircleOutlineOutlined className="fa" style={{ color: green[500], fontSize: 60 }} />
                                                        </div>
                                                        :
                                                        <div>
                                                            <CancelOutlined className="fa" style={{ color: red[500], fontSize: 60 }} />
                                                        </div>
                                                    }
                                                    <DialogContentText id="alert-dialog-description">
                                                        {this.state.dialogMessage}
                                                    </DialogContentText>
                                                </center>
                                            </DialogContent>
                                        </Dialog>
                                    </div>
                                }
                            />
                        </Col>
                    </Row>
                </Grid>
            </div>
        )
    }
}

export default UserLighthouse;
