/*!

=========================================================
* Light Bootstrap Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { Component } from "react";
import {
  Grid,
  Row,
  Col,
} from "react-bootstrap";

import { Card } from "components/Card/Card.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import { UserCard } from "components/UserCard/UserCard.jsx";
import Button from "components/CustomButton/CustomButton.jsx";

import avatar from "assets/img/faces/unknown-avatar.png";
import axios from "axios";

import {
  makeStyles,
  Dialog,
  DialogContent,
  DialogContentText,
} from '@material-ui/core';
import { green, red } from '@material-ui/core/colors';
import { CancelOutlined, CheckCircleOutlineOutlined } from '@material-ui/icons';

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: localStorage.getItem("userId"),
      company: "",
      email: "",
      firstName: "",
      lastName: "",
      disabled: true,
      editProfile: false,
      openDialog: false,
      dialogMessage: '',
      dialogColor: null,
    };
    this.fetchUserInfo = this.fetchUserInfo.bind(this);
  }

  componentDidMount() {
    this.fetchUserInfo();
  }

  handleCloseDialog = (event, reason) => {
    if (reason === 'clickaway') {
        return;
    }
    this.setState({ openDialog: false });
  }

  handleChange(event) {
    this.setState({
        [event.target.name]: event.target.value,
    });
  }

  handleSubmit(
    event,
    company,
    email,
    firstName,
    lastName
    ) {
      event.preventDefault();
      const payload = {
        company: company,
        email: email,
        firstName: firstName,
        lastName: lastName
      };
      axios.patch(`/Account/${this.state.userId}`, payload)
      .then(() => {
        this.setState({
          openDialog: true,
          dialogMessage: 'Account details updated',
          dialogColor: green[500]
        })
        this.fetchUserInfo();
      })
      .catch(() => {
          this.setState({
            openDialog: true,
            dialogMessage: 'Account details failed to update',
            dialogColor: red[500],
          })
      })
    }

  fetchUserInfo() {
    axios.get(`/Account/${this.state.userId}`)
      .then((res) => {
        this.setState({
          company: res.data.companyName,
          email: res.data.email,
          firstName: res.data.firstName,
          lastName: res.data.lastName
        });
      })
      .catch((err) => console.error('error to fetch user profile', err))
  }

  render() {
    const classes = makeStyles((theme) => ({
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
  }));

    let buttons;
    if (this.state.editProfile) {
      buttons = 
      <React.Fragment>
        <Button bsStyle="default" pullRight fill onClick={() => this.setState({ disabled: true, editProfile: false, })}>
          Cancel
        </Button>
        &nbsp;
        <Button bsStyle="success" pullRight fill onClick={(event) => {
          this.handleSubmit(
            event,
            this.state.company,
            this.state.email,
            this.state.firstName,
            this.state.lastName
          )
          this.setState({ disabled: true, editProfile: false, })
        }}>
          Save Changes 
        </Button>
      </React.Fragment>;
    }
    else {
      buttons = 
      <Button bsStyle="success" pullRight fill onClick={() => this.setState({ disabled: false, editProfile: true, })}>
        Edit Profile
      </Button>;
    }
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={8}>
              <Card
                title="Edit Profile"
                content={
                  <form>
                    <FormInputs
                      ncols={["col-md-6", "col-md-6"]}
                      properties={[
                        {
                          label: "Company",
                          name: "company",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Company",
                          onChange: (event) => this.handleChange(event),
                          value: this.state.companyName,
                          disabled: true
                        },
                        {
                          label: "Email address",
                          name: "email",
                          type: "email",
                          bsClass: "form-control",
                          placeholder: "Enter your email",
                          onChange: (event) => this.handleChange(event),
                          value: this.state.email,
                          disabled: this.state.disabled
                        }
                      ]}
                    />
                    <FormInputs
                      ncols={["col-md-6", "col-md-6"]}
                      properties={[
                        {
                          label: "First name",
                          name: "firstName",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "First name",
                          onChange: (event) => this.handleChange(event),
                          value: this.state.firstName,
                          disabled: this.state.disabled
                        },
                        {
                          label: "Last name",
                          name: "lastName",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Last name",
                          onChange: (event) => this.handleChange(event),
                          value: this.state.lastName,
                          disabled: this.state.disabled
                        }
                      ]}
                    />
                    {buttons}
                    {/* {this.state.editProfile ?
                      [<Button bsStyle="default" pullRight fill onClick={() => this.setState({ disabled: true, editProfile: false, })}>
                        Cancel
                      </Button>,
                      <Button bsStyle="success" pullRight fill onClick={(event) => {
                        this.handleSubmit(
                          event,
                          this.state.company,
                          this.state.email,
                          this.state.firstName,
                          this.state.lastName
                        )
                        this.setState({ disabled: true, editProfile: false, })
                      }}>
                        Save Changes 
                      </Button>]
                      :
                      <Button bsStyle="success" pullRight fill onClick={() => this.setState({ disabled: false, editProfile: true, })}>
                        Edit Profile
                      </Button>
                    } */}
                    <div className="clearfix" />
                  </form>
                }
              />
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
            </Col>
            <Col md={4}>
              <UserCard
                bgImage="https://ununsplash.imgix.net/photo-1431578500526-4d9613015464?fit=crop&fm=jpg&h=300&q=75&w=400"
                avatar={avatar}
                name={this.state.firstName + " " + this.state.lastName}
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default UserProfile;
