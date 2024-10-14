import passport from "passport";
import jwt from "passport-jwt";

const JWTStrategy = jwt.Strategy;
const ExtractJwt = jwt.ExtractJwt;

const initializePassport = () => {
  passport.use("current", new JWTStrategy({
        jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
        secretOrKey: process.env.JWT_SECRET,
      },
      async (jwt_payload, done) => {
        try {
          console.log("Payload JWT:", jwt_payload);
          return done(null, jwt_payload);
        } catch (error) {
          return done(error, false);
        }
      }));
};

const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    console.log("Cookies recibidas:", req.cookies);
    token = req.cookies["coderCookieToken"];
    console.log("Token extraído:", token);
  }
  return token;
};

export default initializePassport;