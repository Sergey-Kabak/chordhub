import {Header} from "./components/header.tsx";
import { Suspense } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Suspense>
        <Header/>
      </Suspense>
      <div className={'grid max-w-[1024px] p-6 m-auto'}>
        {children}
      </div>
    </div>
  );
}
