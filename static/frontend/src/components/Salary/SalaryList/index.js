import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getReport} from "../../../actions/reports";
import {getEmployee} from "../../../actions/employees";
import {getEmployeeFullName} from "../../../utils/employees/getEmployeeFullName";
import SalaryCalculation from "../ModalWindows/SalaryCalculation";
const dateFormat = require('dateformat')

class ReportsList extends Component {
    static propTypes = {
        getReport: PropTypes.func.isRequired,
        getEmployee: PropTypes.func.isRequired,
        reports: PropTypes.array.isRequired,
    };

    onClick = (report) => {
        this.props.getReport(report.id)
        this.props.getEmployee(report.employee_id)
    }

    render() {

        return (
            <div className="HavingCoursesList">
                <table className="table table-responsive">
                    <tbody>
                    <tr>
                        <th>№</th>
                        <th>ФИО</th>
                        <th>Начало срока</th>
                        <th>Конец срока</th>
                        <th>Общая зарплата</th>
                        <th>Налоги и вычеты</th>
                        <th>Другие вычеты</th>
                        <th>Чистая зарплата</th>
                        <th></th>
                    </tr>
                    {this.props.reports.map((report) =>
                    <tr key={report.id}>
                        <td><span className="badge badge-dark">{report.id}</span></td>
                        <td>
                            <span>
                                {getEmployeeFullName(this.props.employees, report.employee_id)}
                            </span>
                        </td>
                        <td><span>{dateFormat(report.start_date, "UTC:dd.mm.yyyy")}</span></td>
                        <td><span>{dateFormat(report.expiry_date, "UTC:dd.mm.yyyy")}</span></td>
                        <td><span>{report.total_salary}₽</span></td>
                        <td><span>{report.taxes_and_deductions}₽</span></td>
                        <td><span>{report.other_deductions}₽</span></td>
                        <td><span>{report.net_salary}₽</span></td>
                        <td colSpan="2">
                            <button
                                type="button"
                                className="mr-2 btn btn-warning btn-sm"
                                data-toggle="modal"
                                data-target="#changeWindow"
                                onClick={this.onClick.bind(this, report)}
                            >расчитать
                            </button>
                        </td>
                    </tr>
                    )}
                    </tbody>
                </table>
                <SalaryCalculation
                    report={this.props.report}
                    employee={this.props.employee}
                    employees={this.props.employees}
                    reportId={this.props.report.id}
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    report: state.report.report,
    employee: state.employee.employee
});

export default connect(mapStateToProps, {getReport, getEmployee})(ReportsList);