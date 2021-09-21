import React, { Component } from 'react';
import {
    Grid,
    Row,
    Col,
} from 'react-bootstrap';
import Card from 'components/Card/Card';
import { TextField, Typography, Button, makeStyles } from '@material-ui/core';
import { Done } from '@material-ui/icons';
import { green } from '@material-ui/core/colors';
import axios from 'axios';

class ProjectUpdate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: "",
            checklists: "",
            achievements: "",
            problems: "",
            files: null,
            projectId: Object.values(props.match.params)[0],
        }
    }

    redirectPage(path) {
        this.props.history.push(path);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(
        event,
        date,
        checklists,
        achievements,
        problems,
        files
    ) {
        event.preventDefault();
        const payload = {
            project: this.state.projectId,
            date: date,
            checklists: checklists,
            achievements: achievements,
            problems: problems,
        };
        axios.post('/ProjectUpdate', payload)
            .then(() => {
                this.clearForm();
                this.redirectPage(`/user/project-info/${this.state.projectId}`);
            });
    }

    clearForm() {
        this.setState({
            date: "",
            checklists: "",
            achievements: "",
            problems: "",
            files: null,
        });
    }

    render() {

        const classes = makeStyles((theme) => ({
            textField: {
                marginLeft: theme.spacing(1),
                marginRight: theme.spacing(1),
                width: 750,
            },
            button: {
                margin: theme.spacing(1),
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
                                title="Project Updates"
                                content={
                                    <div className={classes.root}>
                                        <form
                                            className={classes.textField}
                                            noValidate
                                            autoComplete="off"
                                        >
                                            &nbsp; <br />
                                            <TextField
                                                onChange={(event) => this.handleChange(event)}
                                                value={this.state.date}
                                                // label="Date"
                                                name="date"
                                                type="date"
                                                variant="outlined"
                                                style={{ margin: 8 }}
                                                fullWidth
                                            />
                                             &nbsp; <br />
                                            <TextField
                                                onChange={(event) => this.handleChange(event)}
                                                value={this.state.checklists}
                                                label="Checklists"
                                                name="checklists"
                                                type="text"
                                                variant="outlined"
                                                style={{ margin: 8 }}
                                                fullWidth
                                            />
                                             &nbsp; <br />
                                            <TextField
                                                onChange={(event) => this.handleChange(event)}
                                                value={this.state.achievements}
                                                label="Achievements"
                                                name="achievements"
                                                type="text"
                                                variant="outlined"
                                                style={{ margin: 8 }}
                                                fullWidth
                                            />
                                            &nbsp; <br />
                                            <Typography
                                                className={classes.title}
                                                align="left"
                                                color="textPrimary"
                                                gutterBottom
                                            >
                                                Upload related files/images
                                            </Typography>
                                            <TextField
                                                onChange={(event) => this.handleChange(event)}
                                                value={this.state.files}
                                                label="Files/Images"
                                                name="files"
                                                type="text"
                                                variant="outlined"
                                                style={{ margin: 8 }}
                                                fullWidth
                                            />
                                            &nbsp; <br />
                                        </form>
                                        <Button
                                            className={classes.button}
                                            variant="outlined"
                                            color="default"
                                            onClick={(event) => this.handleSubmit(
                                                event,
                                                this.state.date,
                                                this.state.checklists,
                                                this.state.achievements,
                                                this.state.problems,
                                                this.state.files
                                            )}
                                        >
                                            SUBMIT
                                            &nbsp;
                                            <Done fontSize="small" style={{ color: green[500] }} />
                                        </Button>
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

export default ProjectUpdate;