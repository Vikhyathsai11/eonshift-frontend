"use client";

import { Metric, Card as TremorCard, Text as TremorText } from "@tremor/react";
import { collection, orderBy, query, type Query } from "firebase/firestore";
import { useFirestoreCollectionData, useUser } from "reactfire";

import { ModeToggle } from "~/shared/theme-toggle";

import { Button } from "~/lib/components/ui/button";
import { db } from "~/lib/firebase";

interface Facility {
  name: string;
  id: string;
}

const Facilities = () => {
  const { data: facilities, status } = useFirestoreCollectionData(
    query(
      collection(db, "facilities"),
      orderBy("created_at", "desc"),
    ) as Query<Facility>,
    {
      initialData: [],
    },
  );

  if (status === "loading") {
    return <div>Loading Facilities...</div>;
  }

  return (
    <div>
      <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
        <span className="text-[hsl(280,100%,70%)]">
          Number of Facilities: {facilities?.length}
        </span>
      </h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
        {facilities?.map((facility) => (
          <TremorCard key={facility.id}>
            <TremorText className={"pb-2"}>{facility.name}</TremorText>
            <Metric className={"font-bold"}>$ 1,000</Metric>
          </TremorCard>
        ))}
      </div>
    </div>
  );
};

export default function HomePage() {
  // const { status: facilitiesStatus, data: facilities = [] as Facility[] } =
  //   useFirestoreCollectionData(query(collection(db, "facilities")));

  // const { status, data } = useSigninCheck();

  // const [user, loading, error] = useAuthState(auth, {
  //   onUserChanged: (user: User | null): Promise<void> => {
  //     console.log(user);
  //     return Promise.resolve();
  //   },
  // });
  //

  const { data, status, error } = useUser();

  return (
    <main>
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          {status === "loading"
            ? "Loading..."
            : data
              ? `Welcome ${data.displayName}`
              : "Welcome Guest User!"}
          {/*<span className="text-[hsl(280,100%,70%)]">{facilities.length}</span>*/}
        </h1>
        <Facilities />
        <Button onClick={() => console.log("Sign out.")}>Sign out</Button>
        <ModeToggle />
      </div>
      {/*  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">*/}
      {/*    {facilities.map((facility) => (*/}
      {/*      <div*/}
      {/*        key={facility.id}*/}
      {/*        className={*/}
      {/*          "flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"*/}
      {/*        }*/}
      {/*      >*/}
      {/*        <h3 className="text-2xl font-bold">{facility.name} →</h3>*/}
      {/*        <div className="text-lg">*/}
      {/*          Just the basics - Everything you need to know to set up your*/}
      {/*          database and authentication.*/}
      {/*        </div>*/}
      {/*      </div>*/}
      {/*    ))}*/}
      {/*    /!*<Link*!/*/}
      {/*    /!*  className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"*!/*/}
      {/*    /!*  href="https://create.t3.gg/en/usage/first-steps"*!/*/}
      {/*    /!*  target="_blank"*!/*/}
      {/*    /!*>*!/*/}
      {/*    /!*  <h3 className="text-2xl font-bold">First Steps →</h3>*!/*/}
      {/*    /!*  <div className="text-lg">*!/*/}
      {/*    /!*    Just the basics - Everything you need to know to set up your*!/*/}
      {/*    /!*    database and authentication.*!/*/}
      {/*    /!*  </div>*!/*/}
      {/*    /!*</Link>*!/*/}
      {/*    /!*<Link*!/*/}
      {/*    /!*  className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"*!/*/}
      {/*    /!*  href="https://create.t3.gg/en/introduction"*!/*/}
      {/*    /!*  target="_blank"*!/*/}
      {/*    /!*>*!/*/}
      {/*    /!*  <h3 className="text-2xl font-bold">Documentation →</h3>*!/*/}
      {/*    /!*  <div className="text-lg">*!/*/}
      {/*    /!*    Learn more about Create T3 App, the libraries it uses, and how to*!/*/}
      {/*    /!*    deploy it.*!/*/}
      {/*    /!*  </div>*!/*/}
      {/*    /!*</Link>*!/*/}
      {/*  </div>*/}
      {/*</div>*/}
    </main>
  );
}
