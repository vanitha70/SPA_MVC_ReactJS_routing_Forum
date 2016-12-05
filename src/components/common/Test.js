import React, {Component} from 'react'
import Carousel from 'react-bootstrap/lib/Carousel';
// import $ from 'jquery';

export default class Test extends Component {
	constructor(props) {
		super(props);
		this.state = {
			index: 0,
			direction: null
		};
		this.pictures = [
			'https://softuni.bg/Files/Publications/2015/09/softuni-students-open-source-lab_115747890.jpg',
			'http://static.economic.bg/news/6/58840/item_item12287281102012794467448881250204438o.jpg',
			'http://www.investor.bg/images/photos/0185/0000185947-article3.jpg'
		];
		this.interval = null;
		this.handleSelect = this.handleSelect.bind(this);
		this.componentDidMount = this.componentDidMount.bind(this);
		this.componentWillUnmount = this.componentWillUnmount.bind(this);
		this.automate = this.automate.bind(this);
	}

	handleSelect(selectedIndex, e) {
		this.setState({
			index: selectedIndex,
			direction: e.direction
		});
		clearInterval(this.interval);
		this.interval = setInterval(this.automate, 5000)
	}

	automate() {
		if (this.state.index >= this.pictures.length - 1)
			this.setState({index: 0});
		else
			this.setState({index: this.state.index += 1});
	}

	componentDidMount() {
		this.interval = setInterval(this.automate, 5000)
	}

	componentWillUnmount() {
		clearInterval(this.interval);
	}

	render() {
		return (
			<Carousel id="headCarousel" activeIndex={this.state.index} direction={this.state.direction} onSelect={this.handleSelect}>
				<Carousel.Item>
					<img width={700} height={450} alt="900x500" src={this.pictures[0]}/>
					<Carousel.Caption>
						<h3>First slide label</h3>
						<p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
					</Carousel.Caption>
				</Carousel.Item>
				<Carousel.Item>
					<img width={700} height={450} alt="900x500" src={this.pictures[1]}/>
					<Carousel.Caption>
						<h3>Second slide label</h3>
						<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
					</Carousel.Caption>
				</Carousel.Item>
				<Carousel.Item>
					<img width={700} height={450} alt="900x500" src={this.pictures[2]}/>
					<Carousel.Caption>
						<h3>Third slide label</h3>
						<p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
					</Carousel.Caption>
				</Carousel.Item>
			</Carousel>
		);
	}
}
