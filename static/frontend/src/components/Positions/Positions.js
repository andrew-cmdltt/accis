import React, {Component} from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getSortedValues} from "../../utils/getSortedValues";
import ReactPaginate from "react-paginate";
import {getPositions} from "../../actions/positions";
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
                <Nav/>
                <hr/>
                <div className="container-fluid m-auto">
                    <PositionsList
                        positions={slice}
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
    positions: state.positions.positions,
});
export default connect(mapStateToProps, {getPositions})(Positions);