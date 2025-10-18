import { AsyncLocalStorage } from "async_hooks";
import { PoolClient } from "pg";

interface IStore {
  db: PoolClient;
}
const store = new AsyncLocalStorage<IStore>();
export default store;
