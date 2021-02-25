import React from 'react';

const Button = (props) => {
  return (
    <React.Fragment>
      <button data-test='readmore-btn' className='btn-custom'>
        {props.children}
      </button>
    </React.Fragment>
  );
};

export default Button;
