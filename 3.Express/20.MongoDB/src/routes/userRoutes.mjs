import { Router } from "express";
import {
  query,
  matchedData,
  validationResult,
  body,
  checkSchema,
} from "express-validator";
import { createValidationSchema } from "../utils/validationSchema.mjs";
import { userData } from "../utils/constants.mjs";

import { UserModel } from "../mongoose/schemas/user.mjs";

const router = Router();

//midleware

const resolveUserByIndex = (req, res, next) => {
  const {
    body,
    params: { id },
  } = req;
  const parsedId = parseInt(id);
  if (isNaN(parsedId)) return res.sendStatus(400);
  const findUserIndex = userData.findIndex((user) => {
    return user.id === parsedId;
  });
  if (findUserIndex === -1) return res.sendStatus(404);
  req.findUserIndex = findUserIndex;
  next();
};

const mySimpleMiddleWare = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
};

router.get("/", (req, res) => {
  res.send("Hello word");
});

//get user by id
router.get("/api/users/:id", mySimpleMiddleWare, (req, res) => {
  const parsedId = parseInt(req.params.id);

  if (isNaN(parsedId))
    return res.status(400).send({ message: "Bad request. Invalid id" });

  const findUser = userData.find((user) => user.id === parsedId);
  if (!findUser) return res.sendStatus(404);
  res.send(findUser);
});

//router with validations
router.get(
  "/api/users",
  [
    query("filter")
      .isString()
      .withMessage("must be a string")
      //very important
      .escape(),
    query("value").isString(),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      const { filter, value } = matchedData(req);
      if (filter && value) {
        return res.send(
          userData.filter((user) => user[filter].includes(value))
        );
      }
    }

    res.send(userData);
  }
);

//usiong a database instead of fakeDta json
router.post(
  "/api/users",
  checkSchema(createValidationSchema),
  async (req, res) => {
    // const { body } = req;

    //validationResult  - Extracts the validation errors of an express request
    const errors = validationResult(req);

    if (!errors.isEmpty()) 
      return res.status(400).json({ errors: errors.array() });
    

    //if validation success, proceed to create new user in db
    //matchedData - Extracts data validated or sanitized from the request, and builds an object with them.
    const data = matchedData(req);
    const newUser = new UserModel(data);
    console.log(data)
    try {
      const savedUserToDB = await newUser.save();
      return res.status(201).send(savedUserToDB);
    } catch (err) {
      console.log(err);
      return res.sendStatus(400);
    }
  }
);

router.put("/api/users/:id", resolveUserByIndex, (req, res) => {
  const { findUserIndex, body } = req;
  userData[findUserIndex] = { id: userData[findUserIndex].id, ...body };
  return res.sendStatus(200);
});

router.patch("/api/users/:id", resolveUserByIndex, (req, res) => {
  const { body, findUserIndex } = req;
  userData[findUserIndex] = { ...userData[findUserIndex], ...body };
  return res.sendStatus(200);
});

router.delete("/api/users/:id", resolveUserByIndex, (req, res) => {
  const { findUserIndex } = req;
  userData.splice(findUserIndex, 1);
  return res.sendStatus(200);
});


// export {router}
//import  {router} from "location"

export default router;
//import router from "location"
