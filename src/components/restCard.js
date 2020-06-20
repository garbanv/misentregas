import React, {useState, useEffect} from 'react'
import {Row, Col, Button, Badge} from 'react-bootstrap';

export default function RestCard({name, key,trips}) {

    const [porCobrar, setPorCobrar] = useState('')

    useEffect(()=>{
        getCosts(trips)
    },[])


    async function getCosts(trips){
        const getTotal = await trips.reduce(function(total,trip){
            return total+= trip.costo
        },0) 
        setPorCobrar(getTotal)
    }

    return (
        <Col md={4} className="mb-2" key={key}>
        <div className="card py-4 px-4 shadow restcard card-cobrar">
             <Row>
                 <Col md={12}><strong><h3 className="mb-1 m-0 text-center">{name}</h3></strong>
                 <div className="h3bottom mb-1"></div>
                 
                 <p className="m-0  text-center"><strong>Por cobrar</strong></p>
                 {/* <small className="m-0 text-white">{new Date().toLocaleDateString()}</small> */}
                 </Col>
                
             </Row>
             <Row className="mt-1">
                 <Col md={12} className="d-flex justify-content-center">
                    <Button variant="dark">
                    <strong>Total: </strong> <Badge variant="light"><strong>{porCobrar} €</strong></Badge>
                    </Button>
                 </Col>
                 <Col md={12}></Col>
             </Row>
        </div>
        </Col>
    )
}
