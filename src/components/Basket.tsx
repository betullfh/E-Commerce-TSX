import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import '../css/Basket.css'
import { ProductType, UserType } from '../types/Types'
import { calculatebasket, removeProduct, setBasket} from '../redux/basketSlice'
import { toast } from 'react-toastify'
import { updateBasket } from '../redux/appSlice'
import { TextField } from '@mui/material'

function Basket() {

  const{basket, totalAmount}=useSelector((state:RootState)=>state.basket)
  const {currentUser}= useSelector((state: RootState)=>state.app)
  const dispatch=useDispatch()

  useEffect(()=>{
       dispatch(calculatebasket())
  },[basket])

  const buy=()=>{

    if(currentUser?.balance && currentUser.balance < totalAmount)
    {
      toast.warn("Bakiyeniz Yeterli Değil")
      return
    }
    if(currentUser?.balance)
    {
      const remainingAmount = currentUser.balance-totalAmount
      const payload:UserType=
      {
        ...currentUser,
        balance: remainingAmount
      }
     dispatch(updateBasket(payload))
     dispatch(setBasket([]))
     localStorage.removeItem("basket")
     toast.success("Satın Alındı.")
    }
    
  }

  return (
    <div>
      <div className='basket-header'>
      <h3 className='basket-title'>Sepet</h3>
      {
        currentUser?.balance && <TextField  variant='standard' disabled label={"Bakiyeniz: "+currentUser.balance} helperText={currentUser.balance < totalAmount ?<span style={{color:"red"}}>Bakiye Yetersiz!</span>: ""} />
      }
      </div>
      {
            
            basket && basket.map((product:ProductType)=>{
              return (
              <div className='basket-list' >
                 <div className='basket-product'>
                    <div >                  
                      <img className='basket-image' src={product.image} />
                      <p>{product.title} ({product.count})</p>                               
                    </div>
                    <div className='price-delete'>
                      <p className='basket-price'>${product.price}</p>
                      <button onClick={()=>dispatch(removeProduct(product.id))} className='delete-product'>Ürünü Sil</button></div>                 
                  </div>
                  
              </div>
                  
              )
            })

          }
           <div className='total'>
           <h3>Sepet Tutarı = ${totalAmount.toFixed(2)}</h3>
           <button onClick={buy} className='buy-product'>Satın Al</button>
           </div>
           
    </div>
  )
}

export default Basket