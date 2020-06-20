import React, { useState,useEffect } from "react"
import { Link, navigate } from "gatsby"
import {Form, Button, Container, Row, Col} from 'react-bootstrap';

import IndexLayout from "../components/indexLayout"
import SEO from "../components/seo"
import logo from '../images/logo.png'





function IndexPage  ()  {
  const [login ,setLogin] = useState({
    identifier:null,
    password:null
  })

  const [token, setToken] = useState(null);
  const [username, setUsername] =useState(null)


  const handleClick = (e)=>{
    e.preventDefault()
      fetchData(login);
    }

    // const saveToken = () =>{
    //   const token = localStorage.setItem('jwt', jwt);
    //   const user = localStorage.setItem('user', username);
    // }

    // useEffect(()=>{
    //   saveToken();
    // },[jwt,user])


 function fetchData  (x){
  
    fetch('http://misentregas.herokuapp.com/auth/local', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({...login})
        })
       .then(response => response.json())
       .then(data => {
       
        const jwt = data.jwt ? data.jwt : navigate("/");;
        const username = data.user.username; 
    
        const token = window.localStorage.setItem('jwt', jwt);
        const user = window.localStorage.setItem('user', username);

        // const isLoggedIn = data.jwt ? window.location.href="/dashboard" : console.log("Error en la clave")
        const isLoggedIn = data.jwt ? navigate('/dashboard') : console.log("Error en la clave")


       })
       .catch(err => console.log(err))
    
      }



  return (
<IndexLayout >
    <SEO title="Home" />
        <Container className="mt-5 ">
          <Row>
          <Col md={3}></Col>
            <Col md={6}>
            <div className="text-center"><img src={logo} className="text-center"/></div>
            <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email"  onChange={(e)=>{
               setLogin({
                 ...login,
                 identifier:e.target.value
               }) 
              }}/>

          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password"  onChange={(e)=>{
            setLogin({
              ...login,
              password:e.target.value
            }) 
          }}/>
          </Form.Group>
          <Form.Group controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
          <Button variant="primary" type="submit" onClick={handleClick}>
            Submit
          </Button>
    </Form>
    </Col>
    <Col md={3}></Col>
    </Row>
    </Container>
  </IndexLayout>
  )

}

 
  

   


export default IndexPage
