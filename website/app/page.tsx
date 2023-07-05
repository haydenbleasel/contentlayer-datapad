import { Snippet } from '@beskar-labs/gravity/snippet';
import { getMDXComponent } from 'next-contentlayer/hooks';
import Image from 'next/image';
import clsx from 'clsx';
import { allDocuments } from 'contentlayer/generated';
import type { Toc } from 'pliny/mdx-plugins';
import type { FC } from 'react';
import { Metadata } from 'next';

const doc = allDocuments[0];

const snippet = `---
title: ${doc.title}
description: ${doc.description}
date: ${doc.date}
image: ${doc.image ?? ''}
---

${doc.body.raw}
`;

export const metadata: Metadata = {
  title: '@beskar-labs/datapad',
  description:
    'An opinionated Contentlayer configuration designed for Beskar Labs content hubs.',
};

const Home: FC = () => {
  const Component = getMDXComponent(doc.body.code);

  return (
    <div className="grid h-screen grid-cols-2">
      <Snippet
        className="h-full overflow-y-auto rounded-none"
        language="markdown"
      >
        {snippet}
      </Snippet>
      <div className="h-full overflow-y-auto p-4">
        <div className="prose prose-neutral mx-auto">
          {doc.image ? (
            <Image
              src={doc.image}
              width={1920}
              height={1080}
              alt=""
              priority
              blurDataURL={`data:image/jpg;base64,${doc.imageBlur}`}
              placeholder="blur"
            />
          ) : null}

          <h1>{doc.title}</h1>
          <p className="text-xl text-neutral-500">{doc.description}</p>

          <div className="not-prose mt-12 grid gap-2">
            <p className="text-sm text-neutral-500">Reading Time</p>
            <p className="text-sm">{doc.readingTime}</p>
            <p className="text-sm text-neutral-500">Sections</p>
            <ul className="flex list-none flex-col gap-2 text-sm">
              {(doc.toc as Toc).map((item) => (
                <li
                  key={item.url}
                  style={{
                    paddingLeft: `${item.depth - 2}rem`,
                  }}
                >
                  <a
                    href={item.url}
                    className={clsx(
                      'flex rounded-sm text-sm underline decoration-black/30 transition-colors hover:decoration-black/50',
                      'line-clamp-3 text-black'
                    )}
                  >
                    {item.value}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <hr />
          <div>
            <Component />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
