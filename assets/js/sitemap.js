/* Single source of truth for the site structure.
   Paths are relative to the site root; nav.js prefixes them with window.SITE_BASE.
   Add a page here and it appears in the header / wiki tree automatically. */

window.SITE_MAP = {
  nav: [
    { title: "Home",      path: "index.html" },
    { title: "Games",     path: "games/index.html" },
    { title: "Wiki",      path: "wiki/index.html" },
    { title: "Tools",     path: "tools/index.html" },
    { title: "GitHub",    path: "https://github.com/ThijssjihT/VNgine", external: true }
  ],

  /* The wiki tree, rendered in the sidebar of every /wiki/ page. */
  wiki: [
    { title: "Wiki home", path: "wiki/index.html" },
    {
      title: "Game authoring", path: "wiki/authoring/index.html",
      children: [
        {
          title: "Step by step tutorial", path: "wiki/authoring/tutorial/index.html",
          children: [
            { title: "1. Set up your game folder", path: "wiki/authoring/tutorial/step-1.html" },
            { title: "2. Write your first scene",  path: "wiki/authoring/tutorial/step-2.html" },
            { title: "3. Add sprites and choices", path: "wiki/authoring/tutorial/step-3.html" },
            { title: "4. Build and run",           path: "wiki/authoring/tutorial/step-4.html" }
          ]
        },
        {
          title: "Reference", path: "wiki/authoring/guides/index.html",
          children: [
            { title: "Manifest (game.json)", path: "wiki/authoring/guides/manifest.html" },
            { title: "Scene script commands", path: "wiki/authoring/guides/scene-script.html" },
            { title: "Variables and conditions", path: "wiki/authoring/guides/variables.html" },
            { title: "Styles", path: "wiki/authoring/guides/theming.html" },
            { title: "Localisation", path: "wiki/authoring/guides/localisation.html" },
            { title: "Packaging for Harbour", path: "wiki/authoring/guides/packaging.html" }
          ]
        }
      ]
    },
    {
      title: "Code walkthrough", path: "wiki/code/index.html",
      children: [
        { title: "Architecture overview", path: "wiki/code/architecture.html" },
        { title: "GameEngine.js", path: "wiki/code/game-engine.html" },
        { title: "GameScreen.qml", path: "wiki/code/game-screen.html" },
        { title: "Style resolution", path: "wiki/code/style-resolution.html" },
        { title: "Save system", path: "wiki/code/save-system.html" },
        { title: "Settings", path: "wiki/code/settings.html" }
      ]
    },
    {
      title: "Contributing", path: "wiki/contributing.html"
    }
  ],

  /* Generators. status: "ready" | "planned" */
  tools: [
    { title: "Textbox style",     path: "tools/textbox.html",   status: "ready",
      blurb: "Position, size, padding, background, border and radius for the dialogue box." },
    { title: "Choice style",      path: "tools/choice.html",    status: "ready",
      blurb: "Layout, background, border and text for the choice grid and each option. Can match an uploaded textbox style." },
    { title: "HUD style",         path: "tools/hud.html",       status: "planned",
      blurb: "Styling for the variable HUD overlay." },
    { title: "Manifest (game.json)", path: "tools/manifest.html", status: "ready",
      blurb: "Title, entry scene, variables, credits and the whole settings page, previewed on the title screen." },
    { title: "Settings",          path: "tools/settings.html",  status: "planned",
      blurb: "Definitions for the in-game settings page." },
    { title: "Scene script",      path: "tools/scene.html",     status: "planned",
      blurb: "Build a scene command list without hand-writing JSON." },
    { title: "Sprite animation object", path: "tools/sprite-object.html", status: "planned",
      blurb: "Composite sprites and animation objects." }
  ],

  /* One entry per game; add a sub page under games/ for each. */
  games: [
    { title: "Sample story", path: "games/sample-story.html", status: "in development",
      blurb: "The demo story bundled with the engine.",
      banner: "assets/img/sample-story-banner.jpg" },
    { title: "Wedding plans", path: "games/wedding-plans.html", status: "in development",
      blurb: "Emily told her family she has a boyfriend. Her sister's wedding is coming up." }
  ]
};
