import { Box, Button, Flex, Text } from "@chakra-ui/react";
import Feedback from "components/Feedback";
import FeedbackLink from "components/FeedbackLink";
import Footer from "components/Footer";
import LoginButtons from "components/LoginButtons";
import Logo from "components/Logo";
import { getAllFeedback, getSite } from "lib/db-admin";
import { GetStaticPropsContext } from "next";
import { FeedbackData, Site } from "utils/types";
import { useAuth } from "../lib/auth";

const SITE_ID = process.env.NEXT_PUBLIC_HOME_PAGE_SITE_ID;

export async function getStaticProps(context: GetStaticPropsContext) {
  const { feedback } = await getAllFeedback(SITE_ID);
  const site = await getSite(SITE_ID);

  return {
    props: {
      allFeedback: feedback,
      site,
    },
    revalidate: 1,
  };
}

export default function Home({
  allFeedback,
  site,
}: {
  allFeedback: FeedbackData[];
  site: Site;
}) {
  const auth = useAuth();

  return (
    <>
      <Box bg="gray.100" py={16} px={4}>
        <Flex as="main" direction="column" maxW="700px" margin="0 auto">
          <Logo />
          <Text mb={4} fontSize="lg" py={4}>
            <Text as="span" fontWeight="bold" display="inline">
              Dodo Bird
            </Text>
            <br />
            Want to give the internet some of your ever so qualifed opinion? You
            can do it quickly and safely here. 🦆
          </Text>
          {auth.user ? (
            <Button
              as="a"
              href="/sites"
              backgroundColor="gray.900"
              color="white"
              fontWeight="medium"
              mt={4}
              maxW="200px"
              _hover={{ bg: "gray.700" }}
              _active={{
                bg: "gray.800",
                transform: "scale(0.95)",
              }}
            >
              View Dashboard
            </Button>
          ) : (
            <LoginButtons />
          )}
        </Flex>
      </Box>
      <Box
        display="flex"
        flexDir="column"
        maxW="700px"
        width="full"
        margin="0 auto"
        mt={8}
        px={4}
      >
        <FeedbackLink paths={[SITE_ID]} />
        {allFeedback.map((feedback) => (
          <Feedback key={feedback.id} {...feedback} />
        ))}
        <Footer />
      </Box>
    </>
  );
}
