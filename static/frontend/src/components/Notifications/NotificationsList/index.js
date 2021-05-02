import React, {Component} from "react";
import PropTypes from "prop-types";
import {deleteNotification} from "../../../actions/notifications";
import {connect} from "react-redux";

const dateFormat = require('dateformat')

class NotificationsList extends Component {
    static propTypes = {
        deleteNotification: PropTypes.func.isRequired,
        notifications: PropTypes.array.isRequired,
    };

    render() {
        console.log(this.props.notifications)
        return (
            <div>
                {this.props.notifications.map((notification) =>
                    notification.type === "success" ?
                        <div
                            className="alert alert-success"
                            key={notification.id}
                        >
                            <div className="container">
                                <div className="alert-icon">
                                    <i className="material-icons">check</i>
                                </div>
                                <button type="button" className="close"
                                        onClick={this.props.deleteNotification.bind(this, notification.id)}
                                >
                                    <span aria-hidden="true"><i className="material-icons">clear</i></span>
                                </button>
                                <div className="row">
                                    <div className="col">
                                        <b style={{fontSize: 20}}>{notification.message}</b>
                                    </div>
                                    <div className="col">
                                        <b style={{fontSize: 20}}>
                                            {dateFormat(notification.sending_date, "UTC:dd.mm.yyyy")}
                                        </b>
                                    </div>
                                </div>
                            </div>
                        </div>
                        :
                        <div
                            className="alert alert-danger"
                            key={notification.id}
                        >
                            <div className="container">
                                <div className="alert-icon">
                                    <i className="material-icons">error_outline</i>
                                </div>
                                <button type="button" className="close"
                                        onClick={this.props.deleteNotification.bind(this, notification.id)}
                                >
                                    <span aria-hidden="true"><i className="material-icons">clear</i></span>
                                </button>
                                <div className="row">
                                    <div className="col">
                                        <b style={{fontSize: 20}}>{notification.message}</b>
                                    </div>
                                    <div className="col">
                                        <b style={{fontSize: 20}}>
                                            {dateFormat(notification.sending_date, "UTC:dd.mm.yyyy")}
                                        </b>
                                    </div>
                                </div>
                            </div>
                        </div>
                )}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {deleteNotification})(NotificationsList);