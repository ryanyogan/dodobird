import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Heading,
} from "@chakra-ui/react";
import Link from "next/link";

export default function FeedbackTableHeader() {
  return (
    <Box mr={4}>
      <Breadcrumb>
        <BreadcrumbItem>
          <Link href="/feedback" passHref>
            <BreadcrumbLink>Feedback</BreadcrumbLink>
          </Link>
        </BreadcrumbItem>
      </Breadcrumb>
      <Flex justifyContent="space-between">
        <Heading mb={8}>My Sites</Heading>
      </Flex>
    </Box>
  );
}
