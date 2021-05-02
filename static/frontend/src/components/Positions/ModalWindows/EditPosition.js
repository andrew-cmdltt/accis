import React, {Component} from "react";
import PropTypes from "prop-types";
import {editPosition} from "../../../actions/positions";
import {connect} from "react-redux";

class EditPosition extends Component {
    state = {
        position_name: '',
        position_description: '',
        savedId: 0,

    }
    static propTypes = {
        editPosition: PropTypes.func.isRequired,
    };

    handleSelectChange(event) {
        this.setState({...this.state, [event.target.name]: Number(event.target.value)});
    }

    onChange = (e) => this.setState({...this.state, [e.target.name]: e.target.value});

    onSubmit = (e) => {
        e.preventDefault();
        const {position_name, position_description} = this.state;
        const position = {position_name, position_description};
        this.props.editPosition(position, this.state.savedId);
    };

    render() {
        if (this.props.position.id) {
            this.state = this.props.position
            this.state.savedId = this.props.position.id
            this.props.position.id = null
        }
        const {position_name, position_description} = this.state;
        return (
            <div className="modal fade" id="changeWindow" tabIndex="-1" role="dialog" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title" id="exampleModalLabel">Информация о дложности:</h4>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <form onSubmit={this.onSubmit}>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label htmlFor="name" className="form-control-label">Название:</label>
                                    <input
                                        type="text"
                                        className="form-control border-dark"
                                        name="position_name"
                                        value={position_name}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="name" className="form-control-label">Описание:</label>
                                    <input
                                        type="text"
                                        className="form-control border-dark"
                                        name="position_description"
                                        value={position_description}
                                        onChange={this.onChange}
                                    />
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
export default connect(mapStateToProps, {editPosition})(EditPosition);