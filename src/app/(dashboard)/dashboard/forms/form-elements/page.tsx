import React from "react";
import FormElements from "@/app/(dashboard)/components/FormElements";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Next.js Form Elements | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Form Elements page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

const FormElementsPage = () => {
  return (
    <div>
      <FormElements />
    </div>
  );
};

export default FormElementsPage;
