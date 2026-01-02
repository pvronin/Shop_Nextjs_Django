import localFont from "next/font/local"; // ۱. حتما این را اضافه کن
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// ۲. تعریف فونت محلی وزیر
const vazir = localFont({
    src: [
        { path: "../fonts/Vazir-Thin-FD-WOL.woff2", weight: "300" }, // دقت کن آدرس فایل‌ها درست باشد
        { path: "../fonts/Vazir-Medium-FD-WOL.woff2", weight: "500" },
        { path: "../fonts/Vazir-Bold-FD-WOL.woff2", weight: "700" },
    ],
    variable: "--font-vazir",
});

export const metadata = {
    title: "فروشگاه نکست | مدرن و سریع",
    description: "خرید آنلاین محصولات با بهترین تجربه کاربری",
};

export default function RootLayout({ children }) {
    return (
        <html lang="fa" dir="rtl">
            <body className={`${vazir.className} antialiased`}>
                <Header />

                <main className="min-h-screen">
                    {children}
                </main>

                <Footer />
            </body>
        </html>
    );
}
