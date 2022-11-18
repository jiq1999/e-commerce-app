import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import ProductCreate from './components/ProductCreate';
import Detail from './components/Detail';
import NavBar from './components/NavBar';
import Cart from './components/Cart';
import Payment from './components/Payment';
import Purchases from './components/Purchases';
import Search from './components/Search';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <NavBar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          {/* <Route path='/home' element={<Home/>}/> */}
          <Route path='/search' element={<Search/>}/>
          <Route path='/product' element={<ProductCreate/>}/>
          <Route path='/home/:id' element={<Detail/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/payment' element={<Payment/>}/>
          <Route path='/purchases' element={<Purchases/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
