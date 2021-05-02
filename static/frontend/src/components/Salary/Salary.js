import React, {Component} from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getSortedValues} from "../../utils/getSortedValues";
import ReactPaginate from "react-paginate";
import {getReports} from "../../actions/reports";
import {getEmployees} from "../../actions/employees";
import {getDepartments} from "../../actions/departments";
import {getPositions} from "../../actions/positions";
import ReportsList from "./SalaryList";
import AddSalaryRecording from "./ModalWindows/AddSalaryRecording";
import Nav from "../Nav/Nav";

class Salary extends Component {
    state = {
        isAsc: 1,
        offset: 0,
        data: [],
        perPage: 3,
        currentPage: 0,
    }

    static propTypes = {
        getReports: PropTypes.func.isRequired,
        getEmployees: PropTypes.func.isRequired,
        getDepartments: PropTypes.func.isRequired,
        getPositions: PropTypes.func.isRequired,
        reports: PropTypes.array.isRequired,
        departments: PropTypes.array.isRequired,
        positions: PropTypes.array.isRequired,
    };

    componentDidMount() {
        this.props.getReports()
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
        const data = this.props.reports;
        let slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
        slice = getSortedValues(this.state.isAsc, slice, 'id')
        return (
            <div>
                <Nav />
                <div className="container-fluid m-auto">
                    <aside className="filter mt-2">
                        {/*<div>*/}
                        {/*    <SearchCourseForm*/}
                        {/*        departments={this.props.departments}*/}
                        {/*    />*/}
                        {/*</div>*/}
                        <div className="mt-2">
                            <button id="addButton" className="btn btn-success" type="button" data-toggle="modal"
                                    data-target="#addWindow">добавить запись
                            </button>
                        </div>
                    </aside>
                    <hr/>
                    <div className="row input-group input-group">
                        <div className="ml-3">
                            <span className="input-group-text">
                                Сортировка по:
                            </span>
                        </div>
                        <div className="ml-4">
                            <select
                                name="isAsc"
                                onChange={this.handleSelectChange.bind(this)}
                            >
                                <option value={1}>Возрастанию</option>
                                <option value={0}>Убыванию</option>
                            </select>
                        </div>
                    </div>
                    <hr/>
                    <ReportsList
                        reports={slice}
                        employees={this.props.employees}
                    />
                    <div className="AddSalaryRecording">
                        <AddSalaryRecording
                            employees={this.props.employees}
                        />
                    </div>
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
    reports: state.reports.reports,
    employees: state.employees.employees,
    departments: state.departments.departments,
    positions: state.positions.positions,
});
export default connect(mapStateToProps, {
    getReports,
    getDepartments,
    getPositions,
    getEmployees,
})(Salary);