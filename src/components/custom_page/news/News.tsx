import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import moment from 'moment'
import path from 'path'
import { remark } from 'remark'
import html from 'remark-html'
import { FaRegCalendarAlt, FaTags } from 'react-icons/fa'

import { Post } from '@/libs/api'

interface Props {
  className?: string
  posts: Post[]
}

/**
 * HTMLフォーマットの文字列からタグの除去を行う
 * 文字列がcharMaxを超える場合は、以降の文字をカットする
 * @param content 要約するHTML記事本文
 * @param charMax 要約後の文字列の長さ
 * @returns 要約された記事
 */
const getArticleSummary = (content: string, charMax: number = 128) => {
  let summary = remark()
    .use(html)
    .processSync(content)
    .toString()
  summary = summary.replace(/<.*?>/g, "")
  if (summary.length > charMax) {
    summary = summary.substr(0, charMax) + "..."
  }
  return summary
}

const getThumbnail = (slug: string) => {
  return `article/${slug}/thumbnail.png`
}

const News: React.FC<Props> = ({ posts }) => {
  const router = useRouter()
  const currentPage = router.pathname.split("/")[1] ?? ""

  return (
    <div className="bg-white shadow-md pt-10 animate-slideIn">
      {/* タイトル */}
      <h1 className="text-5xl text-center"> News </h1>

      <div className="flex flex-col items-center py-10">
        <div className="md:max-w-3xl w-full">
          {/* 記事の一覧 */}
          {posts.map((post) => {
            return (
              <div className="border-2" key={"news-" + post.slug}>
                {/* タイトル */}
                <div className=" pl-6 pt-4 items-center">
                  <Link href={"/" + path.join(currentPage, post.slug)}>
                    <a className="text-2xl underline hover:text-blue-800 visited:text-purple-600 transition duration-300">
                      {post.title}
                    </a>
                  </Link>
                </div>

                {/* 本文 */}
                <div className="px-5 py-4 md:flex flex-row">
                  <Link href={"/" + path.join(currentPage, post.slug)}>
                    <a>
                      <img
                        src={post.thumbnail != "" ? `/article/${post.slug}/${post.thumbnail}` : "/images/no_thumbnail.png"}
                        alt="サムネイル"
                        className="w-28 h-28 rounded-3xl cursor-pointer hover:opacity-70 transition duration-300"
                      />
                    </a>
                  </Link>
                  <div className="md:pl-5 pl-1 md:pt-1 pt-3 max-w-xl">
                    {getArticleSummary(post.content)}
                  </div>
                  {/*
                  <div dangerouslySetInnerHTML={{ __html: remark().use(html).processSync(post.content).toString() }}></div>
                  */}
                </div>

                {/* タグ */}
                <div className="flex justify-between">
                  <span className="text-gray-700 text-md ml-5 flex justify-start items-center pb-2">
                    <FaTags className="mr-1" />
                    {post.tags.join(" ")}
                  </span>

                  {/* 投稿日時 */}
                  <span className="text-gray-700 text-md mr-5 flex justify-end items-center pb-2">
                    <FaRegCalendarAlt className="mr-1" />
                    {moment(post.date).format("YYYY/M/D hh:mm:ss")}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>

    </div >
  )
}

export default News