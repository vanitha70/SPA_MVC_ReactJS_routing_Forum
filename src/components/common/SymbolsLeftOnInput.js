import React, {Component} from 'react'
/*
 * Displays the maximum symbols
 * that the user can input into given form.
 * Give this a properties of maxSymbols={integer}
 * and an input property containing the form input
 * You can also set a class to the div containing
 * the counter eg. - "col-md-5"
 * This counter can also hide if it is given
 * a boolean property named fieldOnFocus which
 * is managed by the onFocus on the input field
 */

export default class SymbolsLeft extends Component {
	constructor(props) {
		super(props);
		this.state = {
			symbolsLeft: 0,
			length: 0,
			klass: '',
			fieldOnFocus: null
		}
	}
	bindToClass() {
		this.componentDidMount = this.componentDidMount.bind(this);
		this.componentDidUpdate = this.componentDidUpdate.bind(this);

	}
	componentDidUpdate() {
		if (this.state.length === this.props.input.length)
			return false;
		let value = this.props.maxSymbols - this.props.input.length;

		this.setState({
			symbolsLeft: value < 0 ? 0 : value,
			length: this.props.input.length
		});

		if (this.props.fieldOnFocus !== undefined)
			this.setState( { fieldOnFocus: this.props.fieldOnFocus } )
	}

	componentDidMount() {
		this.setState ({
			symbolsLeft: this.props.maxSymbols - this.props.input.length,
			length: this.props.input.length
		});
		if (this.props.klass !== undefined)
			this.setState( {klass: this.props.klass } );
		if (this.props.fieldOnFocus !== undefined)
			this.setState( { fieldOnFocus: this.props.fieldOnFocus } )

	}

	render() {
		let toggle = this.props.fieldOnFocus ? "block" : "none";
		return (
			<div className={this.state.klass} style={{ display: toggle}}>
				<p>{this.state.symbolsLeft}</p>
			</div>
		);
	}
}