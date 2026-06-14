import mongoose from 'mongoose'

const CarSchema = new mongoose.Schema({
  brand: {
    type: String,
    required: [true, 'Brand is required'],
  },
  model: {
    type: String,
    required: [true, 'Model is required'],
  },
  type: {
    type: String,
    enum: ['Sport', 'Luxury', 'SUV', 'Electric'],
    required: [true, 'Type is required'],
  },
  pricePerDay: {
    type: Number,
    required: [true, 'Price is required'],
  },
  horsepower: {
    type: Number,
  },
  topSpeed: {
    type: Number,
  },
  transmission: {
    type: String,
    enum: ['Automatic', 'Manual'],
    default: 'Automatic',
  },
  imageUrl: {
    type: String,
    required: [true, 'Image URL is required'],
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, { timestamps: true })

export default mongoose.models.Car || mongoose.model('Car', CarSchema)
