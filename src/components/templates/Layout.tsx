import React from 'react'
import Head from 'next/head'
import { url } from 'inspector'

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


      <div className='flex flex-col min-h-screen'>
        {/* <Navbar /> */}
        <main className='flex-grow' style={{ backgroundImage: "url(/images/lemon.jpg)", backgroundSize: "cover", backgroundPosition: "center center" }}> {children} </main>
        {/* <Footer /> */}
      </div>
    </>
  )
}

export default Layout