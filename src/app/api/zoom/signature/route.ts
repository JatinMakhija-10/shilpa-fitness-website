import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { meetingNumber, role = 0, memberId } = body;

    if (!meetingNumber) {
      return NextResponse.json(
        { error: 'meetingNumber is required.' },
        { status: 400 }
      );
    }

    // Server-side Zoom credentials - strictly kept on server!
    const sdkKey = process.env.ZOOM_SDK_KEY || 'SHILPA_ZOOM_SDK_KEY_PROD';
    const sdkSecret = process.env.ZOOM_SDK_SECRET || 'SHILPA_ZOOM_SDK_SECRET_SECURE';

    const iat = Math.round(new Date().getTime() / 1000) - 30;
    const exp = iat + 60 * 60 * 2; // 2 hour validity

    const header = { alg: 'HS256', typ: 'JWT' };
    const payload = {
      appKey: sdkKey,
      sdkKey: sdkKey,
      mn: meetingNumber.replace(/\s+/g, ''),
      role: Number(role),
      iat: iat,
      exp: exp,
      tokenExp: exp,
    };

    const sHeader = Buffer.from(JSON.stringify(header)).toString('base64url');
    const sPayload = Buffer.from(JSON.stringify(payload)).toString('base64url');
    const dataToSign = `${sHeader}.${sPayload}`;

    const signature = crypto
      .createHmac('sha256', sdkSecret)
      .update(dataToSign)
      .digest('base64url');

    const token = `${dataToSign}.${signature}`;

    return NextResponse.json({
      signature: token,
      sdkKey: sdkKey,
      meetingNumber: meetingNumber.replace(/\s+/g, ''),
      role: role,
      userName: body.userName || 'Member',
      userEmail: body.userEmail || 'member@shilpakanodia.com',
    });
  } catch (error) {
    console.error('Zoom signature error:', error);
    return NextResponse.json(
      { error: 'Failed to generate Zoom signature' },
      { status: 500 }
    );
  }
}
