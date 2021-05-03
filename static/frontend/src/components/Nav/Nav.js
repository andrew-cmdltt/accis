import React, {Component} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {NavLink, Redirect} from "react-router-dom";
import {Container, withStyles} from "@material-ui/core";
import {navLinkStyles, styles} from "./styles";
import {compose} from "redux";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import Links from "./Links";
import {logout} from "../../actions/auth";

class Nav extends Component {
    static propTypes = {
        isAuthenticated: PropTypes.bool,
        classes: PropTypes.object.isRequired,
        auth: PropTypes.object.isRequired,
        logout: PropTypes.func.isRequired
    };

    render() {
        if (!this.props.isAuthenticated) {
            return <Redirect to="/login"/>;
        }

        const {classes} = this.props;

        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <Container maxWidth="md" className={classes.navbarDisplayFlex}>
                            <Links classes={classes} roleId={this.props.auth.user.role_id}/>
                            <Typography variant="h6" className={classes.title}>
                                <NavLink to="/notifications" style={navLinkStyles}>
                                    Уведомления
                                </NavLink>
                            </Typography>
                            <Button
                                onClick={this.props.logout.bind(this)}
                                color="secondary"
                                variant="contained"
                            >
                                Выйти
                            </Button>
                        </Container>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    auth: state.auth
});

export default compose(
    connect(mapStateToProps, {logout}),
    withStyles(styles),
)(Nav)