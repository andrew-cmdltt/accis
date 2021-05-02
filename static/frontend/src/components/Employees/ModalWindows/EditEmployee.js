import React, {Component} from "react";
import PropTypes from "prop-types";
import {editEmployee} from "../../../actions/employees";
import {connect} from "react-redux";
import {getRoleIdByPositionId} from "../../../utils/roles/getRoleIdByPositionId";

const dateFormat = require('dateformat')

class EditEmployee extends Component {
    state = {
        full_name: '',
        birth_date: '',
        phone_number: '',
        email: '',
        passport_data: '',
        department_id: 0,
        position_id: 0,
        role_id: 2,
        is_authorized: false,
        login: '',
        password: ''


    }
    static propTypes = {
        editEmployee: PropTypes.func.isRequired,
    };

    handleSelectChange(event) {
        this.setState({...this.state, [event.target.name]: Number(event.target.value)});
    }

    onChange = (e) => this.setState({...this.state, [e.target.name]: e.target.value});

    onSubmit = (e) => {
        e.preventDefault();
        const {
            full_name,
            birth_date,
            phone_number,
            email,
            passport_data,
            department_id,
            position_id,
            role_id,
            login,
            password
        } = this.state;
        let employee = {
            full_name,
            birth_date,
            phone_number,
            email,
            passport_data,
            department_id,
            role_id,
            position_id,
            login,
        };

        if (this.props.isAdmin) {
            employee.role_id = getRoleIdByPositionId(employee.position_id)
            if (employee.role_id === 2 || employee.role_id === 4) {
                employee.is_authorized = true
            }
            if (password) {
                employee["password"] = password
                console.log(employee.password)
            }
        }
        this.props.editEmployee(employee, this.state.savedId);
    };

    render() {
        if (this.props.employee.id) {
            this.state = this.props.employee
            this.state.password = null
            this.state.savedId = this.props.employee.id
            this.props.employee.id = null
        }
        const {
            full_name,
            birth_date,
            phone_number,
            email,
            passport_data,
            department_id,
            position_id,
            login,
        } = this.state;
        return (
            <div className="modal fade" id="changeWindow" tabIndex="-1" role="dialog" aria-hidden="true">
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
                                    <label className="form-control-label">Фамилия, имя и отчество:</label>
                                    <input
                                        type="text"
                                        className="form-control border-dark"
                                        name="full_name"
                                        value={full_name}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-control-label">Дата рождения:</label>
                                    <input
                                        className="form-control border-dark"
                                        type="date"
                                        name="birth_date"
                                        value={dateFormat(birth_date, "UTC:yyyy-mm-dd")}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-control-label">Номер телефона:</label>
                                    <input
                                        type="text"
                                        className="form-control border-dark"
                                        name="phone_number"
                                        value={phone_number}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-control-label">Email:</label>
                                    <input
                                        type="text"
                                        className="form-control border-dark"
                                        name="email"
                                        value={email}
                                        onChange={this.onChange}
                                    />
                                </div>
                                {this.props.isAdmin ? (
                                        <>
                                            <div className="form-group">
                                                <label className="form-control-label">Логин:</label>
                                                <input
                                                    type="text"
                                                    className="form-control border-dark"
                                                    name="login"
                                                    value={login}
                                                    onChange={this.onChange}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label className="form-control-label">Пароль:</label>
                                                <input
                                                    type="password"
                                                    className="form-control border-dark"
                                                    name="password"
                                                    onChange={this.onChange}
                                                />
                                            </div>
                                        </>
                                    )
                                    :
                                    ""
                                }
                                <div className="form-group">
                                    <label className="form-control-label">Паспортные данные:</label>
                                    <input
                                        type="text"
                                        className="form-control border-dark"
                                        name="passport_data"
                                        value={passport_data}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-control-label">Отдел:</label>
                                    <select
                                        value={department_id}
                                        onChange={this.handleSelectChange.bind(this)}
                                        className="form-control"
                                        name="department_id"
                                    >
                                        <option value="0">Не указано</option>
                                        {this.props.departments.map((department) =>
                                            <option
                                                key={department.id}
                                                value={department.id}
                                            >
                                                {department.department_name}
                                            </option>
                                        )}

                                    </select>
                                </div>
                                <div className="form-group">
                                    <label className="form-control-label">Должность:</label>
                                    <select
                                        value={position_id}
                                        onChange={this.handleSelectChange.bind(this)}
                                        className="form-control"
                                        name="position_id"
                                    >
                                        <option value="0">Не указано</option>
                                        {this.props.positions.map((position) =>
                                            <option
                                                key={position.id}
                                                value={position.id}
                                            >
                                                {position.position_name}
                                            </option>
                                        )}

                                    </select>
                                </div>
                                <div className="modal-footer">
                                    <button type="submit" className="btn btn-success mr-auto">Сохранить</button>
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

const mapStateToProps = (state) => ({});
export default connect(mapStateToProps, {editEmployee})(EditEmployee);