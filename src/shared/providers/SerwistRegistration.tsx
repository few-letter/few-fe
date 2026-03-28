"use client";

import { SerwistProvider } from "@serwist/turbopack/react";

export function SerwistRegistration() {
  return (
    <SerwistProvider
      swUrl="/serwist/sw.js"
      disable={process.env.NODE_ENV !== "production"}
    />
  );
}
