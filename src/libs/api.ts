import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export type Post = {
  slug: string
  content: string
  title: string
  date: string
  tags: string[]
  thumbnail: string
}

const postsDirectory = path.join(process.cwd(), "public/article")

/**
 * postsDirectoryのディレクトリ名を取得
 * @returns postsDirectoryのディレクトリ名一覧
 */
export function getPostSlugs(): string[] {
  const dirents = fs.readdirSync(postsDirectory, { withFileTypes: true })
  return dirents
    .filter((dir) => dir.isDirectory() && !dir.name.includes("draft"))
        .map((v) => v.name)
}


export const getPostBySlug = (slug: string, fields: string[] = []) => {
  // ファイルを読み込む
  const fullPath = path.join(postsDirectory, slug, 'index.md');
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  // slug内にあるthumbnail.png等画像ファイルを検索する
  // なければ空文字を返す
  const thumbnailPath = (fs
    .readdirSync(path.join(postsDirectory, slug))
    .map((f) => f.match(/^thumbnail\..*/i))
    .filter((f) => f)[0]
    ?? [""])[0]


  const items: Post = {
    slug: '',
    content: '',
    title: '',
    date: '',
    tags: [],
    thumbnail: ''
  };

  // 指定された値を取得してくる
  // memo: slugが指定されたとき、contentが指定されたとき、frontmatterの中身が指定されたときで返却の仕方が異なる
  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = slug;
    }
    if (field === 'content') {
      items[field] = content;
    }
    if (field === 'thumbnail') {
      items[field] = thumbnailPath
    }

    if (field === 'title' || field === 'date' || field === 'tags') {
      items[field] = data[field];
    }
  });

  return items;
};

export const getAllPosts = (fields: string[] = []) => {
  const slugs = getPostSlugs()
  const posts = slugs
    .map((s) => getPostBySlug(s, fields))
    .sort((a, b) => (a.date > b.date ? -1 : 1))

  return posts
}
