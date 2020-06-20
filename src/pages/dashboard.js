import React, {useState, useEffect} from 'react';
import Layout from '../components/layout';
import { Card,Button, Container, Row, Col} from 'react-bootstrap';
import { Link } from "gatsby"
import SEO from '../components/seo';
import pLogo from '../images/paralelo.png';
import aLogo from '../images/avocaterie.png';
import pImg from '../images/partnerimg.png';
import tImg from '../images/tripimg.png';
import RestCard from '../components/restCard'




const Dashboard = ()=> {
    const [token, setToken] = useState(localStorage.getItem('jwt'))
    const [trips, setTrips] = useState([]);
    const [restaurants, setRestaurants] = useState([]);

    useEffect(()=>{
        // getData()
        getRestaurants()
    },[])

    // function getData(){
    //     fetch('http://localhost:1337/trips')
    //     .then(response=> response.json())
    //     .then(res=> setTrips(res))
    // }

    function getRestaurants(){
        fetch('http://misentregas.herokuapp.com/restaurants')
        .then(response=> response.json())
        .then(res=> setRestaurants(res))
    }
    
    return(
        <Layout>
            <SEO title="Dashboard" />
        <div className="mt-2 mb-5">
            <h3>Dashboard</h3>
        </div>

        <section className="dashboard-create-trips">
            <Row className="mb-3">
                <Col md={6} className="">
                    <div className="card py-4 px-4 shadow bg-create-trip bg-light mb-1 card-entregas">
                <Row>
                    <Col md={9}><strong><h3>Entregas</h3></strong></Col>
                    <Col md={3}><img src={tImg}></img></Col>
                </Row>
                <Row>
                    <Col md={12}>
                    <Link to="/crear-entrega/"> <Button className="btn btn-primary mt-0 mr-2">Crear nueva</Button></Link>
                        <Button className="btn btn-dark mt-0">Ver todas</Button>
                       
                    </Col>
                    
                </Row>
                </div>

                </Col>
                <Col md={6} className="">
                <div className="card py-4 px-4 shadow bg-dark2 card-entregas">
                <Row>
                    <Col md={9}><strong><h3 className="">Restaurantes</h3></strong></Col>
                    <Col md={3}><img src={pImg}></img></Col>
                </Row>
                <Row>
                <Col md={12}>
                <Link to="/crear-restaurant/"><Button className="btn btn-primary mt-0 mr-2">Crear nuevo</Button></Link>
                    <Button className="btn btn-dark mt-0 ">Ver todos</Button>
                </Col>

                </Row>
                </div>

                </Col>
            </Row>
        </section>


        <section className="total-front-trips">
          <Row className="mb-5">
             {restaurants.map(rest => (
                 <RestCard name={rest.name} key={rest._id} trips={rest.trips}/>
             ))}
            </Row>
            </section>
        </Layout>
    )
}


export default Dashboard;