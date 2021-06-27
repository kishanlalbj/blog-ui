import { faCopyright } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import './Footer.scss';

const Footer = () => {
  return (
    <div data-test='footer' className='footer'>
      <div className='footer-box'>
        <div>
          <p>
            Copyrights &nbsp;
            <FontAwesomeIcon icon={faCopyright}></FontAwesomeIcon>
            &nbsp; 2021
          </p>
          <p>v2.0.1</p>
        </div>
        <div>
          <p>Handcrafted by @kishanlalbj</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
