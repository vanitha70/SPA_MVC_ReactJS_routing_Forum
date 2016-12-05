import React, {Component} from 'react'
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import Navbar from 'react-bootstrap/lib/Navbar'
import { LinkContainer } from 'react-router-bootstrap';
import {Link} from 'react-router'

export default class NavigationBar extends Component {
	render() {
		let navbar = {};
		if (!this.props.loggedIn) {
			navbar = (
				<Nav>
					<LinkContainer to="account/login" key="login">
						<NavItem href="account/login">Login</NavItem>
					</LinkContainer>
					<LinkContainer to="account/register" key="register">
						<NavItem href="account/register">Register</NavItem>
					</LinkContainer>
					<LinkContainer to="about" key="about" >
						<NavItem href="about">About</NavItem>
					</LinkContainer>
				</Nav>
			)
		} else {
			navbar = (
				<Nav>
					<LinkContainer to="posts/create" key="create">
						<NavItem href="posts/create">Create post</NavItem>
					</LinkContainer>
					<LinkContainer to="posts" key="posts">
						<NavItem href="posts">All posts</NavItem>
					</LinkContainer>
					<LinkContainer to="about" key="about">
						<NavItem href="about" >About</NavItem>
					</LinkContainer>
				</Nav>
			)
		}
		return (
			<Navbar inverse collapseOnSelect>
				<Navbar.Header>
					<Navbar.Brand>
						<Link to="/">Home</Link>
					</Navbar.Brand>
					<Navbar.Toggle />
				</Navbar.Header>
				<Navbar.Collapse>
					{navbar}
					<Nav pullRight>
						<LinkContainer to="account/profile" key="profile">
							<NavItem href="/account/profile">{this.props.user}</NavItem>
						</LinkContainer>
						<LinkContainer to="logout" key="logout">
							<NavItem href="/logout">Logout</NavItem>
						</LinkContainer>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		);
	}
}