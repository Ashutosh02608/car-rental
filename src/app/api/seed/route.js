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
    imageUrl: 'https://images.unsplash.com/photo-1592198084033-aade902d1aae?auto=format&fit=crop&q=80&w=1200',
  },
  {
    brand: 'Porsche',
    model: '911 GT3 RS',
    type: 'Sport',
    pricePerDay: 1800,
    horsepower: 518,
    topSpeed: 296,
    imageUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1200',
  },
  {
    brand: 'Rolls-Royce',
    model: 'Phantom',
    type: 'Luxury',
    pricePerDay: 3500,
    horsepower: 563,
    topSpeed: 250,
    imageUrl: 'https://images.unsplash.com/photo-1631214503020-f9471192994c?auto=format&fit=crop&q=80&w=1200',
  },
  {
    brand: 'Tesla',
    model: 'Model S Plaid',
    type: 'Electric',
    pricePerDay: 900,
    horsepower: 1020,
    topSpeed: 322,
    imageUrl: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80&w=1200',
  },
  {
    brand: 'Lamborghini',
    model: 'Urus Performante',
    type: 'SUV',
    pricePerDay: 1500,
    horsepower: 666,
    topSpeed: 306,
    imageUrl: 'https://images.unsplash.com/photo-1632243193741-b308ad3d02c3?auto=format&fit=crop&q=80&w=1200',
  },
  {
    brand: 'Bentley',
    model: 'Continental GT',
    type: 'Luxury',
    pricePerDay: 1200,
    horsepower: 650,
    topSpeed: 335,
    imageUrl: 'https://images.unsplash.com/photo-1621135802920-133df287f89c?auto=format&fit=crop&q=80&w=1200',
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
