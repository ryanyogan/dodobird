import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useAuth } from "lib/auth";
import { deleteFeedback } from "lib/db";
import { useRef, useState } from "react";

import { AiFillDelete } from "react-icons/ai";
import { mutate } from "swr";
import { FeedbackData } from "utils/types";

export default function DeleteFeedbackButton({
  feedbackId,
}: {
  feedbackId: string;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const cancelRef = useRef();
  const toast = useToast();
  const auth = useAuth();

  const onClose = () => setIsOpen(false);

  const onDelete = () => {
    deleteFeedback(feedbackId);
    mutate(
      ["/api/feedback", auth.user.token],
      async (data: any) => {
        return {
          feedback: data.feedback.filter(
            (feedback: FeedbackData) => feedback.id !== feedbackId
          ),
        };
      },
      false
    );
    onClose();

    toast({
      title: "Success!",
      description: "Post Deleted",
      status: "success",
      duration: 5_000,
      isClosable: true,
    });
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        aria-label="Delete feedback"
        variant="ghost"
      >
        <AiFillDelete />
      </Button>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Delete Feedback
          </AlertDialogHeader>
          <AlertDialogBody>
            Are you sure? You cannot undo this action.
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button fontWeight="bold" color="red" onClick={onDelete} ml={3}>
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
