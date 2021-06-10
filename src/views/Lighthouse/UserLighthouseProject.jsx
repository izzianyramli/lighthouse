import React, { Component } from 'react';
import { Grid, Row, Col, Table, OverlayTrigger, Tooltip } from 'react-bootstrap';
import Card from 'components/Card/Card';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Button from "components/CustomButton/CustomButton";
import { Dialog, DialogContent, DialogContentText, makeStyles } from '@material-ui/core';
import { green, red } from '@material-ui/core/colors';
import { CancelOutlined, CheckCircleOutlineOutlined } from '@material-ui/icons';
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
        };
    };

    componentDidMount() {
        // this.fetchLighthouseData();
        this.fetchCompanyData();
        this.fetchProjectData();
    };

    handleCloseDialog = (event, reason) => {
        event.preventDefault();
        if (reason === 'clickaway') {
            return;
        }
        this.setState({ openDialog: false });
    }

    fetchCompanyData() {
        axios.get('/Company/602f0b2b2d925c5ba0817c7d')
            .then(res => {
                // console.log('Company data: ', res.data);
                // if (res.data.project !== undefined) {
                //   console.log('project: ', res.data.project);
                // };
                this.setState({
                    // company: res.data,
                    // project: res.data.projects,
                    lighthouseId: res.data.lighthouseDetails.id,
                    lighthouse: res.data.lighthouseDetails,
                });
                // console.log('company: ', this.state.company);
            })
            .catch(err => console.log('Error fetching company data: ', err));
    };

    updateLighthouseData() {
        io.socket.on('lighthouse', (msg) => {
            console.log(`socket.on | msg: ${msg}`);
            // this.fetchLighthouseData(msg);
            this.fetchCompanyData();
        })
    };

    fetchProjectData() {
        axios.get('/Lighthouse')
            .then(res => {
                for (const [, value] of Object.entries(res.data)) {
                    if (value.owner === "602f0b2b2d925c5ba0817c7d") {
                        // if (value.projects.lighthouse.id === this.state.lighthouse.id) {
                        console.log(value.projects);
                        this.setState({ project: value.projects });
                    }
                }
            })
    }

    deleteLighthouse(lighthouseId) {
        console.log(`delete ${lighthouseId}`);
        axios.delete(`/Lighthouse/${lighthouseId}`)
            .then(() => {
                console.log(`Deleted ${lighthouseId}`);
                this.setState({
                    openDialog: true,
                    dialogMessage: 'Lighthouse project deleted',
                    dialogColor: green[500],
                });
            })
            .catch(err => {
                console.log(`Delete error: ${err}`);
                this.setState({
                    openDialog: true,
                    dialogMessage: 'Failed to delete lighthouse project',
                    dialogColor: red[500],
                })
            })
    };

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
                                        <Table striped hover>
                                            <thead>
                                                <tr>
                                                    <th><center><b>No.</b></center></th>
                                                    {lighthouseInfo.map((info, key) => {
                                                        return <th key={key}><center><b>{info}</b></center></th>
                                                    })}
                                                    <th><center><b>Actions</b></center></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.state.lighthouse !== null && this.state.lighthouse.map((lighthouse, key) => {
                                                    return (
                                                        <tr key={key}>
                                                            <td><center>{key + 1}.</center></td>
                                                            <td><center>{lighthouse.lighthouseModel}</center></td>
                                                            <td><center>{lighthouse.lighthouseType}</center></td>
                                                            <td><center>{lighthouse.productivity}</center></td>
                                                            {lighthouse.sustainability !== undefined ?
                                                                <td><center>{lighthouse.sustainability[0]}</center></td>
                                                                :
                                                                <td><center>null</center></td>
                                                            }
                                                            {lighthouse.agility !== undefined ?
                                                                <td><center>{lighthouse.agility[0]}</center></td>
                                                                :
                                                                <td><center>null</center></td>
                                                            }
                                                            <td><center>{lighthouse.speedToMarket}</center></td>
                                                            <td><center>{lighthouse.customization}</center></td>
                                                            <td><center>{this.state.project.length}</center></td>
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
                                                    {this.state.color === green[500] ?
                                                        <div className={classes.root}>
                                                            <CheckCircleOutlineOutlined className="fa" style={{ color: this.state.color, fontSize: 60 }} />
                                                        </div>
                                                        :
                                                        <div>
                                                            <CancelOutlined className="fa" style={{ color: this.state.color, fontSize: 60 }} />
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
