import React, { Component } from 'react';
import Firebase from 'firebase';
import ReactFireMixin from 'reactfire';
import reactMixin from 'react-mixin';
import './css/form.css';

class Form extends Component {

  render() {

    var user = this.props.user
      , name = (user && user.name ? user.name : "" )
      , stackoverflow = (user && user.stackoverflow ? user.stackoverflow : "")
      , linkedin = (user && user.linkedin ? user.linkedin : "");

    if (!user) {
      return (null)
    }

    return (
      <div className="form">
        <input ref='name' type="text" defaultValue={name} />
        <input ref='stackoverflow' type="text" defaultValue={stackoverflow} /> <i className='icon-stackoverflow'></i>
        <input ref='linkedin' type="text" defaultValue={linkedin} /> <i className='icon-linkedin'></i>
        <button onClick={this._handleUpdate.bind(this)}>Update</button>
      </div>
    );
  };

  _handleUpdate() {
    var user = this.props.user;

    Firebase.database().ref('users/' + user.id).update({
      "name": this.refs.name.value,
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
