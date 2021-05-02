import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getEmployee} from "../../../actions/employees";
import EditEmployee from "../ModalWindows/EditEmployee";
import DeleteEmployee from "../ModalWindows/DeleteEmployee";
import {getDepartmentName} from "../../../utils/departmemnts/getDepartmentName";
import {getRoleName} from "../../../utils/roles/getRoleName";
import {getPositionName} from "../../../utils/positions/getPositionName";
const dateFormat = require('dateformat')

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
                        <th>Дата рождения</th>
                        <th>Телефон</th>
                        <th>Email</th>
                        <th>Паспортные данные</th>
                        <th>Отдел</th>
                        <th>Роль</th>
                        <th>Должность</th>
                        <th></th>
                    </tr>
                    {this.props.employees.map((employee) =>
                    <tr key={employee.id}>
                        <td><span className="badge badge-dark">{employee.id}</span></td>
                        <td><span>{employee.full_name}</span></td>
                        <td>
                            <span>
                                {dateFormat(employee.birth_date, "UTC:dd.mm.yyyy")}
                            </span>
                        </td>
                        <td><span>{employee.phone_number}</span></td>
                        <td><span>{employee.email}</span></td>
                        <td><span>{employee.passport_data}</span></td>
                        <td>
                            <span>
                                {getDepartmentName(this.props.departments, employee.department_id)}
                            </span>
                        </td>
                        <td>
                            <span>
                                {getRoleName(employee.role_id)}
                            </span>
                        </td>
                        <td>
                            <span>
                                {getPositionName(this.props.positions, employee.position_id)}
                            </span>
                        </td>
                        <td colSpan="2">
                            <button
                                type="button"
                                className="mr-2 btn btn-warning btn-sm"
                                data-toggle="modal"
                                data-target="#changeWindow"
                                onClick={this.props.getEmployee.bind(this, employee.id)}
                            >изменить
                            </button>
                            {this.props.isAdmin ?
                                <button
                                    type="button"
                                    className="btn btn-danger btn-sm"
                                    data-toggle="modal"
                                    data-target="#deleteWindow"
                                    onClick={this.props.getEmployee.bind(this, employee.id)}
                                >удалить
                                </button>
                                :
                                ""
                            }
                        </td>
                    </tr>
                    )}
                    </tbody>
                </table>
                <EditEmployee
                    employee={this.props.employee}
                    departments={this.props.departments}
                    positions={this.props.positions}
                    employeeId={this.props.employees.id}
                    isAdmin={this.props.isAdmin}
                />
                <DeleteEmployee employeeId={this.props.employee.id} />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    employee: state.employee.employee,
});

export default connect(mapStateToProps, {getEmployee})(EmployeesList);