import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getEmployee} from "../../../actions/employees";
import {getDepartmentName} from "../../../utils/departmemnts/getDepartmentName";
import {getRoleName} from "../../../utils/roles/getRoleName";
import {getPositionName} from "../../../utils/positions/getPositionName";

import {DataGrid} from "@material-ui/data-grid";
import AddEmployee from "../ModalWindows/AddEmployee";
import DeleteEmployee from "../ModalWindows/DeleteEmployee";
import EditEmployee from "../ModalWindows/EditEmployee";

const dateFormat = require('dateformat')

class EmployeesList extends Component {
    static propTypes = {
        getEmployee: PropTypes.func.isRequired,
        employees: PropTypes.array.isRequired,
    };

    render() {
        const columns = [
            {
                field: "actions",
                sortable: false,
                filterable: false,
                headerName: (
                    <AddEmployee
                        departments={this.props.departments}
                        positions={this.props.positions}
                        isAdmin={this.props.isAdmin}
                    />
                ),
                width: 150,
                renderCell: (params) => (
                    <div>
                        <strong>
                            <EditEmployee
                                departments={this.props.departments}
                                positions={this.props.positions}
                                employee={params.row}
                                isAdmin={this.props.isAdmin}
                            />
                        </strong>
                        <strong>
                            <DeleteEmployee
                                id={params.id}
                            />
                        </strong>
                    </div>
                ),
            },
            {field: 'id', headerName: '№', width: 70},
            {field: 'full_name', headerName: 'ФИО', width: 150},
            {
                field: 'birth_date', headerName: 'Дата рождения', width: 150,
                renderCell: (params) => {
                    return dateFormat(params.row.birth_date, "UTC:dd.mm.yyyy")
                }
            },
            {field: 'phone_number', headerName: 'Телефон', width: 150},
            {field: 'email', headerName: 'Email', width: 150},
            {field: 'passport_data', headerName: 'Паспортные данные', width: 150},
            {
                field: 'department_id', headerName: 'Отдел', width: 150,
                renderCell: (params) => {
                    return getDepartmentName(this.props.departments, params.row.department_id)
                }
            },
            {
                field: 'role_id', headerName: 'Роль', width: 150,
                renderCell: (params) => {
                    return getRoleName(params.row.role_id)
                }
            },
            {
                field: 'position_id', headerName: 'Должность', width: 150,
                renderCell: (params) => {
                    return getPositionName(this.props.positions, params.row.position_id)
                }
            },
        ];
        return (
            <div style={{height: 300, width: '100%'}}>
                <DataGrid
                    rows={this.props.employees}
                    columns={columns}
                    pageSize={3}
                    hideFooterPagination={true}
                    hideFooterSelectedRowCount={true}
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    employee: state.employee.employee,
});

export default connect(mapStateToProps, {getEmployee})(EmployeesList);