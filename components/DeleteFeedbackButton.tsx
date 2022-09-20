import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";
import { useRef, useState } from "react";

import { AiFillDelete } from "react-icons/ai";

export default function DeleteFeedbackButton({
  feedbackId,
}: {
  feedbackId: string;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const cancelRef = useRef();

  const onClose = () => setIsOpen(false);

  const onDelete = () => {
    onClose();
  };

  return (
    <>
      <Button aria-label="Delete feedback" variant="ghost">
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
