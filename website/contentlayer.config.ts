import { defineDocumentType, makeSource } from 'contentlayer/source-files';
import { computeFields, remarkPlugins, rehypePlugins } from '..';

export const Page = defineDocumentType(() => ({
  name: 'Page',
  filePathPattern: '*.mdx',
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
  computedFields: computeFields<'Page'>({}),
}));

const source = makeSource({
  contentDirPath: './content',
  documentTypes: [Page],
  mdx: {
    remarkPlugins,
    rehypePlugins,
  },
});

export default source;
