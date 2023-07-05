import { defineDocumentType, makeSource } from 'contentlayer/source-files';
import { computeFields, remarkPlugins, rehypePlugins } from '../';

export const Blog = defineDocumentType(() => ({
  name: 'Blog',
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
