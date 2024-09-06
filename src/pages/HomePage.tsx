import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { UserType , ProductType} from '../types/Types'
import { setCurrentuser, setloading, setProducts } from '../redux/appSlice'
import productService from '../services/ProductService'
import { toast } from 'react-toastify';
import { RootState } from '../redux/store'
import ProductCard from '../components/ProductCard'
import { Container } from '@mui/material'

function HomePage() {

  const dispatch =useDispatch()
  const {products}=useSelector((state:RootState)=>state.app)

  const getAllproducts= async()=>{
    try {
      dispatch(setloading(true))
      const response: ProductType[] = await productService.getAllproducts()
      if(response)
      {
       dispatch(setProducts(response))
      }
    } catch (error) {
      toast.error("Hata oluştu")
      
    }
    finally
    {
      dispatch(setloading(false))
    }
  }

  useEffect(()=>{
        getAllproducts()
  }, [])

  useEffect(()=>{
    const result= localStorage.getItem("currentUser")
    if(result)
    {
      const currentUser :UserType= JSON.parse(result) as UserType
      dispatch(setCurrentuser(currentUser))
    }

  },[])
  return (
   <Container maxWidth="xl">
     <div className='product-list'>
      {
        products && products.map((product: ProductType, index:number)=>(
          <ProductCard key={index} product={product}/>
        ))
      }
    </div>
   </Container>
  )
}

export default HomePage