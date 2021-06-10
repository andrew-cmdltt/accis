import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {getTextFieldType} from "../../../utils/getTextFieldType";
import {getLabelName} from "../../../utils/getLabelName";
import {connect} from "react-redux";
import {editDepartment} from "../../../actions/departments";
import PropTypes from "prop-types";
import EditIcon from "@material-ui/icons/Edit";
import {IconButton, withStyles} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import {compose} from "redux";
import {styles} from "../../../styles";

class EditDepartment extends Component {
    state = {
        open: false,
        id: 0,
        department_name: '',
        department_description: '',
    }

    static propTypes = {
        editDepartment: PropTypes.func.isRequired,
    };

    componentDidMount() {
        this.setState({
            id: this.props.department.id,
            department_name: this.props.department.department_name,
            department_description: this.props.department.department_description,
        })
    }

    handleClickOpen = () => {
        this.setState({open: true})
    };

    onChange = (e) => this.setState({[e.target.name]: e.target.value})

    onSubmit = (e) => {
        e.preventDefault()
        const {id, department_name, department_description} = this.state;
        const department = {id, department_name, department_description};
        if (department_name && department_description) {
            this.props.editDepartment(department, id);
            this.setState({open: false})
        }
    };

    handleClose = () => this.setState({open: false})

    render() {
        const { classes } = this.props;

        return (
            <div style={{width: 5, height: 5, marginBottom: -5}}>
                <EditIcon
                    variant="outlined"
                    onClick={this.handleClickOpen}
                />
                <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Информация по отделу</DialogTitle>
                    <IconButton aria-label="close" className={classes.closeButton} onClick={this.handleClose}>
                        <CloseIcon />
                    </IconButton>
                    <form onSubmit={this.onSubmit}>
                        <DialogContent>
                            {Object.keys(this.state).map((keyName) =>
                                (keyName !== "open" && keyName !== "id") ? (
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        type={getTextFieldType(keyName)}
                                        key={keyName}
                                        id={keyName}
                                        value={this.state[keyName]}
                                        label={getLabelName(keyName)}
                                        name={keyName}
                                        onChange={this.onChange}
                                    />
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
        );
    }
}

const mapStateToProps = () => ({});

export default compose(
    connect(mapStateToProps, {editDepartment}),
    withStyles(styles)
)(EditDepartment)