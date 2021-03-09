import React, { Component } from 'react';
import {
    Grid,
    Row,
    Col,
} from 'react-bootstrap';
// import Button from 'components/CustomButton/CustomButton';
import Card from 'components/Card/Card';
import {
    TextField,
    makeStyles,
    Button,
    Typography,
    Dialog,
    DialogContent,
    DialogContentText,
    MenuItem
} from '@material-ui/core';
import axios from 'axios';
import { green, red } from '@material-ui/core/colors';
import { Done, CancelOutlined, CheckCircleOutlineOutlined } from '@material-ui/icons';

class CompanyDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            companyName: "",
            registrationNumber: "",
            contactPerson: "",
            designation: "",
            contactNumber: "",
            email: "",
            location: "",
            typeCompany: "",
            productActivity: "",
            industryDivision: "",
            status: "",
            engagementStatus: [],
            openDialog: false,
            dialogMessage: '',
            color: null,
            currentData: {},
            submitButton: 'Submit',
            companyId: '',
        };
        this.handleCompanyData = this.handleCompanyData.bind(this);
    };

    componentDidMount() {
        this.handleCompanyData();
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
        companyName,
        registrationNumber,
        contactPerson,
        designation,
        contactNumber,
        email,
        location,
        typeCompany,
        productActivity,
        industryDivision,
        status,
        engagementStatus
    ) {
        event.preventDefault();
        const payload = {
            companyName: companyName,
            registrationNumber: registrationNumber,
            contactPerson: contactPerson,
            designation: designation,
            contactNumber: contactNumber,
            email: email,
            location: location,
            typeCompany: typeCompany,
            productActivity: productActivity,
            industryDivision: industryDivision,
            status: status,
            engagementStatus: engagementStatus
        };
        console.log('payload', payload);
        if (this.state.submitButton === 'Submit') {
            axios.post('/Company', payload)
                .then((res) => {
                    this.setState({
                        companyName: '',
                        registrationNumber: '',
                        contactPerson: '',
                        designation: '',
                        contactNumber: '',
                        email: '',
                        location: '',
                        typeCompany: '',
                        productActivity: '',
                        industryDivision: '',
                        status: '',
                        engagementStatus: '',
                        openDialog: true,
                        dialogMessage: 'Company details added',
                        color: green[500],
                        submitButton: 'Submit'
                    })
                })
                .catch((err) => {
                    this.setState({
                        openDialog: true,
                        dialogMessage: 'Company details failed to update',
                        color: red[500],
                        submitButton: 'Submit'
                    })
                })
        } else if (this.state.submitButton === 'Edit details') {
            axios.patch(`/Company/${this.state.companyId}`, payload)
                .then((res) => {
                    // console.log(`Edited ${res.data.companyName}`);
                    this.setState({
                        companyName: '',
                        registrationNumber: '',
                        contactPerson: '',
                        designation: '',
                        contactNumber: '',
                        email: '',
                        location: '',
                        typeCompany: '',
                        productActivity: '',
                        industryDivision: '',
                        status: '',
                        engagementStatus: '',
                        openDialog: true,
                        dialogMessage: 'Company details edited',
                        color: green[500],
                        submitButton: 'Submit'
                    })
                })
                .catch((err) => {
                    this.setState({
                        openDialog: true,
                        dialogMessage: 'Company details failed to update',
                        color: red[500],
                        submitButton: 'Edit details'
                    })
                })
        }

    }

    handleCompanyData() {
        // console.log('company: ', this.props.location.companyProps);
        if (this.props.location.companyProps !== undefined) {
            // console.log(this.props.location.companyProps.id);
            this.setState({ companyId: this.props.location.companyProps.id });
            axios.get(`/Company/${this.props.location.companyProps.id}`)
                .then(res => {
                    console.log('company data: ', res.data);
                    this.setState({
                        companyName: res.data.companyName,
                        registrationNumber: res.data.registrationNumber,
                        contactPerson: res.data.contactPerson,
                        designation: res.data.designation,
                        contactNumber: res.data.contactNumber,
                        email: res.data.email,
                        location: res.data.location,
                        typeCompany: res.data.typeCompany,
                        productActivity: res.data.productActivity,
                        industryDivision: res.data.industryDivision,
                        status: res.data.status,
                        engagementStatus: res.data.engagementStatus,
                        submitButton: 'Edit details'
                    });
                })
                .catch(err => console.log('error company data: ', err))
        };
    }

    render() {

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

        const status = [
            {
                value: 'Engaged',
                label: 'Engaged'
            },
            {
                value: 'To be verify',
                label: 'To be verify'
            },
            {
                value: 'To initiate',
                label: 'To initiate'
            }
        ];

        const type = [
            {
                value: 'MNC',
                label: 'MNC'
            },
            {
                value: 'Malaysian',
                label: 'Malaysian'
            }
        ]

        const division = [
            {
                value: 'Advanced technology and Research & Development',
                label: 'Advanced technology and Research & Development'
            },
            {
                value: 'Building Technology and Lifestyle',
                label: 'Building Technology and Lifestyle',
            },
            {
                value: 'Business Services and Regional Operations',
                label: 'Business Services and Regional Operations'
            },
            {
                value: 'Chemical and Advanced Materials',
                label: 'Chemical and Advanced Materials'
            },
            {
                value: 'Ecosystem Partner',
                label: 'Ecosystem Partner'
            },
            {
                value: 'Electrical and Electronics',
                label: 'Electrical and Electronics'
            },
            {
                value: 'Food Technology and Resource Based Industries',
                label: 'Food Technology and Resource Based Industries'
            },
            {
                value: 'Green Technology',
                label: 'Green Technology',
            },
            {
                value: 'Healthcare, Education and Hospitality',
                label: 'Healthcare, Education and Hospitality'
            },
            {
                value: 'Life Sciences and Medical Technology',
                label: 'Life Sciences and Medical Technology',
            },
            {
                value: 'Machinery and Metals',
                label: 'Machinery and Metals'
            },
            {
                value: 'Oil and Gas, Maritime and Logistics Services',
                label: 'Oil and Gas, Maritime and Logistics Services'
            },
            {
                value: 'Transportation Technology',
                label: 'Transportation Technology'
            }
        ];

        return (
            <div className="content">
                <Grid fluid>
                    <Row>
                        <Col md={12}>
                            <Card
                                title="Company Details"
                                content={
                                    <div className={classes.root}>
                                        <form
                                            className={classes.textField}
                                            noValidate
                                            autoComplete='off'
                                        >
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
                                            />

                                            <TextField
                                                onChange={(event) => this.handleChange(event)}
                                                value={this.state.registrationNumber}
                                                label="Registration number"
                                                name="registrationNumber"
                                                type="text"
                                                variant="outlined"
                                                style={{ margin: 8 }}
                                                fullWidth
                                            />

                                            <TextField
                                                onChange={(event) => this.handleChange(event)}
                                                value={this.state.location}
                                                label="Location"
                                                name="location"
                                                type="text"
                                                variant="outlined"
                                                style={{ margin: 8 }}
                                                fullWidth
                                            />

                                            <TextField
                                                onChange={(event) => this.handleChange(event)}
                                                value={this.state.typeCompany}
                                                label="Company type"
                                                name="typeCompany"
                                                type="text"
                                                variant="outlined"
                                                style={{ margin: 8 }}
                                                fullWidth
                                                select
                                            >
                                                {type.map((option) => (
                                                    <MenuItem key={option.value} value={option.value}>
                                                        {option.label}
                                                    </MenuItem>
                                                ))}

                                            </TextField>

                                            <TextField
                                                onChange={(event) => this.handleChange(event)}
                                                value={this.state.productActivity}
                                                label="Product/Activity"
                                                name="productActivity"
                                                type="text"
                                                variant="outlined"
                                                style={{ margin: 8 }}
                                                fullWidth
                                            />

                                            <TextField
                                                onChange={(event) => this.handleChange(event)}
                                                value={this.state.industryDivision}
                                                label="Industry/Division"
                                                name="industryDivision"
                                                type="text"
                                                variant="outlined"
                                                style={{ margin: 8 }}
                                                fullWidth
                                                select
                                            >
                                                {division.map((option) => (
                                                    <MenuItem key={option.value} value={option.value}>
                                                        {option.label}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                            &nbsp; <br />
                                            <Typography
                                                className={classes.title}
                                                align="left"
                                                color="textPrimary"
                                                gutterBottom
                                            >
                                                CONTACT PERSON DETAILS
                                            </Typography>
                                            <TextField
                                                onChange={(event) => this.handleChange(event)}
                                                value={this.state.contactPerson}
                                                label="Contact person"
                                                name="contactPerson"
                                                type="text"
                                                variant="outlined"
                                                style={{ margin: 8 }}
                                                fullWidth
                                            />

                                            <TextField
                                                onChange={(event) => this.handleChange(event)}
                                                value={this.state.designation}
                                                label="Designation"
                                                name="designation"
                                                type="text"
                                                variant="outlined"
                                                style={{ margin: 8 }}
                                                fullWidth
                                            />

                                            <TextField
                                                onChange={(event) => this.handleChange(event)}
                                                value={this.state.contactNumber}
                                                label="Contact number"
                                                name="contactNumber"
                                                type="text"
                                                variant="outlined"
                                                style={{ margin: 8 }}
                                                fullWidth
                                            />

                                            <TextField
                                                onChange={(event) => this.handleChange(event)}
                                                value={this.state.email}
                                                label="Email"
                                                name="email"
                                                type="email"
                                                variant="outlined"
                                                style={{ margin: 8 }}
                                                fullWidth
                                            />
                                            &nbsp; <br />
                                            <Typography
                                                className={classes.title}
                                                align="left"
                                                color="textPrimary"
                                                gutterBottom
                                            >
                                                COMPANY STATUS
                                            </Typography>
                                            <TextField
                                                onChange={(event) => this.handleChange(event)}
                                                value={this.state.status}
                                                label="Status"
                                                name="status"
                                                type="text"
                                                variant="outlined"
                                                style={{ margin: 8 }}
                                                fullWidth
                                                select
                                            >
                                                {status.map((option) => (
                                                    <MenuItem key={option.value} value={option.value}>
                                                        {option.label}
                                                    </MenuItem>
                                                ))}
                                            </TextField>

                                            <TextField
                                                onChange={(event) => this.handleChange(event)}
                                                value={this.state.engagementStatus}
                                                label="Engagement status"
                                                name="engagementStatus"
                                                type="text"
                                                variant="outlined"
                                                style={{ margin: 8 }}
                                                fullWidth
                                            />

                                        </form>

                                        &nbsp; <br />
                                        <Button
                                            className={classes.button}
                                            variant="outlined"
                                            color="default"
                                            onClick={(event) => this.handleSubmit(
                                                event,
                                                this.state.companyName,
                                                this.state.registrationNumber,
                                                this.state.contactPerson,
                                                this.state.designation,
                                                this.state.contactNumber,
                                                this.state.email,
                                                this.state.location,
                                                this.state.typeCompany,
                                                this.state.productActivity,
                                                this.state.industryDivision,
                                                this.state.status,
                                                this.state.engagementStatus
                                            )}
                                        >
                                            {this.state.submitButton}
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
                </Grid>
            </div>
        )
    };
};

export default CompanyDetails;
