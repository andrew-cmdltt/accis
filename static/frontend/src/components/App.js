import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {HashRouter as Router, Route, Switch} from "react-router-dom";
import {Provider} from 'react-redux'
import store from "../store";
import Login from "./Login/Login";
import PropTypes from "prop-types";
import Departments from "./Departments/Departments";
import Positions from "./Positions/Positions";
import Employees from "./Employees/Employees";
import Taxes from "./Taxes/Taxes";
import Salary from "./Salary/Salary";
import Reports from "./Reports/Reports";
import Notifications from "./Notifications/Notifications";
import SignIn from "./Login/Login";

class App extends Component {
    static propTypes = {
        isAuthenticated: PropTypes.bool,
    };

    render() {
        return (
            <Provider store={store}>
                <Router>
                    <div>
                        <Switch>
                            <Route path="/login" component={SignIn} />
                            <Route path="/departments" component={Departments} />
                            <Route path="/positions" component={Positions} />
                            <Route path="/employees" component={Employees} />
                            <Route path="/taxes" component={Taxes} />
                            <Route path="/salary" component={Salary} />
                            <Route path="/reports" component={Reports} />
                            <Route path="/notifications" component={Notifications} />
                        </Switch>
                    </div>
                </Router>
            </Provider>
        )
    }
}

ReactDOM.render(<App/>, document.getElementById('app'))

