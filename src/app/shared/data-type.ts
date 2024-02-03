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
    id:number,
    productName:string;
    color:string;
    price:number;
    description:string;
    image:string;
    productUrl:string;
    category:string;
    quantity:string | number;
}
export interface cart{
    id:number | undefined;
    productName:string;
    color:string;
    price:number;
    description:string;
    image:string;
    productUrl:string;
    category:string;
    quantity:string | number;
    userId:number,
    productId:number;
}