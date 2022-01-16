import { Layout } from '@/components/templates'
import { Works } from '@/components/custom_page'
import { getAllPosts } from '@/libs/api'

import { NextPage } from 'next'

export async function getStaticProps() {
  const allPosts = getAllPosts(["slug", "content", "title", "date", "tags"])
  return {
    props: {
      allPosts
    }
  }
}

const Work: NextPage = (allPosts) => {
  return (
    <Layout title="Works">
      <Works />
    </Layout>
  )
}

export default Work

/*
export default function Home() {
  return (
    <Layout>
      <Works />
    </Layout>
  )
}
*/