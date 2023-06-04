import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import { useGetProductsQuery } from "../slices/productsApiSlice";

// "proxy": "http://localhost:8000",
//-- data --
//The received data from the query.

const HomeScreen = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();
  // const [products, setProducts] = useState([]);

  // useEffect(()=>{
  //   const fetchProducts = async () => {
  //     const {data} = await axios.get('http://localhost:8000/api/products');
  //     // console.log(data);
  //     setProducts(data);
  //   }
  //   fetchProducts();
  // }, [])
  return (
    <Fragment>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : error ? (
        <div>{error?.data?.message || error.error}</div>
      ) : 
        <Fragment>
          <h1>Latest products</h1>
          <Row>
            {products.map((product) => {
              return (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <Product product={product} />
                </Col>
              );
            })}
          </Row>
        </Fragment>
      }
    </Fragment>
  );
};

export default HomeScreen;
