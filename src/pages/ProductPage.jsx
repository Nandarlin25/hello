import React from 'react'
import Breadcrumb from '../components/Breadcrumbs'
import Container from '../components/Container'
import ProductList from '../components/ProductList'

const ProductPage = () => {
  return (
    <section>
      <Container>
      <Breadcrumb currentPageTitle={"Product Module"} />
      <ProductList />
      </Container>
    </section>
  )
}

export default ProductPage
