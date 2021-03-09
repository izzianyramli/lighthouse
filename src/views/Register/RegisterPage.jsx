import React, { Component } from 'react';
import { FormInputs } from 'components/FormInputs/FormInputs';
import CustomCheckbox from 'components/CustomCheckbox/CustomCheckbox';
import {
    Grid,
    Row,
    Col,
} from 'react-bootstrap';
import { Card } from 'components/Card/Card';
import Button from 'components/CustomButton/CustomButton';
import MIDALogo from 'assets/img/mida-logo-1.png';
import {
    Link,
    withRouter
} from 'react-router-dom';
import axios from 'axios';

var values = {
    firstName: '',
    lastName: '',
    companyName: '',
    division: '',
    email: '',
    password: '',
    policy: false,
};

class RegisterPage extends Component {

    gotoDashboard(path) {
        this.props.history.push(path);
    };

    submitAccountDetails(event, values) {
        event.preventDefault();
        const payload = {
            firstName: values.firstName,
            lastName: values.lastName,
            companyName: values.companyName,
            division: values.division,
            email: values.email,
            password: values.password,
            policy: values.policy
        };

        axios.post('/Account', payload)
            .then(res => {
                console.log('registration success, res: ', res);
                this.gotoDashboard('/admin/dashboard');
            })
            .catch(err => console.log('registration failed, err: ', err));
    };

    render() {
        return (
            <div className="content">
                <Grid fluid>
                    <Row>
                        <Col>
                            <Card
                                title="Register your account"
                                content={
                                    <div>
                                        <img src={MIDALogo} width="25%" height="150vh" alt="mida" />
                                        <form>
                                            <h4><b>Name</b></h4>
                                            <FormInputs
                                                ncols={["col-md-6", "col-md-6"]}
                                                properties={[
                                                    {
                                                        label: "First Name",
                                                        type: "text",
                                                        bsClass: "form-control",
                                                        placeholder: "Enter your first name",
                                                        value: values.firstName,
                                                    },
                                                    {
                                                        label: "Last Name",
                                                        type: "text",
                                                        bsClass: "form-control",
                                                        placeholder: "Enter your last name",
                                                        value: values.lastName
                                                    },
                                                ]}
                                            />
                                            <h4><b>Company information</b></h4>
                                            <FormInputs
                                                ncols={["col-md-6", "col-md-6"]}
                                                properties={[
                                                    {
                                                        label: "Company Name",
                                                        type: "text",
                                                        bsClass: "form-control",
                                                        placeholder: "Enter your company name",
                                                        value: values.companyName
                                                    },
                                                    {
                                                        label: "Division",
                                                        type: "text",
                                                        bsClass: "form-control",
                                                        placeholder: "Enter your division in company",
                                                        value: values.division
                                                    },
                                                ]}
                                            />
                                            <h4><b>Account information</b></h4>
                                            <FormInputs
                                                ncols={["col-md-6", "col-md-3", "col-md-3"]}
                                                properties={[
                                                    {
                                                        label: "Email",
                                                        type: "email",
                                                        bsClass: "form-control",
                                                        placeholder: "Enter your email",
                                                        value: values.email
                                                    },
                                                    {
                                                        label: "Password",
                                                        type: "password",
                                                        bsClass: "form-control",
                                                        placeholder: "Enter your preferred password",
                                                        value: values.password
                                                    },
                                                    {
                                                        type: "password",
                                                        bsClass: "form-control",
                                                        placeholder: "Re-enter password"
                                                    },
                                                ]}
                                            />
                                            <CustomCheckbox
                                                isChecked={true}
                                                number={1}
                                                label={`I have read and agree with the Terms and Conditions`}
                                                inline={false}
                                                value={values.policy}
                                            />
                                        </form>
                                        <h5>Already have an account? <Link to="/login">Login here</Link></h5>
                                        <Button bsStyle="success" pullLeft fill as="input" type="submit" value="Submit" onClick={(event) => this.submitAccountDetails(event, [values])} >
                                            Register
                                        </Button>
                                        <br />
                                    </div>
                                }
                            />
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    };
};

export default withRouter(RegisterPage);