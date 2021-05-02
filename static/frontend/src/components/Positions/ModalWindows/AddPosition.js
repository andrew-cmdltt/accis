import React, {Component} from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {addPosition} from "../../../actions/positions";

class AddPosition extends Component {
    state = {
        position_name: '',
        position_description: '',
    }

    static propTypes = {
        addPosition: PropTypes.func.isRequired,
    };

    handleSelectChange(event) {
        this.setState({[event.target.name]: Number(event.target.value)});
    }

    onChange = (e) => this.setState({[e.target.name]: e.target.value});

    onSubmit = (e) => {
        e.preventDefault();
        const {position_name, position_description} = this.state;
        const position = {position_name, position_description};
        this.props.addPosition(position);
        this.setState({
            position_name: '',
            position_description: '',
        });
    };

    render() {
        const {position_name, position_description} = this.state;

        return (
            <div className="modal fade" id="addWindow" tabIndex="-1" role="dialog" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title" id="exampleModalLabel">Добавление новой должности</h4>
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
export default connect(mapStateToProps, {addPosition})(AddPosition);