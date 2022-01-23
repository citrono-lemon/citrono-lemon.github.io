import React from 'react'
import Head from 'next/head'
import Footer from './Footer'
import Navbar from './Navbar/Navbar'

type Props = {
  title?: string
}

const Layout: React.FC<Props> = ({ children, title = "" }) => {
  return (
    <>
      <Head>
        <title>{title == "" ? "CITRONO" : title + " - CITRONO"} </title>
        <meta charSet='utf-8' />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>


      <div className='flex flex-col min-h-screen bg-gray-100'>
        <Navbar />
        <main className='flex-grow md:p-10 p-1'> {children} </main>
        <Footer />
      </div>
    </>
  )
}

export default Layout