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
  const [addFormVisible, setIsAddFormVisible] = useState(false);
  const [productList, setProductList] = useState<ProductField[]>([]);
  const [cartList, setCartList] = useState([]);
  const toggleForm = () => {setIsAddFormVisible(addFormVisible ? false: true)}
  const addProduct = async ({title, price, quantity}: NewProduct) => {
    const res = await sFetch("/api/products", "POST", {
        title,
        price,
        quantity})
    
    if (res.ok) setProductList(productList.concat(res.result));
  }
  const getProductList = async () => {
    console.log('test')
    return await sFetch("/api/products");
  }

  const updateRenderedProducts = (action: Methods, {item, itemId }: {item?: ProductField, itemId: string}) => {
    const getListWithoutItem = () => productList.filter((items: ProductField) => (items._id !== itemId));
    console.log('updateRenderProductList invoked');
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

  const refreshProductList = async () => {
    getProductList().
    then((res) => {
      if (res.ok) setProductList(res.result)
    }).
    catch((err) => console.log(err))    
  }

  useEffect(() => {
    refreshProductList()
  }, [])

  const addToCart = async (event: React.MouseEvent<HTMLButtonElement>) => {
    //Capture event to get item targeted
      // check quantity, if <=0 reject
      //Lower cart quantity state
      //

    //Update cart
    setCartList([]) //Put new state here 

    //This should update App state, which re-renders the cart as well with the new state
  }

  return (
    <>
      <header>
        <Banner cartList={cartList}/>
      </header>
      <main>
        <ProductBox productList={productList} updateRenderedProducts={updateRenderedProducts} addToCart={addToCart}/>
          <Togglable 
            component={<p><ActionButton text='Add A Product' className='add-product-button'
              action={toggleForm}/></p>}
            visible={!addFormVisible}
          />
          <Togglable 
            component={<AddProductForm addAction={addProduct} cancelAction={toggleForm}/>} 
            visible={addFormVisible}
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
