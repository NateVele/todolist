import React, { Component, useState } from "react";
import FormData from 'form-data'
import './index.css';

const validEmailRegex = 
  RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);

const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach(
        (val) => val.length > 0 && (valid = false)
    );
    return valid;
}

let ebool = false;
let pbool = false;

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: null,
            password: null,
            errors: {
                email: '',
                password: '',
            }
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onKeyPress = this.onKeyPress.bind(this);
    }


    handleChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        let errors = this.state.errors;
        errors.password = '';
        errors.email = '';

        switch(name) {
            case 'email':
                if (validEmailRegex.test(value)) {
                    errors.email = '';
                    this.setState({email: event.target.value});
                    ebool = true;
                    if (pbool) {
                        let btn = document.getElementById("Button");
                        btn.disabled = false;
                    }
                } else {
                    ebool = false;
                    errors.email = 'Email is Invalid';
                    let btn = document.getElementById("Button");
                    btn.disabled = true;
                }
                break;
            case 'password':
                if (value.length < 4) {
                    errors.password = 'Password must be greater than or equal to 4 characters' 
                    pbool = false;
                    let btn = document.getElementById("Button");
                    btn.disabled = true;
                }  else {
                    errors.password = '';
                    this.setState({password: event.target.value});
                    pbool = true;
                    if (ebool) {
                        let btn = document.getElementById("Button");
                        btn.disabled = false;
                    }
                }
                break;
            default:
                break;
        }
        this.setState({ errors, [name]: value});
    }

    handleSubmit = async() => {
        let btn = document.getElementById("Button");
        btn.disabled = true;
        let errors = this.state.errors;

        let form = new FormData();
        form.append('email', this.refs.email.value);
        form.append('password', this.refs.password.value);

        let myfetch = await fetch('http://dev.**********.com/Tests/scripts/user-login.php', {
            method: 'POST',

            body: form
        }).then((Response) => {
            if (Response.status === 200) {
                let data = Response.results;
                sessionStorage.setItem('user', 'testuser');
                this.props.history.push('./Todo');
            } else {
                alert('Incorrect Username or Password.');
                btn.disabled = false;
            }
            return Response.json()
        })
    }

    onKeyPress = (x) => {
        let check = document.getElementById('Button'); 
        if (check.disabled) {
            return;
        }
        if (x.which === 13) {
            x.preventDefault();
            this.handleSubmit(x);
        }
    }

    render() {
        const { errors } = this.state;
        return (
            <div className="auth-inner">
            <form onSubmit={this.handleSubmit} noValidate>
                <h3 className="login-head">Login</h3>

                <div className="form-group">
                    <div className="email">
                        <label htmlFor="email">Email address</label>
                        <input type="email" id="in1" ref="email" className={errors.email.length > 0 ? 'borderError' : 'form-control'} 
                        name="email" placeholder="user@**********.com" 
                        onChange={this.handleChange} onKeyPress={this.onKeyPress} noValidate required/> 
                        {errors.email.length > 0 && <span className="error">{errors.email}</span>}
                    </div>
                    
                </div>
                <div className="form-group">
                    <div className="password">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="in2" ref="password" className={errors.password.length > 0 ? 'borderError' : 'form-control'} 
                        name="password" placeholder="Must be at least 4 characters" 
                        onChange={this.handleChange} onKeyPress={this.onKeyPress} required/>
                        {errors.password.length > 0 && <span className="error">{errors.password}</span>}
                    </div>
                </div>
                <div className="butt">
                    <button type="submit" ref="btn" id="Button" onClick={this.handleSubmit} 
                    className="button" disabled>Submit</button>
                </div>
            </form>
            </div>
        );
    }
}
