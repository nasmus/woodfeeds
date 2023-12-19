import React from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/esm/Container';
import '../css/CheckOut.css';
// import {
//   MDBCardBody,
//   MDBCol,
//   MDBContainer,
//   MDBIcon,
//   MDBRow,
// } from "mdb-react-ui-kit";

function CheckOut(props) {
  return (
    <Container>
        <div>
            <Row className='chekcout-steps' >
                <Col className={props.step1 ? 'active' : ''} >Sign In</Col>
                <Col className={props.step2 ? 'active' : ''} >Shipping</Col>
                <Col className={props.step3 ? 'active' : ''} >payment</Col>
                <Col className={props.step4 ? 'active' : ''} >Place Order</Col>
            </Row> 
        </div>
        {/* <section className="vh-10" >
        <MDBContainer className="py-5 h-50">
          <MDBRow className="justify-content-center align-items-center h-50">
            <MDBCol size="12">
                <MDBCardBody className="p-5">
                  <ul
                    id="progressbar-2"
                    className="d-flex justify-content-between mx-0 mt-0 mb-5 px-0 pt-0 pb-2"
                  >
                    <li className={props.step1 ? 'active' : ''} id="step1"></li>
                    <li className={props.step2 ? 'active' : ''} id="step2"></li>
                    <li className={props.step3 ? 'active' : ''} id="step3"></li>
                    <li className={props.step4 ? 'active' : ''} id="step4"></li>
                  </ul>

                  <div className="d-flex justify-content-between">
                    <div className="d-lg-flex align-items-center">
                      <MDBIcon fas icon="clipboard-list me-lg-4 mb-3 mb-lg-0" size="3x" />
                      <div>
                        <p className="fw-bold mb-0">Processed</p>
                      </div>
                    </div>
                    <div className="d-lg-flex align-items-center">
                      <MDBIcon fas icon="box-open me-lg-4 mb-3 mb-lg-0" size="3x" />
                      <div>
                        <p className="fw-bold mb-0">Shipped</p>
                      </div>
                    </div>
                    <div className="d-lg-flex align-items-center">
                      <MDBIcon fas icon="shipping-fast me-lg-4 mb-3 mb-lg-0" size="3x" />
                      <div>
                        <p className="fw-bold mb-0">En Route</p>
                      </div>
                    </div>
                    <div className="d-lg-flex align-items-center">
                      <MDBIcon fas icon="home me-lg-4 mb-3 mb-lg-0" size="3x" />
                      <div>
                        <p className="fw-bold mb-0">Arrived</p>
                      </div>
                    </div>
                  </div>
                </MDBCardBody>
              
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section> */}
    </Container>
  )
}

export default CheckOut