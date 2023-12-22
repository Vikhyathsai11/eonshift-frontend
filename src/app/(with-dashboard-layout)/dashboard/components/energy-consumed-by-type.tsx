import { useMemo } from "react";

import { Card, DonutChart, Legend, Title } from "@tremor/react";
import { doc, type DocumentReference } from "firebase/firestore";
import { startCase } from "lodash";
import moment from "moment";
import { useSelector } from "react-redux";
import { useFirestoreDocData } from "reactfire";

import { Skeleton } from "~/shared/shadcn/ui/skeleton";

import { db } from "~/lib/firebase";
import { type RootState } from "~/redux/store";
import { type GroupedEnergyByTypeDocument } from "~/types";

const valueFormatter = (number: number) =>
  `${Intl.NumberFormat("us").format(number).toString()} mWh`;

export default function EnergyConsumedByType() {
  const { id: facilityId } = useSelector((state: RootState) => state.facility);

  const group_energy_by_type_query = useMemo(() => {
    return doc(
      db,
      "facilities",
      facilityId,
      "insights",
      "group_energy_by_type",
    ) as DocumentReference<GroupedEnergyByTypeDocument>;
  }, [facilityId]);

  const { data: insightData, status } = useFirestoreDocData(
    group_energy_by_type_query,
    {
      initialData: null,
      suspense: true,
    },
  );

  if (status === "loading" || !insightData) {
    return <Skeleton className="max-w-md mx-auto h-400" />;
  }

  const processedData = Object.entries(insightData?.data).map(
    ([key, value]) => {
      return {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        name: startCase(key),
        energy_usage: value,
      };
    },
  );

  return (
    <Card className="max-w-md mx-auto">
      <div className={"flex flex-col gap-1"}>
        <Title>Energy Consumed By Type</Title>
        <p className={"text-muted-foreground text-xs"}>
          Last Updated: {moment(insightData?.last_updated?.toDate()).fromNow()}
        </p>
      </div>
      <Legend
        categories={processedData.map((data) => data.name)}
        className="mt-6"
      />
      <DonutChart
        data={processedData}
        category="energy_usage"
        index="name"
        valueFormatter={valueFormatter}
        className="mt-6"
      />
    </Card>
  );
}
