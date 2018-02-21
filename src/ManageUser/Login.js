import React, {Component} from 'react'
import firebase from '../firebase';
import Button from '../General/Button';

class Login extends Component {
  state={
    email: '',
    password: '',
    errorMessage: '',
    newUser: false
  }

  _setValue = (e) => {
    e.preventDefault();
    this.setState({[e.target.name]: e.target.value})
  }

  _login = (e) =>{
    e.preventDefault();
    const {email, password} = this.state;
    const auth = firebase.auth();
    auth.signInWithEmailAndPassword(email, password)
    .catch(e=>this.setState({errorMessage: e.message}))
  }

  _signup = (e) => {
    e.preventDefault();
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

  _toggleUserType = () => {
    this.setState({newUser: !this.state.newUser})
  }

  render(){
    const { email, password, errorMessage: error, newUser } = this.state;
    return(
      <div>
        <form>
          <input type="email" name="email" onChange={this._setValue} value={email} placeholder="Your Email" />
          <input type="password" name="password" onChange={this._setValue} value={password} placeholder="Your Password"/>
          <Button clickAction={newUser ? this._signup : this._login} title={ newUser ? "Sign Up" : "Log in"} />
        </form>
        <p>{error ? error : null}</p>
        <p onClick={this._toggleUserType}>{newUser ? "Already have an account?" : "Sign Up?"}</p>
      </div>
    )
  }
}

export default Login