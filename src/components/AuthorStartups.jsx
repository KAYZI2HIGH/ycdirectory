import { client } from "@/sanity/lib/client";
import { STARTUP_BY_AUTHOR_ID_QUERY } from "@/sanity/lib/queries";
import StartupCards from "./StartupCards";

const AuthorStartups = async ({id}) => {
  
  const posts = await client.fetch(STARTUP_BY_AUTHOR_ID_QUERY, {id})

  return (
    <section className="grid grid-cols-auto gap-6 mt-7 w-full h-96">
      {posts.map((post) => (
        <StartupCards post={post} key={post._id}/>
      ))}
    </section>
  );
}

export default AuthorStartups