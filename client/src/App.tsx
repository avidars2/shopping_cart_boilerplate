import { useState, useEffect, type ReactElement } from 'react'
import { Banner } from './components/banner'
import { ProductBox } from './components/product-box'
import { Product } from './components/product'
import { ActionButton } from './components/action-button.js'
import {mockProducts} from '../mockData/data.js'
import { AddProductForm } from './components/add-product-form.js'
import type { NewProduct } from './types/products.js'

const HOST = "http://localhost:5001"
//Change addformvisible to a togglable component
// If there is a wrapper compnent, only the children will be re-rendered rather than the whole App
// Keep state as low as possible
  //Have state (useState) be in a deeper component (not higher) where possible
function App() {
  // console.log('hi')
  const [addFormVisible, setIsAddFormVisible] = useState(false)
  const [productList, setProductList] = useState([])
  const toggleForm = () => {setIsAddFormVisible(addFormVisible ? false: true)}
  const addProduct = async ({title, price, quantity}: NewProduct) => {
    await sFetch("/api/products", "POST", {
        title,
        price,
        quantity})

    await refreshProductList();
  }
  const getProductList = async () => {
    console.log('test')
    return await sFetch("/api/products");
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
  return (
    <>
      <header>
        <Banner></Banner>
      </header>
      <main>
        <ProductBox productList={getProducts(productList.length !== 0 ? productList : mockProducts)}></ProductBox>
          {!addFormVisible && <p><ActionButton text='Add A Product' className='add-product-button'
          action={toggleForm}></ActionButton></p>}
          {addFormVisible && <AddProductForm addAction={addProduct} cancelAction={toggleForm}></AddProductForm>}
          
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

type ProductField = {
  _id: string,
  title: string,
  quantity: number,
  price: number
}
function getProducts(productSource: ProductField[]): ReactElement[] {
  console.log(productSource)

  return productSource.map((obj: ProductField) => {
    return (
      <Product stock={obj.quantity} price={obj.price} liKey={obj["_id"]} description={obj.title}></Product>
    )
  })
  
}

type Fetch = <Tbody>(
  path: string, 
  method?: ("GET" | "POST" | "PUT" | "DELETE"), 
  body?: Tbody
) => Promise<{ok: boolean, result?: any}>

const sFetch: Fetch = async (path, method, body) => {
  const res = await fetch(HOST + path, {
    method: method ?? "GET",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body) ?? undefined
  })

  if (res?.ok) {
    let jsonResult = await res.json();
    console.log("sFetch log: ", jsonResult)
    return {ok: true, result: jsonResult}
  } else {
    console.log('Bad input');
    return {ok: false}
  }

}

export default App
