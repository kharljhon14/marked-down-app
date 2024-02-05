'use client';

import { Box, Heading } from '@chakra-ui/react';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function ContentPage() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const noteId = searchParams.get('note_id');
    console.log(noteId);
  }, [searchParams]);

  return (
    <Box>
      <Heading>Content</Heading>
    </Box>
  );
}
