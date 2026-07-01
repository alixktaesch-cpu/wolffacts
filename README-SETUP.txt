WolfFacts Twitch Pack Setup

WHAT IS INCLUDED
- facts/WolfFacts-general.json — 150 facts
- facts/WolfFacts-species.json — 100 facts
- facts/WolfFacts-famous_wolves.json — 75 facts
- facts/WolfFacts-anatomy.json — 75 facts
- facts/WolfFacts-history_mythology.json — 75 facts
- facts/WolfFacts-conservation.json — 75 facts
- facts/WolfFacts-funny_twitch.json — 100 facts
- facts/WolfFacts-legendary.json — 50 facts
Total: 700 wolf facts

STEP 1 — Upload to GitHub
1. Make a new PUBLIC GitHub repository, for example: wolffacts
2. Upload this whole folder's contents:
   - the facts folder
   - worker.js
   - StreamElements-Commands.txt
   - README-SETUP.txt
3. Make sure the JSON files are visible at:
   https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPO_NAME/tree/main/facts

STEP 2 — Edit worker.js
1. Open worker.js.
2. Replace:
   const GITHUB_USER = "YOUR_GITHUB_USERNAME";
   const REPO = "YOUR_REPO_NAME";
3. Example:
   const GITHUB_USER = "AlixTaesch";
   const REPO = "wolffacts";
4. If your GitHub default branch is master instead of main, change:
   const BRANCH = "main";
   to:
   const BRANCH = "master";

STEP 3 — Paste worker.js into Cloudflare
1. Go to Cloudflare Dashboard.
2. Open Workers & Pages.
3. Create a Worker, or open an existing Worker.
4. Click Edit Code.
5. Delete the default Hello World code.
6. Paste all of your edited worker.js.
7. Click Save and Deploy.

STEP 4 — Test the Worker
Open these in your browser, replacing the URL with your Worker URL:
https://YOUR-WORKER-URL/random
https://YOUR-WORKER-URL/rarity
https://YOUR-WORKER-URL/species
https://YOUR-WORKER-URL/famous
https://YOUR-WORKER-URL/legendary

If it says Hello World, the edited worker.js was not saved/deployed.
If it says "Could not load", check your GitHub username, repo name, branch name, and that the repo is public.

STEP 5 — Add StreamElements Commands
1. Go to StreamElements Dashboard.
2. Go to Chatbot > Chat Commands > Custom Commands.
3. Add a new command, such as !wolffact.
4. Paste the matching response from StreamElements-Commands.txt.
5. Replace YOUR-WORKER-URL with your Worker URL.
6. Save.

RECOMMENDED COMMANDS
!wolffact — random regular wolf fact
!wolfpull — weighted rarity pull
!famouswolf — famous wolf fact
!legendarywolf — legendary-only pull
!wolfgiggle — funny Twitch-style fact
!wolfspecies — species/subspecies fact
!wolfhistory — mythology/history fact
!wolfconservation — conservation fact

ADDING MORE FACTS
Open any JSON file and add another object like this:
{
  "id": "GENERAL-151",
  "category": "general",
  "rarity": "Common",
  "fact": "🐺 Your new fact goes here."
}

Make sure commas are correct between objects.