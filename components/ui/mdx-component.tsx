"use client";

import { useMDXComponent } from "next-contentlayer/hooks";
import Image from "next/image";
import Callout from "./callout";

const components = {
  Image,
  Callout,
};

export default function Mdx({ code }: { code: string }) {
  // useMDXComponentは、文字列をHTMLへ変換してくれる
  const Component = useMDXComponent(code);

  return (
    <div className="prose lg:prose-xl max-w-full prose-img:w-full">
      <Component components={components} />
    </div>
  );
}
