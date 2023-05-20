import express from 'express'
import { createGig, deleteGig, getGig, getGigs } from '../controllers/gig.controller.js'
import { verifyToken } from '../jwt/verifyToken.js'

const router = express.Router()

//Create gig
router.post("/", verifyToken, createGig)

//Delete gig
router.delete("/:id", verifyToken, deleteGig)

//Get a gig
router.get("/single/:id", getGig)

//Get all gigs
router.get("/", getGigs)

export default router