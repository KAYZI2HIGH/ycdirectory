import { client } from "@/sanity/lib/client";
import { STARTUP_VIEWS_QUERY } from "@/sanity/lib/queries";
import { writeClient } from "@/sanity/lib/write-client";
import Plurality from "@/utils/Plurality";
import React from "react";

const Views = async ({ id }) => {
  console.log(id);

  const { views: totalViews } = await client
    .withConfig({ useCdn: false })
    .fetch(STARTUP_VIEWS_QUERY, { id });

  writeClient
    .patch(id)
    .set({ views: totalViews + 1 })
    .commit();

  return (
    <div className="fixed bottom-20 right-10 px-4 py-2 bg-pink-100 rounded font-medium capitalize">
      <Plurality
        value={totalViews}
        word={"view"}
      />
      <div className="absolute top-0 -right-[1px] size-3 rounded-full bg-pink-600 animate-ping"></div>
      <div className="bg-pink-800 size-3 animate-none absolute top-0 -right-[1px] rounded-full"></div>
    </div>
  );
};

export default Views;
