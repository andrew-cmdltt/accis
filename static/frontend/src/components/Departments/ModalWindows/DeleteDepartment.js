import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DeleteIcon from "@material-ui/icons/Delete";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {deleteDepartment} from "../../../actions/departments";

class DeleteDepartment extends Component {
    state = {
        open: false
    }

    static propTypes = {
        deleteDepartment: PropTypes.func.isRequired,
    };

    handleClickOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    onSubmit = (e) => {
        e.preventDefault();
        this.props.deleteDepartment(this.props.id)
        this.setState({open: false});
    }

    render() {
        return (
            <div style={{width: 5, height: 5, marginBottom: 30, marginLeft: 100}}>
                <DeleteIcon
                    onClick={this.handleClickOpen}
                />
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Вы действительно хотите удалить отдел?"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Вся информация будет удалена из системы. Восстановить данные невозможно.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary" autoFocus>
                            Отмена
                        </Button>
                        <Button onClick={this.onSubmit} color="primary">
                            УДАЛИТЬ
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }

}

const mapStateToProps = (state) => ({
    departments: state.departments.departments,
});

export default connect(mapStateToProps, { deleteDepartment })(DeleteDepartment);
