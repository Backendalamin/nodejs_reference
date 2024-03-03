import { Router } from "express";
import {
  query,
  matchedData,
  validationResult,
  body,
  checkSchema,
} from "express-validator";
import { createValidationSchema } from "../utils/validationSchema.mjs";
import passport from "passport";
// import "../strategies/localStrategy.mjs";


const router = Router();

// Authentication route with Passport local strategy
router.post("/api/auth", passport.authenticate("local", { failureMessage: true }), (req, res) => {
  // This is invoked if authentication succeeds
  const {
    body: { username },
  } = req;
  res.status(200).send({ msg: `Authenticated, welcome😍👌 ${username}` });
});

// Route to check authentication status
router.get("/api/auth/status", (req, res) => {
  console.log(req.session);
  const user = req.user;
  return user ? res.send(user) : res.sendStatus(401);
});

// Logout route
router.post("/api/auth/logout", (req, res) => {
  if (!req.user) return res.sendStatus(401);
  
  req.logout((err) => {
    if (err) {
      console.error("Error logging out:", err);
      return res.sendStatus(500); // Internal Server Error
    }
    res.sendStatus(200); // Logout successful
  });
});


  export default router;
