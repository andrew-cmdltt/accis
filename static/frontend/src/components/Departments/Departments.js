import React, {Component} from 'react';
import DepartmentsList from "./DepartmentsList";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getSortedValues} from "../../utils/getSortedValues";
import ReactPaginate from "react-paginate";
import {getDepartments} from "../../actions/departments";
import Nav from "../Nav/Nav";

class Departments extends Component {
    state = {
        isAsc: 1,
        offset: 0,
        data: [],
        perPage: 3,
        currentPage: 0,
    }

    static propTypes = {
        departments: PropTypes.array.isRequired,
        getDepartments: PropTypes.func.isRequired,
    };

    componentDidMount() {
        this.props.getDepartments()
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
        const data = this.props.departments;
        let slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
        slice = getSortedValues(this.state.isAsc, slice, 'id')

        return (
            <div>
                <Nav/>
                <div className="container-fluid m-auto">
                    <hr/>
                    <DepartmentsList departments={slice}/>
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
            </div>
        )
    }
}


const mapStateToProps = (state) => ({
    departments: state.departments.departments,
});
export default connect(mapStateToProps, {getDepartments})(Departments);