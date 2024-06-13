// import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import CredentialsProvider from "next-auth/providers/credentials";
// import GitHub from "next-auth/providers/github";

// export const { handlers, signIn, signOut, auth } = NextAuth({
//   providers: [
//     GitHub({
//       clientId: process.env.AUTH_GITHUB_ID,
//       clientSecret: process.env.AUTH_GITHUB_SECRET,
//     }),
//     // GoogleProvider({
//     //   clientId: process.env.GOOGLE_CLIENT_ID,
//     //   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     // }),
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" },
//       },
//     }),
//   ],
// });
