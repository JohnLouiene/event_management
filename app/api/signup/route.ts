// app/api/signup/route.ts 
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import pool from '@/lib/db';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { 
      email, 
      password,
      givenName,
      middleName,
      lastName,
      phoneNumber,
    } = body;

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Insert user into database
    const query = `
      INSERT INTO users (
        email, 
        password_hash, 
        given_name, 
        middle_name, 
        last_name, 
        phone_number,
        role
      ) 
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING id, email, given_name, last_name, role`;

    const values = [
      email,
      passwordHash,
      givenName,
      middleName || null,
      lastName,
      phoneNumber || null,
      'attendee'
    ];

    const result = await pool.query(query, values);

    return NextResponse.json({
      user: result.rows[0],
      message: 'User created successfully'
    }, { status: 201 });

  } catch (error: any) {
    if (error.constraint === 'users_email_key') {
      return NextResponse.json(
        { error: 'Email already exists' },
        { status: 400 }
      );
    }
    
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
