import express from 'express';
import { getBookings, addBooking, deleteBooking } from '../controllers/bookingsController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();
router.get('/', verifyToken, getBookings);
router.post('/', verifyToken, addBooking);
router.delete('/:id', verifyToken, deleteBooking);

export default router;
