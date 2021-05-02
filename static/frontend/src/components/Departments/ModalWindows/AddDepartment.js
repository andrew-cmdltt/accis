import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {Icon} from "@material-ui/core";
import {getTextFieldType} from "../../../utils/getTextFieldType";
import {getLabelName} from "../../../utils/getLabelName";
import {connect} from "react-redux";
import {addDepartment} from "../../../actions/departments";
import PropTypes from "prop-types";

class AddDepartment extends Component {
    state = {
        open: false,
        department_name: '',
        department_description: '',
    }

    static propTypes = {
        addDepartment: PropTypes.func.isRequired,
    };

    handleClickOpen = () => {
        this.setState({open: true})
    };

    onChange = (e) => this.setState({[e.target.name]: e.target.value})

    onSubmit = (e) => {
        e.preventDefault()

        const {department_name, department_description} = this.state;
        const department = {department_name, department_description};
        if (department_name && department_description) {
            this.props.addDepartment(department);
            this.setState({open: false})
        }
    };

    handleClose = () => {
        this.setState({open: false})
    };

    render() {
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
                    <DialogTitle id="form-dialog-title">Добавление нового отдела</DialogTitle>
                    <form onSubmit={this.onSubmit}>
                        <DialogContent>
                            {Object.keys(this.state).map((keyName) =>
                                keyName !== "open" ? (
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
                                    />
                                ) : "")}
                        </DialogContent>
                        <DialogActions>
                            <Button type="submit" color="primary">
                                Сохранить
                            </Button>
                            <Button onClick={this.handleClose} color="primary">
                                Отмена
                            </Button>
                        </DialogActions>
                    </form>
                </Dialog>
            </div>
        );
    }
}

const mapStateToProps = () => ({});
export default connect(mapStateToProps, {addDepartment})(AddDepartment);