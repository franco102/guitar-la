import { db } from '../data/db'
import type {   CartItem, Guitar } from '../interfaces/cart';

export type CartActions=
{type:'add-to-cart',payload:{item:Guitar}}|
{type:'remove-from-cart',payload:{id:Guitar['id']}}|
{type:'decrease-or-increase-quantity',payload:{item:CartItem,value:number}}|
{type:'clear-cart'}

export type CartState ={
    data:Guitar[]
    cart:CartItem[]
}
const MAX_ITEMS=5;
const MIN_ITEMS=1; 
const inititalStorage=():CartItem[]=>{
    const localStorageCart=JSON.parse(localStorage.getItem('cart')!);
    return localStorageCart&& localStorageCart.length>0 ?localStorageCart :[];
}

export const initialState:CartState={
    data:db,
    cart:inititalStorage()
}

export const cartReducer=(
    state:CartState=initialState,
    action:CartActions
)=>{
    if (action.type==='add-to-cart') {
        const itemExists=state.cart.find(guitar=>guitar.id===action.payload.item.id);
        let updatedCart:CartItem[]=[]
        if(!itemExists){
            const dataCart:CartItem={...action.payload.item,quantity:1}
            updatedCart=[...state.cart,dataCart] 

        }else{
            updatedCart=[...state.cart]   
            if(!(itemExists.quantity>=MAX_ITEMS)){
                updatedCart=state.cart.map(k=>{
                    return k.id==itemExists.id ?{...k,quantity:k.quantity++}:k;
                });  
            } 
        }   
        return {
            ...state,
            cart:updatedCart
        }
    }else if (action.type==='remove-from-cart'){
        return {
            ...state,
            cart:state.cart.filter(k=>k.id!==action.payload.id)
        }
    }else if (action.type==='decrease-or-increase-quantity'){
        if(action.payload.item.quantity==MIN_ITEMS && action.payload.value<0) return { ...state }  
        if(action.payload.item.quantity==MAX_ITEMS && action.payload.value>0) return { ...state }  
        const updateCart=state.cart.map(cart=>{
            return (cart.id===action.payload.item.id  ) ? {...cart,quantity:action.payload.item.quantity+action.payload.value}: cart;
        }) 
        
        return {
            ...state,
            cart:updateCart
        }
    }else if (action.type==='clear-cart'){
        return {
            ...state,
            cart:[]
        }
    } 
    return state
}