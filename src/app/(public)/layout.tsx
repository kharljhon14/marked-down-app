import { PropsWithChildren } from 'react';

export default function PublicLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-200">{children}</div>
  );
}
