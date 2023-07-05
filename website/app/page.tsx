import { Snippet } from '@beskar-labs/gravity/snippet';
import { getMDXComponent } from 'next-contentlayer/hooks';
import { ClockIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { allDocuments } from 'contentlayer/generated';
import type { FC } from 'react';

const doc = allDocuments[0];

const snippet = `---
title: ${doc.title}
description: ${doc.description}
date: ${doc.date}
image: ${doc.image ?? ''}
---

${doc.body.raw}
`;

const Home: FC = () => {
  const Component = getMDXComponent(doc.body.code);

  return (
    <div className="grid h-screen grid-cols-2">
      <Snippet className="rounded-none" language="markdown">
        {snippet}
      </Snippet>
      <div className="prose prose-neutral p-4">
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

        <div className="flex items-center gap-2">
          <ClockIcon className="h-4 w-4 text-neutral-500" />
          {doc.readingTime}
        </div>
        <Component />
      </div>
    </div>
  );
};

export default Home;
