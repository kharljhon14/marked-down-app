'use server';

import { sql } from '@/lib/server/db';
import { RegisterSchema } from '@/schemas/auth';
import { hash } from 'bcrypt';

interface State {
  errors?: {
    username?: string;
    password?: string;
    confirmPassword?: string;
  };
  message?: string | null;
}

export async function registerAction(_prevState: State, formData: FormData): Promise<State> {
  const validatedFields = RegisterSchema.safeParse({
    username: formData.get('username'),
    password: formData.get('password'),
    confirmPassword: formData.get('confirmPassword'),
  });

  if (!validatedFields.success) {
    const errorMap = validatedFields.error.flatten().fieldErrors;

    return {
      errors: {
        username: errorMap.username?.[0] ?? '',
        password: errorMap.password?.[0] ?? '',
        confirmPassword: errorMap.confirmPassword?.[0] ?? '',
      },
      message: 'Register failed',
    };
  }

  const userRows = await sql('select * from users where username = $1', [formData.get('username')]);

  if (userRows.rowCount && userRows.rowCount > 0) {
    return {
      message: 'Register failed username already taken',
    };
  }

  const saltRounds = 10;

  const hashedPassword = await hash(formData.get('password')?.toString()!, saltRounds);

  const insertRes = await sql(
    'insert into users (username, password) values ($1, $2) returning *',
    [formData.get('username')?.toString(), hashedPassword]
  );

  if (insertRes.rowCount === 1) {
    //Add logic here
  }

  return {
    message: 'Success',
  };
}
