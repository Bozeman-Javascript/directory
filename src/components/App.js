import React, { Component } from 'react';
import Firebase from 'firebase';
import ReactFireMixin from 'reactfire';
import ReactFitText from 'react-fittext';
import Axios from 'axios';
import reactMixin from 'react-mixin';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Form from './Form.js';
import Directory from './Directory.js';
import '../css/app.css';
import '../css/button.css';

class App extends Component {
  constructor (props, context) {
    super(props, context);

    this.state = {
      inBZNJS: false,
      user: null,
      users: {}
    };
  };

  componentWillMount() {
    this.firebaseRef = Firebase.database().ref('users');
    this.bindAsObject(this.firebaseRef, 'users');
  };

  render() {

    var inBZNJS = this.state.inBZNJS
      , user = this.state.user || null
      , users = this.state.users || null
      , headerLogin = null
      , headerForm = null
      , intro = null;

      if (!user) {
        headerLogin = (
          <div className='app-header--login' key='login-comp'>
            <button className='button button--login'
                  onClick={this._handleLogin.bind(this)}>
              Join <span>via</span> <i className='icon-github'></i>
            </button>
          </div>
        )
      } else {
        headerLogin = null;
      }

      if (user) {
        headerForm = (
          <Form user={user} key='form-comp' inBZNJS={inBZNJS} />
        );
      }

      if (!user) {
        intro = (
          <ReactFitText compressor = {2}
                        minFontSize = {40}
                        maxFontSize = {74}>
            <h1 className='app-intro'>Bozeman Javascript Developers</h1>
          </ReactFitText>
        )
      }

      return (
        <div className='app'>
          <ReactCSSTransitionGroup key='form'
                                 component='div'
                                 transitionName='header'
                                 transitionEnter={true}
                                 transitionLeave={true}
                                 transitionAppear={false}
                                 transitionEnterTimeout={600}
                                 transitionLeaveTimeout={200}
                                 transitionAppearTimeout={0} >
            {headerLogin}
            {headerForm}
          </ReactCSSTransitionGroup>
          {intro}
          <Directory users={users} />
        </div>
      );

  };

  // Handle Login
  // Login the user and update appropriate state
  _handleLogin() {

    var self = this
      , provider = new Firebase.auth.GithubAuthProvider();

    provider.addScope('user:email, read:org');

    Firebase.auth().signInWithPopup(provider).then(function(result) {
      // The signed-in user Github token
      var token = result.credential.accessToken;

      // The signed-in user info
      var user = result.user;

      // Query the database for existing user
      var queryUser = self.firebaseRef.orderByChild('id').equalTo(user.uid);

      // Get the users profile from Github
      Axios.get('https://api.github.com/user?access_token=' + token)
        .then(function (response) {
          // If the user doesn't exist, add them to the database
          queryUser.on('value', function(querySnapshot) {
            if (querySnapshot.numChildren() === 0) {

              Firebase.database().ref('users/' + user.uid).set({
                id: user.uid,
                github: response.data.html_url,
                name: user.displayName,
                photoURL: user.photoURL,
                joinDate: new Date().getTime()
              });
            }
          });
      })
      .catch(function (error) {
        console.log(error);
      });

      // Query the users organizations
      Axios.get('https://api.github.com/user/orgs?access_token=' + token)
        .then(function(orgs) {
          for (var org of orgs.data) {
            if (org.id === 20649569) {
              self.setState({
                inBZNJS: true
              });
            }
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
  };
}

reactMixin(App.prototype, ReactFireMixin)

export default App;
