import React, {Component} from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getSortedValues} from "../../utils/getSortedValues";
import ReactPaginate from "react-paginate";
import {getPositions} from "../../actions/positions";
import AddPosition from "./ModalWindows/AddPosition";
import PositionsList from "./PositionsList";
import Nav from "../Nav/Nav";

class Positions extends Component {
    state = {
        isAsc: 1,
        offset: 0,
        data: [],
        perPage: 3,
        currentPage: 0,
    }

    static propTypes = {
        positions: PropTypes.array.isRequired,
        getPositions: PropTypes.func.isRequired,
    };

    componentDidMount() {
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
        const data = this.props.positions;
        let slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
        slice = getSortedValues(this.state.isAsc, slice, 'id')

        return (
            <div>
                <Nav />
                <div className="container-fluid m-auto">
                    <aside className="filter mt-2">
                        <div className="mt-2">
                            <button id="addButton" className="btn btn-success" type="button" data-toggle="modal"
                                    data-target="#addWindow">добавить должность
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
                    <PositionsList
                        positions={slice}
                    />
                    <div className="AddPosition">
                        <AddPosition />
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
    positions: state.positions.positions,
});
export default connect(mapStateToProps, {getPositions})(Positions);