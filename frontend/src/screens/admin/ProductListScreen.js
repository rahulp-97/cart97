import { Fragment } from 'react';
import {LinkContainer} from 'react-router-bootstrap';
import {Table, Button, Row, Col} from 'react-bootstrap';
import {FaTimes, FaEdit ,FaTrash} from 'react-icons/fa';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { useGetProductsQuery } from '../../slices/productsApiSlice';

const ProductListScreen = () => {
    const {data:products, isLoading, error} = useGetProductsQuery({});
    console.log(products);
  return (
    <Fragment>
        <Row className='align-items-center'>
            <Col>
                <h1>Products</h1>
            </Col>
            <Col className='text-end'>
                <Button variant='dark' className='btn-sm m-3'>
                    <FaEdit /> Create Product
                </Button>
            </Col>
        </Row>
        {}
    </Fragment>
  )
}

export default ProductListScreen;