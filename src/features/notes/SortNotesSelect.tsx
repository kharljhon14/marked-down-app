import { Select } from '@chakra-ui/react';
import { ChangeEvent } from 'react';

interface Props {
  onChange: Function;
}

export default function SortNotesSelect({ onChange }: Props) {
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  return (
    <Select onChange={handleChange}>
      <option value="title">Title A to Z</option>
      <option value="-title">Tilte Z to A</option>
      <option value="created_at">Created (old to new)</option>
      <option value="-created_at">Created (new to old)</option>
      <option value="updated_at">Updated (old to new)</option>
      <option value="-updated_at">Updated (new to old)</option>
    </Select>
  );
}
