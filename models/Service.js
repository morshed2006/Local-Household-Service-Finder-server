import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
    userEmail: String,
    rating: Number,
    comment: String,
    createdAt: { type: Date, default: Date.now }
});

const serviceSchema = new mongoose.Schema({
    name: String,
    category: String,
    price: Number,
    description: String,
    image: String,
    providerName: String,
    providerEmail: String,
    reviews: [reviewSchema]
}, { timestamps: true });

export default mongoose.model('Service', serviceSchema);
