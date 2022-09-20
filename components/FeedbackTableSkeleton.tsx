import { Box, Skeleton } from "@chakra-ui/react";
import { Table, Td, Th, Tr } from "./Table";

function SkeletonRow({ width }: { width: string }) {
  return (
    <Box as="tr">
      <Td>
        <Skeleton height="7px" w={width} my={2} />
      </Td>
      <Td>
        <Skeleton height="7px" w={width} my={2} />
      </Td>
      <Td>
        <Skeleton height="7px" w={width} my={2} />
      </Td>
      <Td>
        <Skeleton height="7px" w={width} my={2} />
      </Td>
    </Box>
  );
}

export default function FeedbackTableSkeleton() {
  return (
    <Table>
      <thead>
        <Tr>
          <Th>Name</Th>
          <Th>Feedback</Th>
          <Th>Route</Th>
          <Th>Visible</Th>
          <Th width="50px"></Th>
        </Tr>
      </thead>
      <tbody>
        <SkeletonRow width="75px" />
        <SkeletonRow width="125px" />
        <SkeletonRow width="50px" />
        <SkeletonRow width="100px" />
        <SkeletonRow width="75px" />
      </tbody>
    </Table>
  );
}
