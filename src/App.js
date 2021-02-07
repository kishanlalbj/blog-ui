import React, { useState } from 'react';
import './App.scss';
import dog from './assets/img/dog.png';
import Helmet from './components/Helmet/Helmet';

const App = () => {
  const [name] = useState('Tony');
  return (
    <div>
      <Helmet />

      <div className='container'>
        <div>
          <img src={dog} alt='cat' width='100%' />
          <center>{name}</center>
        </div>
      </div>
    </div>
  );
};

export default App;
