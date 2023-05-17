export default async function getServerData() {
  const res = await fetch("https://raw.githubusercontent.com/balancer-labs/frontend-v2/master/src/data/voting-gauges.json");
  const jsonData = await res.json();

  const networkName = jsonData.map((e) => {
    const symbols = e.pool.tokens.map((f) => {
      return f.symbol;
    });
    e.pool.tokens = symbols;

    if (e.network === 1) {
      e.network = "Mainnet";
    } else if (e.network === 137) {
      e.network = "Polygon";
    } else if (e.network === 42161) {
      e.network = "Arbitrum";
    } else if (e.network === 10) {
      e.network = "Optimism";
    } else if (e.network === 5) {
      e.network = "Goerli";
    } else if (e.network === 100) {
      e.network = "Gnosis";
    }
    return e;
  });

  const poolIds = new Map();
  const noDupes = networkName.filter((e) => {
    if (e.isKilled === false) {
      const id = e.pool.id;
      poolIds.set(id, (poolIds.get(id) || 0) + 1);
      return true;
    }
    return false;
  });

  const maxTimestamp = new Map();
  noDupes.forEach((e) => {
    const id = e.pool.id;
    if (poolIds.get(id) > 1) {
      if (!maxTimestamp.has(id) || e.addedTimestamp > maxTimestamp.get(id)) {
        maxTimestamp.set(id, e.addedTimestamp);
      }
    }
  });

  const result = noDupes.map((e) => {
    const id = e.pool.id;
    if (poolIds.get(id) > 1 && e.addedTimestamp === maxTimestamp.get(id)) {
      e.newTag = "NEW";
    } else {
      e.newTag = "";
    }
    return e;
  });

  return result;
}
