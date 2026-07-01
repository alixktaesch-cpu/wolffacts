const GITHUB_USER = "=alixktaesch-cpu";
const REPO = "wolffacts";
const BRANCH = "main";

const FACT_FILES = {
  general: `https://raw.githubusercontent.com/alixktaesch-cpu/wolffacts/facts/WolfFacts-general.json`,
  species: `https://raw.githubusercontent.com/alixktaesch-cpu/wolffacts/facts/WolfFacts-species.json`,
  famous: `https://raw.githubusercontent.com/alixktaesch-cpu/wolffacts/facts/WolfFacts-famous_wolves.json`,
  anatomy: `https://raw.githubusercontent.com/alixktaesch-cpu/wolffacts/facts/WolfFacts-anatomy.json`,
  history: `https://raw.githubusercontent.com/alixktaesch-cpu/wolffacts/facts/WolfFacts-history_mythology.json`,
  conservation: `https://raw.githubusercontent.com/alixktaesch-cpu/wolffacts/facts/WolfFacts-conservation.json`,
  funny: `https://raw.githubusercontent.com/alixktaesch-cpu/wolffacts/facts/WolfFacts-funny_twitch.json`,
  legendary: `https://raw.githubusercontent.com/alixktaesch-cpu/wolffacts/facts/WolfFacts-legendary.json`
};

const RANDOM_POOL = ["general", "general", "general", "species", "species", "anatomy", "conservation", "history", "famous", "funny"];
const RARITY_POOL = [
  "general","general","general","general","general","general",
  "species","species","conservation","anatomy",
  "history","famous",
  "legendary"
];

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

async function loadFacts(category) {
  const response = await fetch(FACT_FILES[category], { cf: { cacheTtl: 60, cacheEverything: true } });
  if (!response.ok) throw new Error(`Could not load ${category}`);
  return await response.json();
}

function formatFact(item, mode) {
  if (!item) return "🐺 No wolf fact found.";
  if (mode === "plain") return item.fact;
  return `[${item.rarity.toUpperCase()}] ${item.fact}`;
}

export default {
  async fetch(request) {
    try {
      const url = new URL(request.url);
      let path = url.pathname.replace("/", "").toLowerCase() || "random";
      const mode = url.searchParams.get("mode") || "tagged";

      let category;
      if (path === "random") category = pick(RANDOM_POOL);
      else if (path === "rarity") category = pick(RARITY_POOL);
      else if (path === "wolves") category = pick(Object.keys(FACT_FILES));
      else if (FACT_FILES[path]) category = path;
      else return new Response("🐺 Unknown wolf fact category. Try /random, /rarity, /general, /species, /famous, /anatomy, /history, /conservation, /funny, or /legendary.", {
        status: 404,
        headers: { "content-type": "text/plain;charset=UTF-8" }
      });

      const facts = await loadFacts(category);
      const item = pick(facts);
      return new Response(formatFact(item, mode), {
        headers: {
          "content-type": "text/plain;charset=UTF-8",
          "cache-control": "no-store",
          "access-control-allow-origin": "*"
        }
      });
    } catch (err) {
      return new Response(`🐺 Wolf fact error: ${err.message}`, {
        status: 500,
        headers: { "content-type": "text/plain;charset=UTF-8" }
      });
    }
  }
};
