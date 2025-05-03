import { defineDocumentType, makeSource } from "contentlayer/source-files";

export const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `blog/**/*.md`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    description: { type: "string" },
    date: { type: "date", required: true },
    pablished: { type: "boolean", default: true },
    image: { type: "string", required: true },
    authors: { type: "list", of: { type: "string" } },
  },
  // computedFieldsでコンテンツのURLを生成する
  computedFields: {
    // urlのことをslugと記述するのが一般的
    slug: {
      type: "string",
      // (doc)でドキュメントを参照できる。(e) => target.valueと同じようなもの
      resolve: (doc) => `/${doc._raw.flattenedPath}`,
    },
    slugAsParams: {
      type: "string",
      // split("/")でurlを/で区切って配列にする
      // splice(1)[0]で/で区切ったurlの二番目の部分を取得し、配列内の0番目の要素を取得する
      resolve: (doc) => doc._raw.flattenedPath.split("/").splice(1)[0],
    },
  },
}));

export default makeSource({
  // contentDirPathで作成するファイルを格納するディレクトリを指定できる
  contentDirPath: "./content",
  documentTypes: [Post],
});
