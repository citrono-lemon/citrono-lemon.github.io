import React, { DOMElement } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { Breadcrumbs, Typography } from '@material-ui/core'

import moment from 'moment'
import path from 'path'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'
import { CodeProps } from "react-markdown/lib/ast-to-react";
import gfm from 'remark-gfm'

import YouTube from 'react-youtube'

import { BiNews } from 'react-icons/bi'
import { FaRegCalendarAlt, FaTags } from 'react-icons/fa'

import { Post } from '@/libs/api'




const CodeBlock = ({ node, className, children, ...props }: CodeProps) => {
  // カスタム値の判定材料を抽出
  const prefix = "language-";
  const classes = className
    ?.split(" ")
    .find((c) => c.startsWith(prefix))
    ?.replace(prefix, "");
  const params = classes ? classes.split(":") : [];

  /*
  if (params.length > 0 && params[0] === "twitter") {
    console.log(children)
    // Twitter埋め込み
    const id = children.toString().replace(/\r?\n/g, "");
    return <TwitterTweetEmbed id={id} />;
  }
  */

  if (params.length > 0 && params[0] === "youtube") {
    // YouTube埋め込み
    const id = children.toString().replace(/\r?\n/g, "");
    return <YouTube className={className + " w-full"} videoId={id} />;
  }

  // 通常のコンポーネントを返却
  return <code className={className}>{children}</code>;
};


interface Props {
  className?: string
  post: Post
}
const Article: React.FC<Props> = ({ post }) => {
  const router = useRouter()
  const currentPage = router.pathname.split("/")[1] ?? ""

  return (
    <div className="bg-white shadow-md md:pt-10 pt-3 animate-slideIn">
      {/* パンくずリスト */}
      <Breadcrumbs separator=">" className="pl-10">
        <Link href={"/" + "news"}><a>
          <span className="flex items-center cursor-pointer">
            <BiNews className="mr-1" /> News
          </span>
        </a></Link>
        <Typography key="3" color="textPrimary">
          {post.title}
        </Typography>
      </Breadcrumbs>

      <div className="flex flex-col items-center py-3">
        <div className="md:max-w-3xl w-full border-2 px-2 py-4">

          {/* タイトル */}
          <h1 className="text-4xl text-center px-2 pb-2 border-b-4">
            {post.title}
          </h1>

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

          <div className="flex justify-center">
            {post.thumbnail != "" ? (
              <img
                src={`/article/${post.slug}/${post.thumbnail}`}
                alt="サムネイル"
                className="h-64 my-5"
              />
            ) : ""}
          </div>

          {/* 本文 */}
          <div className="md:px-10 px-2 py-5 bg-white rounded-3xl text-gray-700">
            {/*
              IMG タグは、srcの場所を以下のようにパースする
              https://ppp.domain/aaaa.png => そのまま
              /public/abc/aaaa.png => /abc/aaaa.png
              aaaa.png => /article/slug/aaaapng
            */}
            <ReactMarkdown
              className="md-article"
              components={{
                img: (attr, { ...props }) =>
                  <img src={
                    attr.src.match(/^https?:\/\//) ?
                      attr.src :
                      attr.src.match(/\/public\//) ?
                        "/" + attr.src.split("/").slice(2).join("/") :
                        path.join("/article", post.slug, attr.src)
                  }
                    {...props} />,
                code: CodeBlock
              }}
              plugins={[gfm]}
              unwrapDisallowed={false}
            >
              {post.content}
            </ReactMarkdown>
            {/*
              <div id="md-article" dangerouslySetInnerHTML={{ __html: remark().use(html).processSync(post.content).toString() }}></div>
            */}
          </div>
        </div>
      </div>

    </div >
  )
}

export default Article