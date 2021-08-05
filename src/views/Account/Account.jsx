import React, { Component } from 'react';
import { Grid, Row, Col, Table, OverlayTrigger, Tooltip, Modal } from 'react-bootstrap';
import Card from 'components/Card/Card';
import axios from 'axios';
import Button from "components/CustomButton/CustomButton";
import { Dialog, DialogContent, DialogContentText, makeStyles, TextField, MenuItem } from '@material-ui/core';
import { green, red } from '@material-ui/core/colors';
import { CancelOutlined, CheckCircleOutlineOutlined } from '@material-ui/icons';

const accountInfo = [
    "First Name",
    "Last Name",
    "Company",
    "Email",
    "Approval",
    "Access Type"
];

class Account extends Component {
    constructor(props) {
        super(props);
        this.state = {
            account: [],
            accountId: '',
            firstName: '',
            lastName: '',
            companyName: '',
            division: '',
            email: '',
            policy: null,
            approval: false,
            accountType: '',
            openDialog: false,
            dialogMessage: '',
            dialogColor: null,
            showEditModal: false,
        };
        this.fetchUser = this.fetchUser.bind(this);
    };

    componentDidMount() {
        this.fetchUser();
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

    toggleModal = () => this.setState({ showEditModal: false });

    fetchUser() {
        axios.get('/Account')
            .then(res => {
                this.setState({
                    account: res.data,
                });
            })
            .catch(err => console.log('Failed to fetch account data, ', err));
    }

    updateAccount(userId, userApproval, userType) {
        const payload = {
            approval: userApproval,
            accountType: userType
        }
        axios.patch(`/Account/${userId}`, payload)
            .then(() => {
                this.setState({
                    openDialog: true,
                    dialogMessage: 'User account updated',
                    dialogColor: green[500],
                    showEditModal: false,
                });
            })
            .catch(() => {
                this.setState({
                    openDialog: true,
                    dialogMessage: 'Failed to update user account',
                    dialogColor: red[500],
                })
            })
    }

    deleteUser(userId) {
        axios.delete(`/Account/${userId}`)
            .then(() => {
                this.setState({
                    openDialog: true,
                    dialogMessage: 'User account deleted',
                    dialogColor: green[500]
                });
            })
            .catch(() => {
                this.setState({
                    openDialog: true,
                    dialogMessage: 'Failed to delete user account',
                    dialogColor: red[500],
                })
            })
    };

    Capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }


    render() {
        const remove = <Tooltip id="remove_tooltip">Delete</Tooltip>;
        const view = <Tooltip id="edit_tooltip">View</Tooltip>;
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

        const approvalStatus = [
            {
                value: true,
                label: "Approved"
            },
            {
                value: false,
                label: "Pending"
            }
        ];

        const typeAccount = [
            {
                value: "admin",
                label: "Admin"
            },
            {
                value: "user",
                label: "User"
            }
        ];


        return (
            <div className="content" style={{ backgroundColor: "#FFFFFF" }}>
                <Grid fluid>
                    <Row>
                        <Col>
                            <Card
                                title="List of User"
                                ctTableFullWidth
                                ctTableResponsive
                                content={
                                    <div>
                                        <Table striped hover>
                                            <thead>
                                                <tr>
                                                    <th><center><b>No.</b></center></th>
                                                    {accountInfo.map((info, key) => {
                                                        return <th key={key}><center><b>{info}</b></center></th>
                                                    })}
                                                    <th><center><b>Actions</b></center></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.state.account && this.state.account.map((acc, key) => {
                                                    return (
                                                        <tr key={key}>
                                                            <td><center>{key + 1}.</center></td>
                                                            <td><center>{acc.firstName}</center></td>
                                                            <td><center>{acc.lastName}</center></td>
                                                            <td><center>{acc.companyName}</center></td>
                                                            {/* <td><center>{acc.division}</center></td> */}
                                                            <td><center>{acc.email}</center></td>
                                                            <td><center>{acc.approval ? "Approved" : "Pending"}</center></td>
                                                            <td><center>{this.Capitalize(acc.accountType)}</center></td>
                                                            <td className="td-actions text-right"><center>
                                                                <OverlayTrigger placement="top" overlay={view}>
                                                                    <Button bsStyle="info" simple type="button" bsSize="large" onClick={() => this.setState({
                                                                        showEditModal: true,
                                                                        accountId: acc.id,
                                                                        firstName: acc.firstName,
                                                                        lastName: acc.lastName,
                                                                        companyName: acc.companyName,
                                                                        division: acc.division,
                                                                        email: acc.email,
                                                                        approval: acc.approval,
                                                                        accountType: acc.accountType
                                                                    })}>
                                                                        <i className="fa fa-external-link" />
                                                                    </Button>
                                                                </OverlayTrigger>
                                                                &nbsp;
                                                                &nbsp;
                                                                <OverlayTrigger placement="top" overlay={remove}>
                                                                    <Button bsStyle="danger" simple type="button" bsSize="large" onClick={() => this.deleteUser(acc.id)}>
                                                                        <i className="fa fa-trash-o" />
                                                                    </Button>
                                                                </OverlayTrigger>
                                                            </center></td>
                                                        </tr>
                                                    )
                                                })}
                                            </tbody>
                                        </Table>

                                        <Modal show={this.state.showEditModal} handleClose={this.toggleModal}>
                                            <Modal.Header closeButton>Edit account</Modal.Header>
                                            <Modal.Body>
                                                <form
                                                    className={classes.textField}
                                                    noValidate
                                                    autoComplete='off'
                                                >
                                                    <TextField
                                                        onChange={(event) => this.handleChange(event)}
                                                        value={this.state.firstName}
                                                        label="First name"
                                                        name="firstName"
                                                        type="text"
                                                        variant="outlined"
                                                        style={{ margin: 8 }}
                                                        fullWidth
                                                        disabled={true}
                                                    />
                                                    <TextField
                                                        onChange={(event) => this.handleChange(event)}
                                                        value={this.state.lastName}
                                                        label="Last name"
                                                        name="lastName"
                                                        type="text"
                                                        variant="outlined"
                                                        style={{ margin: 8 }}
                                                        fullWidth
                                                        disabled={true}
                                                    />
                                                    <TextField
                                                        onChange={(event) => this.handleChange(event)}
                                                        value={this.state.companyName}
                                                        label="Company"
                                                        name="companyName"
                                                        type="text"
                                                        variant="outlined"
                                                        style={{ margin: 8 }}
                                                        fullWidth
                                                        disabled={true}
                                                    />
                                                    <TextField
                                                        onChange={(event) => this.handleChange(event)}
                                                        value={this.state.division}
                                                        label="Division"
                                                        name="division"
                                                        type="text"
                                                        variant="outlined"
                                                        style={{ margin: 8 }}
                                                        fullWidth
                                                        disabled={true}
                                                    />
                                                    <TextField
                                                        onChange={(event) => this.handleChange(event)}
                                                        value={this.state.email}
                                                        label="Email address"
                                                        name="email"
                                                        type="text"
                                                        variant="outlined"
                                                        style={{ margin: 8 }}
                                                        fullWidth
                                                        disabled={true}
                                                    />
                                                    <TextField
                                                        onChange={(event) => this.handleChange(event)}
                                                        value={this.state.approval}
                                                        label="Approval status"
                                                        name="approval"
                                                        type="text"
                                                        variant="outlined"
                                                        style={{ margin: 8 }}
                                                        fullWidth
                                                        select
                                                    >
                                                        {approvalStatus.map((option) => (
                                                            <MenuItem key={option.value} value={option.value}>
                                                                {option.label}
                                                            </MenuItem>
                                                        ))}
                                                    </TextField>
                                                    <TextField
                                                        onChange={(event) => this.handleChange(event)}
                                                        value={this.state.accountType}
                                                        label="Account type"
                                                        name="accountType"
                                                        type="text"
                                                        variant="outlined"
                                                        style={{ margin: 8 }}
                                                        fullWidth
                                                        select
                                                    >
                                                        {typeAccount.map((option) => (
                                                            <MenuItem key={option.value} value={option.value}>
                                                                {option.label}
                                                            </MenuItem>
                                                        ))}
                                                    </TextField>
                                                </form>
                                            </Modal.Body>
                                            <Modal.Footer>
                                                <Button bsStyle="warning" simple type="button" onClick={this.toggleModal}>
                                                    Cancel
                                                </Button>
                                                <Button bsStyle="success" simple type="button"
                                                    onClick={(event) => {
                                                        event.preventDefault();
                                                        this.updateAccount(this.state.accountId, this.state.approval, this.state.accountType);
                                                    }}
                                                >
                                                    Save
                                                </Button>
                                            </Modal.Footer>
                                        </Modal>

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
}

export default Account;