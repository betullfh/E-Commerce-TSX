import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ProductType, UserType } from '../types/Types'

export interface AppSliceType {
    currentUser: UserType |null,
    loading: boolean,
    products: ProductType[],
    drawer: boolean
}

const initialState: AppSliceType={

    currentUser: null,
    loading:false,
    products:[],
    drawer: false
}
const appSlice=createSlice({
    name: "app",
    initialState,
    reducers: {
        setloading: (state: AppSliceType, action: PayloadAction<boolean>)=>{
            state.loading=action.payload
        },
        setCurrentuser:(state: AppSliceType, action: PayloadAction<UserType | null>)=>{
            state.currentUser=action.payload
        },
        setProducts: (state:  AppSliceType, action: PayloadAction<ProductType[]>)=>{
           state.products=action.payload
        },
        setdrawer:(state: AppSliceType)=>{
            state.drawer=!state.drawer
        },
        filterProducts: (state: AppSliceType, action:PayloadAction<string>)=>{
            const tempProducts: ProductType[]=[]
            state.products.map((product:ProductType)=>{
                if(product.title.toLowerCase().includes(action.payload.toLowerCase()))
                {
                    tempProducts.push(product)
                }
            })
            state.products=[...tempProducts]
        },
        updateBasket: (state: AppSliceType, action:PayloadAction<UserType>)=>{
            const user:UserType={
                ...action.payload
            }
            state.currentUser=user
            localStorage.setItem("currenUser", JSON.stringify(state.currentUser))
        }

    }
})

export const {setloading, setCurrentuser, setProducts, setdrawer, filterProducts, updateBasket} = appSlice.actions

export default appSlice.reducer


