import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import { pool } from "@/lib/pg";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      const { rows } = await pool.query(
        `SELECT * FROM "user" WHERE email = $1`,
        [user.email]
      )

      // Check if user exists
      if (rows.length === 0) {

        // Create user
        await pool.query(
          `INSERT INTO "user" (email, name) VALUES ($1, $2)`,
          [user.email, profile.name]
        )

        // Make user as normal user
        await pool.query(
          `INSERT INTO user_role (user_id, role_id) VALUES ((SELECT id FROM "user" WHERE email = $1), (SELECT id FROM role WHERE name = 'ROLE_USER'))`,
          [user.email]
        )
      }

      return true;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl
    },
    async session({ session, user, token }) {

      // Get user roles
      const { rows } = await pool.query(
        `SELECT role.name FROM "user" INNER JOIN user_role ON "user".id = user_role.user_id INNER JOIN role ON user_role.role_id = role.id WHERE "user".email = $1`,
        [session.user.email]
      )

      // Add roles to session
      session.role = rows[0].name

      console.log(session)
      return session
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      return token
    }
  },
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
