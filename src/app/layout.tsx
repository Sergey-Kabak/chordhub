import type { Metadata } from "next";
import "./output.css";
import localFont from 'next/font/local'


export const metadata: Metadata = {
  title: "Diez",
  description: "Hey there, its Ukrainian chord service",
};

const eUkraine = localFont({
    src: [
        {
            path: '/font/e-Ukraine-Thin.otf',
            weight: '100',
            style: 'normal',
        },
        {
            path: '/font/e-Ukraine-Light.otf',
            weight: '300',
            style: 'normal',
        },
        {
            path: '/font/e-Ukraine-Regular.otf',
            weight: '400',
            style: 'normal',
        },
        {
            path: '/font/e-Ukraine-Medium.otf',
            weight: '500',
            style: 'normal',
        },
        {
            path: '/font/e-Ukraine-Bold.otf',
            weight: '700',
            style: 'normal',
        }
    ],
    display: 'swap',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={eUkraine.className}>
      <body suppressHydrationWarning={true}>
        {children}
      </body>
    </html>
  );
}
