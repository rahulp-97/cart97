import { Fragment, useState, useEffect } from 'react';
import {useNavigate, useParams, Link} from 'react-router-dom';
import {LinkContainer} from 'react-router-bootstrap';
import {Table, Button, Row, Col, Form} from 'react-bootstrap';
import {FaTimes, FaEdit ,FaTrash} from 'react-icons/fa';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import {toast} from 'react-toastify';
import { useUpdateProductMutation, useGetProductDetailsQuery } from '../../slices/productsApiSlice';
import FormContainer from '../../components/FormContainer';

const ProductEditScreen = () => {
    const {id: productId} = useParams();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState(0);
    const [description, setDescription] = useState('');

    const {data: product, isLoading, refetch, error} = useGetProductDetailsQuery(productId);
    console.log(product);
    const [updateProduct, {isLoading: loadingUpdate}] = useUpdateProductMutation();
    
    useEffect(() => {
        if(product){
            setName(product.name);
            setPrice(product.price);
            setImage(product.image);
            setBrand(product.brand);
            setCategory(product.category);
            setCountInStock(product.countInstock);
        }
    }, [product]);
    const submitHandler = async (e) => {
        e.preventDefault();
        const updatedProduct = {
            productId,
            name,
            price,
            image,
            brand,
            category,
            countInStock,
            description
        };
        const result = await updateProduct(updatedProduct);
        if(result.error){
            toast.error(result.error);
            console.log(result.error);
        } else {
            toast.success('product updated');
            navigate('/admin/productlist');
        }
    };
  return (
    <Fragment>
        <Button onClick={()=> navigate(-1)} className='btn btn-dark my-3'>
            Go Back
        </Button>
        <FormContainer>
            <h1>Edit Product</h1>
            {loadingUpdate && <Loader />}

            {isLoading ? (<Loader />) : error ? (<Message variant='danger'>{error}</Message>) : 
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='name' className='my-2'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                        type='text'
                        placeholder='Enter name'
                        value={name}
                        onChange={e => setName(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='price' className='my-2'>
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                        type='number'
                        placeholder='Enter price'
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='brand' className='my-2'>
                        <Form.Label>Brand</Form.Label>
                        <Form.Control
                        type='text'
                        placeholder='Enter brand'
                        value={brand}
                        onChange={e => setBrand(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='countInStock' className='my-2'>
                        <Form.Label>Count in stock</Form.Label>
                        <Form.Control
                        type='number'
                        placeholder='Enter count in stock'
                        value={countInStock}
                        onChange={e => setCountInStock(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='category' className='my-2'>
                        <Form.Label>Category</Form.Label>
                        <Form.Control
                        type='text'
                        placeholder='Enter category'
                        value={category}
                        onChange={e => setCategory(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='description' className='my-2'>
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                        type='text'
                        placeholder='Enter Description'
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Button type='submit' variant='dark' className='my-2'>
                        Update
                    </Button>
                </Form>
            }
        </FormContainer>
    </Fragment>
  )
}

export default ProductEditScreen;