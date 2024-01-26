'use client';

import { PropsWithChildren } from 'react';
import { ChakraProvider } from '@chakra-ui/react';

export default function ChakraWrapper({ children }: PropsWithChildren) {
  return <ChakraProvider>{children}</ChakraProvider>;
}
