import SearchForm from "@/components/SearchForm";
import { auth } from "../../auth";
import StartupCards from "@/components/StartupCards";
import { client } from "@/sanity/lib/client";
import { STARTUP_QUERIES } from "@/sanity/lib/queries";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";

export default async function HomePage({ searchParams }) {
  const { query } = await searchParams;
  const params = {search: query || null}
  const session = await auth();

  const {data: posts} = await sanityFetch({query: STARTUP_QUERIES, params})

  return (
    <>
      <section className="background flex flex-col items-center gap-4 sm:gap-6 py-20 px-10 text-white">
        <div className="tag">
          PITCH, VOTE, AND GROW
        </div>

        <h1 className="heading_text uppercase">
          pitch your startups, <br /> connect with entreprenuers
        </h1>
        <p className="description">
          Submit Ideas, Vote on Pitches, and Get Noticed in Virtual Competitions
        </p>

        <SearchForm query={query} />
      </section>
      <section className="px-10 py-20 h-screen">
        <h1 className="section_title font-bold tracking-wide">
          {query ? `Search Results for: "${query}"` : "Recommended startups"}
        </h1>
        <div className="grid grid-cols-auto gap-6 mt-7 pb-10">
          {posts.map((post, index) => (
            <StartupCards
              post={post}
              key={post._id}
            />
          ))}
        </div>
      </section>
      <SanityLive />
    </>
  );
}
