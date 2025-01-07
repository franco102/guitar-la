
import Header from './components/Header'
import Guitar from './components/Guitar'  
import { useEffect, useReducer } from 'react';
import { cartReducer, initialState } from './reducers/cart-reducer';
function App() {

  // const {
  //   cart, 
  //   data,
  //   addToCart,
  //   removeFromCart,
  //   addRemoveQuantity,
  //   removeAllCarts,
  //   cartTotal,
  //   isEmpty
  // } =useCart(); 

  const [state,dispatch]=useReducer(cartReducer,initialState);

  useEffect(()=>{
    localStorage.setItem('cart',JSON.stringify(state.cart))
  },[state.cart])

  return (
    <>
      <Header 
        cart={state.cart} 
        dispatch={dispatch}
        // removeFromCart={removeFromCart} 
        // addRemoveQuantity={addRemoveQuantity} 
        // removeAllCarts={removeAllCarts} 
      /> 
      <main className="container-xl mt-5">
          <h2 className="text-center">Nuestra Colección</h2>
          <div className="row mt-5">
            {state!.data.map((k,i)=>(
              <Guitar 
                key={i} 
                guitar={k}   
                dispatch={dispatch} 
              />
            ))}
          </div>
      </main>


      <footer className="bg-dark mt-5 py-5">
          <div className="container-xl">
              <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
          </div>
      </footer>
    </>
  )
}

export default App
