import DashboardShell from "components/DashboardShell";
import EmptyState from "components/EmptyState";
import FeedbackTable from "components/FeedbackTable";
import FeedbackTableHeader from "components/FeedbackTableHeader";
import FeedbackTableSkeleton from "components/FeedbackTableSkeleton";
import { useAuth } from "lib/auth";
import useSWR from "swr";
import fetcher from "utils/fetcher";
import { FeedbackData } from "utils/types";

export default function FeedbackRoute() {
  const { user } = useAuth();
  const { data } = useSWR<{ feedback: FeedbackData[] }>(
    user?.token ? ["/api/feedback", user?.token] : null,
    fetcher
  );

  if (!data) {
    return (
      <DashboardShell>
        <FeedbackTableHeader />
        <FeedbackTableSkeleton />
      </DashboardShell>
    );
  }

  return (
    <DashboardShell>
      <FeedbackTableHeader />
      {data.feedback?.length ? (
        <FeedbackTable feedback={data?.feedback} />
      ) : (
        <EmptyState />
      )}
    </DashboardShell>
  );
}
