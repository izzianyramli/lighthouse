import React, { Component } from 'react';
import {
    Grid,
    Row,
    Col,
    Table,
    OverlayTrigger,
    Tooltip,
    // Modal
} from 'react-bootstrap';
import Card from 'components/Card/Card';
// import { thArray, tdArray } from 'variables/Variables';
import axios from 'axios';
import Button from "components/CustomButton/CustomButton";
import io from 'sailsSocket.js';
// import CompanyDetails from './CompanyDetails';
import {
    Link,
    withRouter,
} from 'react-router-dom';

import {
    Dialog,
    DialogContent,
    DialogContentText,
    makeStyles,
} from '@material-ui/core';
import {
    green,
    red
} from '@material-ui/core/colors';
import { CancelOutlined, CheckCircleOutlineOutlined } from '@material-ui/icons';


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
    "Projects Involved"
];

class CompanyList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            company: [],
            openDialog: false,
            dialogMessage: '',
            dialogColor: null,
        };
    };

    componentDidMount() {
        this.fetchCompanyData();
    };

    fetchCompanyData() {
        axios.get('/Company')
            .then(company => {
                console.log("Company: ", company.data);
                this.setState({ company: company.data });
            })
            .catch(err => console.log("Error to fetch company data: ", err));
    };

    updateCompanyData() {
        io.socket.on('company', (msg) => {
            console.log(`socket.on | msg: ${msg}`);
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
        console.log(`delete ${companyId}`);
        axios.delete(`/Company/${companyId}`)
            .then(() => {
                console.log(`Deleted ${companyId}`);
                this.setState({
                    openDialog: true,
                    dialogMessage: 'Company details deleted',
                    dialogColor: green[500],
                })
            })
            .catch(err => {
                console.log(`Delete error: ${err}`);
                this.setState({
                    openDialog: true,
                    dialogMessage: 'Failed to delete company',
                    dialogColor: red[500],
                })
            })
    };

    editCompany(companyId) {
        console.log(`edit ${companyId}`);
        axios.get(`/Company/${companyId}`)
            .then(res => {
                console.log(res.data);
                this.gotoCompanyInfo('/admin/company-info');
            })
            .catch(err => console.log(err))
    };

    gotoCompanyInfo(path) {
        this.props.history.push(path);
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
                                title="List of Company Registered"
                                ctTableFullWidth
                                ctTableResponsive
                                content={
                                    <div>
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
                                                            {/* <td><center>{comp.registrationNumber}</center></td> */}
                                                            {/* <td><center>{comp.contactPerson}</center></td> */}
                                                            {/* <td key={key}><center>{comp.designation}</center></td> */}
                                                            {/* <td key={key}><center>{comp.contactNumber}</center></td> */}
                                                            {/* <td key={key}><center>{comp.email}</center></td> */}
                                                            <td><center>{comp.location}</center></td>
                                                            <td><center>{comp.typeCompany}</center></td>
                                                            {/* <td><center>{comp.productActivity}</center></td> */}
                                                            <td><center>{comp.industryDivision}</center></td>
                                                            {/* {comp.lighthouseDetails[0] ?
                                                                <td><center>Model: {comp.lighthouseDetails[0].lighthouseModel} ({comp.lighthouseDetails[0].lighthouseType})</center></td>
                                                                :
                                                                <td><center>{' '}</center></td>

                                                            } */}
                                                            {/* <td><center>{comp.lighthouseDetails[0].lighthouseModel}<br/>{comp.lighthouseDetails[0].lighthouseType}</center></td> */}
                                                            <td><center>{comp.status}</center></td>
                                                            <td><center>{comp.lighthouseDetails.length}</center></td>
                                                            <td><center>{comp.projects.length}</center></td>


                                                            <td className="td-actions text-right"><center>
                                                                <OverlayTrigger placement="top" overlay={view}>
                                                                    <Link to={{
                                                                        pathname: '/admin/company-info',
                                                                        companyProps: {
                                                                            id: comp.id
                                                                        }
                                                                    }}
                                                                    >
                                                                        <Button bsStyle="info" simple type="button" bsSize="large"
                                                                            onClick={() => this.editCompany(comp.id)}
                                                                        >
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

export default withRouter(CompanyList);
// export default CompanyList;