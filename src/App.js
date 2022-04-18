import './App.css';
import { HashRouter, Routes, Route } from 'react-router-dom';
import LoadingScreen from './components/LoadingScreen';
import Home from './pages/Home';
import { useSelector } from 'react-redux';
import ProductDetail from './pages/ProductDetail';
import NavBar from './components/NavBar';
import Cart from './components/Cart';

function App() {

  const isLoading = useSelector((state) => state.isLoading);


  return (
    <div className="App">

    {isLoading && <LoadingScreen />}

    

    <HashRouter>
    <NavBar/>
    <Cart/>
     <Routes>
       <Route path='/' element={<Home/>}/>
       <Route path='/product/:id' element={<ProductDetail/>}/>
       <Route path='/purchases'/>
     </Routes>
    </HashRouter>
    </div>
  );
}

export default App;
