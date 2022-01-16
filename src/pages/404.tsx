import { Layout } from "@/components/templates";

export default function PageNotFound() {
  return <Layout>
    <div className="bg-white shadow-md p-10">
      {/* タイトル */}
      <h1 className="text-5xl text-center py-12"> 404 </h1>
      <div className="text-xl py-12 text-center text-gray-600"> ページが見つかりませんでした </div>
    </div>
  </Layout>;
}