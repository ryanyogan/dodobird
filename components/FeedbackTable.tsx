import { Box } from "@chakra-ui/react";
import { FeedbackData } from "utils/types";
import FeedbackRow from "./FeedbackRow";

import { Table, Th, Tr } from "./Table";

export default function FeedbackTable({
  feedback,
}: {
  feedback: FeedbackData[];
}) {
  return (
    <Box overflowX="scroll">
      <Table w="full">
        <thead>
          <Tr>
            <Th minW="150px">Name</Th>
            <Th>Feedback</Th>
            <Th>Route</Th>
            <Th>Visible</Th>
            <Th width="50px">{""}</Th>
          </Tr>
        </thead>
        <tbody>
          {feedback.map((feedback) => (
            <FeedbackRow key={feedback.id} {...feedback} />
          ))}
        </tbody>
      </Table>
    </Box>
  );
}
