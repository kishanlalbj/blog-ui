import { useState } from 'react';
import './App.scss';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Landing from './containers/Landing/Landing';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div data-test='app' className='App'>
      {/* <Header></Header> */}

      <Landing></Landing>

      <Footer></Footer>
    </div>
  );
}

export default App;
