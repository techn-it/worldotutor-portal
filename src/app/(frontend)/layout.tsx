import React from 'react'
// import './styles.css'
import '@/styles/payloadStyles.css';
export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'worldotutor',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body suppressHydrationWarning={true} >
        <main>{children}</main>
      </body>
    </html>
  )
}
