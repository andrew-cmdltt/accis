import { combineReducers } from 'redux';
import department from "./department";
import departments from "./departments";
import position from "./position";
import positions from "./positions"
import employee from "./employee";
import employees from "./employees"
import report from "./report";
import reports from "./reports";
import notifications from "./notifications";
import auth from "./auth";

export default combineReducers({
    department,
    departments,
    position,
    positions,
    employee,
    employees,
    report,
    reports,
    notifications,
    auth
});
