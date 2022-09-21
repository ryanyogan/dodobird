import { Box, Button, FormControl, Textarea } from "@chakra-ui/react";
import DashboardShell from "components/DashboardShell";
import Feedback from "components/Feedback";
import LoginButtons from "components/LoginButtons";
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
  const inputElement = useRef<HTMLTextAreaElement | null>(null);
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

  const LoginOrLeaveFeedback = () =>
    user ? (
      <Button
        type="submit"
        isDisabled={!siteData || !feedbackData}
        backgroundColor="gray.900"
        color="white"
        fontWeight="medium"
        mt={4}
        _hover={{ bg: "gray.700" }}
        _active={{
          bg: "gray.800",
          transform: "scale(0.95)",
        }}
      >
        Leave Feedback
      </Button>
    ) : (
      <LoginButtons />
    );

  return (
    <DashboardShell>
      <SiteHeader
        isSiteOwner={site?.authorId === user?.uid}
        site={site}
        siteId={siteId}
        route={route}
      />
      <Box display="flex" flexDir="column" width="full" maxWidth="700px" mx={4}>
        <Box as="form" onSubmit={onSubmit}>
          <FormControl my={8}>
            <Textarea
              ref={inputElement}
              id="comment"
              placeholder="Leave a comment"
              backgroundColor="white"
              isDisabled={!user}
              h="100px"
            />
            {!loading && <LoginOrLeaveFeedback />}
          </FormControl>
        </Box>

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
