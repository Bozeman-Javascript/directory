import React, { Component } from 'react';
import './css/directory.css';
//import './css/bozemanjs.css';

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
      <div className="form">
        {this.renderUserList(users)}
      </div>
    );

  };

  renderUserList(users) {
    return Object.keys(users).map(function (key) {

      if (key !== '.key') {
        var user = users[key];

        var styles = {
          backgroundImage: 'linear-gradient(0deg, #f9db3d, #f9db3d), url(' + user.photoURL + ')'
        }

        return (
          <div key={key}>
            <div style={styles} className="bio-image" ></div>
            <div><a class='icon-github' href={user.id}>GIT</a></div>
            <div><a class='icon-stackoverflow' href={user.stackoverflow}>SO</a></div>
            <div><a class='icon-linkedin' href={user.linkedin}>IN</a></div>
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
