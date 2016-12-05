import React, {Component} from 'react'

let pictures = [
    'https://softuni.bg/Files/Publications/2015/09/softuni-students-open-source-lab_115747890.jpg',
    'http://static.economic.bg/news/6/58840/item_item12287281102012794467448881250204438o.jpg',
    'http://www.investor.bg/images/photos/0185/0000185947-article3.jpg'
];

export default class Header extends Component {

    constructor(props){
        super(props)
        this.interval = null
        this.state = {
            currentPicture: 0
        }

        this.nextGP = this.nextGP.bind(this);
    }

    nextGP () {
        let current = this.state.currentPicture;
        let next = ++current % pictures.length;
        this.setState({ currentPicture: next });
        document.getElementById('navbar').style.backgroundImage = `url(${pictures[next]})`;
    }

    componentDidMount () {
        document.getElementById('navbar').style.backgroundImage = `url(${pictures[this.state.currentPicture]})`;
        this.interval = setInterval(this.nextGP, 10000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {

        return (
            <div id="navbar" className="jumbotron">
                <h1>Forum</h1>
                {this.props.children}
            </div>
        )
    }
}