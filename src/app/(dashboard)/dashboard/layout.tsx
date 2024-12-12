"use client";

import "@/app/(dashboard)/css/satoshi.css";
// import Loader from "@/app/(dashboard)/components/common/Loader";
import { ReactNode } from "react";
import DefaultLayout from "@/app/(dashboard)/components/Layouts/DefaultLayout";

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {

  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
      {/*<Loader />*/}
      <DefaultLayout>
        {children}
      </DefaultLayout>
    </div>
  );
}
