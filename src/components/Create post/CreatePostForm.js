import React, {Component} from 'react'

export default class RegisterForm extends Component {
    render() {
        return (
            <main>
                <form onSubmit={this.props.onSubmitHandler}>
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
                        <label>Post Content:</label>
                        <input
                            className="form-control"
                            type="text"
                            name="content"
                            value={this.props.body}
                            disabled={this.props.submitDisabled}
                            onChange={this.props.onChangeHandler}
                        />
                    </div>
                    <input className="btn btn-default" type="submit" value="Create" disabled={this.props.submitDisabled}/>
                </form>
            </main>
        )
    }
}