import React, { useState,useEffect } from "react"
import { Link, navigate } from "gatsby"
import {Form, Button, Container, Row, Col} from 'react-bootstrap';

import Layout from "../components/layout"
import SEO from "../components/seo"


function CrearEntrega(){
    const [token, setToken] = useState(localStorage.getItem('jwt'))
    const [restList, setRestList] = useState([]);
   

const [entrega, setEntrega] = useState({
    fecha:"",
    direccion:"",
    costo:4,
    restaurant:{ _id:" "}

})

useEffect(()=> {
    getRestaurants()
},[])

function getRestaurants(){
    fetch('http://localhost:1337/restaurants')
    .then(response => response.json())
    .then(res=> setRestList(res))
   
}


async function handleRestaurants(e){
    const setRestaurant = await setEntrega({restaurant:{_id:e.target.value}});
    return setRestaurant;

}

function saveEntrega(e){
    e.preventDefault();
    fetch('http://localhost:1337/trips',{
        method:'POST',
        headers:{
            'Authorization':`Bearer ${token}`,
        },
        body: JSON.stringify({...entrega})
    })
    .then((dato)=>{
        const isOk = dato.ok ? navigate("/dashboard") :  alert("Algo ha salido mal, intenta de nuevo")
    })
    .catch(err=>console.log(err))
}




  return (
    
<Layout >
    <SEO title="Crear Entrega" />
        <Container className="mt-5 ">

        <h3 className="text-center">Crear Entrega</h3>
          <Row>
          <Col md={3}></Col>
            <Col md={6}>
            <Form>
      
            <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label>Restaurants</Form.Label>
                <Form.Control as="select" onChange={ (e)=> handleRestaurants(e) }>
                    <option>Seleccionar...</option>
                    {restList.map((rest)=><option key={rest._id} value={rest._id || ''} defaultValue="">{rest.name}</option>)}              
            
                </Form.Control>
            </Form.Group>
 

          <Form.Group controlId="Direccion">
            <Form.Label>Dirección</Form.Label>
            <Form.Control type="text" placeholder="Agregar dirección" value={entrega.direccion} onChange={(e)=>{
               setEntrega({ ...entrega,
                 direccion:e.target.value
               }) 
              }}/>

          </Form.Group>

          <Form.Group controlId="Direccion">
            <Form.Label>Costo</Form.Label>
            <Form.Control type="number" placeholder="Agregar costo" value={entrega.costo}  onChange={(e)=>{
               setEntrega({ ...entrega,
                 costo:e.target.value
               }) 
              }}/>

          </Form.Group>

          <Form.Group controlId="fecha">
            <Form.Label>Fecha</Form.Label>
            <Form.Control type="date" placeholder="fecha"  value={entrega.fecha} onChange={(e)=>{
            setEntrega({ ...entrega,
              fecha:e.target.value
            }) 
          }}/>
          </Form.Group>
          <Button variant="dark" type="submit" onClick={saveEntrega} >
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

 
  

   


export default CrearEntrega
