import { Router } from "express";
import {
  query,
  matchedData,
  validationResult,
  body,
  checkSchema,
} from "express-validator";
import { userData } from "../utils/constants.mjs";
// import userData from "../utils/constants.mjs" .exported using default
import {createUserValidationSchema} from '../utils/validationSchemas.mjs'


const router = Router();

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

//router has same exact argument like app.get(routPath)
router.get(
  "/api/users",
  [
    query("filter")
      .isString()
      .withMessage("must be a string") //by deafult the params are strings
      .notEmpty()
      .withMessage("must not be empty")
      .isLength({ min: 2, max: 10 })
      .withMessage("must be at between 2 and 10 characters")
      .escape(),
    query("value").isString().notEmpty().escape(),
  ],
  (req, res) => {
    const {
      query: { filter, value },
    } = req;

    if (filter && value) {
      return res.send(userData.filter((user) => user[filter].includes(value)));
    }
    return res.send(userData);
  }
);

//get user by id
router.get("/api/users/:id", resolveUserByIndex, (req, res) => {
  const { findUserIndex } = req;
  const findUser = userData[findUserIndex];
  if (!findUser) return res.sendStatus(404);
  res.send(findUser);
});

//put
router.put("/api/users/:id", resolveUserByIndex, (req, res) => {
  const { body, findUserIndex } = req;
  userData[findUserIndex] = { id: userData[findUserIndex].id, ...body };
  return res.sendStatus(200);
});

//patch
router.patch("/api/users/:id", resolveUserByIndex, (req, res) => {
  const { body, findUserIndex } = req;
  userData[findUserIndex] = { ...userData[findUserIndex], ...body };
  return res.sendStatus(200);
});

//delete
router.delete(
    "/api/users/:id", resolveUserByIndex, (req, res) => {
        const { body, findUserIndex } = req;
        userData.splice(findUserIndex, 1);
        return res.sendStatus(200);
      }
)

router.post(
    "/api/users", 
  checkSchema(createUserValidationSchema)
  ,
  (req, res) => {
    const errors = validationResult(req);

    // Check for validation errors
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const data  = matchedData(req) 
 
    const newUser = {
      id: userData.length > 0 ? userData[userData.length - 1].id + 1 : 1, ...data
    };


    userData.push(newUser);
    return res.status(201).send(newUser);
  }
)

export default router;
