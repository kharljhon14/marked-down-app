'use server';

import config from '@/lib/server/config';
import { sql } from '@/lib/server/db';
import { LoginSchema } from '@/schemas/auth';
import { compare } from 'bcrypt';
import { SignJWT } from 'jose';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export type State = {
  errors?: {
    username?: string;
    password?: string;
  };
  message?: string | null;
};

export async function login(prevState: State, formData: FormData): Promise<State> {
  const validatedFields = LoginSchema.safeParse({
    username: formData.get('username'),
    password: formData.get('password'),
  });

  if (!validatedFields.success) {
    const errorMap = validatedFields.error.flatten().fieldErrors;

    return {
      errors: { username: errorMap.username?.[0] ?? '', password: errorMap.password?.[0] ?? '' },
      message: 'Log in error',
    };
  }

  const username = formData.get('username');
  const password = formData.get('password');

  const userRes = await sql('select * from users where username = $1', [username]);

  if (userRes.rowCount == 0) {
    return {
      message: 'User not found',
    };
  }

  const user = userRes.rows[0];

  const isMatch = await compare(password?.toString()!, user.password);

  if (!isMatch) {
    return {
      message: 'Invalid credentials!',
    };
  }

  const token = await new SignJWT({})
    .setProtectedHeader({ alg: 'HS256' })
    .setSubject(user.id)
    .setIssuedAt()
    .setExpirationTime('2w')
    .sign(new TextEncoder().encode(config.JWT_SECRET));

  cookies().set('jwt-token', token, {
    sameSite: 'strict',
    httpOnly: true,
    secure: true,
  });

  return {
    message: 'Success',
    errors: {},
  };
}
