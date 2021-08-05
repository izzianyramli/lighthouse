import React, { Component } from 'react';
import {
    Grid,
    Row,
    Col,
    Table,
    OverlayTrigger,
    Tooltip,
} from 'react-bootstrap';
import Card from 'components/Card/Card';
import {
    TextField,
    makeStyles,
    Button,
    Typography,
    Dialog,
    DialogContent,
    DialogContentText,
    MenuItem,
} from '@material-ui/core';
import axios from 'axios';
import { green, red } from '@material-ui/core/colors';
import {
    Done,
    CancelOutlined,
    CheckCircleOutlineOutlined,
    Add as AddIcon,
    Edit as EditIcon,
} from '@material-ui/icons';
import { Link } from 'react-router-dom';

const projectInfo = [
    "Duration",
    "Total Cost",
    "Source of Technology",
    "Vendor",
];

// const lighthouseId = Object.values(props.match.params)[0];

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
};

class UserLighthouseDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lighthouseId: Object.values(props.match.params)[0],
            companyId: '',
            companyName: '',
            model: '',
            type: '',
            productivity: '',
            sustainability: '',
            agility: '',
            speedToMarket: '',
            customization: '',
            others: '',
            openDialog: false,
            dialogMessage: '',
            dialogColor: null,
            submitButton: 'Submit',
            disabled: true,
            editDisabled: false,
            project: [],
        };
        this.handleLighthouseData = this.handleLighthouseData.bind(this);
    };

    componentDidMount() {
        this.handleLighthouseData();
        const userId = localStorage.getItem("userId");
        this.fetchUserData(userId);
    }

    fetchUserData(user) {
        axios.get(`/Account/${user}`)
            .then((res) => {
                this.setState({
                    userProfile: res.data,
                    companyName: res.data.companyName
                });
                this.fetchCompanyId(res.data.companyName)
            })
    }

    fetchCompanyId(companyName) {
        axios.get(`/Company?companyName=${companyName}`)
            .then((res) => {
                this.setState({ companyId: res.data[0].id });
            })
    }

    handleCloseDialog = (event, reason) => {
        event.preventDefault();
        if (reason === 'clickaway') {
            return;
        }
        this.setState({ openDialog: false });
    }



    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };

    handleSubmitLighthouse(
        event,
        companyId,
        model,
        type,
        productivity,
        sustainability,
        agility,
        speedToMarket,
        customization,
        others
    ) {
        event.preventDefault();
        const payload = {
            company: companyId,
            lighthouseModel: model,
            lighthouseType: type,
            productivity: productivity,
            sustainability: sustainability,
            agility: agility,
            speedToMarket: speedToMarket,
            customization: customization,
            others: others,
        };
        if (this.state.submitButton === 'Submit') {
            axios.post('/Lighthouse', payload)
                .then(() => {
                    this.setState({
                        model: '',
                        type: '',
                        productivity: '',
                        sustainability: '',
                        agility: '',
                        speedToMarket: '',
                        customization: '',
                        others: '',
                        openDialog: true,
                        dialogMessage: 'Lighthouse details added',
                        dialogColor: green[500],
                        submitButton: 'Submit'
                    })
                })
                .catch(() => {
                    this.setState({
                        openDialog: true,
                        dialogMessage: 'Lighthouse details failed to update',
                        dialogColor: red[500],
                        submitButton: 'Submit'
                    })
                })
        } else if (this.state.submitButton === 'Edit details') {
            axios.patch(`/Lighthouse/${this.state.lighthouseId}`, payload)
                .then(() => {
                    this.setState({
                        model: '',
                        type: '',
                        productivity: '',
                        sustainability: '',
                        agility: '',
                        speedToMarket: '',
                        customization: '',
                        others: '',
                        openDialog: true,
                        dialogMessage: 'Lighthouse details edited',
                        dialogColor: green[500],
                        submitButton: 'Submit'
                    })
                })
                .catch(() => {
                    this.setState({
                        openDialog: true,
                        dialogMessage: 'Lighthouse details failed to update',
                        dialogColor: red[500],
                        submitButton: 'Edit details'
                    })
                })
        }
    }

    handleLighthouseData() {
        axios.get(`/Lighthouse/${this.state.lighthouseId}`)
            .then(res => {
                this.setState({
                    model: res.data.lighthouseModel,
                    type: res.data.lighthouseType,
                    productivity: res.data.productivity,
                    sustainability: res.data.sustainability,
                    agility: res.data.agility,
                    speedToMarket: res.data.speedToMarket,
                    customization: res.data.customization,
                    others: res.data.others,
                    submitButton: 'Edit details',
                    project: res.data.projects,
                });
                if (res.data.owner !== undefined) {
                    this.setState({
                        companyId: res.data.owner.id,
                        companyName: res.data.owner.companyName,
                    });
                };
            })
            .catch(err => console.log('error project data: ', err))
    }

    handleEdit() {
        this.setState({
            disabled: false,
            submitButton: 'Edit details'
        });
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

    getVendorCompany(vendorId) {
        var vendorName = "";
        axios.get(`/Company/${vendorId}`)
            .then(res => {
                vendorName = res.data.companyName;
                return (vendorName);
            })
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
                position: 'relative'
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
            extendedIcon: {
                marginRight: theme.spacing(1),
                position: 'absolute',
                top: theme.spacing(2),
                right: theme.spacing(2)
            }
        }));

        const model = [
            {
                value: '4 Walls',
                label: '4 Walls'
            },
            {
                value: 'End-to-End',
                label: 'End-to-End'
            }
        ];

        const type = [
            {
                value: 'Anchor',
                label: 'Anchor'
            },
            {
                value: 'Vendor',
                label: 'Vendor'
            }
        ];

        return (
            <div className="content">
                <Grid fluid>
                    <Row>
                        <Col md={12}>
                            <Card
                                title="Lighthouse Details"
                                content={
                                    <div className={classes.root}>

                                        &nbsp;
                                        <Button
                                            color="primary"
                                            variant="outlined"
                                            className={classes.button}
                                            onClick={() => this.handleEdit()}
                                            disabled={this.state.editDisabled}
                                        >
                                            <EditIcon /> &nbsp;
                                            Edit details
                                        </Button>
                                        &nbsp; <br />
                                        <form
                                            className={classes.textField}
                                            noValidate
                                            autoComplete='off'
                                        >
                                            &nbsp; <br />
                                            <Typography
                                                className={classes.title}
                                                align="left"
                                                color="textPrimary"
                                                gutterBottom
                                            >
                                                COMPANY
                                            </Typography>
                                            <TextField
                                                onChange={(event) => this.handleChange(event)}
                                                value={this.state.companyName}
                                                label="Company name"
                                                name="companyName"
                                                type="text"
                                                variant="outlined"
                                                style={{ margin: 8 }}
                                                fullWidth
                                                disabled={true}
                                            />

                                            <TextField
                                                onChange={(event) => this.handleChange(event)}
                                                value={this.state.companyId}
                                                label="Company ID"
                                                name="companyId"
                                                type="text"
                                                variant="outlined"
                                                style={{ margin: 8 }}
                                                fullWidth
                                                disabled={true}
                                            />
                                            &nbsp; <br />
                                            <Typography
                                                className={classes.title}
                                                align="left"
                                                color="textPrimary"
                                                gutterBottom
                                            >
                                                LIGHTHOUSE INFO
                                            </Typography>
                                            <TextField
                                                onChange={(event) => this.handleChange(event)}
                                                value={this.state.model}
                                                label="Model"
                                                name="model"
                                                type="text"
                                                variant="outlined"
                                                style={{ margin: 8 }}
                                                fullWidth
                                                select
                                                disabled={this.state.disabled}
                                            >
                                                {model.map((option) => (
                                                    <MenuItem key={option.value} value={option.value}>
                                                        {option.label}
                                                    </MenuItem>
                                                ))}
                                            </TextField>

                                            <TextField
                                                onChange={(event) => this.handleChange(event)}
                                                value={this.state.type}
                                                label="Type"
                                                name="type"
                                                type="text"
                                                variant="outlined"
                                                style={{ margin: 8 }}
                                                fullWidth
                                                select
                                                disabled={this.state.disabled}
                                            >
                                                {type.map((option) => (
                                                    <MenuItem key={option.value} value={option.value}>
                                                        {option.label}
                                                    </MenuItem>
                                                ))}
                                            </TextField>

                                            <TextField
                                                onChange={(event) => this.handleChange(event)}
                                                value={this.state.productivity}
                                                label="Productivity "
                                                name="productivity"
                                                type="text"
                                                variant="outlined"
                                                style={{ margin: 8 }}
                                                fullWidth
                                                disabled={this.state.disabled}
                                            />

                                            <TextField
                                                onChange={(event) => this.handleChange(event)}
                                                value={this.state.sustainability}
                                                label="Sustainability"
                                                name="sustainability"
                                                type="text"
                                                variant="outlined"
                                                style={{ margin: 8 }}
                                                fullWidth
                                                disabled={this.state.disabled}
                                            />

                                            <TextField
                                                onChange={(event) => this.handleChange(event)}
                                                value={this.state.agility}
                                                label="Agility"
                                                name="agility"
                                                type="text"
                                                variant="outlined"
                                                style={{ margin: 8 }}
                                                fullWidth
                                                disabled={this.state.disabled}
                                            />

                                            <TextField
                                                onChange={(event) => this.handleChange(event)}
                                                value={this.state.speedToMarket}
                                                label="Speed to Market"
                                                name="speedToMarket"
                                                type="text"
                                                variant="outlined"
                                                style={{ margin: 8 }}
                                                fullWidth
                                                disabled={this.state.disabled}
                                            />

                                            <TextField
                                                onChange={(event) => this.handleChange(event)}
                                                value={this.state.customization}
                                                label="Customization"
                                                name="customization"
                                                type="text"
                                                variant="outlined"
                                                style={{ margin: 8 }}
                                                fullWidth
                                                disabled={this.state.disabled}
                                            />

                                            <TextField
                                                onChange={(event) => this.handleChange(event)}
                                                value={this.state.others}
                                                label="Others"
                                                name="others"
                                                type="text"
                                                variant="outlined"
                                                style={{ margin: 8 }}
                                                fullWidth
                                                disabled={this.state.disabled}
                                            />

                                            &nbsp; <br />
                                            <Button
                                                className={classes.button}
                                                variant="outlined"
                                                color="default"
                                                onClick={(event) => this.handleSubmitLighthouse(
                                                    event,
                                                    this.state.companyId,
                                                    this.state.model,
                                                    this.state.type,
                                                    this.state.productivity,
                                                    this.state.sustainability,
                                                    this.state.agility,
                                                    this.state.speedToMarket,
                                                    this.state.customization,
                                                    this.state.others,
                                                )}
                                                disabled={this.state.disabled}
                                            >
                                                {/* {this.state.submitButton} */}
                                                Submit
                                                &nbsp;
                                                <Done fontSize="small" style={{ color: green[500] }} />
                                            </Button>
                                            &nbsp;
                                            <Button
                                                className={classes.button}
                                                variant="outlined"
                                                color="default"
                                                onClick={() => this.setState({ disabled: true })}
                                                disabled={this.state.disabled}
                                            >
                                                Cancel
                                            </Button>
                                        </form>

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

                    <Row>
                        <Col md={12}>
                            <Card
                                title="List of Projects"
                                ctTableFullWidth
                                ctTableResponsive
                                content={
                                    <div className={classes.root}>
                                        {/* <Link to={{
                                            pathname: `user/add-project/${this.state.lighthouseId}`
                                        }}> */}
                                            <Button
                                                color="primary"
                                                variant="outlined"
                                                className={classes.button}
                                                // onClick={() => this.handleAddProject()}
                                                href={`/user/add-project/${this.state.lighthouseId}`}
                                            >
                                                <AddIcon /> &nbsp;
                                                Add new project
                                            </Button>
                                        {/* </Link> */}
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
                                                            <td><center>{proj.duration}</center></td>
                                                            <td><center>RM {nFormatter(proj.totalCost)}</center></td>
                                                            <td><center>{proj.sourceOfTechnology}</center></td>
                                                            {proj.vendor !== null ?
                                                                <td><center>{this.getVendorCompany(proj.vendor)}</center></td>
                                                                :
                                                                <td><center>null</center></td>
                                                            }
                                                            <td className="td-actions text-right"><center>
                                                                <OverlayTrigger placement="top" overlay={view}>
                                                                    <Link to={{
                                                                        pathname: `/user/project-info/${proj.id}`,
                                                                    }}
                                                                    >
                                                                        <Button bsStyle="info" simple type="button" bsSize="large">
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

export default UserLighthouseDetails;