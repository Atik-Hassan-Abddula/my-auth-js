import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const client = new MongoClient(process.env.NEXT_PUBLIC_BETTER_AUTH_URL);
const db = client.db("atikhasan");

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.BETTER_AUTH_GOOGLE_CILENT_ID,
      clientSecret: process.env.BETTER_AUTH_GOOGLE_CILENT_SCERET,
    },
  },
  database: mongodbAdapter(db, {
    client,
  }),
});
