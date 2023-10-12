import './style/globals.scss'
import { Ubuntu } from 'next/font/google'

import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

const ubuntu = Ubuntu({ subsets: ['latin'], weight: ['300', '400', '500', '700'] })

export const metadata = {
  title: 'Juuso "korho" Korhonen',
  description: 'Juuso Korhonen is a software developer from Finland',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={ubuntu.className}>{children}</body>
    </html>
  )
}
