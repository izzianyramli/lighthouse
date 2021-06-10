import React, { Component } from 'react';
import { Grid, Row, Col, Table, OverlayTrigger, Tooltip } from 'react-bootstrap';
import Card from 'components/Card/Card';
import axios from 'axios';
import Button from "components/CustomButton/CustomButton";
import { Dialog, DialogContent, DialogContentText, makeStyles } from '@material-ui/core';
import { green, red } from '@material-ui/core/colors';
import { CancelOutlined, CheckCircleOutlineOutlined } from '@material-ui/icons';

const accountInfo = [
    "First Name",
    "Last Name",
    "Company",
    "Division",
    "Email",
    "Approval",
];

class Account extends Component {
    constructor(props) {
        super(props);
        this.state = {
            account: [],
            firstName: '',
            lastName: '',
            companyName: '',
            division: '',
            email: '',
            policy: null,
            approval: false,
            openDialog: false,
            dialogMessage: '',
            dialogColor: null,
        };
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

    fetchUser() {
        axios.get('/Account')
            .then(res => {
                console.log('account: ', res.data);
                this.setState({
                    account: res.data,
                });
            })
            .catch(err => console.log('Failed to fetch account data, ', err));
    }

    deleteUser(userId) {
        console.log(`delete ${userId}`);
        axios.delete(`/Account/${userId}`)
            .then(() => {
                console.log(`Deleted ${userId}`);
                this.setState({
                    openDialog: true,
                    dialogMessage: 'User account deleted',
                    dialogColor: green[500]
                });
            })
            .catch(err => {
                console.log(`Delete error: ${err}`);
                this.setState({
                    openDialog: true,
                    dialogMessage: 'Failed to delete user account',
                    dialogColor: red[500],
                })
            })
    };

    render() {
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
                                                            <td><center>{acc.division}</center></td>
                                                            <td><center>{acc.email}</center></td>
                                                            <td><center>{acc.approval ? "true" : "false" }</center></td>
                                                            <td className="td-actions text-right"><center>
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