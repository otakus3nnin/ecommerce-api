import { userToPublicDTO } from "./dtos/user.dtos.js";
import router from "./user.router.js";
import * as userService from "./user.service.js";

export default {
  service: {
    ...userService,
    userToPublicDTO,
  },
  router,
};
