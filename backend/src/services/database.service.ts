import { Pool, PoolConfig } from "pg"

const pgConfig : PoolConfig = {
  // all valid client config options are also valid here
  // in addition here are the pool specific configuration parameters:
 
  // number of milliseconds to wait before timing out when connecting a new client
  // by default this is 0 which means no timeout
  connectionTimeoutMillis: 0,
 
  // number of milliseconds a client must sit idle in the pool and not be checked out
  // before it is disconnected from the backend and discarded
  // default is 10000 (10 seconds) - set to 0 to disable auto-disconnection of idle clients
  idleTimeoutMillis: 10000,
 
  // maximum number of clients the pool should contain
  // by default this is set to 10.  There is some nuance to setting the maximum size of your pool.
  // see https://node-postgres.com/guides/pool-sizing for more information
  max: 10,
 
  // minimum number of clients the pool should hold on to and _not_ destroy with the idleTimeoutMillis
  // this can be useful if you get very bursty traffic and want to keep a few clients around.
  // note: current the pool will not automatically create and connect new clients up to the min, it will
  // only not evict and close clients except those which exceed the min count.
  // the default is 0 which disables this behavior.
  min: 0,
 
  // Default behavior is the pool will keep clients open & connected to the backend
  // until idleTimeoutMillis expire for each client and node will maintain a ref
  // to the socket on the client, keeping the event loop alive until all clients are closed
  // after being idle or the pool is manually shutdown with `pool.end()`.
  //
  // Setting `allowExitOnIdle: true` in the config will allow the node event loop to exit
  // as soon as all clients in the pool are idle, even if their socket is still open
  // to the postgres server.  This can be handy in scripts & tests
  // where you don't want to wait for your clients to go idle before your process exits.
  allowExitOnIdle: false,
 
  // Sets a max overall life for the connection.
  // A value of 60 would evict connections that have been around for over 60 seconds,
  // regardless of whether they are idle. It's useful to force rotation of connection pools through
  // middleware so that you can rotate the underlying servers. The default is disabled (value of zero)
  maxLifetimeSeconds: 0
}

export const myPool = new Pool(pgConfig);

export const query = async (text: string, params?: (string|number|string[]|number[])[]) => {
    // const start = Date.now()
    const res = await myPool.query(text, params)
    // const duration = Date.now() - start
    // console.log('executed query', { text, duration, rows: res.rowCount })
    return res
}