import {Container, Row, Col} from 'react-bootstrap';

const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
        <footer>
            <Container className='bg-dark' fluid>
                <Row>
                    <Col className='text-center py-3'>
                    <p style={{color:'white'}}>Rahul Prajapati &copy; {currentYear}</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}

export default Footer;