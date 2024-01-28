import NoteContainer from '@/features/notes/NoteContainer';
import { getCurrentUser } from '@/lib/server/auth';
import { Box, Heading, Text } from '@chakra-ui/react';

export default async function SideBarPage() {
  const user = await getCurrentUser();

  return (
    <Box
      padding="1rem"
      borderRight="solid 1px"
      borderColor="gray.500"
      maxH="100vh"
      overflowY="scroll"
    >
      <Heading>Notes</Heading>
      <Text>Signed in as: {user?.username}</Text>
      <NoteContainer />
    </Box>
  );
}
