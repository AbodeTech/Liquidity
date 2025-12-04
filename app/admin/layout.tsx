import type React from "react"

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="admin-theme">{children}</div>
}
