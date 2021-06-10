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

class RegisterPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            companyName: '',
            division: '',
            email: '',
            password: '',
            policy: false,
        }
    }

    gotoRegisterSuccess(path) {
        this.props.history.push(path);
    };

    handleChange(event) {
        console.log(event.target.value);
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    submitAccountDetails(
        event,
        firstName,
        lastName,
        companyName,
        division,
        email,
        password,
        policy
    ) {
        event.preventDefault();
        const payload = {
            firstName: firstName,
            lastName: lastName,
            companyName: companyName,
            division: division,
            email: email,
            password: password,
            policy: policy
        };

        axios.post('/Account', payload)
            .then(res => {
                console.log('registration success, res: ', res);
                this.gotoRegisterSuccess('/register-success');
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
                                        <form
                                            noValidate
                                            autoComplete='off'
                                        >
                                            <h4><b>Name</b></h4>
                                            <FormInputs
                                                ncols={["col-md-6", "col-md-6"]}
                                                properties={[
                                                    {
                                                        label: "First Name",
                                                        name: "firstName",
                                                        type: "text",
                                                        bsClass: "form-control",
                                                        placeholder: "Enter your first name",
                                                        onChange: (event) => this.handleChange(event),
                                                        value: this.state.firstName,
                                                    },
                                                    {
                                                        label: "Last Name",
                                                        name: "lastName",
                                                        type: "text",
                                                        bsClass: "form-control",
                                                        placeholder: "Enter your last name",
                                                        onChange: (event) => this.handleChange(event),
                                                        value: this.state.lastName
                                                    },
                                                ]}
                                            />
                                            <h4><b>Company information</b></h4>
                                            <FormInputs
                                                ncols={["col-md-6", "col-md-6"]}
                                                properties={[
                                                    {
                                                        label: "Company Name",
                                                        name: "companyName",
                                                        type: "text",
                                                        bsClass: "form-control",
                                                        placeholder: "Enter your company name",
                                                        onChange: (event) => this.handleChange(event),
                                                        value: this.state.companyName
                                                    },
                                                    {
                                                        label: "Division",
                                                        name: "division",
                                                        type: "text",
                                                        bsClass: "form-control",
                                                        placeholder: "Enter your division in company",
                                                        onChange: (event) => this.handleChange(event),
                                                        value: this.state.division
                                                    },
                                                ]}
                                            />
                                            <h4><b>Account information</b></h4>
                                            <FormInputs
                                                ncols={["col-md-6", "col-md-3", "col-md-3"]}
                                                properties={[
                                                    {
                                                        label: "Email",
                                                        name: "email",
                                                        type: "email",
                                                        bsClass: "form-control",
                                                        placeholder: "Enter your email",
                                                        onChange: (event) => this.handleChange(event),
                                                        value: this.state.email
                                                    },
                                                    {
                                                        label: "Password",
                                                        name: "password",
                                                        type: "password",
                                                        bsClass: "form-control",
                                                        placeholder: "Enter your preferred password",
                                                        onChange: (event) => this.handleChange(event),
                                                        value: this.state.password
                                                    },
                                                    {
                                                        type: "password",
                                                        bsClass: "form-control",
                                                        placeholder: "Re-enter password"
                                                    },
                                                ]}
                                            />
                                            <CustomCheckbox
                                                isChecked={this.state.policy}
                                                name="policy"
                                                number={1}
                                                label={`I have read and agree with the Terms and Conditions`}
                                                inline={false}
                                            />
                                        </form>
                                        <h5>Already have an account? <Link to="/login">Login here</Link></h5>
                                        <Button
                                            bsStyle="success"
                                            pullLeft fill
                                            as="input"
                                            type="submit"
                                            value="Submit"
                                            onClick={(event) => this.submitAccountDetails(
                                                event,
                                                this.state.firstName,
                                                this.state.lastName,
                                                this.state.companyName,
                                                this.state.division,
                                                this.state.email,
                                                this.state.password,
                                                this.state.policy
                                            )}
                                        >
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