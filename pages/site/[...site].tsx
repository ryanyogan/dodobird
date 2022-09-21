import { Box, Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import DashboardShell from "components/DashboardShell";
import Feedback from "components/Feedback";
import SiteHeader from "components/SiteHeader";
import { useAuth } from "lib/auth";
import { createFeedback } from "lib/db";
import { useRouter } from "next/router";
import { useRef } from "react";
import useSWR, { mutate } from "swr";
import fetcher from "utils/fetcher";
import { FeedbackData } from "utils/types";

export default function FeedbackPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const inputElement = useRef<HTMLInputElement | null>(null);
  const siteAndRoute = router.query?.site;
  const siteId = siteAndRoute ? siteAndRoute[0] : null;
  const route = siteAndRoute ? siteAndRoute[1] : null;
  const feedbackApi = route
    ? `/api/feedback/${siteId}/${route}`
    : `/api/feedback/${siteId}`;

  const { data: siteData } = useSWR(`/api/site/${siteId}`, fetcher);
  const { data: feedbackData } = useSWR(feedbackApi, fetcher);

  const site = siteData?.site;
  const allFeedback = feedbackData?.feedback;

  const onSubmit = (e: any) => {
    e.preventDefault();

    const newFeedback: FeedbackData = {
      siteId,
      route: route || "/",
      author: user.name,
      authorId: user.uid,
      text: inputElement.current.value,
      createdAt: new Date().toISOString(),
      provider: user.provider,
      status: "pending",
    };

    inputElement.current.value = "";
    createFeedback(newFeedback);
    mutate(
      feedbackApi,
      async (data: any) => ({
        feedback: [newFeedback, ...data.feedback],
      }),
      false
    );
  };

  return (
    <DashboardShell>
      <SiteHeader site={site} siteId={siteId} route={route} />
      <Box
        display="flex"
        flexDir="column"
        width="full"
        maxWidth="700px"
        margin="0 auto"
      >
        {user && (
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
    </DashboardShell>
  );
}
