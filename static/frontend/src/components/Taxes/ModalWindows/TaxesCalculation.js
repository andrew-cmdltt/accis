import React, {Component} from "react";
import PropTypes from "prop-types";
import {editEmployee} from "../../../actions/employees";
import {connect} from "react-redux";
import {getTotalTaxesWithheld} from "../../../utils/taxes/getTotalTaxesWithhled";
import {getNumberedFields} from "../../../utils/taxes/getNumberedFields";
import {getTotalRegularDeductions} from "../../../utils/taxes/getTotalRegularDeductions";

class TaxesCalculation extends Component {
    state = {
        hourly_rate: 0,
        regional_taxes: 0,
        income_tax: 0,
        social_insurance: 0,
        health_insurance: 0,
        total_taxes_withheld: 0,
        insurance_deductions: 0,
        other_regular_deductions: 0,
        total_regular_deductions: 0,

    }
    static propTypes = {
        editEmployee: PropTypes.func.isRequired,
    };

    handleSelectChange(event) {
        this.setState({...this.state, [event.target.name]: Number(event.target.value)});
    }

    onChange = (e) => {
        console.log(e.target.value)
        this.setState({...this.state, [e.target.name]: e.target.value});
    }
    onSubmit = (e) => {
        e.preventDefault();
        const {
            hourly_rate,
            regional_taxes,
            income_tax,
            social_insurance,
            health_insurance,
            total_taxes_withheld,
            insurance_deductions,
            other_regular_deductions,
            total_regular_deductions,
        } = this.state;
        let employee = {
            hourly_rate,
            regional_taxes,
            income_tax,
            social_insurance,
            health_insurance,
            total_taxes_withheld,
            insurance_deductions,
            other_regular_deductions,
            total_regular_deductions,
        };
        employee = getNumberedFields(employee)
        this.props.editEmployee(employee, this.state.savedId);
    };


    render() {
        if (this.props.employee.id) {
            this.state = this.props.employee
            this.state.savedId = this.props.employee.id
            this.props.employee.id = null
        }
        let {
            hourly_rate,
            regional_taxes,
            income_tax,
            social_insurance,
            health_insurance,
            insurance_deductions,
            other_regular_deductions,
        } = this.state;
        this.state.total_taxes_withheld = getTotalTaxesWithheld(this.state)
        this.state.total_regular_deductions = getTotalRegularDeductions(this.state)

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
                                    <span  className="form-control border-dark">
                                        {this.props.employee.full_name}
                                    </span>
                                </div>
                                <div className="form-group">
                                    <label className="form-control-label">Часовая ставка, ₽:</label>
                                    <input
                                        className="form-control border-dark"
                                        type="text"
                                        name="hourly_rate"
                                        value={hourly_rate}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-control-label">Региональные налоги, %:</label>
                                    <input
                                        type="text"
                                        className="form-control border-dark"
                                        name="regional_taxes"
                                        value={regional_taxes}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-control-label">Налог на доходы, %:</label>
                                    <input
                                        type="text"
                                        className="form-control border-dark"
                                        name="income_tax"
                                        value={income_tax}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-control-label">Социальное страхование, %:</label>
                                    <input
                                        type="text"
                                        className="form-control border-dark"
                                        name="social_insurance"
                                        value={social_insurance}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-control-label">Медицинское страхование, %:</label>
                                    <input
                                        type="text"
                                        className="form-control border-dark"
                                        name="health_insurance"
                                        value={health_insurance}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-control-label">Всего удержано налогов, %:</label>
                                    <span
                                        className="form-control border-dark"
                                    >
                                        {this.state.total_taxes_withheld || 0}
                                    </span>
                                </div>
                                <div className="form-group">
                                    <label className="form-control-label">Страховые вычеты, ₽:</label>
                                    <input
                                        type="text"
                                        className="form-control border-dark"
                                        name="insurance_deductions"
                                        value={insurance_deductions}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-control-label">Другие регулярные вычеты, ₽:</label>
                                    <input
                                        type="text"
                                        className="form-control border-dark"
                                        name="other_regular_deductions"
                                        value={other_regular_deductions}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-control-label">Итого регулярных вычетов, ₽:</label>
                                    <span
                                        className="form-control border-dark"
                                    >
                                        {this.state.total_regular_deductions || 0}
                                    </span>
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
export default connect(mapStateToProps, {editEmployee})(TaxesCalculation);