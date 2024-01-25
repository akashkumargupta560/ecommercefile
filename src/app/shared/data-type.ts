export  interface sellerRegister{
    name:string;
    email:string;
    password:string;
}
export  interface sellerLogin{
    email:string;
    password:string;
}
export interface sellerAddProduct{
    id:number;
    productName:string;
    color:string;
    price:number;
    description:string;
    image:string;
    productUrl:string;
    category:string;
}