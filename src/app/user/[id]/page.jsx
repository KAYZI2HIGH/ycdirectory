import AuthorStartups from "@/components/AuthorStartups";
import { client } from "@/sanity/lib/client";
import { AUTHOR_BY_SANITY_ID_QUERY } from "@/sanity/lib/queries";
import Image from "next/image";
import { Suspense } from "react";

const page = async ({ params }) => {
  const { id } = await params;

  const author = await client.fetch(AUTHOR_BY_SANITY_ID_QUERY, { id });

  return (
    <section className="flex flex-col md:flex-row justify-center items-center gap-8 p-10">
      <section className="w-full max-w-[312px] mx-auto p-5 flex flex-col justify-center items-center bg-[#EE2B69] h-[400px] border-l-2 border-t-2 border-r-[5px] border-b-[5px] border-black relative rounded-2xl pt-10">
        <div className="absolute -top-5">
          <div className="relative flex justify-center items-center">
            <div className="absolute z-10 top-0 py-2 px-[29px] rounded-lg border-2 border-black section_title font-bold tracking-wide bg-black -rotate-6">
              {author.name}
            </div>
            <div className="relative z-40 bg-white py-2 px-[28px] rounded-lg border-[5px]  border-black section_title font-bold tracking-wide ">
              {author.name}
            </div>
          </div>
        </div>
        <div className="p-2 bg-white rounded-full">
          <div className="size-[246px] rounded-full relative overflow-hidden">
            <Image
              src={author.image}
              alt="profile image"
              fill
            />
          </div>
        </div>
        <h1 className="body_text font-bold tracking-wide text-white mt-5">{author.username}</h1>
        <p className="body_text text-white">{author?.bio}</p>
      </section>
      <Suspense fallback={<p className="section_title font-semibold tracking-wide">Loading...</p>}>
      <AuthorStartups id={id}/>
      </Suspense>
    </section>
  );
};

export default page;
