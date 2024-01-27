import { PropsWithChildren, ReactNode } from 'react';

interface Props {
  sidebar: ReactNode;
  content: ReactNode;
}

export default function Layout({ sidebar, content }: Props) {
  return (
    <div>
      {sidebar}
      {content}
    </div>
  );
}
