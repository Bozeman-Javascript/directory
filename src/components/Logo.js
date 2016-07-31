import React, { Component } from 'react';
import ReactFitText from 'react-fittext';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import logo from '../images/bozemanjsbio.png';
import '../css/bio.css';
import '../css/icon.css';
import '../css/logo.css';

class Logo extends Component {

  render() {

    return (
      <ReactCSSTransitionGroup className='bio logo'
                               transitionName='bio'
                               transitionEnterTimeout={500}
                               transitionLeaveTimeout={300}
                               transitionAppear={true}
                               transitionAppearTimeout={400}>
        <ReactFitText compressor={0.445}>
          <div className='bio-name'>
            Bozeman
          </div>
        </ReactFitText>
        <img src={logo} alt='logo' />
        <div className='bio-icons'>
            <a target='_blank' href='https://www.meetup.com/Bozeman-JavaScript-Meetup/'>
              <i className='icon--inline icon--big icon-meetup'></i>
            </a>
        </div>
      </ReactCSSTransitionGroup>
    );
  };

}

export default Logo;
