import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Heading,
} from "@chakra-ui/react";

export default function SiteTableHeader() {
  return (
    <Box mr={4}>
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink>Sites</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Flex justifyContent="space-between">
        <Heading mb={8}>My Sites</Heading>
      </Flex>
    </Box>
  );
}
// <Button
//   backgroundColor="gray.800"
//   color="white"
//   fontWeight="medium"
//   _hover={{ bg: "gray.700" }}
//   _active={{
//     bg: "gray.800",
//     transform: "scale(0.95)",
//   }}
// >
//   + Add Site
// </Button>
