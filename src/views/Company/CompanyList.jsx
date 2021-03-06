import React, { Component } from 'react';
import {
    Grid,
    Row,
    Col,
    Breadcrumb,
    BreadcrumbItem,
    Table,
    OverlayTrigger,
    Tooltip,
} from 'react-bootstrap';
import Card from 'components/Card/Card';
import axios from 'axios';
import Button from "components/CustomButton/CustomButton";
import io from 'assets/sailsSocket';
import { Link } from 'react-router-dom';

import {
    Dialog,
    DialogContent,
    DialogContentText,
    makeStyles,
    Select,
    MenuItem,
} from '@material-ui/core';
import {
    green,
    red
} from '@material-ui/core/colors';
import {
    CancelOutlined,
    CheckCircleOutlineOutlined,
    Home,
    Add as AddIcon,
} from '@material-ui/icons';

const companyInfo = [
    "Name",
    // "Registration Number",
    // "Contact Person",
    // "Designation",
    // "Contact Number",
    // "Email",
    "Location",
    "Type",
    // "Product/Activity",
    "Industry/Division",
    // "Lighthouse Status",
    "Engagement Status",
    "Lighthouse Projects",
    // "Projects Involved"
];

const division = [
    {
        value: 'Advanced Technology and Research & Development',
        label: 'Advanced Technology and Research & Development'
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

class CompanyList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            company: [],
            openDialog: false,
            dialogMessage: '',
            dialogColor: null,
            companyDivision: '',
        };
        this.fetchCompanyData = this.fetchCompanyData.bind(this);
        this.updateCompanyData = this.updateCompanyData.bind(this);
        this.handleCloseDialog = this.handleCloseDialog.bind(this);
        this.deleteCompany = this.deleteCompany.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    };

    componentDidMount() {
        this.fetchCompanyData();
    };

    componentDidUpdate(prevProps, prevState) {
        if (this.state.companyDivision !== prevState.companyDivision) {
            this.fetchCompanyData();
        }
    }

    fetchCompanyData() {
        if (this.state.companyDivision !== '') {
            axios.get(`/company?industryDivision=${encodeURIComponent(this.state.companyDivision)}`)
                .then(company => {
                    this.setState({ company: company.data });
                })
                .catch(() => {
                    this.setState({ companyDivision: '' });
                });
        } else {
            axios.get('/Company')
                .then(company => {
                    this.setState({ company: company.data });
                })
                .catch(err => console.log("Error to fetch company data: ", err));
        }

    };

    updateCompanyData() {
        io.socket.on('company', (msg) => {
            this.fetchCompanyData(msg);
        })
    };

    handleCloseDialog = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({ openDialog: false });
    }

    deleteCompany(companyId) {
        axios.delete(`/Company/${companyId}`)
            .then(() => {
                this.setState({
                    openDialog: true,
                    dialogMessage: 'Company details deleted',
                    dialogColor: green[500],
                })
                this.fetchCompanyData();
            })
            .catch(() => {
                this.setState({
                    openDialog: true,
                    dialogMessage: 'Failed to delete company',
                    dialogColor: red[500],
                })
                this.fetchCompanyData();
            })
    };

    handleClick() {
        this.setState({ companyDivision: '' });
    };

    handleChange(event) {
        this.setState({ companyDivision: event.target.value, });
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
                                title="List of Company Registered"
                                ctTableFullWidth
                                ctTableResponsive
                                content={
                                    <div>
                                        <Breadcrumb>
                                            &nbsp;
                                            <BreadcrumbItem onClick={() => this.handleClick()}>
                                                <Home /> All Company
                                            </BreadcrumbItem>
                                            &nbsp;
                                            <BreadcrumbItem>
                                                Industry Division: &nbsp;
                                                <Select
                                                    id="division"
                                                    value={this.state.companyDivision}
                                                    onChange={(event) => this.handleChange(event)}
                                                    label="Industry Division"
                                                    autoWidth={true}
                                                    defaultValue={"None"}
                                                >
                                                    {division.map((option) => (
                                                        <MenuItem value={option.value}>{option.label}</MenuItem>
                                                    ))}
                                                </Select>
                                            </BreadcrumbItem>
                                        </Breadcrumb>

                                        <Link to={{
                                            pathname: '/admin/add-company',
                                        }}
                                        >
                                            <Button bsStyle="primary" ouline type="button" bsSize="small" pullRight>
                                                <AddIcon /> &nbsp;
                                                Add New Company
                                            </Button>
                                        </Link>
                                        <br />
                                        <Table striped hover>
                                            <thead>
                                                <tr>
                                                    <th><center><b>No.</b></center></th>
                                                    {companyInfo.map((info, key) => {
                                                        return <th key={key}><center><b>{info}</b></center></th>
                                                    })}
                                                    <th><center><b>Actions</b></center></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.state.company && this.state.company.map((comp, key) => {
                                                    return (
                                                        <tr key={key}>
                                                            <td><center>{key + 1}.</center></td>
                                                            <td><center>{comp.companyName}</center></td>
                                                            <td><center>{comp.location}</center></td>
                                                            <td><center>{comp.typeCompany}</center></td>
                                                            <td><center>{comp.industryDivision}</center></td>
                                                            <td><center>{comp.status}</center></td>
                                                            <td><center>{comp.lighthouseDetails.length}</center></td>
                                                            <td className="td-actions text-right"><center>
                                                                <OverlayTrigger placement="top" overlay={view}>
                                                                    <Link to={{
                                                                        pathname: `/admin/company-info/${comp.id}`,
                                                                    }}
                                                                    >
                                                                        <Button bsStyle="info" simple type="button" bsSize="large">
                                                                            <i className="fa fa-external-link" />
                                                                        </Button>
                                                                    </Link>
                                                                </OverlayTrigger>
                                                                <OverlayTrigger placement="top" overlay={remove}>
                                                                    <Button bsStyle="danger" simple type="button" bsSize="large" onClick={() => this.deleteCompany(comp.id)}>
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
        );
    }
}

export default CompanyList;