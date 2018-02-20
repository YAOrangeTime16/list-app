import React, {Component} from 'react'
import firebase from '../firebase'

import Button from '../General/Button';

class SignUp extends Component {
  state={
    email: '',
    password: '',
    user: null
  }

  _setValue = (e) => {
    e.preventDefault();
    this.setState({[e.target.name]: e.target.value})
  }

  _signup = (e) => {
    e.preventDefault();
    const {email, password} = this.state;
    const auth = firebase.auth();
    auth.createUserWithEmailAndPassword(email, password).catch(e=>console.log(e.message))
    auth.onAuthStateChanged(user => {this.setState({user}); console.log(user)})
  }

  _logout = () =>{
    const auth = firebase.auth();
    auth.signOut().then(()=>console.log('logged out')).catch(e=>console.log(e.message))
  }

  render(){
    const {email, password, user} = this.state;
    return(
      <div>
        <form>
        <input type="email" name="email" onChange={this._setValue} value={email} />
        <input type="password" name="password" onChange={this._setValue} value={password} />
        <Button clickAction={user ? this._logout : this._signup} title={user ? "Sign Out" : "SignUp"} />
        </form>
      </div>
    )
  }
}

export default SignUp;