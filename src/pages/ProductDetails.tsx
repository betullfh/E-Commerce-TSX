import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { setloading } from '../redux/appSlice'
import productService from '../services/ProductService'
import { ProductType } from '../types/Types'
import { toast } from 'react-toastify'
import '../css/ProductDetails.css'
import { Button, Container } from '@mui/material'
import { addProductToBasket } from '../redux/basketSlice'

function ProductDetails() {
    const {productID}=useParams()
    const dispatch=useDispatch()
    const [product, setProduct]=useState<ProductType | null>()
    const [count, setCount]=useState<number>(1)

    const increament=()=>
    {
        setCount(count+1)
    }

    const decreament=()=>{
        setCount(count-1)
    }

    const getProductById=async (productID:number)=>{
        try {
            dispatch(setloading(true))
           const response:ProductType =await productService.getProductbyID(productID)
           setProduct(response)
        } catch (error) {
            toast.error("Hata oluştu." +error)
        }
        finally
        {
            dispatch(setloading(false))
        }

    }

    const addToBasket =()=>{
        if(product)
        {
            const payload: ProductType= {
                ...product,
                count: count
            }
            dispatch(addProductToBasket(payload))
        }
        
       
    }

    useEffect(()=>{
        getProductById(Number(productID))
    },[])
  return (
   <Container maxWidth="lg">
         {
        product && <>
            <div className='product-details'>
                <div style={{marginRight:"30px"}}>
                    <img className="detail-image" src={product.image} />
                </div>

                <div className="detail-infos" >
                    <h1 className='detail-title'>{product.title}</h1>
                    <p className='detail-description'>{product.description}</p>
                    <div style={{display:"flex", flexDirection:"row", height:"12px", alignItems:"center", justifyContent:"space-between"}}>
                        <h1>$ {product.price}</h1>                   
                       <div className='addtobasket'>
                        <div className='count'>
                          <button className='counter-button' onClick={decreament} >-</button>
                          <span style={{ margin: '0 10px', fontSize: '1.2em' }}>{count}</span>
                          <button className='counter-button' onClick={increament}>+</button>
                        </div>
                            <Button  onClick={addToBasket} variant='contained' sx={{backgroundColor:"#9e513c"}}>Sepete Ekle</Button>
                       </div>
                    </div>                
                </div>             
            </div>
        </>
    }
  
   </Container>
  )
}

export default ProductDetails