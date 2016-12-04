import React, {Component} from 'react';

export default class EditForm extends Component {
    render() {
        let options = []
        for (let i = 0; i < this.props.categories.length; i++) {
            options.push(<option key={this.props.categories[i]._id}>{this.props.categories[i].name}</option>)
        }
        return (
            <form onSubmit={this.props.onSubmitHandler}>
                <div className="form-group">
                    <label>Select Category:</label>
                    <select className="form-control" id="sel1" name="category" value={this.props.category} onChange={this.props.onChangeHandler}>
                        <option key="empty"> </option>
                        {options}
                    </select>
                </div>
                <br/>
                <div className="form-group">
                    <label>Post title:</label>
                    <input
                        className="form-control"
                        type="text"
                        name="title"
                        value={this.props.title}
                        disabled={this.props.submitDisabled}
                        onChange={this.props.onChangeHandler}
                    />
                </div>
                <div className="form-group">
                    <label>Post content:</label>
                    <textarea
                        className="form-control"
                        name="body"
                        value={this.props.body}
                        disabled={this.props.submitDisabled}
                        onChange={this.props.onChangeHandler}
                    />
                </div>
                <input className="btn btn-default" type="submit" value="Submit changes" disabled={this.props.submitDisabled}/>
            </form>
        );
    }
}