import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate body here if needed, or assume it's valid from client
    // In a real app, you would insert this into Supabase here
    
    console.log('Booking received:', body);

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return NextResponse.json(
      { message: 'Booking created successfully', booking: body },
      { status: 201 }
    );
  } catch (error) {
    console.error('Booking API Error:', error);
    return NextResponse.json(
      { message: 'Failed to create booking' },
      { status: 500 }
    );
  }
}
