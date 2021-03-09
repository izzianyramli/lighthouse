import React, { Component } from 'react';
import { Grid, Row, Col, Table, OverlayTrigger, Tooltip } from 'react-bootstrap';
import Card from 'components/Card/Card';
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';
import Button from "components/CustomButton/CustomButton";
import { Dialog, DialogContent, DialogContentText, makeStyles } from '@material-ui/core';
import { green, red } from '@material-ui/core/colors';
import { CancelOutlined, CheckCircleOutlineOutlined } from '@material-ui/icons';
import io from 'sailsSocket.js';

const projectInfo = [
    "Company",
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

class ProjectList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            project: [],
            openDialog: false,
            dialogMessage: '',
            dialogColo: null,
        };
    };

    componentDidMount() {
        this.fetchProjectData();
    };

    fetchProjectData(msg) {
        // { msg ? console.log('updating project data, msg: ', msg) : console.log('fetching data') }
        axios.get('/Project')
            .then(project => {
                console.log('Project: ', project.data);
                this.setState({ project: project.data });
            })
            .catch(err => console.log('Error to fetch project data: ', err));
    };

    updateProjectData() {
        io.socket.on('project', (msg) => {
            console.log(`socket.on | msg: ${msg}`);
            this.fetchProjectData(msg);
        })
    };

    deleteProject(projectId) {
        console.log(`delete ${projectId}`);
        axios.delete(`/Project/${projectId}`)
            .then(() => {
                console.log(`Deleted ${projectId}`);
                this.setState({
                    openDialog: true,
                    dialogMessage: 'Project details deleted',
                    dialogColor: green[500]
                });
            })
            .catch(err => {
                console.log(`Delete error: ${err}`);
                this.setState({
                    openDialog: true,
                    dialogMessage: 'Failed to delete project',
                    dialogColor: red[500],
                })
            })
    };

    editProject(projectId) {
        console.log(`edit ${projectId}`);
        axios.get(`/Project/${projectId}`)
            .then(res => {
                console.log(res.data);
                this.gotoProjectInfo('/admin/project-info');
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
                                                        <td><center>{proj.owner.companyName}</center></td>
                                                        <td><center>{proj.duration}</center></td>
                                                        <td><center>RM {nFormatter(proj.totalCost)}</center></td>
                                                        <td><center>{proj.sourceOfTechnology}</center></td>
                                                        {/* <td><center>{proj.detailsOfTechnology}</center></td> */}
                                                        <td><center>{proj.facilitationNeeded}</center></td>
                                                        {/* <td><center>Phase 1: {proj.phase.phase1}<br />Phase 2: {proj.phase.phase2}</center></td> */}
                                                        <td className="td-actions text-right"><center>
                                                            <OverlayTrigger placement="top" overlay={view}>
                                                                <Link to={{
                                                                    pathname: '/admin/project-info',
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
                                }
                            />
                        </Col>
                    </Row>
                </Grid>
            </div>
        )
    }
};

export default withRouter(ProjectList);