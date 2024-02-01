import { NoteData } from '@/types/note';
import { Box, Container, Heading, Text, VStack } from '@chakra-ui/react';
import { DateTime } from 'luxon';
import { DragEvent } from 'react';

interface Props {
  note: NoteData;
}

export default function Note({ note }: Props) {
  const handleDragStart = (e: DragEvent) => {
    console.log('Drag Start');
  };

  const handleDragEnd = (e: DragEvent) => {
    console.log('Drag End');
  };

  const handleDrop = (e: DragEvent) => {
    console.log('Drop');
  };

  const handleDragOver = (e: DragEvent) => {
    console.log('Drag Over');
  };

  const handleDragEnter = (e: DragEvent) => {
    console.log('Drag Enter');
  };

  const handleDragLeave = (e: DragEvent) => {
    console.log('Drag Leave');
  };

  return (
    <Box
      w="100%"
      bg="blue.100"
      borderRadius=".8rem"
      shadow="lg"
      p="1.2rem"
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
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
    </Box>
  );
}
