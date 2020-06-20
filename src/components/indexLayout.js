/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React  from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import {Container} from 'react-bootstrap';

import Header from "./header"
import "./layout.css"

const Layout = ({ children }) => {


  return (
    <>

      <Container>
          
        <main>{children}</main>
        {/* <footer>
          © {new Date().getFullYear()}, Built by
          {` `}
          <a href="http://www.alexeigarban.com" className="text-black">AlexeiGarban</a>
        </footer> */}
        </Container>
       

    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
