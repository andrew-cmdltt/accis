import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getDepartment} from "../../../actions/departments";
import {DataGrid} from "@material-ui/data-grid";
import EditDepartment from "../ModalWindows/EditDepartment";
import AddDepartment from "../ModalWindows/AddDepartment";
import DeleteDepartment from "../ModalWindows/DeleteDepartment";

class DepartmentsList extends Component {
    static propTypes = {
        departments: PropTypes.array.isRequired,
    };
    render() {
        const columns = [
            {
                field: "actions",
                sortable: false,
                filterable: false,
                headerName: (
                    <AddDepartment />
                ),
                width: 150,
                renderCell: (params) => (
                    <div>
                        <strong>
                            <EditDepartment department={params.row}/>
                        </strong>
                        <strong>
                            <DeleteDepartment
                                id={params.id}
                            />
                        </strong>
                    </div>
                ),
            },
            { field: 'id', headerName: '№', width: 70 },
            { field: 'department_name', headerName: 'Название', width: 150 },
            { field: 'department_description', headerName: 'Описание', width: 150 },
        ];

        return (
            <div style={{ height: 300, width: '100%' }}>
                <DataGrid
                    rows={this.props.departments}
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

export default connect(mapStateToProps, {getDepartment})(DepartmentsList);