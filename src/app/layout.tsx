import type { Metadata } from "next";
import "./output.css";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "ChordHub",
  description: "Hey there, its Ukrainian chord service",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Suspense>
          {children}
        </Suspense>
      </body>
    </html>
  );
}
