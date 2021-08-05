import React, { Component } from 'react';
import {
    Grid,
    Row,
    Col,
    Table,
    OverlayTrigger,
    Tooltip
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
    Checkbox,
    FormControlLabel,
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

const projectUpdates = [
    "Date",
    "Checklists",
    "Achievements",
    "Problems"
]

class AdminProjectDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            companyId: '',
            companyName: '',
            duration: "",
            totalCost: "",
            sourceOfTechnology: "",
            detailsOfTechnology: "",
            facilitationNeeded: "",
            phase: [],
            openDialog: false,
            dialogMessage: '',
            color: null,
            submitButton: 'Submit',
            projectId: Object.values(props.match.params)[0],
            disabled: true,
            editDisabled: false,
            projectUpdates: [],
        };
        this.handleProjectData = this.handleProjectData.bind(this);
    };

    componentDidMount() {
        this.handleProjectData();
    }

    handleCloseDialog = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({ openDialog: false });
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    handleSubmit(
        event,
        companyId,
        duration,
        totalCost,
        sourceOfTechnology,
        detailsOfTechnology,
        facilitationNeeded,
        phase
    ) {
        event.preventDefault();
        const payload = {
            owner: companyId,
            duration: duration,
            totalCost: totalCost,
            sourceOfTechnology: sourceOfTechnology,
            detailsOfTechnology: detailsOfTechnology,
            facilitationNeeded: facilitationNeeded,
            phase: [phase]
        };
        if (this.state.submitButton === 'Submit') {
            axios.post('/Project', payload)
                .then(() => {
                    this.setState({
                        duration: '',
                        totalCost: '',
                        sourceOfTechnology: '',
                        detailsOfTechnology: '',
                        facilitationNeeded: '',
                        phase: [],
                        openDialog: true,
                        dialogMessage: 'Project details added',
                        color: green[500],
                        submitButton: 'Submit'
                    })
                })
                .catch(() => {
                    this.setState({
                        openDialog: true,
                        dialogMessage: 'Project details failed to update',
                        color: red[500],
                        submitButton: 'Submit'
                    })
                })
        } else if (this.state.submitButton === 'Edit') {
            axios.patch(`/Project/${this.state.projectId}`, payload)
                .then(() => {
                    this.setState({
                        duration: '',
                        totalCost: '',
                        sourceOfTechnology: '',
                        detailsOfTechnology: '',
                        facilitationNeeded: '',
                        phase: [],
                        openDialog: true,
                        dialogMessage: 'Project details edited',
                        color: green[500],
                        submitButton: 'Submit'
                    })
                })
                .catch(() => {
                    this.setState({
                        openDialog: true,
                        dialogMessage: 'Project details failed to update',
                        color: red[500],
                        submitButton: 'Edit'
                    })
                })
        }
    }

    handleProjectData() {
        axios.get(`/Project/${this.state.projectId}`)
            .then(res => {
                this.setState({
                    companyId: res.data.lighthouse.owner,
                    // companyName: red.data.owner.companyName,
                    duration: res.data.duration,
                    totalCost: res.data.totalCost,
                    sourceOfTechnology: res.data.sourceOfTechnology,
                    detailsOfTechnology: res.data.detailsOfTechnology,
                    facilitationNeeded: res.data.facilitationNeeded,
                    submitButton: 'Edit details',
                    projectUpdates: res.data.projectUpdate
                });
            })
            .catch(err => console.log('error project data: ', err))
        // };
    }

    handleEdit() {
        this.setState({
            disabled: false,
            submitButton: 'Edit details'
        });
    }

    handleAddDetails() {
        this.setState({
            duration: '',
            totalCost: '',
            sourceOfTechnology: '',
            detailsOfTechnology: '',
            facilitationNeeded: '',
            phase: [],
            submitButton: 'Submit',
            disabled: false,
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

        const source = [
            {
                value: 'Foreign',
                label: 'Foreign'
            },
            {
                value: 'Local',
                label: 'Local'
            },
            {
                value: 'Both',
                label: 'Both'
            }
        ];

        const facilitation = [
            {
                value: 'Incentives/Grant',
                label: 'Incentives/Grant'
            },
            {
                value: 'Talent/Training',
                label: 'Talent/Training'
            },
            {
                value: 'Logistic',
                label: 'Logistic'
            },
            {
                value: 'Vendor',
                label: 'Vendor'
            },
            {
                value: 'Supplier',
                label: 'Supplier'
            },
            {
                value: 'Marker',
                label: 'Market'
            },
            {
                value: 'Technical Support',
                label: 'Technical Support'
            },
            {
                value: 'Waste Management',
                label: 'Waste Management'
            },
            {
                value: 'Warehousing',
                label: 'Warehousing'
            },
            {
                value: 'TBD',
                label: 'TBD'
            },
        ]

        return (
            <div className="content">
                <Grid fluid>
                    <Row>
                        <Col md={12}>
                            <Card
                                title="Project Details"
                                content={
                                    <div className={classes.root}>
                                        {/* <Button
                                            color="primary"
                                            variant="outlined"
                                            className={classes.button}
                                            onClick={() => this.handleAddDetails()}
                                        >
                                            <AddIcon /> &nbsp;
                                            Add New Project
                                        </Button> */}
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
                                        &nbsp;
                                        <Link to={{
                                            pathname: `/admin/project-update/${this.state.projectId}`
                                        }}>
                                            <Button
                                                color="primary"
                                                variant="outlined"
                                                className={classes.button}
                                                disabled
                                            >
                                                <AddIcon /> &nbsp;
                                                Add Project Updates
                                            </Button>
                                        </Link>

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
                                                PROJECT INFO
                                            </Typography>
                                            <TextField
                                                onChange={(event) => this.handleChange(event)}
                                                value={this.state.duration}
                                                label="Duration"
                                                name="duration"
                                                type="text"
                                                variant="outlined"
                                                style={{ margin: 8 }}
                                                fullWidth
                                                disabled={this.state.disabled}
                                            />

                                            <TextField
                                                onChange={(event) => this.handleChange(event)}
                                                value={this.state.totalCost}
                                                label="Total Cost"
                                                name="totalCost"
                                                type="text"
                                                variant="outlined"
                                                style={{ margin: 8 }}
                                                fullWidth
                                                disabled={this.state.disabled}
                                            />

                                            <TextField
                                                onChange={(event) => this.handleChange(event)}
                                                value={this.state.sourceOfTechnology}
                                                label="Source of Technology"
                                                name="sourceOfTechnology"
                                                type="text"
                                                variant="outlined"
                                                style={{ margin: 8 }}
                                                fullWidth
                                                select
                                                disabled={this.state.disabled}
                                            >
                                                {source.map((option) => (
                                                    <MenuItem key={option.value} value={option.value}>
                                                        {option.label}
                                                    </MenuItem>
                                                ))}
                                            </TextField>

                                            <TextField
                                                onChange={(event) => this.handleChange(event)}
                                                value={this.state.detailsOfTechnology}
                                                label="Details of Technology"
                                                name="detailsOfTechnology"
                                                type="text"
                                                variant="outlined"
                                                style={{ margin: 8 }}
                                                fullWidth
                                                disabled={this.state.disabled}
                                            />

                                            <TextField
                                                onChange={(event) => this.handleChange(event)}
                                                value={this.state.phase}
                                                label="Phase"
                                                name="phase"
                                                type="text"
                                                variant="outlined"
                                                style={{ margin: 8 }}
                                                fullWidth
                                                disabled={this.state.disabled}
                                            />

                                            &nbsp; <br />
                                            <Typography
                                                className={classes.title}
                                                align="left"
                                                color="textPrimary"
                                                gutterBottom
                                            >
                                                FACILITATIONS NEEDED
                                            </Typography>

                                            {facilitation.map((option) => (
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            onChange={(event) => this.handleChange(event)}
                                                            key={option.value}
                                                            name={option.value}
                                                            value={option.value}
                                                            color="primary"
                                                        />
                                                    }
                                                    label={option.label}
                                                    disabled={this.state.disabled}
                                                />
                                            ))}
                                        </form>

                                        &nbsp; <br />
                                        <Button
                                            className={classes.button}
                                            variant="outlined"
                                            color="default"
                                            onClick={(event) => this.handleSubmit(
                                                event,
                                                this.state.companyId,
                                                this.state.duration,
                                                this.state.totalCost,
                                                this.state.sourceOfTechnology,
                                                this.state.detailsOfTechnology,
                                                this.state.facilitationNeeded,
                                                this.state.phase,
                                            )}
                                            disabled={this.state.disabled}
                                        >
                                            {/* {this.state.submitButton} */}
                                            SUBMIT
                                            &nbsp;
                                            <Done fontSize="small" style={{ color: green[500] }} />
                                        </Button>
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

                    <Row>
                        <Col md={12}>
                            <Card
                                title="Project Updates"
                                ctTableFullWidth
                                ctTableResponsive
                                content={
                                    <div>
                                        <Table striped hover>
                                            <thead>
                                                <tr>
                                                    <th><center><b>No.</b></center></th>
                                                    {projectUpdates.map((info, key) => {
                                                        return <th key={key}><center><b>{info}</b></center></th>
                                                    })}
                                                    <th><center><b>Actions</b></center></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.state.projectUpdates && this.state.projectUpdates.map((proj, key) => {
                                                    return (
                                                        <tr key={key}>
                                                            <td><center>{key + 1}.</center></td>
                                                            <td><center>{proj.date}</center></td>
                                                            <td><center>{proj.checklists}</center></td>
                                                            <td><center>{proj.achievements}</center></td>
                                                            <td><center>{proj.problems}</center></td>
                                                            <td className="td-actions text-right"><center>
                                                                <OverlayTrigger placement="top" overlay={view}>
                                                                    <Link to={{
                                                                        pathname: `/admin/project-update/${proj.id}`,
                                                                    }}
                                                                    >
                                                                        <Button bsStyle="info" simple type="button" bsSize="large">
                                                                            <i className="fa fa-external-link" />
                                                                        </Button>
                                                                    </Link>
                                                                </OverlayTrigger>
                                                                <OverlayTrigger placement="top" overlay={remove}>
                                                                    <Button bsStyle="danger" simple type="button" bsSize="large" onClick={() => this.deleteProject(proj.id)}>
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
    };
};

export default AdminProjectDetails;
