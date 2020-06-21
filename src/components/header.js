import { Link, navigate } from "gatsby"
import PropTypes from "prop-types"
import React, {useState, useEffect} from "react"
import {Navbar, NavDropdown, Nav, Container} from 'react-bootstrap';
import logo from '../images/logo.png'

const Header = ({ siteTitle }) => {

  const [token, setToken] = useState(undefined)
  const [user,setUser] = useState(undefined);

  
useEffect(()=>{

  if (typeof window !== `undefined`) {
    setToken(JSON.parse(window.localStorage.getItem('jwt')))
    setUser(JSON.parse(window.localStorage.getItem('user')))
  }

},[])

const haveToken = token ?  ' ' : navigate("/");

  function logout (){
      window.localStorage.clear();
      navigate("/")
  }

  return (
  <Navbar bg="none" expand="lg">
  <Container >
  <Navbar.Brand><Link to="/dashboard"><img src={logo}/></Link></Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="ml-auto">
      <Nav.Link href="/dashboard">{user}</Nav.Link>
      <Nav.Link  onClick={logout}>Logout</Nav.Link>
    </Nav>
  </Navbar.Collapse>
  </Container>
</Navbar>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
