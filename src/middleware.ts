import { jwtVerify } from 'jose';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const pathName = req.nextUrl.pathname;

  const authenticatedRoutes = [pathName.startsWith('/dashboard')];

  if (authenticatedRoutes.includes(true)) {
    const cookie = req.cookies.get('jwt-token');
    const url = req.nextUrl.clone();
    url.pathname = '/login';

    if (!cookie || !cookie?.value) {
      return NextResponse.redirect(url);
    }

    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      await jwtVerify(cookie.value, secret);
    } catch (error) {
      console.error(error);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/:path*',
};
