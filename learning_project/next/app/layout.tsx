import './globals.css'
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head>
        <title>My Simple Page</title>
      </head>
      <body className="bg-white">
        {children}
      </body>
    </html>
  )
}