/* eslint-disable no-underscore-dangle */

import remarkGfm from 'remark-gfm';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { rehypeAccessibleEmojis } from 'rehype-accessible-emojis';
import readingTime from 'reading-time';
import remarkMath from 'remark-math';
import rehypePresetMinify from 'rehype-preset-minify';
import rehypeKatex from 'rehype-katex';
import rehypeCitation from 'rehype-citation';
import { extractTocHeadings } from 'pliny/mdx-plugins.js';
import lqip from 'lqip-modern';
import type { Options as PrettyCodeOptions } from 'rehype-pretty-code';
import type { Options as RehypeAutoLinkHeadingsOptions } from 'rehype-autolink-headings';
import type { ComputedFields } from 'contentlayer/source-files';

export const computedFields = ({
  openGraphEndpoint = '/api/og',
  imagesFolder = './public',
}: {
  openGraphEndpoint?: string;
  imagesFolder?: string;
}): ComputedFields => ({
  slug: {
    type: 'string',
    description: 'The slug of the document, used in the URL',
    resolve: (doc) => `/${doc._raw.flattenedPath}`,
  },
  slugAsParams: {
    type: 'string',
    description: 'The slug as a path segment',
    resolve: (doc) => doc._raw.flattenedPath.split('/').slice(1).join('/'),
  },
  readingTime: {
    type: 'string',
    description: 'The estimated time to read the document, in minutes',
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    resolve: (doc) => readingTime(doc.body.raw).text,
  },
  toc: {
    type: 'list',
    description: 'The table of contents of the document',
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    resolve: async (doc) => extractTocHeadings(doc.body.raw),
  },
  image: {
    type: 'string',
    description: 'The image of the document',
    resolve: (doc) => {
      if (!doc.image) {
        return '';
      }

      const searchParams = new URLSearchParams();

      if (typeof doc.title === 'string') {
        searchParams.set('title', doc.title);
      }

      if (typeof doc.description === 'string') {
        searchParams.set('description', doc.description);
      }

      return `${openGraphEndpoint}?${searchParams.toString()}`;
    },
  },
  imageData: {
    type: 'string',
    description: 'The image data of the document',
    resolve: async (doc) => {
      if (typeof doc.image !== 'string') {
        return '';
      }

      const folderBase = imagesFolder.endsWith('/')
        ? imagesFolder.slice(0, -1)
        : imagesFolder;

      const blur = await lqip(`${folderBase}${doc.image}`);

      return blur.content.toString('base64');
    },
  },
});

const rehypePrettyCodeOptions: PrettyCodeOptions = {
  theme: 'one-dark-pro',
  keepBackground: false,
  onVisitLine(node) {
    if (node.children.length === 0) {
      node.children = [{ type: 'text', value: ' ' }];
    }
  },
};

const rehypeAutolinkHeadingsOptions: RehypeAutoLinkHeadingsOptions = {
  properties: {
    className: [
      'relative',
      'lg:before:content-["#"]',
      'before:block',
      'before:absolute',
      'before:left-[-1.5rem]',
      'before:text-white/50',
      'focus:outline-none',
      'focus:before:text-orange-600',
      'before:transition-colors',
    ],
    ariaLabel: 'Link to section',
  },
};

export const remarkPlugins = [remarkGfm, remarkMath];

export const rehypePlugins = [
  rehypeKatex,
  rehypeCitation,
  rehypeAccessibleEmojis,
  rehypeSlug,
  [rehypePrettyCode, rehypePrettyCodeOptions],
  [rehypeAutolinkHeadings, rehypeAutolinkHeadingsOptions],
  rehypePresetMinify,
];
