import React, {Component} from "react";
import PropTypes from "prop-types";
import {searchCourses} from "../../actions/courses";
import {connect} from "react-redux";
import {getCourses} from "../../actions/courses";

class SearchCourseForm extends Component {
    state = {
        name: '',
        organization: 0,
        id: 0,
    }
    static propTypes = {
        searchCourses: PropTypes.func.isRequired,
        getCourses: PropTypes.func.isRequired,
        organizations: PropTypes.array.isRequired,
    };

    handleSelectChange(event) {
        this.setState({[event.target.name]: Number(event.target.value)});
    }

    onChange = (e) => this.setState({[e.target.name]: e.target.value});

    onSubmit = (e) => {
        e.preventDefault();
        const {
            name,
            organization,
            id,
        } = this.state;
        const params = {
            name,
            organization,
            id
        }
        if (!params.name && !params.organization && !params.id) {
            this.props.getCourses();
        } else {
            this.props.searchCourses(params);
        }
    };

    render() {
        const {name, organization, id} = this.state;
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <div className="input-group">
                        <input
                            className="form-control"
                            type="search"
                            name="name"
                            value={name}
                            onChange={this.onChange}
                            placeholder="по названию курса"/>
                        <select
                            className="form-control"
                            name="organization"
                            value={organization}
                            onChange={this.handleSelectChange.bind(this)}
                        >
                            <option value="0">Все организации</option>
                            {this.props.organizations.map((organization, index) =>
                                <option
                                    key={organization.nelementkey}
                                    value={organization.nelementkey}
                                >
                                    {organization.celementname}
                                </option>
                            )}
                        </select>
                        <select
                            className="form-control"
                            name="id"
                            value={id}
                            onChange={this.handleSelectChange.bind(this)}
                        >
                            <option value="0">Все номера (№)</option>
                            {this.props.courses.map((course, index) =>
                                <option
                                    className="form-control"
                                    value={course.id}
                                    key={course.id}
                                >
                                    {course.id}
                                </option>
                            )}
                        </select>
                        <span className="input-group-btn">
                            <input className="btn btn-primary" type="submit" value="поиск"/>
                        </span>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    organizations: state.organizations.organizations,
    courses: state.courses.courses
});
export default connect(mapStateToProps, {searchCourses, getCourses})(SearchCourseForm);