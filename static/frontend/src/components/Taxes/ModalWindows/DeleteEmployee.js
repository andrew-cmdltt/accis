import React, {Component} from "react";
import PropTypes from 'prop-types'
import {deleteEmployee} from "../../../actions/employees";
import {connect} from "react-redux";

class DeleteEmployee extends Component {
    static propTypes = {
        deleteEmployee: PropTypes.func.isRequired,
    };
    onSubmit = (e) => {
        e.preventDefault();
        this.props.deleteEmployee(this.props.employeeId)
    }
    render() {
        return (
            <div id="deleteWindow" className="modal fade" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Вы действительно хотите удалить сотрудника?</h4>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <p>Вся информация будет удалена из системы. Восстановить данные невозможно.</p>
                        </div>

                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-danger mr-auto"
                                    onClick={this.props.deleteEmployee.bind(this, this.props.employeeId)}
                                    data-dismiss="modal"
                                >УДАЛИТЬ</button>
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Отмена</button>
                            </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    employees: state.employees.employees,
});

export default connect(mapStateToProps, { deleteEmployee })(DeleteEmployee);