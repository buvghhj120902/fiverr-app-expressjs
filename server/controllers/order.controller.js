import gigModel from "../models/gig.model.js"
import orderModel from "../models/order.model.js"
import Stripe from 'stripe'

//Create order with Stripe
export const intent = async (req, res, next) => {

    const stripe = new Stripe(process.env.STRIPE)

    const gig = await gigModel.findById(req.params.id)

    const paymentIntent = await stripe.paymentIntents.create({

        amount: gig.price * 100,
        currency: "usd",
        automatic_payment_methods: {

            enabled: true,

        },

    })

    const newOrder = new orderModel({

        gigId: gig._id,
        img: gig.cover,
        title: gig.title,
        buyerId: req.userId,
        sellerId: gig.userId,
        price: gig.price,
        payment_intent: paymentIntent.id

    })

    await newOrder.save()

    res.status(200).json({

        clientSecret: paymentIntent.client_secret

    })

}

//Get all orders
export const getOders = async (req, res, next) => {

    try {



        const orders = await orderModel.find({

            ...(req.isSeller ? { sellerId: req.userId } : { buyerId: req.userId }),
            isCompleted: true

        })

        res.status(200).json(orders)

    } catch (err) {

        next(err)

    }

}

//Order confirmation
export const confirm = async (req, res, next) => {

    try {

        const orders = await orderModel.findOneAndUpdate(

            {

                payment_intent: req.body.payment_intent,

            },
            {
                $set: {
                    isCompleted: true,
                }
            },

        )

        res.status(200).json("Đơn hàng đã được xác nhận")

    } catch (err) {

        next(err)

    }

}

