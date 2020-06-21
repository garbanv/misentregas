import React, {useState, useEffect} from 'react'
import { Link, navigate } from "gatsby"
import {Form, Button, Container, Row, Col} from 'react-bootstrap';



import Layout from "../components/layout"
import SEO from "../components/seo"



export default function CrearRestaurant() {
    const [token, setToken] = useState(undefined)
    const [restaurant, setRestaurant]= useState('');

    useEffect(()=> {
        if (typeof window !== `undefined`) {
          setToken(window.localStorage.getItem('jwt'))
        }
       
      },[])

    function saveRestaurant(e){
        e.preventDefault();
        fetch('http://misentregas.herokuapp.com/restaurants',{
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
