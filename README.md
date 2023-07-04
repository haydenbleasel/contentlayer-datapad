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

## Setup

```ts
import { defineDocumentType, makeSource } from 'contentlayer/source-files';
import { computeFields, remarkPlugins, rehypePlugins } from '@beskar/datapad';

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
  computedFields: computeFields<'Blog'>({}),
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

## Configuration

`computeFields` accepts a configuration object with the following properties:

| Property | Type | Description | Default |
| --- | --- | --- | --- |
| openGraphEndpoint | `string` | The endpoint of the Open Graph image generator (i.e. @vercel/og) | `'/api/og'` |
| imagesFolder | `string` | The folder where your images are stored, prepended to the document image path | `'./public'` |

The computed fields are:

| Field Name | Type | Description | Example Output |
| --- | --- | --- | --- |
| `slug` | `string` | The slug of the document, used in the URL | `'/blog/my-post'` |
| `slugAsParams` | `string` | The slug as a path segment | `'my-post'` |
| `readingTime` | `string` | The estimated time to read the document, in minutes | `'5 min read'` |
| `toc` | `json` | The table of contents of the document | `[{ value: 'Heading 1', depth: 1, url: '#heading-1' }]` |
| `imageBlur` | `string` | The LQIP image data of the document | `'UklGRkgAAABXRUJQVlA4IDwAAADQAQCdASoQAAkABUB8JYwC7ADbW2wxAAD+5fWSusCgEGgrbEnESec12AakPGs5RtCwUs8GJTOZH7EgIAA='` |

## Usage

Here's how to use the custom fields in your Next.js app:

```tsx
import { allBlogs } from '@/.contentlayer/generated';
import Image from 'next/image';
import type { Toc } from '@beskar-labs/datapad';

return allBlogs.sort(sortBlogPostByDate).map((post) => (
  <div key={post.name}>
    <Image
      src={src}
      width={1920}
      height={1080}
      alt=""
      blurDataURL={`data:image/jpg;base64,${post.imageBlur}`}
      placeholder="blur"
    />

    <p>{post.readingTime}</p>

    <ul>
      {(post.toc as Toc).map((item) => (
        <li
          key={item.url}
          style={{
            paddingLeft: `${item.depth - 2}rem`,
          }}
        >
          <a href={item.url}>{item.value}</a>
        </li>
      ))}
    </ul>
  </div>
));
```
