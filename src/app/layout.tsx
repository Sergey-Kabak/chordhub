import type { Metadata } from "next";
import "./output.css";

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
      <body suppressHydrationWarning={true}>
        {children}
      </body>
    </html>
  );
}
