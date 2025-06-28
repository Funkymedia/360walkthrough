import ReferralCard from "@/components/dashboard/referral-card";

export default function ReferralsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Affiliate Referrals</h1>
        <p className="text-muted-foreground">
          Share your unique link and earn rewards for every new customer.
        </p>
      </div>
      <ReferralCard />
    </div>
  );
}
