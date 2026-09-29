import { useState, type ReactElement } from 'react'
import { Banner } from './components/banner'
import { ProductBox } from './components/product-box'
import { Product } from './components/product'
import { ActionButton } from './components/action-button.js'
import {mockProducts} from '../mockData/data.js'
import { AddProductForm } from './components/add-product-form.js'

function App() {
  const [addForm, setAddForm] = useState(false)
  const toggleForm = () => {setAddForm(addForm ? false: true)}
  return (
    <>
      <header>
        <Banner></Banner>
      </header>
      <main>
        <ProductBox productList={getProducts()}></ProductBox>
          {!addForm && <p><ActionButton text='Add A Product' className='add-product-button'
          action={toggleForm}></ActionButton></p>}
          {addForm && <AddProductForm cancelAction={toggleForm}></AddProductForm>}
          
      </main>
    </>
  )
}

type ProductField = {
  _id: string,
  title: string,
  quantity: number,
  price: number
}
function getProducts(): ReactElement[] {
  console.log(mockProducts)

  return mockProducts.map((obj: ProductField) => {
    return (
      <Product stock={obj.quantity} price={obj.price} liKey={obj["_id"]} description={obj.title}></Product>
    )
  })
  
}

export default App
