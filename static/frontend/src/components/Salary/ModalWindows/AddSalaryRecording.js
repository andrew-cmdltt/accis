import React, {Component} from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {addReport} from "../../../actions/reports";
import {getEmployee} from "../../../actions/employees";
import {getNumberedFields} from "../../../utils/salary/getNumberedFields";
import {getTotalSalary} from "../../../utils/salary/getTotalSalary";
import {getTaxesAndDeductions} from "../../../utils/salary/getTaxesAndDeductions";
import {getNetSalary} from "../../../utils/salary/getNetSalary";
import {getRaise} from "../../../utils/salary/getRaise";

const dateFormat = require('dateformat')

class AddSalaryRecording extends Component {
    state = {
        start_date: '',
        expiry_date: '',
        standard_hours_worked: 0,
        vacation_hours: 0,
        hospital_hours: 0,
        overtime: 0,
        overtime_rate: 0,
        total_salary: 0,
        taxes_and_deductions: 0,
        other_deductions: 0,
        net_salary: 0,
        employee_id: 0,
        positive_reviews: 0,
        customer_growth: 0,
        task_completed: 0,
        performance: 1,
        efficiency: 1,
        participation_in_events: 1,
        experience: 1,
        initiative: 1,
        creativity: 1,
    }

    static propTypes = {
        addReport: PropTypes.func.isRequired,
        getEmployee: PropTypes.func.isRequired,
    };

    handleSelectChange(event) {
        this.setState({[event.target.name]: Number(event.target.value)});
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
        this.setState({
            total_salary: getTotalSalary(this.props.employee, this.state),
            taxes_and_deductions: getTaxesAndDeductions(this.props.employee, this.state),
            net_salary: getNetSalary(this.state)
        })
    }

    onClick = (e) =>{
        this.setState({
            net_salary: (Number(getNetSalary(this.state)) + Number(getRaise(this.state))).toFixed(2)
        })
    }

    onSubmit = (e) => {
        e.preventDefault();
        const {
            start_date,
            expiry_date,
            standard_hours_worked,
            vacation_hours,
            hospital_hours,
            overtime,
            overtime_rate,
            total_salary,
            taxes_and_deductions,
            other_deductions,
            net_salary,
            employee_id,
            positive_reviews,
            customer_growth,
            task_completed,
            performance,
            efficiency,
            participation_in_events,
            experience,
            initiative,
            creativity
        } = this.state;
        let report = {
            start_date,
            expiry_date,
            standard_hours_worked,
            vacation_hours,
            hospital_hours,
            overtime,
            overtime_rate,
            total_salary,
            taxes_and_deductions,
            other_deductions,
            net_salary,
            employee_id,
            positive_reviews,
            customer_growth,
            task_completed,
            performance,
            efficiency,
            participation_in_events,
            experience,
            initiative,
            creativity
        };
        report = getNumberedFields(report)
        this.props.addReport(report);
        this.setState({
            start_date: '',
            expiry_date: '',
            standard_hours_worked: 0,
            vacation_hours: 0,
            hospital_hours: 0,
            overtime: 0,
            overtime_rate: 0,
            total_salary: 0,
            taxes_and_deductions: 0,
            other_deductions: 0,
            net_salary: 0,
            employee_id: 0,
            positive_reviews: 0,
            customer_growth: 0,
            task_completed: 0,
            performance: 1,
            efficiency: 1,
            participation_in_events: 1,
            experience: 1,
            initiative: 1,
            creativity: 1
        });
    };

    render() {
        const {
            start_date,
            expiry_date,
            standard_hours_worked,
            vacation_hours,
            hospital_hours,
            overtime,
            overtime_rate,
            other_deductions,
            employee_id,
            positive_reviews,
            customer_growth,
            task_completed,
            performance,
            efficiency,
            participation_in_events,
            experience,
            initiative,
            creativity,
            net_salary,
            total_salary,
            taxes_and_deductions
        } = this.state;

        return (
            <div className="modal fade" id="addWindow" tabIndex="-1" role="dialog" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title" id="exampleModalLabel">Информация о сотруднике:</h4>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <form onSubmit={this.onSubmit}>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label className="form-control-label">Сотрудник:</label>
                                    <select
                                        value={employee_id}
                                        onChange={this.handleSelectChange.bind(this)}
                                        onClick={this.props.getEmployee.bind(this, employee_id)}
                                        className="form-control"
                                        name="employee_id"
                                    >
                                        <option value="0">Не указано</option>
                                        {this.props.employees.map((employee) =>
                                            <option
                                                key={employee.id}
                                                value={employee.id}
                                            >
                                                {employee.full_name}
                                            </option>
                                        )}

                                    </select>
                                </div>
                                <div className="form-group">
                                    <label className="form-control-label">Начало срока:</label>
                                    <input
                                        className="form-control border-dark"
                                        type="date"
                                        name="start_date"
                                        value={dateFormat(start_date, "UTC:yyyy-mm-dd")}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-control-label">Конец срока:</label>
                                    <input
                                        type="date"
                                        className="form-control border-dark"
                                        name="expiry_date"
                                        value={dateFormat(expiry_date, "UTC:yyyy-mm-dd")}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-control-label">Отработанные нормативные часы:</label>
                                    <input
                                        type="text"
                                        className="form-control border-dark"
                                        name="standard_hours_worked"
                                        value={standard_hours_worked}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-control-label">Отпускные часы:</label>
                                    <input
                                        type="text"
                                        className="form-control border-dark"
                                        name="vacation_hours"
                                        value={vacation_hours}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-control-label">Больничные часы:</label>
                                    <input
                                        type="text"
                                        className="form-control border-dark"
                                        name="hospital_hours"
                                        value={hospital_hours}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-control-label">Сверхурочные часы:</label>
                                    <input
                                        type="text"
                                        className="form-control border-dark"
                                        name="overtime"
                                        value={overtime}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-control-label">Сверхурочная ставка:</label>
                                    <input
                                        type="text"
                                        className="form-control border-dark"
                                        name="overtime_rate"
                                        value={overtime_rate}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-control-label">Общая зарплата, ₽:</label>
                                    <span
                                        className="form-control border-dark"
                                    >
                                        {total_salary}
                                    </span>
                                </div>
                                <div className="form-group">
                                    <label className="form-control-label">Налоги и вычеты, ₽:</label>
                                    <span
                                        className="form-control border-dark"
                                    >
                                        {taxes_and_deductions}
                                    </span>
                                </div>
                                <div className="form-group">
                                    <label className="form-control-label">Другие вычеты, ₽:</label>
                                    <input
                                        type="text"
                                        className="form-control border-dark"
                                        name="other_deductions"
                                        value={other_deductions}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-control-label">Положительные отзывы:</label>
                                    <input
                                        className="form-control border-dark"
                                        type="text"
                                        name="positive_reviews"
                                        value={positive_reviews}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-control-label">Прирост клиентов:</label>
                                    <input
                                        className="form-control border-dark"
                                        type="text"
                                        name="customer_growth"
                                        value={customer_growth}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-control-label">Выполнено задач:</label>
                                    <input
                                        className="form-control border-dark"
                                        type="text"
                                        name="task_completed"
                                        value={task_completed}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-control-label">Производительность:</label>
                                    <select
                                        className="form-control border-dark"
                                        name="performance"
                                        value={performance}
                                        onChange={this.onChange}
                                    >
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label className="form-control-label">Эффективность:</label>
                                    <select
                                        className="form-control border-dark"
                                        name="efficiency"
                                        value={efficiency}
                                        onChange={this.onChange}
                                    >
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label className="form-control-label">Участие в мероприятиях:</label>
                                    <select
                                        className="form-control border-dark"
                                        name="participation_in_events"
                                        value={participation_in_events}
                                        onChange={this.onChange}
                                    >
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label className="form-control-label">Опыт:</label>
                                    <select
                                        className="form-control border-dark"
                                        name="experience"
                                        value={experience}
                                        onChange={this.onChange}
                                    >
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label className="form-control-label">Инициатива:</label>
                                    <select
                                        className="form-control border-dark"
                                        name="initiative"
                                        value={initiative}
                                        onChange={this.onChange}
                                    >
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label className="form-control-label">Креативность:</label>
                                    <select
                                        className="form-control border-dark"
                                        name="creativity"
                                        value={creativity}
                                        onChange={this.onChange}
                                    >
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label className="form-control-label">Чистая зарплата, ₽:</label>
                                    <span
                                        className="form-control border-dark"
                                    >
                                        {net_salary}
                                    </span>
                                </div>
                                <div className="modal-footer">
                                    <button type="submit" className="btn btn-success mr-auto">Сохранить</button>
                                    <button onClick={this.onClick} type="button"
                                            className="btn btn-success mr-auto">
                                        Сформировать премию
                                    </button>
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Отмена
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    employee: state.employee.employee
});
export default connect(mapStateToProps, {addReport, getEmployee})(AddSalaryRecording);