import React from 'react'
import { ProductType } from '../types/Types'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import '../css/Product.css'
import { useNavigate } from 'react-router-dom';

interface ProductCardprops{
    product: ProductType
}

function ProductCard(props:ProductCardprops) {
    const { title, id, price, description, category, image, rating }=props.product
    const navigate=useNavigate()
  return (
        
    <div className='home-div'>
         <Card className='card' sx={{ maxWidth: 345, boxShadow: "1px 2px 3px rgb(169, 13, 2)" }}>
            <img className='product-image' src={image} width={250} height={250} />
            <CardContent sx={{padding:"5px",height:"110px"}}>
                <Typography className='title-product' gutterBottom component="div" sx={{height: "80px",fontSize:"15px", fontFamily:"math", fontWeight:"bold"}}>
                    {title}
                </Typography>
                <Typography  sx={{ color: 'text.secondary' , fontSize:"1.5em", fontFamily:"math", textAlign: "end", fontWeight: 'bold'}}>
                $ {price}
                </Typography>
            </CardContent>
            
            <CardActions>
              <Button sx={{backgroundColor:"#9e513c"}} variant='contained' size="small" onClick={()=>navigate("/product-details/"+ id)}>Ürüne Git</Button>
            </CardActions>
    </Card>
    </div>
        
  )
}

export default ProductCard