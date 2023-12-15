import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import {createRequire} from "module";
import cookieParser from 'cookie-parser';
// import dotnev from "dotnev";
import tourRoute from './routes/tours.js';
import userRoute from './routes/user.js';
import authRoute from './routes/auth.js';
import reviewRoute from './routes/reviews.js';
import bookingRoute from './routes/bookings.js';

// dotenv.config();
const app = express();
const port = process.env.PORT || 4000;
const corsOptions = {
    origin: true,
    credentials: true
}
const require = createRequire(import.meta.url);
const {v4: uuidv4} = require('uuid');
const stripe = require("stripe")("sk_test_51OJxedSHL9r9892f8Os9f7YSXAwD5dauIziztsCJeWPBeVN7S1ALyirKCAjGu8ptV7Di7T8Y9lt03vTIKdkGs4NY00Np7AZpBA")



// const stripe = require("stripe")(process.env.SECRET_STRIPE_KEY);


//database connection
mongoose.set("strictQuery", false);
const connect = async()=>{
    try {
        await mongoose.connect("mongodb+srv://vinay:vinay@tourbooking.4ez0yvi.mongodb.net/tour_booking?retryWrites=true&w=majority",{
            useNewUrlParser:true,
            useUnifiedTopology: true,
        });
        console.log("Database Connected");
    } catch (err) {
        console.log("Could not connect");
    }
};

//middlewares
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/tours", tourRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/review", reviewRoute);
app.use('/api/v1/booking', bookingRoute);

app.post("/api/v1/create-checkout-sessions", async(req, res)=>{
    const {bookings} = req.body;
    console.log(bookings);
    const lineItems = [bookings].map((booking)=>({
        price_data:{
            currency:"inr",
            product_data:{
                name:booking.tourName,
            },
            unit_amount:(booking.price + 10) * 100,
        },
        quantity:booking.guestSize
    }));
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items:lineItems,
        mode: "payment",
        success_url:"http://localhost:3000/thank-you",
        cancel_url:"http://localhost:4000/home",
    });

    res.json({id:session.id})
});

app.listen(port, () => {
    connect();
    console.log('server listening on', port);
})