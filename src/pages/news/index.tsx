import { Layout } from '@/components/templates'
import { News } from '@/components/custom_page'
import { getAllPosts, Post } from '@/libs/api'
import { useRouter } from 'next/router'

export async function getStaticProps() {
  const allPosts = getAllPosts(["slug", "content", "title", "date", "tags", "thumbnail"])
  return {
    props: {
      allPosts
    }
  }
}


export default function Home({ allPosts }) {
  const router = useRouter()
  const { tag } = router.query
  const posts: Post[] = tag ?
    allPosts.filter((f) => f.tags.includes(tag)) ?? []
    : allPosts

  return (
    <Layout title="News">
      <News posts={posts} tag={tag as string} />
    </Layout>
  )
}
