import React, { Component } from 'react';

import '../css/footer.css';

class Footer extends Component {
  render() {

    return (
      <footer className='footer'>
        &copy;{new Date().getFullYear()} <a href='https://github.com/bozeman-javascript' className='footer-link'>Bozeman Javascript</a>
      </footer>
    );

  };
};

Footer.propTypes = {};

Footer.defaultProps = {};

export default Footer;
