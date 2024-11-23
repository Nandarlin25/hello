import React from "react";
import Breadcrumb from "../components/Breadcrumbs";
import Container from "../components/Container";
import ProductCreateCard from "../components/ProductCreateCard";
import ProductEditCard from "../components/ProductEditCard";

const ProductEditPage = () => {
  return (
    <section>
    <Container>
      <Breadcrumb
        currentPageTitle={"Edit Product"}
        links={[{ title: "Product Module", path: "/product" }]}
      />
      <ProductEditCard />
    </Container>
  </section>
  )
}

export default ProductEditPage
