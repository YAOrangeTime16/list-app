import React, {Component} from 'react'
import firebase from '../firebase';
import {Link} from 'react-router-dom';
import Button from '../General/Button';

class Login extends Component {
  state={
    email: '',
    password: '',
    errorMessage: '',
    signup: false
  }

  _setValue = (e) => {
    e.preventDefault();
    this.setState({[e.target.name]: e.target.value})
  }

  _loginAdmin = () =>{
    const {email, password} = this.state;
    const auth = firebase.auth();
    auth.signInWithEmailAndPassword(email, password)
    .catch(e=>this.setState({errorMessage: e.message}))
  }

  _signupAdmin = () => {
    const {email, password} = this.state;
    const auth = firebase.auth();
    const usersRef = firebase.database().ref(`/users`);
    auth.createUserWithEmailAndPassword(email, password)
    .then(user=>{
      const userObject = {
        email: user.email,
        uid: user.uid
      }
      usersRef.child(`/${user.uid}`).set(userObject)
    })
    .catch(e=>console.log(e.message))
  }

  _toggleSignup = () => {
    this.setState({signup: !this.state.signup})
  }

  render(){
    const { email, password, errorMessage: error, signup} = this.state;
    return(
      <div>
        <Link to='/'>Log in to Group?</Link>
        <form onSubmit={e=>e.preventDefault()}>
          <input type="email" name="email" onChange={this._setValue} value={email} placeholder="Your Email" />
          <input type="password" name="password" onChange={this._setValue} value={password} placeholder="Your Password"/>
          <Button clickAction={signup ? this._signupAdmin : this._loginAdmin} title={ signup ? "Sign Up" : "Log In"} />
        </form>
        <p>{error ? error : null}</p>
        <p onClick={this._toggleSignup}>{signup ? "Already have an account?" : "Sign Up?"}</p>
      </div>
    )
  }
}

export default Login