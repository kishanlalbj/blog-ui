import Footer from './components/Footer/Footer';
import Landing from './containers/Landing/Landing';

function App() {
  return (
    <div data-test='app' className='App'>
      {/* <Header></Header> */}

      <Landing></Landing>

      <Footer></Footer>
    </div>
  );
}

export default App;
