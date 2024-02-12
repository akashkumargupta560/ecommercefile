export  interface authRegister{
    name:string;
    email:string;
    password:string;
}
export  interface authLogin{
    email:string;
    password:string;
}
export interface sellerAddProduct{
    productName:string,
    price:number,
    category:string,
    color:string,
    image:string,
    description:string,
    id:number,
    quantity:undefined | number,
    productId:undefined | number
}
export interface cart{
    productName:string,
    price:number,
    category:string,
    color:string,
    image:string,
    description:string,
    id:number | undefined,
    quantity:undefined | number,
    userId:number,
    productId:number,
}
export interface priceSummary{
    price:number,
    discount:number,
    tax:number,
    delivery:number,
    total:number
}
export interface order{
    email:string,
    address:string,
    contact:string,
    totalPrice:number,
    userId:number,
    id:number | undefined
}
