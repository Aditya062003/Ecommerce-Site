import Navbar from '@/components/Navbar'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Footer from '@/components/Footer'

export default function App({ Component, pageProps }: AppProps) {
  return <div><Navbar/><Component {...pageProps} /><Footer/></div>
}
