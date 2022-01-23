import { Layout } from '@/components/templates'
import { Top } from '@/components/custom_page'

import { SpineObj } from '@/components/templates'

export default function Home() {
  return (
    <>
      {/* 
      <SpineObj width={150} height={150} className="fixed right-0 bottom-10 z-10" />
      */}
      <Layout>
        <Top />

      </Layout>

    </>
  )
}
