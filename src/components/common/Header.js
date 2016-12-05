import React, {Component} from 'react'
import Carousel from './Test';

export default class Header extends Component {
	render() {
		return (
			<div className="col-md-6">
				<h2>Forum</h2>
				<Carousel/>
			</div>
		);
	}
}