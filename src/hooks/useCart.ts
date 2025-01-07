import { useEffect, useState ,useMemo} from 'react'
import { db } from '../data/db'
import type { CartId, CartItem, Guitar } from '../interfaces/cart';

const useCart=()=>{

    const inititalStorage=():CartItem[]=>{
        const localStorageCart=JSON.parse(localStorage.getItem('cart')!);
        console.log(localStorageCart)
        debugger
        return localStorageCart&&localStorageCart.length>0 ?localStorageCart :[];
    }

    const [data] = useState(db);
    const [cart,setCart]=useState<CartItem[]>(inititalStorage);
    const MAX_ITEMS=5;
    const MIN_ITEMS=1; 
    function addToCart(item:Guitar){
        const itemExists=cart.findIndex(guitar=>guitar.id===item.id);
        if(itemExists<0){
            const dataCart:CartItem={...item,quantity:1}
            setCart(prevCart=>[...prevCart,dataCart])
        }else{ 
            const updateCart=[...cart];
            if(updateCart[itemExists].quantity>=MAX_ITEMS) return
            updateCart[itemExists].quantity++;
            setCart(updateCart);
        }    
    }
    function removeFromCart(id:CartId){ 
        setCart(prevCart=>prevCart.filter(f=>f.id!==id));
    }
    function addRemoveQuantity(item:CartItem,value:number){ 
        if(item.quantity==MIN_ITEMS && value<0) return  
        const updateCart=cart.map(cart=>{
            if(cart.id===item.id && item.quantity<MAX_ITEMS) return {...cart,quantity:item.quantity+value};
            return cart
        }) 
        setCart(updateCart); 
    }
    function removeAllCarts() {
        setCart([]);
    } 

    const isEmpty=useMemo(()=>cart.length===0,[cart])
    const cartTotal=useMemo(()=>cart.reduce((a,b)=>b.price*b.quantity+a,0),[cart])
 

    useEffect(()=>{
        localStorage.setItem('cart',JSON.stringify(cart))
    },[cart])

    return { 
        cart, 
        data,
        addToCart,
        removeFromCart,
        addRemoveQuantity,
        removeAllCarts,
        isEmpty,
        cartTotal
    }

}
export default useCart