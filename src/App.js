import React, { Component } from 'react';
import Firebase from 'firebase';
import ReactFireMixin from 'reactfire';
import reactMixin from 'react-mixin';
import Form from './Form.js';
import Directory from './Directory.js';
import logo from './BozemanJS.png';
import './App.css';

class App extends Component {
  constructor (props, context) {
    super(props, context);

    this.state = {
      user: null,
      users: {}
    };
  };

  componentWillMount() {
    this.firebaseRef = Firebase.database().ref('users');
    this.bindAsObject(this.firebaseRef, 'users');
  };

  render() {

    var user = this.state.user || null
      , users = this.state.users || null;

      return (
        <div className="App">
          {this.renderLoginButton()}
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>Bozeman Javascript Directory</h2>
          </div>
          <Form user={user} />
          <Directory users={users} />
        </div>
      );

  };

  // Handle Login
  // Login the user and update appropriate state
  _handleLogin() {

    var self = this
      , provider = new Firebase.auth.GithubAuthProvider();

    provider.addScope('user:email');

    Firebase.auth().signInWithPopup(provider).then(function(result) {
      // The signed-in user Github token
      // var token = result.credential.accessToken;

      // The signed-in user info
      var user = result.user;

      // Query the database for existing user
      var queryUser = self.firebaseRef.orderByChild('id').equalTo(user.uid);

      // If the user doesn't exist, add them to the database
      queryUser.on("value", function(querySnapshot) {
        if (querySnapshot.numChildren() === 0) {
          Firebase.database().ref('users/' + user.uid).set({
            id: user.uid,
            photoURL: user.photoURL
          });
        }
      });

      // Update state with current user
      self.setState({
          user: self.state.users[user.uid]
      });

    }).catch(function(error) {
      var errorMessage = error.message;
      throw new Error(errorMessage);
    });
  }

  // Handle Logout
  // Logout the user
  _handleLogout() {
    var self = this;

    Firebase.auth().signOut().then(function() {
      self.setState({
        user: null
      });
    });
  }

  // Render login/logout button
  // Render the login/logout button depending on user state
  renderLoginButton() {
    if (this.state.user) {
      return (<button onClick={this._handleLogout.bind(this)}>Signout</button>);
    } else {
      return (<button onClick={this._handleLogin.bind(this)}>Signup/Login</button>);
    }
  }
}

reactMixin(App.prototype, ReactFireMixin)

export default App;
