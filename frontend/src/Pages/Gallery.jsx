import React from 'react';
import CommonSection from '../shared/CommonSection';
import { Container, Row, Col } from 'reactstrap';
import MasonryImagesGallery from '../components/image-gallery/MasonryImagesGallery';

const Tours = () => {

return (
        <>
            <CommonSection title={"Gallery"}/>
                <section>
                    <Container>
                        <Row>
                            <Col><MasonryImagesGallery/></Col>
                        </Row>
                </Container>
            </section>
        </>
    )
}
export default Tours