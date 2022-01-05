import React from "react";

class Login extends React.Component {

    state = {
        username: '',
        password: '',
        showInvalidWarning: false,
        showPassword: false
    }

    changeUsername = e => {
        this.setState({
            username: e.target.value,
            warningMessage: ''
        })
    }

    changePassword = e => {
        this.setState({
            password: e.target.value,
            warningMessage: ''
        })
    }

    login = () => {
        if (this.state.username.trim() === '' || this.state.password.trim() === '') {
            this.setState({
                warningMessage: 'Invalid username or password'
            })
            return 
        }
        fetch('http://localhost:9000/login', {
            method: 'POST',
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password
            })
        })
        .then(res => {
            res = res.json()
            return res
        })
        .then(res => {
            const isValid = res.result
            if (isValid) {
                this.props.login(this.state.username)
            } else {
                this.setState({
                    username: '',
                    password: '',
                    warningMessage: 'Incorrect username or password'
                })
            }
        })
    }

    signUp = () => {
        if (this.state.username.trim() === '' || this.state.password.trim() === '') {
            this.setState({
                warningMessage: 'Invalid username or password'
            })
            return 
        }
        fetch('http://localhost:9000/newUser', {
            method: 'POST',
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password
            })
        })
        .then(res => {
            return res.json()
        })
        .then(res => {
            if (res.result) {
                this.props.login(this.state.username)
            } else {
                this.setState({
                    username: '',
                    password: '',
                    warningMessage: 'User already exists, please login'
                })
            }
        })
    }

    togglePassword = e => {
        this.setState({
            showPassword: !this.state.showPassword
        })
    }

    render() {
        return (
            <div className="login">
                <div className="title">MEMO</div>
                <div className="wrapper">
                    <label htmlFor="username">Username: </label>
                    <input type="text" id="username" value={this.state.username} onChange={this.changeUsername} />
                </div>
                <div className="wrapper">
                    <label htmlFor="password">Password: </label>
                    <input type={this.state.showPassword? "text":"password"} id="password" value={this.state.password} onChange={this.changePassword} />
                </div>
                <div className="show-password">
                    <input type="checkbox" id="show-password" checked={this.state.showPassword} onChange={this.togglePassword} />
                    <label htmlFor="show-password" className="show-password"> Show password</label>
                </div>
                <div className="warning">
                    {this.state.warningMessage}
                </div>
                <div className="login-btn btn" onClick={this.login}>Login</div>
                <br />
                <div className="btn" onClick={this.signUp}>Sign up</div>
            </div>
        )
    }
    
}

export default Login
