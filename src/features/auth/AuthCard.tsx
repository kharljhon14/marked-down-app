import { Card, CardHeader, Heading, CardBody } from '@chakra-ui/react';

import { PropsWithChildren, ReactNode } from 'react';

interface Props extends PropsWithChildren {
  title: ReactNode;
}

export default function AuthCard({ children, title }: Props) {
  return (
    <Card
      maxW="28rem"
      w="100%"
      boxShadow="lg"
    >
      <CardHeader>
        <Heading>{title}</Heading>
      </CardHeader>
      <CardBody>{children}</CardBody>
    </Card>
  );
}
