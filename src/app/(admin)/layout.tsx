import Sidebar from "./_components/sidebar";
import Topbar from "./_components/top-bar";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const cu = await auth();

  // if (!cu?.user) redirect("/sign-in");

  return (
    <div className="flex min-h-screen flex-col">
      <Sidebar />
      {/* Main Content */}
      <div className="ml-64 flex flex-1 flex-col">
        {/* Top Bar */}
        <Topbar name={"" as string} />

        {children}

        {/* Footer */}
        {/* <DashboardFooter /> */}
      </div>
    </div>
  );
}
