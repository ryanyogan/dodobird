import { Box, Link } from "@chakra-ui/react";
import { format, parseISO } from "date-fns";
import NextLink from "next/link";
import { Site } from "utils/types";
import { Table, Td, Th, Tr } from "./Table";

export default function SiteTable({ sites }: { sites: Site[] }) {
  return (
    <Box overflowX="scroll">
      <Table w="full">
        <thead>
          <Tr>
            <Th>Name</Th>
            <Th>Site Link</Th>
            <Th>Feedback Link</Th>
            <Th>Date Added</Th>
            <Th width="50px">{""}</Th>
          </Tr>
        </thead>
        <tbody>
          {sites.map((site) => (
            <Box as="tr" key={site.id}>
              <Td fontWeight="medium">{site.name}</Td>
              <Td>
                <Link href={site.url}>{site.url}</Link>
              </Td>
              <Td>
                <NextLink
                  href="/site/[siteId]"
                  as={`/site/${site.id}`}
                  passHref
                >
                  <Link color="blue.500" fontWeight="medium">
                    View Feedback
                  </Link>
                </NextLink>
              </Td>
              <Td>{format(parseISO(site.createdAt), "MMM do, yyyy")}</Td>
              <Td>x</Td>
            </Box>
          ))}
        </tbody>
      </Table>
    </Box>
  );
}
