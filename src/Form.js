import React, { Component } from 'react';
import Firebase from 'firebase';
import ReactFireMixin from 'reactfire';
import reactMixin from 'react-mixin';
import './App.css';

class Form extends Component {

  render() {

    var user = this.props.user
      , stackoverflow = (user && user.stackoverflow ? user.stackoverflow : "")
      , linkedin = (user && user.linkedin ? user.linkedin : "");

    if (!user) {
      return (
        <div>Login</div>
      )
    }

    return (
      <div className="form">
        <input ref='stackoverflow' type="text" defaultValue={stackoverflow} /> Stackoverflow
        <input ref='linkedin' type="text" defaultValue={linkedin} /> LinkedIn
        <button onClick={this._handleUpdate.bind(this)}>Update</button>
      </div>
    );
  };

  _handleUpdate() {
    var user = this.props.user;

    Firebase.database().ref('users/' + user.id).update({
      "stackoverflow": this.refs.stackoverflow.value,
      "linkedin": this.refs.linkedin.value
    });
  }
}

Form.propTypes = {
  user: React.PropTypes.object
}

Form.defaultProps = {
  user: null
}

reactMixin(Form.prototype, ReactFireMixin)

export default Form;
