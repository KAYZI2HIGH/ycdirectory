import { client } from "@/sanity/lib/client";
import { AUTHOR_BY_GOOGLE_ID_QUERY } from "@/sanity/lib/queries";
import { writeClient } from "@/sanity/lib/write-client";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  callbacks: {
    async signIn({ user, profile }) {
      const existingUser = await client.withConfig({useCdn: false}).fetch(AUTHOR_BY_GOOGLE_ID_QUERY, {
        id: user?.email,
      });

      if (!existingUser) {
        await writeClient.create({
          _type: "author",
          id: user?.email,
          name: user.name,
          username: user.email,
          email: user.email,
          image: user.image,
          bio: user.bio || "",
        });
      }
      return true;
    },
    async jwt({ token, account, user }) {
      if (account && user) {
        const users = await client.withConfig({ useCdn: false}).fetch(AUTHOR_BY_GOOGLE_ID_QUERY, {
          id: user?.email,
        });
        token.id = users?._id;
      }
      return token;
    },
    async session({session, token}) {
      Object.assign(session, { id: token.id });
      return session;
    },
  },
});
