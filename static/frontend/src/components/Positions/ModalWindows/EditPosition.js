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
import {editPosition} from "../../../actions/positions";
import PropTypes from "prop-types";
import EditIcon from "@material-ui/icons/Edit";

class EditPosition extends Component {
    state = {
        open: false,
        id: 0,
        position_name: '',
        position_description: '',
    }

    static propTypes = {
        editPosition: PropTypes.func.isRequired,
    };

    componentDidMount() {
        this.setState({
            id: this.props.position.id,
            position_name: this.props.position.position_name,
            position_description: this.props.position.position_name,
        })
    }

    handleClickOpen = () => {
        this.setState({open: true})
    };

    onChange = (e) => this.setState({[e.target.name]: e.target.value})

    onSubmit = (e) => {
        e.preventDefault()
        const {id, position_name, position_description} = this.state;
        const position = {id, position_name, position_description};
        if (position_name && position_description) {
            this.props.editPosition(position, id);
            this.setState({open: false})
        }
    };

    handleClose = () => this.setState({open: false})

    render() {
        return (
            <div style={{width: 5, height: 5, marginBottom: -5}}>
                <EditIcon
                    variant="outlined"
                    onClick={this.handleClickOpen}
                />
                <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Информация по должности</DialogTitle>
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

export default connect(mapStateToProps, {editPosition})(EditPosition);