import React, {Component} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container';
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core";
import {styles} from "./styles";
import {connect} from "react-redux";
import {login} from "../../actions/auth";
import {compose} from "redux";
import {Redirect} from "react-router-dom";
import {getLabelName} from "../../utils/getLabelName";
import {getTextFieldType} from "../../utils/getTextFieldType";

class Login extends Component  {
    state = {
        login: '',
        password: '',
    };

    static propTypes = {
        login: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool,
        classes: PropTypes.object.isRequired,
    };

    onSubmit = (e) => {
        e.preventDefault();
        if (this.state.login && this.state.password) {
            this.props.login(this.state.login, this.state.password);
        }
    };

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    render() {
        console.log("load changes")

        if (this.props.isAuthenticated) {
            return <Redirect to="/departments" />;
        }

        const { classes } = this.props;

        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Авторизация
                    </Typography>
                    <form onSubmit={this.onSubmit} className={classes.form} noValidate>
                        {Object.keys(this.state).map((keyName) => (
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                type={getTextFieldType(keyName)}
                                key={keyName}
                                id={keyName}
                                label={getLabelName(keyName)}
                                name={keyName}
                                // autoFocus
                                onChange={this.onChange}
                            />
                        ))}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Войти
                        </Button>
                    </form>
                </div>
            </Container>
        );
    }
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
});

export default compose(
    connect(mapStateToProps, { login }),
    withStyles(styles)
)(Login)
