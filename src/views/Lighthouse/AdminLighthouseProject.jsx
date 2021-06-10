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
    "Company",
    "Model",
    "Type",
    "Star Ranking",
    // "Productivity",
    // "Sustainability",
    // "Agility",
    // "Speed to Market",
    // "Customization",
    // "Others"
];

class AdminLighthouse extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lighthouse: [],
            openDialog: false,
            dialogMessage: '',
            dialogColor: null,
        };
    };

    componentDidMount() {
        this.fetchLighthouseData();
    };

    handleCloseDialog = (event, reason) => {
        event.preventDefault();
        if (reason === 'clickaway') {
            return;
        }
        this.setState({ openDialog: false });
    }

    fetchLighthouseData() {
        axios.get('/Lighthouse')
            .then(lighthouse => {
                this.setState({ lighthouse: lighthouse.data })
            })
            .catch(err => console.log('Error to fetch lighthouse data: ', err));
    };

    updateLighthouseData() {
        io.socket.on('lighthouse', () => {
            this.fetchLighthouseData();
        })
    };

    deleteLighthouse(lighthouseId) {
        axios.delete(`/Lighthouse/${lighthouseId}`)
            .then(() => {
                this.setState({
                    openDialog: true,
                    dialogMessage: 'Lighthouse project deleted',
                    dialogColor: green[500],
                });
            })
            .catch(() => {
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
                                        <Table striped hover filter>
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
                                                {this.state.lighthouse && this.state.lighthouse.map((lighthouse, key) => {
                                                    return (
                                                        <tr key={key}>
                                                            <td><center>{key + 1}.</center></td>
                                                            {lighthouse.owner !== null ?
                                                                <td><center>{lighthouse.owner.companyName}</center></td>
                                                                :
                                                                <td><center>null</center></td>
                                                            }
                                                            <td><center>{lighthouse.lighthouseModel}</center></td>
                                                            <td><center>{lighthouse.lighthouseType}</center></td>
                                                            <td><center>{lighthouse.starRanking}</center></td>
                                                            {/* <td><center>
                                                            {lighthouse.productivity.productivity}
                                                        </center></td> 
                                                        <td><center>
                                                            {lighthouse.sustainability[0]}
                                                        </center></td>
                                                        <td><center>{lighthouse.agility[0]}</center></td>
                                                        <td><center>{lighthouse.speedToMarket[0]}</center></td>
                                                        <td><center>{lighthouse.customization}</center></td>
                                                        {/* <td><center>{lighthouse.others}</center></td> */}
                                                            <td className="td-actions text-right"><center>
                                                                <OverlayTrigger placement="top" overlay={view}>
                                                                    <Link to={{
                                                                        pathname: `/admin/lighthouse-info/${lighthouse.id}`,
                                                                    }}
                                                                    >
                                                                        <Button bsStyle="info" simple type="button" bsSize="large">
                                                                            <i className="fa fa-external-link" />
                                                                        </Button>

                                                                    </Link>
                                                                </OverlayTrigger>
                                                                <OverlayTrigger placement="top" overlay={remove}>
                                                                    <Button bsStyle="danger" simple type="button" bsSize="large
                                                                " onClick={() => this.deleteLighthouse(lighthouse.id)}>
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

export default AdminLighthouse;
