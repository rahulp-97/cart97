import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";

// "proxy": "http://localhost:8000",
//-- data --
//The received data from the query.

const HomeScreen = () => {
  const {keyword} = useParams();
  const { data: products, isLoading, error } = useGetProductsQuery({keyword});
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
      {keyword && <Link to='/' className="btn btn-dark mb-4">Go Back</Link>}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error?.data?.message || error.error}</Message>
      ) : 
        <Fragment>
          {keyword ? (<h2>Search results</h2>) : (<h2>Latest products</h2>)}
          {keyword && products.length===0 && <h5 className="text-center mt-5">No products</h5>}
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
