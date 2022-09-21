import { Box, Text } from "@chakra-ui/react";
import Feedback from "components/Feedback";
import "iframe-resizer/js/iframeResizer.contentWindow";
import { getAllFeedback, getAllSites } from "lib/db-admin";

export async function getStaticProps(context) {
  const [siteId, route] = context.params.site;
  const { feedback } = await getAllFeedback(siteId, route);

  return {
    props: {
      feedback,
    },
    revalidate: 1, // 1 seconds
  };
}

export async function getStaticPaths() {
  const { sites } = await getAllSites();
  const paths = sites.map((site) => ({
    params: {
      site: [site.id.toString()],
    },
  }));

  return {
    paths,
    fallback: true,
  };
}

export default function EmbeddedFeedbackpage({ feedback }) {
  return (
    <Box display="flex" flexDir="column" width="full">
      {feedback?.length ? (
        feedback.map((f) => <Feedback key={f.id} {...f} />)
      ) : (
        <Text>There are no comments for this site.</Text>
      )}
    </Box>
  );
}
