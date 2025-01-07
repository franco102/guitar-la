import { Dispatch, useMemo } from "react";
import type {   CartItem } from "../interfaces/cart";
import { CartActions } from "../reducers/cart-reducer";
interface HeaderProps {
    cart:CartItem[]
    dispatch: Dispatch<CartActions>
    // removeFromCart:(id: CartId)=> void
    // addRemoveQuantity:(item: CartItem, value: number)=> void
    // removeAllCarts:()=> void 
}
const Header=({cart, dispatch }:HeaderProps)=>{
    //State Derivado 
    const isEmpty=useMemo(()=>cart.length===0,[cart])
    const cartTotal=useMemo(()=>cart.reduce((a,b)=>b.price*b.quantity+a,0),[cart])
    return (
        <header className="py-5 header">
        <div className="container-xl">
            <div className="row justify-content-center justify-content-md-between">
                <div className="col-8 col-md-3">
                    <a href="index.html">
                        <img className="img-fluid" src="./img/logo.svg" alt="imagen logo" />
                    </a>
                </div>
                <nav className="col-md-6 a mt-5 d-flex align-items-start justify-content-end">
                    <div  className="carrito" style={{position:'relative'}}>
                        {!isEmpty&& (<div 
                            className="bg-primary text-center text-white" 
                            style={{position:'absolute',borderRadius:'50%',width:30 ,top:-15,right:-15}}
                        >
                                {cart.length}
                        </div>)}
                        
                        <img className="img-fluid" src="./img/carrito.png" alt="imagen carrito" />

                        <div id="carrito" className="bg-white p-3">
                            {
                                isEmpty 
                                ?(<p className="text-center">El carrito esta vacio</p>)
                                :(  <>
                                        <table className="w-100 table">
                                            <thead>
                                                <tr>
                                                    <th>Imagen</th>
                                                    <th>Nombre</th>
                                                    <th>Precio</th>
                                                    <th>Cantidad</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {cart.map(guitar=>(
                                                    <tr key={guitar.id}>
                                                        <td>
                                                            <img className="img-fluid" src={`/img/${guitar.image}.jpg`} alt="imagen guitarra" />
                                                        </td>
                                                        <td>{guitar.name}</td>
                                                        <td className="fw-bold">
                                                                ${guitar.price}
                                                        </td>
                                                        <td className="flex align-items-start gap-4">
                                                            <button
                                                                type="button"
                                                                className="btn btn-dark"
                                                                onClick={()=>dispatch({type:"decrease-or-increase-quantity",payload:{item:guitar,value:-1}} )}
                                                            >
                                                                -
                                                            </button>
                                                            {guitar.quantity}
                                                            <button
                                                                type="button"
                                                                className="btn btn-dark"
                                                                onClick={()=>dispatch({type:"decrease-or-increase-quantity",payload:{item:guitar,value:1}} )}
                                                            >
                                                                +
                                                            </button>
                                                        </td>
                                                        <td>
                                                            <button
                                                                className="btn btn-danger"
                                                                type="button"
                                                                onClick={()=>dispatch({type:"remove-from-cart",payload:{id:guitar.id}} )}
                                                            >
                                                                X
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                        <p className="text-end">Total pagar: <span className="fw-bold">${cartTotal}</span></p>
                                        <button  disabled={isEmpty} className="btn btn-dark w-100 mt-3 p-2" onClick={()=>dispatch({type:"clear-cart"} )}>Vaciar Carrito</button>
                                    </>
                                    
                                )
                            }
                            
                            
                        </div>
                    </div>
                </nav>
            </div>
        </div>
      </header>

    )
}

export default Header;