import React, {Component} from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getSortedValues} from "../../utils/getSortedValues";
import ReactPaginate from "react-paginate";
import {getEmployees} from "../../actions/employees";
import {getDepartments} from "../../actions/departments";
import {getPositions} from "../../actions/positions";
import EmployeesList from "./EmployeesList";
import {getRoleName} from "../../utils/roles/getRoleName";
import Nav from "../Nav/Nav";

class Employees extends Component {
    state = {
        isAsc: 1,
        offset: 0,
        data: [],
        perPage: 3,
        currentPage: 0,
    }

    static propTypes = {
        getEmployees: PropTypes.func.isRequired,
        getDepartments: PropTypes.func.isRequired,
        getPositions: PropTypes.func.isRequired,
        employees: PropTypes.array.isRequired,
        departments: PropTypes.array.isRequired,
        positions: PropTypes.array.isRequired,
        isAuthenticated: PropTypes.bool,
        auth: PropTypes.object.isRequired
    };

    componentDidMount() {
        this.props.getEmployees()
        this.props.getDepartments()
        this.props.getPositions()
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
        const data = this.props.employees;
        let slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
        slice = getSortedValues(this.state.isAsc, slice, 'id')
        let isAdmin
        if (this.props.isAuthenticated) {
            isAdmin = getRoleName(this.props.auth.user.role_id) === "Администратор"
        }

        return (
            <div>
                <Nav/>
                <div className="container-fluid m-auto">
                    <hr/>
                    <EmployeesList
                        employees={slice}
                        departments={this.props.departments}
                        positions={this.props.positions}
                        isAdmin={isAdmin}
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
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    employees: state.employees.employees,
    departments: state.departments.departments,
    positions: state.positions.positions,
    isAuthenticated: state.auth.isAuthenticated,
    auth: state.auth
});
export default connect(mapStateToProps, {getEmployees, getDepartments, getPositions})(Employees);