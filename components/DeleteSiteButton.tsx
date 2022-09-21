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
import { deleteSite } from "lib/db";
import { useRef, useState } from "react";

import { AiFillDelete } from "react-icons/ai";
import { mutate } from "swr";
import { Site } from "utils/types";

export default function DeleteSiteButton({ siteId }: { siteId: string }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const cancelRef = useRef();
  const toast = useToast();
  const auth = useAuth();

  const onClose = () => setIsOpen(false);

  const onDelete = () => {
    deleteSite(siteId);
    mutate(
      ["/api/sites", auth.user.token],
      async (data: any) => {
        return {
          sites: data.sites.filter((site: Site) => site.id !== siteId),
        };
      },
      false
    );
    onClose();

    toast({
      title: "Success!",
      description: "Site Deleted",
      status: "success",
      duration: 5_000,
      isClosable: true,
    });
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        aria-label="Delete site"
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
            Delete Site
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
