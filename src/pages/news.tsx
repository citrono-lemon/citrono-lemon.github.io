import { Layout } from '@/components/templates'
import { News } from '@/components/custom_page'
import { getAllPosts } from '@/libs/api'

export async function getStaticProps() {
  const allPosts = getAllPosts(["slug", "content", "title", "date", "tags", "thumbnail"])
  return {
    props: {
      allPosts
    }
  }
}


export default function Home({ allPosts }) {
  return (
    <Layout title="News">
      <News posts={allPosts} />
    </Layout>
  )
}
