import Booking from '../models/Booking.js';

export const getBookings = async (req, res) => {
    const userEmail = req.query.userEmail;
    try {
        const bookings = await Booking.find({ userEmail }).populate('serviceId');
        res.json(bookings);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const addBooking = async (req, res) => {
    const newBooking = new Booking(req.body);
    try {
        const saved = await newBooking.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const deleteBooking = async (req, res) => {
    try {
        await Booking.findByIdAndDelete(req.params.id);
        res.json({ message: 'Booking canceled' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
