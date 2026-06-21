import { NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Car from '@/models/Car'

const sampleCars = [
  {
    brand: 'Ferrari',
    model: 'SF90 Stradale',
    type: 'Sport',
    pricePerDay: 2500,
    horsepower: 986,
    topSpeed: 340,
    imageUrl: '/images/cars/ferrari-sf90.png',
  },
  {
    brand: 'Porsche',
    model: '911 GT3 RS',
    type: 'Sport',
    pricePerDay: 1800,
    horsepower: 518,
    topSpeed: 296,
    imageUrl: '/images/cars/porsche-911.png',
  },
  {
    brand: 'Rolls-Royce',
    model: 'Phantom',
    type: 'Luxury',
    pricePerDay: 3500,
    horsepower: 563,
    topSpeed: 250,
    imageUrl: '/images/cars/rolls-royce-phantom.png',
  },
  {
    brand: 'Tesla',
    model: 'Model S Plaid',
    type: 'Electric',
    pricePerDay: 900,
    horsepower: 1020,
    topSpeed: 322,
    imageUrl: '/images/cars/tesla-model-s.png',
  },
  {
    brand: 'Lamborghini',
    model: 'Urus Performante',
    type: 'SUV',
    pricePerDay: 1500,
    horsepower: 666,
    topSpeed: 306,
    imageUrl: '/images/cars/lamborghini-urus.png',
  },
  {
    brand: 'Bentley',
    model: 'Continental GT',
    type: 'Luxury',
    pricePerDay: 1200,
    horsepower: 650,
    topSpeed: 335,
    imageUrl: '/images/cars/bentley-continental.png',
  }
]

export async function GET() {
  try {
    await dbConnect()
    
    // Clear existing cars to prevent duplicates
    await Car.deleteMany({})
    
    // Insert sample data
    await Car.insertMany(sampleCars)
    
    return NextResponse.json({ message: 'Fleet successfully initialized with 6 units.' })
  } catch (error) {
    console.error('Seeding error:', error)
    return NextResponse.json({ error: 'Failed to initialize fleet' }, { status: 500 })
  }
}
