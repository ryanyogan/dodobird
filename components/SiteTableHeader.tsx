import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Heading,
} from "@chakra-ui/react";
import AddSiteModal from "./AddSiteModal";

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
        <AddSiteModal>+ Add Site</AddSiteModal>
      </Flex>
    </Box>
  );
}
