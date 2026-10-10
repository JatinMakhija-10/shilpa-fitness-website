import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, phone, area, service, timePreference, notes } = body;

    if (!fullName || !phone) {
      return NextResponse.json(
        { error: 'Name and phone number are required.' },
        { status: 400 }
      );
    }

    // Generate unique confirmation ID
    const bookingId = `TRIAL-${Date.now().toString(36).toUpperCase()}`;

    // Log booking for verification
    console.log('[NEW TRIAL LEAD RECEIVED]:', {
      bookingId,
      fullName,
      phone,
      area,
      service,
      timePreference,
      notes,
      receivedAt: new Date().toISOString(),
    });

    return NextResponse.json(
      {
        success: true,
        bookingId,
        message: 'Trial booking received successfully. Shilpa will message you on WhatsApp.',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Trial booking error:', error);
    return NextResponse.json(
      { error: 'Internal server error processing booking.' },
      { status: 500 }
    );
  }
}
