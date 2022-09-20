import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useAuth } from "lib/auth";
import { createSite } from "lib/db";
import React from "react";
import { useForm } from "react-hook-form";
import { mutate } from "swr";
import { Site, Sites } from "utils/types";

export default function AddSiteModal({
  children,
}: {
  children: React.ReactNode;
}) {
  const toast = useToast();
  const auth = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onCreateSite = async ({ name, url }) => {
    const newSite: Site = {
      authorId: auth.user.uid,
      createdAt: new Date().toISOString(),
      name,
      url,
    };

    const { id } = await createSite(newSite);

    toast({
      title: "Success!",
      description: "We have added your site.",
      status: "success",
      duration: 5_000,
      isClosable: true,
    });

    // Update SWR cache to add new site (OptimisticUI)
    mutate(
      ["/api/sites", auth.user.token],
      async (data: Sites) => ({
        sites: [{ id, ...newSite }, ...data.sites],
      }),
      false
    );

    onClose();
  };

  return (
    <>
      <Button
        onClick={onOpen}
        backgroundColor="gray.900"
        color="white"
        fontWeight="medium"
        _hover={{ bg: "gray.700" }}
        _active={{
          bg: "gray.800",
          transform: "scale(0.95)",
        }}
      >
        {children}
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(onCreateSite)}>
          <ModalHeader fontWeight="bold">Add Site</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl isInvalid={Boolean(errors.name)}>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                placeholder="My site"
                {...register("name", {
                  required: true,
                })}
              />
              {errors.name ? (
                <FormErrorMessage>This field is required.</FormErrorMessage>
              ) : (
                <FormHelperText>Please enter a name</FormHelperText>
              )}
            </FormControl>
            <FormControl mt={4} isInvalid={Boolean(errors.name)}>
              <FormLabel>Link</FormLabel>
              <Input
                placeholder="https://example.com"
                {...register("url", {
                  required: true,
                })}
              />
              {errors.url ? (
                <FormErrorMessage>This field is required.</FormErrorMessage>
              ) : (
                <FormHelperText>Please enter a url</FormHelperText>
              )}
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose} mr={3} fontWeight="medium">
              Cancel
            </Button>
            <Button
              id="create-site-button"
              backgroundColor="#99FFFE"
              color="#194D4C"
              fontWeight="medium"
              type="submit"
            >
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
