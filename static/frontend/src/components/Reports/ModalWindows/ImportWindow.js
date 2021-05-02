import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {importReport} from "../../../actions/reports";

class ImportWindow extends Component {
    static propTypes = {
        importReport: PropTypes.func.isRequired,
    };

    state = {
        title: '',
        content: '',
        xlsx: null,
    }

    handleChange = (e) => {
        this.setState({
            xlsx: e.target.files[0]
        })
    };

    onSubmit = (e) => {
        e.preventDefault()
        let form_data = new FormData();
        form_data.append('xlsx', this.state.xlsx, this.state.xlsx.name);
        form_data.append('title', this.state.title);
        form_data.append('content', this.state.content);

        console.log(form_data.get("xlsx"))

        this.props.importReport(form_data)

    };

    render() {
        return (
            <div id="importWindow" className="modal fade" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Загрузите XLSX файл</h4>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <p>
                                <input
                                    type="file"
                                    id="file"
                                    accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                                    onChange={this.handleChange}
                                    required
                                />
                            </p>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="submit"
                                className="btn btn-danger mr-auto"
                                data-dismiss="modal"
                                onClick={this.onSubmit}
                            >
                                Импортировать
                            </button>
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Отмена</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    reports: state.reports.reports,
});

export default connect(mapStateToProps, {importReport})(ImportWindow);