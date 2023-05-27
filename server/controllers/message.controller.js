import conversationModel from "../models/conversation.model.js"
import messageModel from "../models/message.model.js"

//Create message
export const createMessage = async (req, res, next) => {

    try {

        const newMessage = new messageModel({

            conversationId: req.body.conversationId,
            userId: req.userId,
            desc: req.body.desc,

        })

        const savedMessage = await newMessage.save()

        await conversationModel.findOneAndUpdate(

            { id: req.body.conversationId },
            {
                $set: {

                    readBySeller: req.isSeller,
                    readByBuyer: !req.isSeller,
                    lastMessage: req.body.desc

                }
            },
            {
                new: true
            },

        )

        res.status(200).json(savedMessage)

    } catch (err) {



    }

}

//Get all message
export const getMessages = async (req, res, next) => {

    try {

        const messages = await messageModel.find({ conversationId: req.params.id })

        res.status(200).json(messages)

    } catch (err) {

        next(err)

    }

}

//Get a message
export const getMessage = async (req, res, next) => {

    try {

        const messages = await messageModel.findById(req.params.id)

        res.status(200).json(messages)

    } catch (err) {

        next(err)

    }

}

