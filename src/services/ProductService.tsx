import axios, { AxiosResponse } from "axios"
import { ProductType } from "../types/Types"



class ProductService {

   BASE_URL= "https://fakestoreapi.com"


   getAllproducts(): Promise<ProductType[]>{

      return new Promise((resolve: any, reject: any)=>{
        axios.get(`${this.BASE_URL}/products`)
        .then((response: AxiosResponse<any,any>)=>resolve(response.data))
        .catch((error: any)=>reject(error))
      })
   }

   getProductbyID(productID:number): Promise<ProductType>
   {
     return new Promise((resolve: any, reject: any)=>{
      axios.get(`${this.BASE_URL}/products/${productID}`)
      .then((response: AxiosResponse<any,any>)=>resolve(response.data))
      .catch((error: any)=>reject(error))
     })
   }

}

export default new ProductService()