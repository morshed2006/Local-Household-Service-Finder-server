import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
    userEmail: String,
    serviceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Service' },
    bookingDate: Date,
    price: Number
}, { timestamps: true });

export default mongoose.model('Booking', bookingSchema);
