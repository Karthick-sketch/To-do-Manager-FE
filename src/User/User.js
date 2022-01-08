import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./User.css"
import axios from 'axios';

const api = axios.create({ baseURL: "http://localhost:8080/" });

function Signin() {
    const redirect = useNavigate();
    async function handleSubmit() {
        try {
            let email = document.getElementById("email").value;
            let password = document.getElementById("password").value;

            if (email !== '' && password !== '') {
                let data = await api.get("/user/signin/" + email).then(({data}) => data);
                localStorage.setItem("user_id", data.id);
                localStorage.setItem("user_name", data.name);
                redirect("/todos");
            }
        } catch (error) { console.log(error); }
    }

    return (
        <div className="User-session">
            <p className="NewUser-title">Sign In</p>
            <section className="UsersNew">
                <div className="Form-section">
                    <p className="FormInput-label">Email: </p>
                    <input type="email" id="email" className="Form-input" autoFocus/>
                </div>
                <div className="Form-section">
                    <p className="FormInput-label">Password: </p>
                    <input type="password" id="password" className="Form-input"/>
                </div>
                <div className="Form-section">
                    <button className="Form-submit" onClick={handleSubmit}>Sign In</button>
                </div>
                <Link to="/signup">Create new account</Link>
            </section>
        </div>
    );
}


function Signup() {
    const redirect = useNavigate();
    async function handleSubmit() {
        try {
            let name = document.getElementById("name").value;
            let email = document.getElementById("email").value;
            let password = document.getElementById("password").value;

            if (email !== '' && password !== '') {
                let data = await api.post("/user", {name: name, email: email, password: password}).then(({data}) => data);
                localStorage.setItem("user_id", data.id);
                localStorage.setItem("user_name", data.name);
                redirect("/todos");
            }
        } catch (error) { console.log(error); }
    }

    return (
        <div className="User-session">
            <p className="NewUser-title">Welcome new user</p>
            <section className="UsersNew">
                <div className="Form-section">
                    <p className="FormInput-label">Full Name: </p>
                    <input type="text" id="name" className="Form-input" autoFocus/>
                </div>
                <div className="Form-section">
                    <p className="FormInput-label">Email: </p>
                    <input type="email" id="email" className="Form-input"/>
                </div>
                <div className="Form-section">
                    <p className="FormInput-label">Password: </p>
                    <input type="password" id="password" className="Form-input"/>
                </div>
                <div className="Form-section">
                    <button className="Form-submit" onClick={handleSubmit}>Sign Up</button>
                </div>
                <Link to="/signin">Already have an account</Link>
            </section>
        </div>
    );
}

export { Signin, Signup };
