import { useDispatch, useSelector } from 'react-redux';
import './App.css'
import Navbar from './components/Navbar';
import Spinnerr from './components/Spinnerr';
import RouterConfig from './config/RouterConfig'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RootState } from './redux/store';
import { Drawer } from '@mui/material';
import { setCurrentuser, setdrawer, setProducts } from './redux/appSlice';
import Categories from './components/Categories';
import { useEffect } from 'react';
import productService from './services/ProductService';
import { ProductType, UserType } from './types/Types';
import { setBasket, setdrawerBasket } from './redux/basketSlice';
import Basket from './components/Basket';


function App() {

  const {currentUser, drawer}=useSelector((state: RootState)=>state.app)
  const {drawerBasket}=useSelector((state:RootState)=>state.basket)
  const dispatch=useDispatch()

  const closedrawer=()=>{
    dispatch(setdrawer())
  }

  const closedrawerBasket=()=>{
    dispatch(setdrawerBasket())
  }

  const getAllProducts=async()=>{
   const products: ProductType[]= await productService.getAllproducts()
   dispatch(setProducts(products))
  }

  useEffect(()=>{
    getAllProducts()
  },[])

  useEffect(()=>{
    const currentUserString: string |null = localStorage.getItem("currentUser")
    if(currentUserString)
    {
      const currentUser:UserType= JSON.parse(currentUserString) as UserType
      dispatch(setCurrentuser(currentUser))
    }
  },[])

  useEffect(()=>{
    const basketstring= localStorage.getItem("basket")
    if(basketstring)
      {
        const basket : ProductType[]= JSON.parse(basketstring) as ProductType[]
        dispatch(setBasket(basket))
      } 
  },[])

  return (
   <div>
    
      {currentUser && <Navbar/>}
      <ToastContainer autoClose={2000} />
      <RouterConfig/>
      <Spinnerr/>
      <Drawer anchor='left' onClose={closedrawer} open={drawer}>
       <Categories/>
      </Drawer>
      <Drawer anchor='right' onClose={closedrawerBasket} open={drawerBasket}>
        <Basket/>
      </Drawer>
      
   </div>
  )
}

export default App
