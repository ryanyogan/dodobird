import { Box, Code, Switch } from "@chakra-ui/react";
import { useAuth } from "lib/auth";
import { FeedbackData } from "utils/types";
import DeleteFeedbackButton from "./DeleteFeedbackButton";
import { Td } from "./Table";

export default function FeedbackRow({
  id,
  author,
  text,
  status,
}: FeedbackData) {
  const auth = useAuth();

  return (
    <Box as="tr" key={id}>
      <Td fontWeight="medium">{author}</Td>
      <Td>{text}</Td>
      <Td>
        <Code
          maxW="150px"
          textOverflow="ellipsis"
          whiteSpace="nowrap"
          overflow="hidden"
          display="inherit"
        >
          /
        </Code>
      </Td>
      <Td>
        <Switch colorScheme="green" />
      </Td>
      <Td>
        <DeleteFeedbackButton feedbackId={id} />
      </Td>
    </Box>
  );
}
