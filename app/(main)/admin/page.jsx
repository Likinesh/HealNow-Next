import { TabsContent } from "@/components/ui/tabs";
import { PendingDoctors } from "./components/pendingDoctors";
import { VerifiedDoctors } from "./components/verifiedDoctors";
import {
  getPendingPayouts,
  pendingVerifications,
  verifiedDoctors,
} from "@/actions/admin";
import { PendingPayouts } from "./components/pendingPayouts";

export default async function AdminPage() {
  const [pendingDoctorsData, verifiedDoctorsData, pendingPayoutsData] =
    await Promise.all([
      pendingVerifications(),
      verifiedDoctors(),
      getPendingPayouts(),
    ]);

  return (
    <>
      <TabsContent value="pending" className="border-none p-0">
        <PendingDoctors doctors={pendingDoctorsData.doctors || []} />
      </TabsContent>

      <TabsContent value="doctors" className="border-none p-0">
        <VerifiedDoctors doctors={verifiedDoctorsData.doctors || []} />
      </TabsContent>

      <TabsContent value="payouts" className="border-none p-0">
        <PendingPayouts payouts={pendingPayoutsData.payouts || []} />
      </TabsContent>
    </>
  );
}