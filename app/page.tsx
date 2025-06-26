"use client"

/**
 * Root page that simply renders the existing <App /> component.
 * Next.js requires every route file (e.g. app/page.tsx) to have a **default export**.
 */
import App from "../App"

export default function RootPage() {
  return <App />
}
