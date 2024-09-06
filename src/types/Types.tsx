

export interface UserType{
    username: string,
    password:string,
    id: string,
    balance: number
}

export interface ProductType{

    id: number,
    title: string,
    price: number,
    description: string,
    category: string,
    image: string,
    rating: RatingType,
    count ?: number
    
}

interface RatingType{
    rate: number,
    count: number
}