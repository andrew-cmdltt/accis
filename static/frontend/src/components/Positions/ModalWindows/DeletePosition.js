import React, {Component} from "react";
import PropTypes from 'prop-types'
import {deletePosition} from "../../../actions/positions";
import {connect} from "react-redux";

class DeletePosition extends Component {
    static propTypes = {
        deletePosition: PropTypes.func.isRequired,
    };
    onSubmit = (e) => {
        e.preventDefault();
        this.props.deletePosition(this.props.positionId)
    }
    render() {
        return (
            <div id="deleteWindow" className="modal fade" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Вы действительно хотите удалить должность?</h4>
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
                                    onClick={this.props.deletePosition.bind(this, this.props.positionId)}
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
    positions: state.positions.positions,
});

export default connect(mapStateToProps, { deletePosition })(DeletePosition);