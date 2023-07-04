# datapad

An opinionated Contentlayer configuration designed for Beskar Labs content hubs.

It includes the following plugins:

- GitHub Flavored Markdown via [remark-gfm](https://github.com/remarkjs/remark-gfm)
- Syntax Highlighting via [rehype-pretty-code](https://github.com/atomiks/rehype-pretty-code) and [shiki](https://github.com/shikijs/shiki)
- `ids` on headings via [rehype-slug](https://github.com/rehypejs/rehype-slug)
- Anchor links on headings via [rehype-autolink-headings](https://github.com/rehypejs/rehype-autolink-headings)
- Accessible emojis via [rehype-accessible-emojis](https://github.com/GaiAma/Coding4GaiAma/tree/master/packages/rehype-accessible-emojis)
- Reading time via [reading-time](https://github.com/ngryman/reading-time)
- Math via [remark-math](https://github.com/remarkjs/remark-math/tree/main)
- Minification via [rehype-preset-minify](https://github.com/rehypejs/rehype-minify/tree/main)
- KaTeX support via [rehype-katex](https://github.com/remarkjs/remark-math/tree/main/packages/rehype-katex)
- Citation support via [rehype-citation](https://github.com/timlrx/rehype-citation)
- Table of Contents extraction via [pliny/mdx-plugins](https://github.com/timlrx/pliny/blob/main/packages/pliny/src/mdx-plugins/remark-toc-headings.ts)
- LQIP image generation via [lqip-modern](https://github.com/transitive-bullshit/lqip-modern#readme) for [next/image](https://nextjs.org/docs/pages/api-reference/components/image)

## Installation

```bash
yarn add @beskar/datapad
```

## Usage

```ts
import { defineDocumentType, makeSource } from 'contentlayer/source-files';
import { computedFields, remarkPlugins, rehypePlugins } from '@beskar/datapad';

export const Blog = defineDocumentType(() => ({
  name: 'Blog',
  filePathPattern: `blog/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      required: true,
    },
    description: {
      type: 'string',
      required: true,
    },
    date: {
      type: 'date',
      required: true,
    },
    image: {
      type: 'string',
      required: false,
    },
  },
  computedFields,
}));

const source = makeSource({
  contentDirPath: './content',
  documentTypes: [Blog],
  mdx: {
    remarkPlugins,
    rehypePlugins,
  },
});

export default source;
```

The computed fields are:

| Field Name | Type | Description |
| --- | --- | --- |
| `slug` | `string` | The slug of the document, used in the URL |
| `slugAsParams` | `string` | The slug as a path segment |
| `readingTime` | `json` | The estimated time to read the document, in minutes |
| `toc` | `list` | The table of contents of the document |
| `image` | `string` | The image of the document |
| `imageData` | `string` | The LQIP image data of the document |
