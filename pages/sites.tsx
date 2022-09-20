import DashboardShell from "components/DashboardShell";
import EmptyState from "components/EmptyState";
import SiteTable from "components/SiteTable";
import SiteTableSkeleton from "components/SiteTableSkeleton";
import useSWR from "swr";
import fetcher from "utils/fetcher";

export default function Sites() {
  const { data } = useSWR("/api/sites", fetcher);
  const sites = data?.sites;

  if (!data) {
    return (
      <DashboardShell>
        <SiteTableSkeleton />
      </DashboardShell>
    );
  }

  return (
    <DashboardShell>
      {sites.length ? <SiteTable sites={sites} /> : <EmptyState />}
    </DashboardShell>
  );
}
