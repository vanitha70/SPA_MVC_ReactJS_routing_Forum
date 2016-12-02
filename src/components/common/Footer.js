import React, {Component} from 'react'
export default class Footer extends Component {
    render() {
        return (
            <footer className="footer">
                <br />
                <div>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2933.7494573265208!2d23.348494815008543!3d42.66666442367692!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40aa85cb55c36753%3A0xbde203f1e5db85d1!2z0YPQuy4g4oCe0KLQuNC90YLRj9Cy0LDigJwgMTUtMTcsIDExMTMg0KHQvtGE0LjRjw!5e0!3m2!1sbg!2sbg!4v1472300758046"width={450}height={160}></iframe>
                </div>
                <div>
                    (c) 2016 - SoftUni Forum (ReactJS MVC App)
                </div>

            </footer>

        )
    }
}