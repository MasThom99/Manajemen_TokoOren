// import passport from "passport";
// import GoogleStrategy from "passport-google-oauth20";
// import { AppDataSource } from "../config/database.js";
// import { UserEntity } from "../Entity/users.entity.js";
// import jwt from "jsonwebtoken";

// const {
//   JWT_SECRET,
//   GOOGLE_CLIENT_ID,
//   GOOGLE_CLIENT_SECRET,
//   GOOGLE_CALLBACK_URL,
// } = process.env;
// passport.use(
//   new GoogleStrategy(
//     {
//       clientId: GOOGLE_CLIENT_ID,
//       clientSecret: GOOGLE_CLIENT_SECRET,
//       callbackURL: GOOGLE_CALLBACK_URL,
//     },
//     async (acessToken, refreshToken, ProfilingLevel, done) => {
//       try {
//         const userRepository = AppDataSource.getRepository(UserEntity);
//         let dataUser = await userRepository.findOne({
//           where: { username: Profile.emails[0].value },
//         });
//         if (!dataUser) {
//           dataUser = userRepository.create({
//             username: profile.emails[0].value,
//             isVerified: true,
//             roleId: "",
//             profile_photo: profile.photos[0].value,
//             created_at: true,
//           });
//           await userRepository.save(dataUser);
//         }
//         const token = jwt.sign(
//           {
//             id: dataUser.id,
//             username: dataUser.username,
//           },
//           JWT_SECRET
//         );
//       } catch (error) {
//         console.log(error);
//         done(error, null);
//       }
//     }
//   )
// );
// passport.serializeUser((user, done) => {
//   done(null, user);
// });
// passport.deserializeUser((user, done) => {
//   done(null, user);
// });
// export default passport;
