import React, {useState} from 'react'
import { Link, navigate } from "gatsby"
import {Form, Button, Container, Row, Col} from 'react-bootstrap';



import Layout from "../components/layout"
import SEO from "../components/seo"



export default function CrearRestaurant() {
    const [token, setToken] = useState(localStorage.getItem('jwt'))
    const [restaurant, setRestaurant]= useState('');

    function saveRestaurant(e){
        e.preventDefault();
        fetch('http://localhost:1337/restaurants',{
            method:"POST",
            headers:{
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({name:restaurant})
        })
        // .then(response=> response.json())
        .then((res)=> {
            // console.log(res)
            const isOk = res.ok ? navigate("/dashboard") : alert("Algo salió mal")
        });
        }

    return (

        <Layout>
            <SEO title="Crear Rest" />
            <Container className="mt-5 ">

            <h3 className="text-center">Crear Restaurante</h3>
            <Row>
            <Col md={3}></Col>
                <Col md={6}>
                <Form>
                    <Form.Group controlId="Direccion">
                        <Form.Label></Form.Label>
                        <Form.Control type="text" placeholder="Agregar restaurante"  onChange={(e)=>{
                        setRestaurant(e.target.value) 
                        }}/>
                    </Form.Group>
                    <Button variant="dark" type="submit" onClick={saveRestaurant} >
                        Guardar
                    </Button>
            </Form>
            </Col>
            <Col md={3}></Col>
            </Row>
            </Container>    
        </Layout>
    )
}
