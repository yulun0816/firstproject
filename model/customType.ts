export interface productType {
    id: number
    name: string,
    img: string,
    price: number,
    desc: string
}
export interface CartItem {
    id: number;
    count: number;
}
export interface paramsState {
    cartItem: CartItem[];
}