import DashboardShell from "components/DashboardShell";
import SiteTableSkeleton from "components/SiteTableSkeleton";
import useSWR from "swr";
import fetcher from "utils/fetcher";
import { useAuth } from "../lib/auth";

export default function Home() {
  const auth = useAuth();
  const { data } = useSWR("/api/sites", fetcher);
  console.log(data);

  return (
    <DashboardShell>
      <SiteTableSkeleton />
      {auth.user ? (
        <div>
          <p>Email: {auth.user.email}</p>
          <button onClick={(e) => auth.signout()}>Sign Out</button>
        </div>
      ) : (
        <button onClick={(e) => auth.signinWithGoogle()}>
          Sign In With Google
        </button>
      )}
    </DashboardShell>
  );
}
