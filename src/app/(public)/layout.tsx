import { Box, Container } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';

export default function PublicLayout({ children }: PropsWithChildren) {
  return (
    <Box backgroundColor="dimgray">
      <Container>{children}</Container>
    </Box>
  );
}
