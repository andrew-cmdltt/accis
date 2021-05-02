import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getEmployee} from "../../../actions/employees";
import TaxesCalculation from "../ModalWindows/TaxesCalculation";

class EmployeesList extends Component {
    static propTypes = {
        getEmployee: PropTypes.func.isRequired,
        employees: PropTypes.array.isRequired,
    };
    render() {
        return (
            <div className="HavingCoursesList">
                <table className="table table-responsive">
                    <tbody>
                    <tr>
                        <th>№</th>
                        <th>ФИО</th>
                        <th>Часовая ставка</th>
                        <th>Региональные налоги</th>
                        <th>Налог на доходы</th>
                        <th>Социальное страхование</th>
                        <th>Медицинское страхование</th>
                        <th>Всего удержано налогов</th>
                        <th></th>
                    </tr>
                    {this.props.employees.map((employee) =>
                    <tr key={employee.id}>
                        <td><span className="badge badge-dark">{employee.id}</span></td>
                        <td><span>{employee.full_name}</span></td>
                        <td><span>{employee.hourly_rate}₽</span></td>
                        <td><span>{employee.regional_taxes}%</span></td>
                        <td>
                            <span>
                                {employee.income_tax}%
                            </span>
                        </td>
                        <td><span>{employee.social_insurance}%</span></td>
                        <td><span>{employee.health_insurance}%</span></td>
                        <td><span>{employee.total_taxes_withheld}%</span></td>
                        <td colSpan="2">
                            <button
                                type="button"
                                className="mr-2 btn btn-warning btn-sm"
                                data-toggle="modal"
                                data-target="#changeWindow"
                                onClick={this.props.getEmployee.bind(this, employee.id)}
                            >расчитать
                            </button>
                        </td>
                    </tr>
                    )}
                    </tbody>
                </table>
                <TaxesCalculation
                    employee={this.props.employee}
                    departments={this.props.departments}
                    positions={this.props.positions}
                    employeeId={this.props.employees.id}
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    employee: state.employee.employee,
});

export default connect(mapStateToProps, {getEmployee})(EmployeesList);