import '@/styles/globals.css';
import { TooltipProvider } from '@beskar-labs/gravity/tooltip';
import { Toaster } from '@beskar-labs/gravity/toast';
import { Analytics } from '@vercel/analytics/react';
import type { FC, ReactNode } from 'react';

type RootLayoutProps = {
  children: ReactNode;
};

const RootLayout: FC<RootLayoutProps> = ({ children }) => (
  <html lang="en">
    <body>
      <TooltipProvider>{children}</TooltipProvider>
      <Toaster />
      <Analytics />
    </body>
  </html>
);

export default RootLayout;
