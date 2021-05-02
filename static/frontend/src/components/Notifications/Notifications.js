import React, {Component} from 'react';
import ReactPaginate from "react-paginate";
import NotificationsList from "./NotificationsList";
import PropTypes from "prop-types";
import {getNotifications} from "../../actions/notifications";
import {connect} from "react-redux";
import {getSortedValues} from "../../utils/getSortedValues";
import Nav from "../Nav/Nav";

class Notifications extends Component {
    state = {
        isAsc: 1,
        offset: 0,
        data: [],
        perPage: 3,
        currentPage: 0,
    }

    static propTypes = {
        notifications: PropTypes.array.isRequired,
        getNotifications: PropTypes.func.isRequired,
    };

    componentDidMount() {
        this.props.getNotifications()
    }

    handleSelectChange(event) {
        this.setState({[event.target.name]: Number(event.target.value)});
    }

    handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;

        this.setState({
            currentPage: selectedPage,
            offset: offset
        }, () => {
        });

    };

    render() {
        this.handlePageClick.bind(this)
        const data = this.props.notifications;
        let slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
        slice = getSortedValues(this.state.isAsc, slice, 'id')

        return (
            <div>
                <Nav />
                <div className="container mt-5">
                    <div className="title">
                        <h3>Уведомления</h3>
                    </div>
                </div>
                <NotificationsList
                    notifications={slice}
                />
                <ReactPaginate
                    previousLabel={"<<"}
                    nextLabel={">>"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={Math.ceil(data.length / this.state.perPage)}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={1}
                    onPageChange={this.handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}/>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    notifications: state.notifications.notifications,
});
export default connect(mapStateToProps, {getNotifications})(Notifications);