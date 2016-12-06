import React, {Component} from 'react'
import './AboutPage.css'

export default class AboutPage extends Component {
    render() {
        return (
            <section>
                <div className="page-header text-center">
                    <h2>About</h2>
                </div>
                <div className="container-fluid">
                    <div className="col-md-6 pane panel-default">
                        <div className="panel-heading">
                            <h3>Contacts</h3>
                        </div>
                        <div className="panel-body">
                            <p>Sofia, Izgrev, Tyntiava str. 15-17, floor 1</p>
                            Open:
                            <p>10:00 - 20:00 (Monday - Friday)</p>
                            Phone:
                            <p>+359 899 55 55 92</p>
                            Post code:
                            <p>1113</p>
                            Email:
                            <p>info@softuni.bg</p>
                        </div>
                    </div>
                    <side className="col-md-6 panel panel-default">
                        <div className="panel-heading">
                            <h2>Find us</h2>
                        </div>
                        <div className="panel-body embed-responsive embed-responsive-16by9">
                            <iframe className="embed-responsive-item" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2933.7494573265208!2d23.348494815008543!3d42.66666442367692!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40aa85cb55c36753%3A0xbde203f1e5db85d1!2z0YPQuy4g4oCe0KLQuNC90YLRj9Cy0LDigJwgMTUtMTcsIDExMTMg0KHQvtGE0LjRjw!5e0!3m2!1sbg!2sbg!4v1472300758046" width={450} height={160}></iframe>
                        </div>
                    </side>
                </div>
                <div className="about col-md-10 col-md-push-1">Software University JavaScript Applications Teamwork</div>
            </section>
        )
    }
}
