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
      /* Follows the engine in the order it runs: launch, settings, the first scene, what that
         scene draws and how it is styled, then variables and choices, audio, and saving last
         because it touches everything. The file map on wiki/code/index.html says which page
         covers which file.
         status: "to be written" shows on the index cards until a page has content. */
      children: [
        { title: "Start-up and the page stack", path: "wiki/code/startup.html", status: "to be written",
          blurb: "The game starts before the title page exists. Boot order, why GameScreen sits at the bottom of the stack, and the title page laid over it." },
        { title: "Settings", path: "wiki/code/settings.html", status: "to be written",
          blurb: "How the manifest becomes settings: the flat key scheme, LocalStorage, the bridge into the engine, and the settings page." },
        { title: "The command loop", path: "wiki/code/command-loop.html", status: "to be written",
          blurb: "Loading a scene and running it: processNext(), blocking and non-blocking commands, labels and jumps, and the end of a scene." },
        { title: "Sprites and animation", path: "wiki/code/sprites.html", status: "to be written",
          blurb: "From a sprite command to images on screen: the validation pipeline, the sprite layer, and one timer per animation." },
        { title: "Screen layers", path: "wiki/code/screen-layers.html", status: "to be written",
          blurb: "Background, textbox and choice overlay, the typewriter, and scaling by Theme.pixelRatio." },
        { title: "Styles", path: "wiki/code/style-resolution.html", status: "to be written",
          blurb: "Where textboxStyle comes from: engine defaults, base chains, the deep merge, and the style command." },
        { title: "Variables, conditions and choices", path: "wiki/code/variables.html", status: "to be written",
          blurb: "set and effects, conditions, %name% interpolation, and choices: which options show and where they lead." },
        { title: "Audio", path: "wiki/code/audio.html", status: "to be written",
          blurb: "The AudioController singleton: a two-player music queue, the effect pool and the named loop pool." },
        { title: "Save system", path: "wiki/code/save-system.html", status: "to be written",
          blurb: "Stage a save, pick a slot, commit it. The screen blob, thumbnails, and how loading rebuilds the screen and resumes." }
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
    { title: "Scene script",      path: "tools/scene.html",     status: "ready",
      blurb: "Build a scene command list without hand-writing JSON, with a branch map that shows every jump, choice, dead end and unreachable stretch." },
    { title: "Sprite object", path: "tools/sprite-object.html", status: "ready",
      blurb: "Layered and animated sprites: stack images in layers, animate them in loops or one-shots, and watch it play with your own images." }
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
