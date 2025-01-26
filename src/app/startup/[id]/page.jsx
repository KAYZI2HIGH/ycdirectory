import { client } from "@/sanity/lib/client";
import { STARTUP_BY_ID_QUERY } from "@/sanity/lib/queries";
import DateFormater from "@/utils/DateFormater";
import Image from "next/image";
import MarkdownIt from "markdown-it";
import Link from "next/link";
import Views from "@/components/Views";

const md = new MarkdownIt();
const StartupDetailsPage = async ({ params }) => {
  const { id } = await params;
  const post = await client.fetch(STARTUP_BY_ID_QUERY, { id });

  const parsedPith = md.render(post?.pitch || "");

  return (
    <section className="relative">
      <div className="background p-10 flex flex-col justify-center items-center gap-4">
        <div className="tag">
          <DateFormater createdDate={post._createdAt} />
        </div>
        <h1 className="w-full overflow-hidden heading_text uppercase">
          {post.title}
        </h1>
        <p className="description text-white">{post.description}</p>
      </div>
      <div className="mt-10 relative max-w-[1000px] mx-auto h-[400px] md:rounded-lg overflow-hidden">
        <Image
          src={post.image}
          alt="startup image"
          fill
        />
      </div>
      <div className="p-5 flex flex-col gap-5 max-w-[800px] mx-auto mt-10">
        <div className="w-full flex justify-between items-center pb-4">
          <div className="flex justify-center items-center gap-3 text-black">
            <Link
              href={`user/${post.author.id}`}
              className="size-[50px] relative overflow-hidden rounded-full"
            >
              <Image
                src={post.author.image}
                alt="author-profile"
                fill
              />
            </Link>
            <div className="flex flex-col">
              <Link
                href={`user/${post.author.id}`}
                className="body_title font-bold tracking-wide"
              >
                {post.author.name}
              </Link>
              <Link
                href={`user/${post.author.id}`}
                className="tracking-wide font-extralight normal_text"
              >
                @{post.author?.username}
              </Link>
            </div>
          </div>
          <p className="py-2 px-4 bg-pink-100 rounded-full font-semibold">
            {post.category}
          </p>
        </div>
        <h1 className="header font-bold">Pitch Details:</h1>
        <article
          className="prose prose-headings:text-2xl prose-headings:font-bold md:prose-lg"
          dangerouslySetInnerHTML={{ __html: parsedPith }}
        />
      </div>
      <Views id={post._id} />
    </section>
  );
};

export default StartupDetailsPage;
