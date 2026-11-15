import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { getAnalytics } from "@/actions/get-analytics";
import { DataCard } from "./_components/data-card";
import { Chart } from "./_components/chart";

const AnalyticsPage = async () => {
  const { userId } = await auth();

  if (!userId) {
    return redirect("/");
  }

  const { data, totalEnrollments, totalCompleted, completionRate } =
    await getAnalytics(userId);

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <DataCard label="Total enrollments" value={totalEnrollments} />
        <DataCard label="Students who completed" value={totalCompleted} />
        <DataCard label="Completion rate" value={completionRate} suffix="%" />
      </div>
      <Chart data={data} />
    </div>
  );
};

export default AnalyticsPage;