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
import {addPosition, deletePosition} from "../../../actions/positions";
import {compose} from "redux";
import {IconButton, withStyles} from "@material-ui/core";
import {styles} from "../../../styles";
import CloseIcon from "@material-ui/icons/Close";

class DeletePosition extends Component {
    state = {
        open: false
    }

    static propTypes = {
        deletePosition: PropTypes.func.isRequired,
    };

    handleClickOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    onSubmit = (e) => {
        e.preventDefault();
        this.props.deletePosition(this.props.id)
        this.setState({open: false});
    }

    render() {
        const { classes } = this.props;

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
                    <DialogTitle id="alert-dialog-title">{"Вы действительно хотите удалить должность?"}</DialogTitle>
                    <IconButton aria-label="close" className={classes.closeButton} onClick={this.handleClose}>
                        <CloseIcon />
                    </IconButton>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Вся информация будет удалена из системы. Восстановить данные невозможно.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose}
                                color="primary"
                                variant="contained"
                                autoFocus>
                            Отмена
                        </Button>
                        <Button onClick={this.onSubmit}
                                color="secondary"
                                variant="contained">
                            УДАЛИТЬ
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }

}

const mapStateToProps = (state) => ({
    positions: state.positions.positions,
});

export default compose(
    connect(mapStateToProps, {deletePosition}),
    withStyles(styles)
)(DeletePosition)