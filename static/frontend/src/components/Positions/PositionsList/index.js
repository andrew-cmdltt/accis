import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {DataGrid} from "@material-ui/data-grid";
import EditPosition from "../ModalWindows/EditPosition";
import AddPosition from "../ModalWindows/AddPosition";
import DeletePosition from "../ModalWindows/DeletePosition";

class PositionsList extends Component {
    static propTypes = {
        positions: PropTypes.array.isRequired,
    };
    render() {
        const columns = [
            {
                field: "actions",
                sortable: false,
                filterable: false,
                headerName: (
                    <AddPosition />
                ),
                width: 150,
                renderCell: (params) => (
                    <div>
                        <strong>
                            <EditPosition position={params.row}/>
                        </strong>
                        <strong>
                            <DeletePosition
                                id={params.id}
                            />
                        </strong>
                    </div>
                ),
            },
            { field: 'id', headerName: '№', width: 70 },
            { field: 'position_name', headerName: 'Название', width: 150 },
            { field: 'position_description', headerName: 'Описание', width: 150 },
        ];

        return (
            <div style={{ height: 300, width: '100%' }}>
                <DataGrid
                    rows={this.props.positions}
                    columns={columns}
                    pageSize={3}
                    hideFooterPagination={true}
                    hideFooterSelectedRowCount={true}
                />
            </div>
        )
    }
}

const mapStateToProps = () => ({});

export default connect(mapStateToProps)(PositionsList);