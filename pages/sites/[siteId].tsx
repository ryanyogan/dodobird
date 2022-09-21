import { Box, Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import Feedback from "components/Feedback";
import { useAuth } from "lib/auth";
import { createFeedback } from "lib/db";
import { getAllFeedback, getAllSites } from "lib/db-admin";
import { GetStaticPropsContext } from "next";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { FeedbackData } from "utils/types";

export async function getStaticProps(context: GetStaticPropsContext) {
  const siteId = context.params?.siteId as string;

  const { feedback } = await getAllFeedback(siteId);

  return {
    props: {
      initialFeedback: feedback,
    },
    revalidate: 1,
  };
}

export async function getStaticPaths() {
  const { sites } = await getAllSites();
  const paths = sites.map((site) => ({
    params: {
      siteId: site.id.toString(),
    },
  }));

  return {
    paths,
    fallback: true,
  };
}

export default function FeedbackPage({ initialFeedback }) {
  const auth = useAuth();
  const router = useRouter();
  const inputElement = useRef<HTMLInputElement | null>(null);
  const [allFeedback, setAllFeedback] = useState<FeedbackData[]>([]);

  useEffect(() => {
    setAllFeedback(initialFeedback);
  }, [initialFeedback]);

  const onSubmit = (e: any) => {
    e.preventDefault();

    const newFeedback: FeedbackData = {
      author: auth.user.name,
      authorId: auth.user.uid,
      siteId: router.query?.siteId as string,
      text: inputElement.current.value,
      createdAt: new Date().toISOString(),
      provider: auth.user.provider,
      status: "pending",
    };

    inputElement.current.value = "";
    setAllFeedback((currentFeedback) => [newFeedback, ...currentFeedback]);
    createFeedback(newFeedback);
  };

  return (
    <Box
      display="flex"
      flexDir="column"
      width="full"
      maxWidth="700px"
      margin="0 auto"
    >
      {auth.user && (
        <Box as="form" onSubmit={onSubmit}>
          <FormControl my={8}>
            <FormLabel htmlFor="comment">Feedback</FormLabel>
            <Input
              ref={inputElement}
              id="comment"
              placeholder="Leave a comment"
            />
            <Button mt={4} type="submit" fontWeight="medium">
              Add Feedback
            </Button>
          </FormControl>
        </Box>
      )}

      {allFeedback &&
        allFeedback.map((feedback) => (
          <Feedback
            key={feedback.id || new Date().getTime().toString()}
            {...feedback}
          />
        ))}
    </Box>
  );
}
