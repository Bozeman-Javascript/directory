import React, { Component } from 'react';
import './css/directory.css';
import './css/bozemanjs.css';

class Directory extends Component {
  render() {
    var users = this.props.users;

    if (!Object.keys(users).length) {
      return (
        <div key="blank">
          Directory
        </div>
      )
    }

    return (
      <div className="directory">
        {this.renderUserList(users)}
      </div>
    );

  };

  renderUserList(users) {
    return Object.keys(users).map(function (key) {

      if (key !== '.key') {
        var user = users[key];

        var styles = {
          backgroundImage: 'linear-gradient(0deg, #f9cf3d, #f9cf3d), url(' + user.photoURL + ')'
        }

        return (
          <div key={key} className="directory-bio">
            <div style={styles} className="bio-image" ></div>
            <div>{user.name}</div>
            <div><a className='icon-github' href={user.id}>GIT</a></div>
            <div><a className='icon-stackoverflow' href={user.stackoverflow}>SO</a></div>
            <div><a className='icon-linkedin' href={user.linkedin}>IN</a></div>
          </div>
        )
      } else {
        return false;
      }
    });

  }
};

Directory.propTypes = {
  users: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.object
  ])
};

Directory.defaultProps = {
  users: {}
};


export default Directory;
