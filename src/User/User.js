import React from 'react';
import { Link } from 'react-router-dom';
import "./User.css"
// import axios from 'axios';

// const api = axios.create({ baseURL: "http://localhost:8080/" });

function Signin() {
    return <div className="User-session">
        <p className="NewUser-title">Sign In</p>
        <section className="UsersNew">
            <div className="Form-section">
                <p className="FormInput-label">Email: </p>
                <input type="email" name="email" className="Form-input" autoFocus/>
            </div>
            <div className="Form-section">
                <p className="FormInput-label">Password: </p>
                <input type="password" name="password" className="Form-input"/>
            </div>
            <div className="Form-section">
                <button className="Form-submit">Sign In</button>
            </div>
            <Link to="/signup">Create new account</Link>
        </section>
    </div>
}


function Signup() {
    return <div className="User-session">
        <p className="NewUser-title">Welcome new user</p>
        <section className="UsersNew">
            <div className="Form-section">
                <p className="FormInput-label">Full Name: </p>
                <input type="text" name="first_name" className="Form-input" autoFocus/>
            </div>
            <div className="Form-section">
                <p className="FormInput-label">Email: </p>
                <input type="email" name="email" className="Form-input"/>
            </div>
            <div className="Form-section">
                <p className="FormInput-label">Password: </p>
                <input type="password" name="password" className="Form-input"/>
            </div>
            <div className="Form-section">
                <button className="Form-submit">Sign Up</button>
            </div>
            <Link to="/signin">Already have an account</Link>
        </section>
    </div>;
}

export { Signin, Signup };
