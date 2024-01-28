import { NoteData } from '@/types/note';
import { Box, Container, Heading, Text, VStack } from '@chakra-ui/react';
import { DateTime } from 'luxon';

interface Props {
  note: NoteData;
}

export default function Note({ note }: Props) {
  return (
    <Container
      maxW="container.sm"
      bg="blue.100"
      borderRadius=".8rem"
      shadow="lg"
      p="1.2rem"
    >
      <VStack
        spacing={4}
        align="stretch"
      >
        <Box>
          <Heading size="lg">{note.title}</Heading>
          <Text
            color="gray.500"
            fontSize="xs"
          >
            {note.id}
          </Text>
        </Box>

        <Text>{note.content}</Text>

        <Box
          display="flex"
          justifyContent="space-between"
          fontSize="sm"
          color="gray.500"
        >
          <Text>Created at: {note.created_at.toLocaleString(DateTime.DATETIME_SHORT)}</Text>
          <Text>Updated at: {note.updated_at.toLocaleString(DateTime.DATETIME_SHORT)}</Text>
        </Box>

        <Text>
          Status: <span className="font-bold">{note.is_published ? 'Published' : 'Draft'}</span>
        </Text>
      </VStack>
    </Container>
  );
}
