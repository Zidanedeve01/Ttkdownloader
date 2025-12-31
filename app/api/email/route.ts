import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/server/db';
import { contactEmails } from '@/server/db/schema';
import { nanoid } from 'nanoid';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email is required' }, { status: 400 });
    }

    await db.insert(contactEmails).values({
      id: nanoid(),
      email,
    });

    return NextResponse.json({ success: true, message: 'Email saved successfully' });
  } catch (error) {
    console.error('Email save error:', error);
    return NextResponse.json({ error: 'Failed to save email' }, { status: 500 });
  }
}
