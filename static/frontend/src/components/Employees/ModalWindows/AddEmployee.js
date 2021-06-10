import React, {Component} from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {addEmployee} from "../../../actions/employees";
import {getRoleIdByPositionId} from "../../../utils/roles/getRoleIdByPositionId";
import {FormControl, Icon, IconButton, InputLabel, Select, withStyles} from "@material-ui/core";
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
import {getIgnorableKeys} from "../../../utils/getIgnorableKeys";
import CloseIcon from "@material-ui/icons/Close";

class AddEmployee extends Component {
    state = {
        open: false,
        full_name: '',
        birth_date: '',
        phone_number: '',
        email: '',
        passport_data: '',
        role_id: 5,
        is_authorized: false,
        login: '',
        password: '',
        department_id: 0,
        position_id: 0,
    }

    static propTypes = {
        addEmployee: PropTypes.func.isRequired,
    };

    handleSelectChange(e) {
        let role_id
        if (e.target.name === "position_id") {
            role_id = getRoleIdByPositionId(Number(e.target.value))
            this.setState({role_id: role_id})
            if (role_id === 2 || role_id === 4) {
                this.setState({is_authorized: true})

            } else {
                this.setState({is_authorized: false})
            }
        }

        this.setState({[e.target.name]: Number(e.target.value)});
    }

    handleClickOpen = () => this.setState({open: true})

    handleClose = () => this.setState({open: false})

    onChange = (e) => this.setState({[e.target.name]: e.target.value});

    onSubmit = (e) => {
        e.preventDefault();
        this.props.addEmployee(this.state);
        this.setState({open: false})
    };

    render() {
        const {classes} = this.props;
        const ignorable = ["open", "id", "role_id", "is_authorized"]

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
                    <IconButton aria-label="close" className={classes.closeButton} onClick={this.handleClose}>
                        <CloseIcon />
                    </IconButton>
                    <form onSubmit={this.onSubmit}>
                        <DialogContent>
                            {Object.keys(this.state).map((keyName) =>
                                (!getIgnorableKeys(ignorable, this.state["is_authorized"]).includes(keyName))
                                    ? (<div key={keyName}>
                                            {(keyName === "department_id" || keyName === "position_id") ? (
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
                                            ) : (
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
    connect(mapStateToProps, {addEmployee}),
    withStyles(styles),
)(AddEmployee)