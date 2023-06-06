import {useState, useEffect} from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import Loader from '../components/Loader';
import { useLoginMutation } from '../slices/usersApiSlice';
import {setCredentials} from '../slices/authSlice';
import {Form, Button, Row, Col} from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { toast } from 'react-toastify';



const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const [login, {isLoading}] = useLoginMutation();
    const { userInfo } = useSelector((state) => state.auth);

    const { search } = useLocation();
    // console.log(search);        //  ?redirect=/shipping
    const sp = new URLSearchParams(search);
    // console.log(sp);
    //Returns the first value associated to the given search parameter.
    const redirect = sp.get('redirect') || '/'; 

    useEffect(()=>{
        if(userInfo){
            navigate(redirect);
        }
    }, [userInfo, redirect, navigate]);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await login({ email, password }).unwrap();
            dispatch(setCredentials({ ...res }));
            navigate(redirect);
          } catch (err) {
            toast.error(err?.data?.message || err.error);
          }
    }
    return(
        <FormContainer>
            <h1>Sign in</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='email' className='my-3'>
                    <Form.Label>Email address</Form.Label>
                    <Form.Control 
                    type='email' 
                    placeholder='Enter email' 
                    value={email}
                    onChange={(e)=> setEmail(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='password' className='my-3'>
                    <Form.Label>password</Form.Label>
                    <Form.Control 
                    type='password' 
                    placeholder='Enter password' 
                    value={password}
                    onChange={(e)=> setPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                
                <Button type='submit' variant='dark' disabled={isLoading} className='mt-2'>
                    Sign in
                </Button>
                {isLoading && <Loader/>}
            </Form>
            <Row className='py-3'>
                <Col>
                New customer? <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
                    Register here</Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default LoginScreen;