import React,{useState, useContext} from 'react';
import './booking.css';
import {Form, FormGroup, ListGroup, ListGroupItem, Button} from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import {loadStripe} from '@stripe/stripe-js';
import { BASE_URL } from '../utils/config';

const Booking = ({tour, avgRating}) => {
    const {price, reviews, title, maxGroupSize} = tour;
    const navigate = useNavigate();

    const {user} = useContext(AuthContext);

    const [booking, setBooking] = useState({
        userId: user && user._id,
        userEmail: user && user.email,
        tourName: title,
        fullName: '',
        phone: '',
        guestSize: 1,
        bookAt: '',
        tourDays : maxGroupSize,
        price : price
    })

    const handleChange = e => {
        setBooking(prev=>({...prev, [e.target.id]:e.target.value}))
    };

    const totalAmount = Number(price) * Number(booking.guestSize)

    const makePayment = async e =>{
        // e.preventDefault();
        // alert("hey");
        if(!user || user===undefined || user===null){
            return alert("Please sign in");
        }
        const stripe = await loadStripe("pk_test_51OJxedSHL9r9892f9RrczUsisgEbL5me2OLAp9d9xyjpFe9z2T46XzbKwlI0WInWR3EKyI2ozipIaTZAgeLJZM1j00oJJB3sUQ")

        const body = {
            bookings:booking
        }

        const headers = {
            "Content-Type":"application/json"
        }
        const response = await fetch("http://localhost:4000/api/v1/create-checkout-sessions",{
            method: "POST",
            headers: headers,
            body:JSON.stringify(body)
        })

        const session = await response.json();

        const result = stripe.redirectToCheckout({
            sessionId:session.id
        });

        if(result.error){
            console.log(result.error);
        }
    }

    const handleClick = async e=> {
        e.preventDefault();
        console.log(booking);
        try {
            if(!user || user===undefined || user===null){
                return alert("Please sign in");
            }

            const res = await fetch(`${BASE_URL}/booking`,{
                method:"post",
                headers:{
                    "content-type":"application/json",
                },
                credentials: "include",
                body:JSON.stringify(booking)
            });
            const result = await res.json();

            if(!res.ok){
                return alert(result.message);
            }
            navigate("/thank-you");
        } catch (error) {
            alert(error.message);
        }
        console.log(booking);
        navigate('/thank-you');
    }
  return (
    <div className="booking">
        <div className="booking__top d-flex align-items-center justify-content-between">
            <h3>₹{price} <span>/per person</span></h3>
            <span className="tour__rating d-flex align-items-center gap-1">
                <i className="ri-star-fill"></i>
                {avgRating === 0 ? null : avgRating}({reviews?.length}) 
            </span>
        </div>

        {/* booking form section starts */}
        <div className="booking__form">
            <h5>Information</h5>
            <Form className='booking__info-form' onSubmit={handleClick}>
                <FormGroup>
                    <input type="text" placeholder='Full Name' id='fullName' required onChange={handleChange} />
                </FormGroup>
                <FormGroup>
                    <input type="number" placeholder='Phone Number' id='phone' required onChange={handleChange} />
                </FormGroup>
                <FormGroup className='d-flex align-items-center gap-3'>
                    <input type="date" placeholder='' id='bookAt' required onChange={handleChange} />
                    <input type="number" placeholder='Guest' id='guestSize' required onChange={handleChange} />
                </FormGroup>
            </Form>
        </div>
        {/* booking form section ends */}

        {/* booking bottom section starts */}
        <div className="booking__bottom">
            <ListGroup>
                <ListGroupItem className='border-0 px-0'>
                    <h5 className='d-flex align-items-center gap-1'>${price} <i className='ri-close-line'></i>1 person</h5>
                    <span>₹{price}</span>
                </ListGroupItem>
                {/* <ListGroupItem className='border-0 px-0'>
                    <h5>Service Charge</h5>
                    <span>₹{serviceFee}</span>
                </ListGroupItem> */}
                <ListGroupItem className='border-0 px-0 total'>
                    <h5>Total</h5>
                    <span>₹{totalAmount}</span>
                </ListGroupItem>
                <Button className='btn primary__btn w-100 mt-4 btn_booking' type='button' onClick={makePayment}>Book Now</Button>
            </ListGroup>
        </div>
        {/* booking bottom section ends*/}
    </div>
  )
}

export default Booking
