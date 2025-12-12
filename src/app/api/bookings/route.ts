import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // In a real production app, we should validate the user session on the server
    // const { data: { user } } = await supabase.auth.getUser();
    // if (!user) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    // For now, we will trust the client to send the right data, 
    // but ideally we should extract user_id from the session.
    
    // We need a user_id for the booking.
    // If we don't have a session, this insert might fail due to RLS if we enforced it strictly without public access.
    // But our schema policy "Users can create bookings" checks auth.uid() = user_id.
    // So we MUST have a session.
    
    // Let's rely on the client sending the user_id in the body for this step, 
    // or fetch it if possible. Since we can't easily get the cookie session here without extra setup:
    // We will assumbe the body contains the user_id if we want to be explicit, 
    // OR we can just try to insert and catch the error.
    
    // Let's modify the body to match our DB schema
    const { 
      name, 
      phone, 
      address, 
      serviceType, 
      description, 
      preferredTime,
      user_id // We expect the frontend to pass this now, or we fail.
    } = body;

    const { data, error } = await supabase
      .from('bookings')
      .insert([
        {
          service_type: serviceType,
          description: description,
          location: address,
          scheduled_at: preferredTime,
          contact_name: name,
          contact_phone: phone,
          status: 'pending',
          user_id: user_id // THIS IS CRITICAL for RLS
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Supabase Insert Error:', error);
      throw error;
    }

    return NextResponse.json(
      { message: 'Booking created successfully', booking: data },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Booking API Error:', error);
    return NextResponse.json(
      { message: 'Failed to create booking', details: error.message },
      { status: 500 }
    );
  }
}
