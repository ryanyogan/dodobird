import { Flex, Link } from "@chakra-ui/react";

export default function FeedbackLink({ paths }: { paths: string[] }) {
  return (
    <Flex
      align={["flex-start", "center"]}
      justifyContent="space-between"
      mb={8}
      width="full"
      mt={1}
      direction={["column", "row"]}
    >
      <Link
        fontWeight="bold"
        fontSize="sm"
        color="gray.900"
        href={`/sites/${paths.join("/")}`}
        target="_blank"
      >
        Leave a comment →
      </Link>
      <Link fontSize="xs" color="gray.500" href="/" target="_blank">
        Powered by Dodo Bird (Alpha)
      </Link>
    </Flex>
  );
}
