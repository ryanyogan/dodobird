import { Box, Code, Switch } from "@chakra-ui/react";
import { useAuth } from "lib/auth";
import { updateFeedback } from "lib/db";
import { mutate } from "swr";
import { FeedbackData } from "utils/types";
import DeleteFeedbackButton from "./DeleteFeedbackButton";
import { Td } from "./Table";

export default function FeedbackRow({
  id,
  author,
  text,
  status,
  route,
}: FeedbackData) {
  const auth = useAuth();
  const isChecked = status === "active";

  const toggleFeedback = async () => {
    await updateFeedback(id, { status: isChecked ? "pending" : "active" });
    mutate(["/api/feedback", auth.user.token]);
  };

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
          {route || "/"}
        </Code>
      </Td>
      <Td>
        <Switch
          colorScheme="green"
          onChange={toggleFeedback}
          isChecked={isChecked}
        />
      </Td>
      <Td>
        <DeleteFeedbackButton feedbackId={id} />
      </Td>
    </Box>
  );
}
