import React, {Component} from "react";
import PropTypes from "prop-types";
import {editEmployee} from "../../../actions/employees";
import {connect} from "react-redux";
import {FormControl, IconButton, InputLabel, Select, withStyles} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import {getTextFieldType} from "../../../utils/getTextFieldType";
import {getLabelName} from "../../../utils/getLabelName";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import {compose} from "redux";
import {styles} from "../styles";
import EditIcon from "@material-ui/icons/Edit";
import {getFieldValue} from "../../../utils/getFieldValue";
import {getIgnorableKeys} from "../../../utils/getIgnorableKeys";
import CloseIcon from "@material-ui/icons/Close";

class EditEmployee extends Component {
    state = {
        open: false,
        id: 0,
        full_name: '',
        birth_date: '',
        phone_number: '',
        email: '',
        passport_data: '',
        login: '',
        password: '',
        department_id: 0,
        position_id: 0,
        role_id: 2,
        is_authorized: false
    }

    static propTypes = {
        editEmployee: PropTypes.func.isRequired,
    };

    componentDidMount() {
        this.setState({
            id: this.props.employee.id,
            full_name: this.props.employee.full_name,
            birth_date: this.props.employee.birth_date,
            phone_number: this.props.employee.phone_number,
            email: this.props.employee.email,
            passport_data: this.props.employee.passport_data,
            department_id: this.props.employee.department_id,
            position_id: this.props.employee.position_id,
            role_id: this.props.employee.role_id,
            is_authorized: this.props.employee.is_authorized,
            login: this.props.employee.login,
            password: this.props.employee.password
        })
    }

    handleClickOpen = () => this.setState({open: true})

    handleClose = () => this.setState({open: false})

    handleSelectChange = (e) => this.setState({...this.state, [e.target.name]: Number(e.target.value)})

    onChange = (e) => this.setState({...this.state, [e.target.name]: e.target.value});

    onSubmit = (e) => {
        e.preventDefault();
        this.props.editEmployee(this.state, this.state.id);
        this.setState({open: false})
    };

    render() {
        const {classes} = this.props;
        const ignorable = ["open", "id", "role_id", "is_authorized", "position_id"]

        return (
            <div style={{width: 5, height: 5, marginBottom: -5}}>
                <EditIcon
                    variant="outlined"
                    onClick={this.handleClickOpen}
                />
                <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Добавление нового сотрудника</DialogTitle>
                    <IconButton aria-label="close" className={classes.closeButton} onClick={this.handleClose}>
                        <CloseIcon />
                    </IconButton>
                    <form onSubmit={this.onSubmit}>
                        <DialogContent>
                            {Object.keys(this.state).map((keyName) =>
                                (!getIgnorableKeys(ignorable, this.state["is_authorized"]).includes(keyName))
                                    ? (<div key={keyName}>
                                            {keyName === "department_id" ? (
                                                <FormControl key={keyName} variant="outlined"
                                                             className={classes.formControl}>
                                                    <InputLabel htmlFor={`outlined-${keyName}-native-simple`}>
                                                        {getLabelName(keyName)}
                                                    </InputLabel>
                                                    <Select
                                                        native
                                                        label={getLabelName(keyName)}
                                                        value={this.state[keyName]}
                                                        onChange={this.handleSelectChange.bind(this)}
                                                        name={keyName}
                                                        id={`outlined-${keyName}-native-simple`}
                                                    >
                                                        <option value="0">Не указано</option>

                                                        {this.props.departments.map((department) =>
                                                            <option
                                                                key={department.id}
                                                                value={department.id}
                                                            >
                                                                {department.department_name}
                                                            </option>
                                                        )}
                                                    </Select>
                                                </FormControl>
                                            ) : (
                                                <TextField
                                                    variant="outlined"
                                                    margin="normal"
                                                    required
                                                    fullWidth
                                                    type={getTextFieldType(keyName)}
                                                    value={getFieldValue(keyName, this.state[keyName])}
                                                    key={keyName}
                                                    id={keyName}
                                                    label={getLabelName(keyName)}
                                                    name={keyName}
                                                    onChange={this.onChange}
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                />)}
                                        </div>

                                    ) : "")}
                        </DialogContent>
                        <DialogActions>
                            <Button type="submit"
                                    color="secondary"
                                    variant="contained">
                                Сохранить
                            </Button>
                            <Button onClick={this.handleClose}
                                    variant="contained"
                                    color="primary">
                                Отмена
                            </Button>
                        </DialogActions>
                    </form>
                </Dialog>
            </div>
        )
    }
}

const mapStateToProps = () => ({});

export default compose(
    connect(mapStateToProps, {editEmployee}),
    withStyles(styles),
)(EditEmployee)