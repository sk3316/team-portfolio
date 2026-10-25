// app/page.tsx
import { getLivePortfolioData } from "@/lib/sheets/fetchGoogleSheet";
import ClientPortfolioView from "@/components/ClientPortfolioView";

// Auto-revalidate cache every 60 seconds so changes to Google Sheets reflect automatically
export const revalidate = 60;

export default async function Page() {
  const syncResult = await getLivePortfolioData();

  return (
    <ClientPortfolioView
      initialData={syncResult.data}
      initialSyncResult={syncResult}
    />
  );
}
