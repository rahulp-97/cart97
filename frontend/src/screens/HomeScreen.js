import React,{Fragment, useState, useEffect} from 'react';
import axios from 'axios';
import {Row, Col} from 'react-bootstrap';
import Product from '../components/Product';

// "proxy": "http://localhost:8000",

const HomeScreen = () => {
  const [products, setProducts] = useState([]);

  useEffect(()=>{
    const fetchProducts = async () => {
      const {data} = await axios.get('http://localhost:8000/api/products');
      console.log(data);
      setProducts(data);
    }
    fetchProducts();
  }, [])
  return (
    <Fragment>
        <h1>Latest products</h1>
        <Row>
            {products.map((product) => {
                return (
                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                    <Product product={product} />
                    </Col>
                )
            })}
        </Row>
    </Fragment>
  )
}

export default HomeScreen