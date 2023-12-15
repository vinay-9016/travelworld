import React from 'react';
import CommonSection from '../shared/CommonSection';
import { Container, Row, Col } from 'reactstrap';
import './css/about.css';

const Tours = () => {

return (
        <>
            <CommonSection title={"About us"}/>
                <section>
                    <Container>
                        <Row>
                            <Col className='about__us__title'>About us</Col>
                        </Row>
                        <Row>
                            <Col className='about__us__content'>
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perspiciatis sequi recusandae quam possimus minima nostrum, earum quibusdam quaerat soluta! Accusantium consectetur delectus eum beatae dolore. Impedit rem minus cupiditate nihil expedita ex distinctio ab id, molestias dolorum debitis tempora libero porro labore quisquam nobis mollitia esse autem officia sint nam aut pariatur fugiat neque. Ullam officia ratione nisi dolore temporibus dignissimos similique sequi quo, repellat quidem ipsa excepturi quaerat consectetur! Veritatis, alias? Totam magnam facere amet exercitationem. Architecto, iste quisquam ratione totam nobis hic! Voluptatum officiis deserunt alias consequatur optio provident aperiam? Eaque, aperiam perferendis ex quidem temporibus quia ratione?
                            </Col>
                        </Row>
                </Container>
            </section>
        </>
    )
}

export default Tours
