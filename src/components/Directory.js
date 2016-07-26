import React, { Component } from 'react';
import Bio from './Bio.js';
import Loader from './Loader.js';
import Logo from './Logo.js';

import '../css/directory.css';

class Directory extends Component {
  render() {
    var users = this.props.users;

    if (!Object.keys(users).length) {
      return (
        <Loader />
      )
    }

    return (
      <div className='directory'>
        <Logo />
        {this._renderUserList(users)}
      </div>
    );

  };

  _renderUserList(users) {
    return Object.keys(users).map(function (key) {

      if (key === '.key') {
        return null;
      }

      var user = users[key];

      return (
        <Bio user={user} key={key} />
      )

    });

  }
};

Directory.propTypes = {
  users: React.PropTypes.object
};

Directory.defaultProps = {
  users: {}
};

export default Directory;
