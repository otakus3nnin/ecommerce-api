import { Router } from "express";

import { getDbClient } from "@/core/db/index.js";
import store from "@/core/store.js";

import authModule from "./auth/auth.module.js";
import userModule from "./users/user.module.js";

const apiRouter: Router = Router();
apiRouter.use(async (_req, _res, next) => {
  const db = await getDbClient();
  const initStore = {
    db,
  };
  store.run(initStore, () => {
    try {
      next();
    } finally {
      //@ts-expect-error sha no mutate am
      store.getStore().db.release();
    }
  });
}); // setup context
apiRouter.use("/auth", authModule.router);
apiRouter.use("/users", userModule.router);
export default apiRouter;
