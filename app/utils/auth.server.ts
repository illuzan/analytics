import { Authenticator, AuthorizationError } from "remix-auth";
import { FormStrategy } from "remix-auth-form";
import { sessionStorage } from "./session.server";
import bcrypt from "bcryptjs";
import { db } from "./db.server";

type User = {
  id: string;
  username: string;
};

// Create an instance of the authenticator, pass a generic with what
// strategies will return and will store in the session
// export let authenticator = new Authenticator<User>(sessionStorage);
export let authenticator = new Authenticator<User>(sessionStorage);

authenticator.use(
  new FormStrategy(async ({ form, context }) => {
    let username = form.get("username") as string;
    let password = form.get("password") as string;
    let user = null;
    console.log(username, password);
    // do some validation, errors are in the sessionErrorKey
    if (!username || username?.length === 0)
      throw new AuthorizationError("Bad Credentials: Username is required");
    if (typeof username !== "string")
      throw new AuthorizationError("Bad Credentials: Email must be a string");

    if (!password || password?.length === 0)
      throw new AuthorizationError("Bad Credentials: Password is required");
    if (typeof password !== "string")
      throw new AuthorizationError(
        "Bad Credentials: Password must be a string"
      );

    const userExists = await db.admin.findFirst({
      where: { username },
      select: {
        id: true,
        username: true,
      },
    });

    if (userExists) {
      console.log(userExists);
      // return badRequest({
      //   fields,
      //   formError: `User with username ${username} already exists`,
      // });
    }
    // And finally, you can find, or create, the user
    // let user = await findOrCreateUser(username, hashedPassword);

    // And return the user as the Authenticator expects it
    return user;
  }),
  "username-pass"
);
