import { ReactNode } from 'react'
import {Navigation} from "@/app/(dashboard)/components/navigation.tsx";

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div className={'grid grid-cols-[200px_1fr] max-w-screen min-h-screen'}>
      <Navigation/>
      <div className={'p-4'}>
        {children}
      </div>
    </div>
  );
}
