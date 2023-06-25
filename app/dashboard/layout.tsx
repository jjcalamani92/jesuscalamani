
import { HeaderDashboard } from "@/src/ui/HeaderDashboard";

export default async function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  // const site = await getSiteById('site')
  // console.log('site', site)
  return (
    <section>
      {/* Include shared UI here e.g. a header or sidebar */}
      <HeaderDashboard />
     
            {children}
    </section>
  );
}