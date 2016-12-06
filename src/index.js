import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {IndexRoute, Router, Route, browserHistory} from 'react-router';
import HomePage from './components/Home/HomePage';
import About from './components/About/AboutPage';
import Login from './components/Login/LoginPage';
import Register from './components/Register/RegisterPage';
import Logout from './components/Logout/LogoutPage';
import CreatePostPage from './components/Posts/Create post/CreatePostPage';
import AllPostsPage from './components/Posts/AllPostsPage';
import Profile from './components/Profile/ProfilePage';
import Edit from './components/Posts/Edit post/EditPage';
import Details from './components/Posts/DetailsPage';
import CreateCommentPage from './components/Comments/CreateComment/CreateCommentPage';
import ChangePass from './components/Profile/ChangePassPage'
import EditComment from './components/Comments/EditComment/EditCommentPage'
import AdminPanel from './components/Admin/Admin panel'
import ChangeAvatar from './components/Profile/ChangeAvatarPage'

ReactDOM.render(
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={HomePage}/>
            <Route path="about" component={About}/>
            <Route path="account/login" component={Login}/>
            <Route path="account/register" component={Register}/>
            <Route path="posts/create" component={CreatePostPage}/>
            <Route path="posts" component={AllPostsPage}/>
            <Route path="posts/edit/:postId" component={Edit}/>
            <Route path="comments/:postId" component={CreateCommentPage}/>
            <Route path="../../comments/edit/:commentId" component={EditComment}/>
            <Route path="posts/details/:postId" component={Details}/>
            <Route path="logout" component={Logout}/>
            <Route path="account/profile" component={Profile}>
                <Route path="changePass" component={ChangePass}/>
                <Route path="changeAvatar" component={ChangeAvatar}/>
            </Route>
            <Route path="admin" component={AdminPanel}/>
        </Route>
    </Router>,
    document.getElementById('root')
);
