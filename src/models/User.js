import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: [true, 'Please provide an email.'],
    unique: true,
  },
  password: {
    type: String,
    required: false, // Optional for social auth or magic link users
  },
  image: {
    type: String,
  },
  emailVerified: {
    type: Date,
  },
  phoneNumber: {
    type: String,
    required: false,
  },
  licenseNumber: {
    type: String,
    required: false,
  },
  verificationStatus: {
    type: String,
    enum: ['Unverified', 'Pending', 'Verified'],
    default: 'Unverified',
  },
  role: {
    type: String,
    enum: ['renter', 'owner', 'admin'],
    default: 'renter',
    required: true,
  },
}, { timestamps: true })

UserSchema.pre('save', function() {
  if (!this.role) {
    this.role = 'renter';
  }
});

// Clear existing model to prevent stale schemas during development
if (mongoose.models.User) {
  delete mongoose.models.User;
}

export default mongoose.model('User', UserSchema)
