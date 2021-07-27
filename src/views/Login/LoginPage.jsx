import React, { Component } from 'react';
import { FormInputs } from 'components/FormInputs/FormInputs.jsx';
import {
    Grid,
    Row,
    Col,
} from 'react-bootstrap';
import { Card } from 'components/Card/Card.jsx';
import Button from 'components/CustomButton/CustomButton.jsx';
import MIDALogo from 'assets/img/mida-logo-1.png';

import {
    Link,
    withRouter,
} from "react-router-dom";
import axios from 'axios';
import { Typography } from '@material-ui/core';

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            success: null,
            errorMessage: null,
        }
        this.gotoDashboard = this.gotoDashboard.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.submitLoginInfo = this.submitLoginInfo.bind(this);
    }

    gotoDashboard(path) {
        this.props.history.push(path);
    };

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    submitLoginInfo(event, email, password) {
        event.preventDefault();
        const payload = {
            email: email,
            password: password
        };

        axios.post('/login', payload)
            .then((res) => {
                this.setState({ success: res.data.user });
                // if (res.data.user.approval === true) {
                    if (res.data.user.accountType === "user") {
                        this.setState({ errorMessage: null });
                        localStorage.setItem('userId', res.data.user.id);
                        this.gotoDashboard(`/user/dashboard`);
                    } else if (res.data.user.accountType === "admin") {
                        this.setState({ errorMessage: null });
                        localStorage.setItem('userId', res.data.user.id);
                        this.gotoDashboard(`/admin/dashboard`);
                    } else {
                        this.setState({ errorMessage: res.data.message.message });
                    }
                // } else {
                //     this.setState({ errorMessage: 'Account is not approve yet' });
                // }

            })
            .catch(() => {
                this.setState({ success: null, errorMessage: "Cannot login.\nInternal server error" });
            });
    }

    render() {
        return (
            <div className="content">
                <Grid fluid>
                    <Row>
                        <Col>
                            <Card
                                title="Welcome to Lighthouse Portal"
                                content={
                                    <div>
                                        <img src={MIDALogo} width="25%" height="150vh" alt="mida" />
                                        <form
                                            noValidate
                                            autoComplete='off'
                                        >
                                            <FormInputs
                                                ncols={["col-md-12", "col-md-12"]}
                                                properties={[
                                                    {
                                                        label: "Email",
                                                        name: "email",
                                                        type: "email",
                                                        bsClass: "form-control",
                                                        placeholder: "Enter your email address",
                                                        onChange: (event) => this.handleChange(event),
                                                        value: this.state.email
                                                    },
                                                    {
                                                        label: "Password",
                                                        name: "password",
                                                        type: "password",
                                                        bsClass: "form-control",
                                                        placeholder: "Enter your password",
                                                        onChange: (event) => this.handleChange(event),
                                                        value: this.state.password
                                                    }
                                                ]}
                                            />
                                        </form>
                                        <h5>Don't have account? <Link to="/register">Register here</Link></h5>
                                        <Button bsStyle="success" pullLeft fill as="input" type="submit" value="Submit"
                                            onClick={(event) => this.submitLoginInfo(event, this.state.email, this.state.password)}
                                        >
                                            Login
                                        </Button>
                                        <br />
                                        <br />
                                        {this.state.errorMessage ?
                                            <Typography color="error" variant="h5">
                                                {this.state.errorMessage}
                                            </Typography>
                                            :
                                            null
                                        }
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

export default withRouter(LoginPage);