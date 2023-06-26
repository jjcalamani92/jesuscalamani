/* eslint-disable react/no-children-prop */
import dynamic from "next/dynamic";
const MdEditor = dynamic(() => import("react-markdown-editor-lite"), {
  ssr: false
});

// const MdEditor = dynamic(
//   () => {
//     return new Promise(resolve => {
//       Promise.all([
//         import('react-markdown-editor-lite'),
//         import('./editor/CounterA'),
//         /** Add more plugins, and use below */
//       ]).then(res => {
//         res[0].default.use(res[1].default);
//         resolve(res[0].default);
//       });
//     });
//   },
//   {
//     ssr: false,
//   },
// )
// import Editor from "react-markdown-editor-lite";

// import "react-markdown-editor-lite/lib/index.css";

import remarkBreaks from 'remark-breaks'
import { useLocalStorageState } from 'ahooks';
import React from 'react';
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import remarkFlexibleContainers from "remark-flexible-containers";
import remarkFlexibleParagraphs from 'remark-flexible-paragraphs';
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { useUI } from "../providers/UIProvider";

interface Props {
  markdown: string;
  id: string;
}

export default function MarkdownEditor(props: Props) {
  const mdEditor = React.useRef(null);
  const [message, setMessage] = useLocalStorageState<string | undefined>(
    props.id,
    {
      defaultValue: props.markdown,
    },
  );
  
  const { contentArticle } = useUI()
  // Editor.use(PublishButton, {id: props.id, content: message , uid: '123456789'});
  const handleEditorChange = ({ html, text }: { html: string, text: string }) => {
    // console.log('handleEditorChange', { html, text })
    // const newValue = text.replace(/\d/g, '');
    setMessage(text);
    contentArticle.setContent(message as string)
  };
  // const updateArticleContent = useUpdateArticleContentById( props.id);
  // const handleClick = () => {
  //   updateArticleContent.mutate({ content: message as string, uid: '123456' })
  // };

  return (
    <>
      <MdEditor
        // ref={mdEditor}
        value={message}
        className=""
        style={{ height: '700px' }}
        onChange={handleEditorChange}
        renderHTML={(text) => <ReactMarkdown skipHtml={true} children={text} rawSourcePos={true}  remarkPlugins={[remarkBreaks, remarkFlexibleParagraphs, remarkFlexibleContainers, remarkGfm, remarkMath]} rehypePlugins={[rehypeRaw, rehypeKatex]} />}
      // renderHTML={(text) =><MarkdownPreview markdown={text || ''} />}
      // renderHTML={(text) => <div className='prose max-w-none'><MarkdownPreview markdown={text || ''} /></div>}
      />
      {/* <button
        className="btn-primary space-x-3 mt-3"
        onClick={() => handleClick()}
      >
        <FolderPlusIcon className="h-6 w-6" aria-hidden="true" />
        <p className="hidden sm:block">Publish</p>
      </button> */}
    </>
  );
}
