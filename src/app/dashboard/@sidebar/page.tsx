import NoteContainer from '@/features/notes/NoteContainer';
import { getCurrentUser } from '@/lib/server/auth';
import { Box, Heading, Text } from '@chakra-ui/react';

export default async function SideBarPage() {
  const user = await getCurrentUser();

  return (
    <Box>
      <Heading>Sidebar</Heading>
      <Text>Signed in as: {user?.username}</Text>
      <NoteContainer />
    </Box>
  );
}
