import { InferGetStaticPropsType } from 'next'

import { Layout } from '@/components/templates'
import { Article } from '@/components/custom_page'
import { getAllPosts, getPostBySlug, Post } from '@/libs/api'
import { getParametrizedRoute } from 'next/dist/shared/lib/router/utils/route-regex';

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export const getStaticPaths = async () => {
  const posts = getAllPosts(['slug']);

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
};

export const getStaticProps = async ({ params }: any) => {
  const post = getPostBySlug(params.slug, [
    'slug',
    'title',
    'date',
    'tags',
    'content',
    'thumbnail',
  ]);

  return {
    props: { post },
  };
};



export default function Page({ post }) {
  return (
    <Layout title={post.title}>
      <Article post={post} />
    </Layout>
  )
}