import { useState, useEffect, type ReactElement } from 'react'
import { Banner } from './components/banner'
import { ProductBox } from './components/product-box'
import { ActionButton } from './components/action-button.js'
// import {mockProducts} from '../mockData/data.js'
import { sFetch } from './helpers/sFetch.js'
import { AddProductForm } from './components/add-product-form.js'
import type { NewProduct, AddToCartHandler, Methods, ProductField, UpdateProductList } from './types/index.js'
import { Togglable } from './components/togglable.js'

//Change addformvisible to a togglable component
// If there is a wrapper compnent, only the children will be re-rendered rather than the whole App
// Keep state as low as possible
  //Have state (useState) be in a deeper component (not higher) where possible
function App() {
  const [productList, setProductList] = useState<ProductField[]>([]);
  const [cartList, setCartList] = useState<ProductField[]>([]);

  const addProduct = async ({title, price, quantity}: NewProduct) => {
    const res = await sFetch("/api/products", "POST", {
        title,
        price,
        quantity})
    
    if (res.ok) setProductList(productList.concat(res.result));
  }

  const updateRenderedProducts = (action: Methods, {item, itemId }: {item?: ProductField, itemId: string}) => {
    const getListWithoutItem = () => productList.filter((items: ProductField) => (items._id !== itemId));
    switch (action) {
      case "DELETE":
        setProductList(getListWithoutItem());
        break;
      case "PUT":
        const filteredList = getListWithoutItem();
        if (item) filteredList.push(item);
        setProductList(filteredList);
        break;
    }
  }

  useEffect(() => {
    sFetch("/api/products").
    then((res) => {
      console.log(res)
      if (res.ok) setProductList(res.result)
    }).
    catch((err) => console.log(err))
  }, [])

  useEffect(() => {
    sFetch("/api/cart").
    then((res) => {
      console.log(res)
      if (res.ok) setCartList(res.result)
    }).
    catch((err) => console.log(err))
  }, [])

  const stupidAPI = (item: ProductField) => item.productId || item._id 
  const isInCart = (item: ProductField) => cartList.find(cartItem => stupidAPI(cartItem) === item._id);
  const replaceExistingItem = (newItem: ProductField, cart: ProductField[]) => { 
    cart.splice(cart.findIndex(toRemove => stupidAPI(toRemove) === newItem._id), 1, newItem);
  }
  const POSTCart = (productId: string) => {
    sFetch("/api/add-to-cart", "POST", {
      productId
    }).
    then((res) => console.log(`Success!`, res.result)).
    catch((res) => console.log(`Cart update failed`, res));
  }

  const POSTCheckout = () => {
    sFetch("/api/checkout", "POST")
    console.log('test')
    setCartList([])
  }
  const updateCart = (item: ProductField, quantity: number) => {
    const NewCartItem = {...item, quantity: 1};
    const CartCopy = [...cartList];
    //Find item in list
    // If in there, update quantity of CartItem to match it + quantity
    // Create copy of cartList, replace existing CartItem with new one
    let cartItem = CartCopy.find(cartItem => stupidAPI(cartItem) === item._id);
    if (cartItem) {
      NewCartItem.quantity = cartItem.quantity + quantity;
      replaceExistingItem(NewCartItem, CartCopy);

    } else {
      CartCopy.push(NewCartItem)
    }

    return CartCopy;
  }
  const addToCart = async (id: string) => {
    //Pass to product, accept 'id'
      // Look up item
    let item = productList.find(item => item._id === id);
      // check quantity, if <=0 reject
    if (!item || item.quantity <= 0) return;
    //Lower cart quantity state
    item.quantity = item.quantity - 1;
    //

    //Update cart
    if (isInCart(item)) {
      updateCart(item, 1)
    }
    setCartList(() => updateCart(item, 1)) //Put new state here 

    //This should update App state, which re-renders the cart as well with the new state
    POSTCart(item._id);
  }

  return (
    <>
      <header>
        <Banner cartList={cartList} onCheckout={POSTCheckout}/>
      </header>
      <main>
        <ProductBox 
          productList={productList} 
          updateRenderedProducts={updateRenderedProducts} 
          addToCart={addToCart}
        />
        <Togglable 
          renderOpen={toggle => 
          <p>
            <ActionButton 
            text='Add A Product' 
            className='add-product-button' 
            action={toggle}
            />
          </p>
          }
          renderClosed={toggle => 
            <AddProductForm 
              addAction={addProduct} 
              cancelAction={toggle}
          />}
        />

      </main>
    </>
  )
}

/**
Two valid patterns for state updates in child components:
Option 1: pass state + setter hook all the way down (prop drilling), use setter in the child
Option 2: define all handlers in App, pass the handler function down as a prop
Never mix the two; pick one and stick to it
Srdjan prefers Option 2: child only receives a callable function, can’t accidentally reset state

Controlled forms: always bind input value to state; without it, typing does nothing

Optional callback pattern for onSubmit:
onSubmit(newComment, callback?) takes an optional second argument
If the request succeeds, the callback (e.g. handleReset) is called
If it fails, the catch block runs and inputs are not reset, preserving user input

 */


export default App
