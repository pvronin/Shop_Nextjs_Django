// middleware.js
import { NextRequest, NextResponse } from 'next/server';

const publicPaths = ['/login', '/register', '/forgot-password'];
// مسیرهایی که کاربران لاگین‌نشده می‌تونن ببینن

const authPaths = ['/login', '/register'];
// مسیرهایی که کاربران لاگین‌شده نباید بتونن ببینن (ریدایرکت می‌شن)

export function proxy(request) {
    const { pathname } = request.nextUrl;

    // چک کردن وجود توکن در کوکی‌ها
    const hasAccessToken = request.cookies.has('access_token');

    // اگر کاربر لاگین کرده و رفت به صفحه لاگین یا ثبت‌نام → ریدایرکت به داشبورد
    if (authPaths.some(path => pathname.startsWith(path)) && hasAccessToken) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
        // یا می‌تونی به صفحه اصلی ریدایرکت کنی:
        // return NextResponse.redirect(new URL('/', request.url));
    }

    // اگر مسیر محافظت‌شده است (نه در publicPaths) و توکن ندارد → بره به لاگین
    // if (!publicPaths.some(path => pathname.startsWith(path))) {
    //     if (!hasAccessToken) {
    //         const url = new URL('/login', request.url);
    //         url.searchParams.set('redirect', pathname); // اختیاری: بعد از لاگین برگرده به همین صفحه
    //         return NextResponse.redirect(url);
    //     }
    // }

    // در بقیه موارد اجازه بده درخواست ادامه پیدا کنه
    return NextResponse.next();
}

// تنظیم matcher — فقط روی صفحات معمولی اجرا بشه (نه api، نه فایل‌های استاتیک)
export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
