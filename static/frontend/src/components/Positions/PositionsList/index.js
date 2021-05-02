import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getPosition} from "../../../actions/positions";
import DeletePosition from "../ModalWindows/DeletePosition";
import EditPosition from "../ModalWindows/EditPosition";

class PositionsList extends Component {
    static propTypes = {
        getPosition: PropTypes.func.isRequired,
        positions: PropTypes.array.isRequired,
    };
    render() {
        return (
            <div className="HavingCoursesList">
                <table className="table table-responsive">
                    <tbody>
                    <tr>
                        <th>№</th>
                        <th>Название</th>
                        <th>Описание</th>
                        <th></th>
                    </tr>
                    {this.props.positions.map((position) =>
                    <tr key={position.id}>
                        <td><span className="badge badge-dark">{position.id}</span></td>
                        <td><span>{position.position_name}</span></td>
                        <td><span>{position.position_description}</span></td>
                        <td colSpan="2">
                            <button
                                type="button"
                                className="mr-2 btn btn-warning btn-sm"
                                data-toggle="modal"
                                data-target="#changeWindow"
                                onClick={this.props.getPosition.bind(this, position.id)}
                            >изменить
                            </button>
                            <button
                                type="button"
                                className="btn btn-danger btn-sm"
                                data-toggle="modal"
                                data-target="#deleteWindow"
                                onClick={this.props.getPosition.bind(this, position.id)}
                            >удалить
                            </button>
                        </td>
                    </tr>
                    )}
                    </tbody>
                </table>
                <EditPosition
                    position={this.props.position}
                    positionId={this.props.position.id}
                />
                <DeletePosition positionId={this.props.position.id} />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    position: state.position.position,

});

export default connect(mapStateToProps, {getPosition})(PositionsList);