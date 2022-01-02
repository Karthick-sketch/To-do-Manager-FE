import React from 'react';
import { Link } from 'react-router-dom';
import "./User.css"
// import axios from 'axios';

// const api = axios.create({ baseURL: "http://localhost:8080/" });

function Signin() {
    return <div class="User-session">
        <p class="NewUser-title">Sign In</p>
        <section class="UsersNew">
            <div class="Form-section">
                <p class="FormInput-label">Email: </p>
                <input type="email" name="email" className="Form-input" autoFocus/>
            </div>
            <div class="Form-section">
                <p class="FormInput-label">Password: </p>
                <input type="password" name="password" className="Form-input"/>
            </div>
            <div class="Form-section">
                <button className="Form-submit">Sign In</button>
            </div>
            <Link to="/signup">Create new account</Link>
        </section>
    </div>
}


function Signup() {
    return <div class="User-session">
        <p class="NewUser-title">Welcome new user</p>
        <section class="UsersNew">
            <div class="Form-section">
                <p class="FormInput-label">Full Name: </p>
                <input type="text" name="first_name" className="Form-input" autoFocus/>
            </div>
            <div class="Form-section">
                <p class="FormInput-label">Email: </p>
                <input type="email" name="email" className="Form-input"/>
            </div>
            <div class="Form-section">
                <p class="FormInput-label">Password: </p>
                <input type="password" name="password" className="Form-input"/>
            </div>
            <div class="Form-section">
                <button className="Form-submit">Sign Up</button>
            </div>
            <Link to="/signin">Already have an account</Link>
        </section>
    </div>;
}

export { Signin, Signup };
