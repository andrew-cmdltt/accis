import React, {Component} from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {generateReport, getReports} from "../../../actions/reports";

const dateFormat = require('dateformat')

class GenerateReportWindow extends Component {
    state = {
        start_date: '',
        expiry_date: '',
        department_id: 0,
    }

    static propTypes = {
        getReports: PropTypes.func.isRequired,
        generateReport: PropTypes.func.isRequired,
    };

    handleSelectChange(event) {
        this.setState({[event.target.name]: Number(event.target.value)});
    }

    onChange = (e) => this.setState({[e.target.name]: e.target.value});

    onSubmit = (e) => {
        e.preventDefault();
        const {
            start_date,
            expiry_date,
            department_id
        } = this.state;
        const params = {
            start_date,
            expiry_date,
            department_id
        }
        if (!params.start_date && !params.start_date && !params.start_date) {
            this.props.getReports();
        } else {
            this.props.generateReport(params);
        }
    };

    render() {
        const {
            start_date,
            expiry_date,
            department_id
        } = this.state;
        return (
            <div className="modal fade" id="generateReportWindow" tabIndex="-1" role="dialog" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title" id="exampleModalLabel">Параметры отчёта:</h4>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <form onSubmit={this.onSubmit}>
                            <div className="modal-body">
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
                                <div className="modal-footer">
                                    <button type="submit" className="btn btn-success mr-auto">Сформировать</button>
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
    reports: state.reports.reports
});
export default connect(mapStateToProps, {getReports, generateReport})(GenerateReportWindow);