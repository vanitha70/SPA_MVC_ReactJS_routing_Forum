import React, {Component} from 'react'

export default class RequirementMessage extends Component {
	constructor(props) {
		super(props);
		this.kolor = "red";
		this.klass = "";
		this.message = "";
	}

	componentDidMount() {
		this.message = this.props.message;

		if (this.props.klass !== undefined)
			this.klass = this.props.klass;
		if (this.props.kolor !== undefined)
			this.kolor = this.props.kolor;
	}

	render() {
		let toggle = this.props.fieldOnFocus ? "block" : "none";
		if (toggle === undefined)
			toggle = "block";
		return (
			<div className={this.klass} style={ { color: this.kolor, display: toggle } }>
				<p>{this.message}</p>
			</div>
		)
	}
}