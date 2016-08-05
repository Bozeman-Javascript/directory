import React, { Component } from 'react';
import ReactFitText from 'react-fittext';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import '../css/bio.css';

class Bio extends Component {

  render() {

    var key = this.props.key
      , user = this.props.user
      , name = user.name ? user.name.split(' ') : ['Coder'];

    var styles = {
      backgroundImage: 'linear-gradient(#ffd131 0%, #ffd131 100%), url(\'' + user.photoURL + '\')'
    }

    return (
      <ReactCSSTransitionGroup key={key}
                               className='bio'
                               transitionName='bio'
                               transitionEnterTimeout={500}
                               transitionLeaveTimeout={300}
                               transitionAppear={true}
                               transitionAppearTimeout={400}>
        <div key={key}>
          <ReactFitText compressor={0.445}>
            <div className='bio-name'>
              {(name[0])}
            </div>
          </ReactFitText>
          <div style={styles} className='bio-image' >
            {user.linkedin ? (
              <a className='bio-image-link'
                 href={'https://www.linkedin.com/in/' + user.linkedin}
                 target='_blank'>
              </a>
            ) : null}
          </div>
          <div className='bio-icons'>
            {user.github ? (
            <a target='_blank' href={user.github}>
              <i className='icon--inline icon-github'></i>
            </a>
            ) : null}
            {user.stackoverflow ? (
              <a target='_blank' href={'http://stackoverflow.com/users/' + user.stackoverflow}>
                <i className='icon--inline icon-stackoverflow'></i>
              </a>
            ) : null}
            {user.linkedin ? (
              <a target='_blank' href={'https://www.linkedin.com/in/' + user.linkedin}>
                <i className='icon--inline icon-linkedin'></i>
              </a>
            ) : null}
            {user.twitter ? (
              <a target='_blank' href={'https://twitter.com/' + user.twitter}>
                <i className='icon--inline icon-twitter'></i>
              </a>
            ) : null}
            {user.website ? (
              <a target='_blank' href={user.website}>
                <i className='icon--inline icon-globe'></i>
              </a>
            ) : null}
          </div>
        </div>
      </ReactCSSTransitionGroup>
    );
  };

}

Bio.propTypes = {
  key: React.PropTypes.string,
  user: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.object
  ])
}

Bio.defaultProps = {
  key: null,
  user: null
}

export default Bio;
