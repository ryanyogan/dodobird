import DashboardShell from "components/DashboardShell";
import EmptyState from "components/EmptyState";
import SiteTable from "components/SiteTable";
import SiteTableHeader from "components/SiteTableHeader";
import SiteTableSkeleton from "components/SiteTableSkeleton";
import { useAuth } from "lib/auth";
import useSWR from "swr";
import fetcher from "utils/fetcher";
import { Sites } from "utils/types";

export default function SitesRoute() {
  const { user } = useAuth();
  const { data } = useSWR<Sites>(
    user?.token ? ["/api/sites", user?.token] : null,
    fetcher
  );

  const sites = data?.sites;

  if (!data) {
    return (
      <DashboardShell>
        <SiteTableHeader />
        <SiteTableSkeleton />
      </DashboardShell>
    );
  }

  return (
    <DashboardShell>
      <SiteTableHeader />
      {sites?.length ? <SiteTable sites={sites} /> : <EmptyState />}
    </DashboardShell>
  );
}
