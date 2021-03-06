import React, { Component } from 'react';
import { Grid, Row, Col, Table, OverlayTrigger, Tooltip } from 'react-bootstrap';
import Card from 'components/Card/Card';
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';
import Button from "components/CustomButton/CustomButton";
import { Dialog, DialogContent, DialogContentText, makeStyles } from '@material-ui/core';
import { green, red } from '@material-ui/core/colors';
import { CancelOutlined, CheckCircleOutlineOutlined } from '@material-ui/icons';
import io from 'assets/sailsSocket';

const projectInfo = [
    // "Company",
    "Duration",
    "Total Cost",
    "Source of Technology",
    // "Details of Technology",
    "Facilitations Needed",
    // "Phase"
];

function nFormatter(num) {
    if (num >= 1000000000000) {
        return (num / 1000000000000).toFixed(1).replace(/\.0$/, '') + 'T';
    }
    // if (num >= 100000000) {
    //     return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'G';
    // }
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    }
    if (num > 1000) {
        return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
    }
    return num;
}

class UserProjectList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            project: [],
            openDialog: false,
            dialogMessage: '',
            dialogColor: null,
        };
    };

    componentDidMount() {
        this.fetchCompanyData();
    };

    fetchCompanyData() {
        axios.get('/Company/602f3effd90dbc6c9dc0323e')
            .then(res => {
                this.setState({
                    company: res.data,
                    project: res.data.projects,
                    lighthouse: res.data.lighthouseDetails
                });
            })
            .catch(err => console.log('Error fetching company data: ', err));
    };

    updateProjectData() {
        io.socket.on('project', () => {
            this.fetchCompanyData();
        })
    };

    handleCloseDialog = (event, reason) => {
        event.preventDefault();
        if (reason === 'clickaway') {
            return;
        }
        this.setState({ openDialog: false });
    }

    deleteProject(projectId) {
        axios.delete(`/Project/${projectId}`)
            .then(() => {
                this.setState({
                    openDialog: true,
                    dialogMessage: 'Project details deleted',
                    dialogColor: green[500]
                });
            })
            .catch(() => {
                this.setState({
                    openDialog: true,
                    dialogMessage: 'Failed to delete project',
                    dialogColor: red[500],
                })
            })
    };

    editProject(projectId) {
        axios.get(`/Project/${projectId}`)
            .then(() => {
                this.gotoProjectInfo(`/user/project-info/${projectId}`);
            })
            .catch(err => console.log(err))
    };

    gotoProjectInfo(path) {
        this.props.history.push(path);
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
                                title="List of Projects"
                                ctTableFullWidth
                                ctTableResponsive
                                content={
                                    <div>
                                        <Table striped hover>
                                            <thead>
                                                <tr>
                                                    <th><center><b>No.</b></center></th>
                                                    {projectInfo.map((info, key) => {
                                                        return <th key={key}><center><b>{info}</b></center></th>
                                                    })}
                                                    <th><center><b>Actions</b></center></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.state.project && this.state.project.map((proj, key) => {
                                                    return (
                                                        <tr key={key}>
                                                            <td><center>{key + 1}.</center></td>
                                                            {/* <td><center>{proj.owner.companyName}</center></td> */}
                                                            <td><center>{proj.duration}</center></td>
                                                            <td><center>RM {nFormatter(proj.totalCost)}</center></td>
                                                            <td><center>{proj.sourceOfTechnology}</center></td>
                                                            {/* <td><center>{proj.detailsOfTechnology}</center></td> */}
                                                            <td><center>{proj.facilitationNeeded}</center></td>
                                                            {/* <td><center>Phase 1: {proj.phase.phase1}<br />Phase 2: {proj.phase.phase2}</center></td> */}
                                                            <td className="td-actions text-right"><center>
                                                                <OverlayTrigger placement="top" overlay={view}>
                                                                    <Link to={{
                                                                        pathname: `/user/project-info/${proj.id}`,
                                                                        projectProps: {
                                                                            id: proj.id
                                                                        }
                                                                    }}
                                                                    >
                                                                        <Button bsStyle="info" simple type="button" bsSize="large"
                                                                            onClick={() => this.editProject(proj.id)}
                                                                        >
                                                                            <i className="fa fa-external-link" />
                                                                        </Button>

                                                                    </Link>
                                                                </OverlayTrigger>
                                                                <OverlayTrigger placement="top" overlay={remove}>
                                                                    <Button bsStyle="danger" simple type="button" bsSize="large
                                                                " onClick={() => this.deleteProject(proj.id)}>
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
                                                            <CheckCircleOutlineOutlined className="fa" style={{ color: this.state.dialogColor, fontSize: 60 }} />
                                                        </div>
                                                        :
                                                        <div>
                                                            <CancelOutlined className="fa" style={{ color: this.state.dialogColor, fontSize: 60 }} />
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
};

export default withRouter(UserProjectList);