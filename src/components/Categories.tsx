import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import categoryService from '../services/CategoryService'
import { setloading, setProducts } from '../redux/appSlice'
import { toast } from 'react-toastify'
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import productService from '../services/ProductService'
import { ProductType } from '../types/Types'


function Categories() {

    const dispatch=useDispatch()
    const [categories, setCategories]=useState<string[]>()

    const getAllCategories =async()=>{
        try {
          dispatch(setloading(true))
          const response: string[]= await categoryService.getAllCategories()  
          setCategories(response)
        } catch (error) {
            toast.error("Hata oluştu.")
        }
        finally
        {
            dispatch(setloading(false))
        }
    }

    const handleCategory=async(e:React.ChangeEvent<HTMLInputElement>, categoryName:string)=>{
      try {
        dispatch(setloading(true))
        if(e.target.checked)
            {
           const response: ProductType[]= await categoryService.getproductsByCategory(categoryName)
           dispatch(setProducts(response))
            }
            else{
              const response: ProductType[]= await productService.getAllproducts()
              dispatch(setProducts(response))
            }
      } catch (error) {
        
      }
      finally
      {
        dispatch(setloading(false))
      }
    }

    useEffect(()=>{
       getAllCategories()
    },[])
  return (
    <div className='categories'>
      <h3 className='category-title'>Tüm Kategoriler</h3>
       <FormGroup sx={{display:"flex"}}>
         {
            categories && categories.map((category: string, index: number)=>(
                <FormControlLabel className='form-control' key={index} label={category} labelPlacement='start' control={<Checkbox onChange={(e:React.ChangeEvent<HTMLInputElement>)=>handleCategory(e,category)} />}/>
                
            ))
         }
       </FormGroup>
         
    </div>
  )
}

export default Categories