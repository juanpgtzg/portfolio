import PortfolioPageShell from "@/components/layout/PortfolioPageShell";

export default function PortfolioLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <PortfolioPageShell>
      {children}
    </PortfolioPageShell>
  );
}