//export { default as Footer } from './Footer'
//export { default as Navbar } from './Navbar'
export { default as Layout } from './Layout'

import dynamic from 'next/dynamic'
export const SpineObj = dynamic(() => import("./SpineObject/SpineObject"), { ssr: false });
