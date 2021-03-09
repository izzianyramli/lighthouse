import React, {Component} from 'react';
import {
    Grid,
    Row,
    Col
} from 'react-bootstrap';
import {Card} from 'components/Card/Card';
import MIDALogo from 'assets/img/mida-logo-1.png';
import {
    Link,
    withRouter
} from 'react-router-dom';

class RegisterSuccessPage extends Component {
    render() {
        return (
            <div className="content">
                <Grid fluid>
                    <Row>
                        <Col>
                        <Card
                            title="Registration success!"
                            content={
                                <div>
                                    <img src={MIDALogo} width="25%" height="150vh" alt="mida" />
                                    <h4><b>
                                        Your registration has been recorded <br/> 
                                        You will be verified through your email upon your account activation
                                    </b></h4>
                                    <h5>Back to <Link to="/login">login page </Link></h5>
                                </div>
                            }
                        />
                        </Col>
                    </Row>
                </Grid>
            </div>
        )
    };
};

export default withRouter(RegisterSuccessPage);