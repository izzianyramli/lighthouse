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

class LoginPage extends Component {

    gotoDashboard(path) {
        this.props.history.push(path);
    };

    render() {

        // const history = useHistory();

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
                                        <form>
                                            <FormInputs
                                                ncols={["col-md-12", "col-md-12"]}
                                                properties={[
                                                    {
                                                        label: "Email",
                                                        type: "email",
                                                        bsClass: "form-control",
                                                        placeholder: "Enter your email address",
                                                    },
                                                    {
                                                        label: "Password",
                                                        type: "password",
                                                        bsClass: "form-control",
                                                        placeholder: "Enter your password"
                                                    }
                                                ]}
                                            />
                                            <h5>Dont't have account? <Link to="/register">Register here</Link></h5>
                                            <Button bsStyle="success" pullLeft fill as="input" type="submit" value="Submit" onClick={() => this.gotoDashboard('/admin/dashboard')} >
                                                Login
                                            </Button>
                                            <br />
                                        </form>
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