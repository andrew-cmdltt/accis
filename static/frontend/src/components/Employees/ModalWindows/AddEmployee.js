import React, {Component} from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {addEmployee} from "../../../actions/employees";
import {getRoleIdByPositionId} from "../../../utils/roles/getRoleIdByPositionId";
import {FormControl, Icon, InputLabel, Select, withStyles} from "@material-ui/core";
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

class AddEmployee extends Component {
    state = {
        open: false,
        full_name: '',
        birth_date: '',
        phone_number: '',
        email: '',
        passport_data: '',
        department_id: 0,
        position_id: 0,
        role_id: 5,
        is_authorized: false,
        login: '',
        password: '',
    }

    static propTypes = {
        addEmployee: PropTypes.func.isRequired,
    };

    handleSelectChange(event) {
        this.setState({[event.target.name]: Number(event.target.value)});
    }

    handleClickOpen = () => {
        this.setState({open: true})
    };

    handleClose = () => {
        this.setState({open: false})
    };

    onChange = (e) => this.setState({[e.target.name]: e.target.value});

    onSubmit = (e) => {
        e.preventDefault();

        if (this.props.isAdmin) {
            this.state.role_id = getRoleIdByPositionId(this.state.position_id)
            if (this.state.role_id === 2 || this.state.role_id === 4) {
                this.state.is_authorized = true
            }
        }

        this.props.addEmployee(this.state);
        this.setState({open: false})
    };

    render() {
        const {classes} = this.props;
        let ignorable = ["open", "department_id", "id", "position_id", "role_id", "is_authorized"]

        return (
            <div>
                <Icon color="primary"
                      variant="outlined"
                      onClick={this.handleClickOpen}
                      style={
                          {fontSize: 30, marginLeft: 40, marginTop: 20}}
                >
                    add_circle
                </Icon>
                <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Добавление нового сотрудника</DialogTitle>
                    <form onSubmit={this.onSubmit}>
                        <DialogContent>
                            {Object.keys(this.state).map((keyName) =>
                                (!ignorable.includes(keyName))
                                    ? (
                                        <TextField
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            fullWidth
                                            type={getTextFieldType(keyName)}
                                            key={keyName}
                                            id={keyName}
                                            label={getLabelName(keyName)}
                                            name={keyName}
                                            onChange={this.onChange}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    ) : "")}
                            {Object.keys(this.state).map((keyName) =>
                                keyName !== "open"
                                && (keyName === "department_id"
                                    || keyName === "position_id")
                                    ? (
                                        <FormControl key={keyName} variant="outlined" className={classes.formControl}>
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
                                                {keyName === "department_id" ? (<>
                                                        {this.props.departments.map((department) =>
                                                            <option
                                                                key={department.id}
                                                                value={department.id}
                                                            >
                                                                {department.department_name}
                                                            </option>
                                                        )}
                                                    </>
                                                ) : (<>
                                                        {this.props.positions.map((position) =>
                                                            <option
                                                                key={position.id}
                                                                value={position.id}
                                                            >
                                                                {position.position_name}
                                                            </option>
                                                        )}
                                                    </>
                                                )}
                                            </Select>
                                        </FormControl>

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
    connect(mapStateToProps, {addEmployee}),
    withStyles(styles),
)(AddEmployee)