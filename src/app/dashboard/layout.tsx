'use client';

import { NotesProvider } from '@/context/notesContext';
import { Box, Flex } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface Props {
  sidebar: ReactNode;
  content: ReactNode;
}

export default function Layout({ sidebar, content }: Props) {
  return (
    <Flex>
      <NotesProvider>
        <Box w="33%">{sidebar}</Box>
        <Box>{content}</Box>
      </NotesProvider>
    </Flex>
  );
}
