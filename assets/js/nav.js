/* Builds the header, footer and wiki tree from window.SITE_MAP.
   Every page must define window.SITE_BASE (relative path back to the site root)
   before loading sitemap.js and this file. Works over file:// as well as http. */

(function () {
  var BASE = window.SITE_BASE || "";
  var MAP = window.SITE_MAP || { nav: [], wiki: [], tools: [], games: [] };

  function url(p) { return /^https?:/.test(p) ? p : BASE + p; }

  /* --- current page, normalised to a site-root-relative path --- */
  var here = (function () {
    var p = window.location.pathname.replace(/\\/g, "/");
    if (p.charAt(p.length - 1) === "/") p += "index.html";
    return p;
  })();

  function isCurrent(path) {
    if (/^https?:/.test(path)) return false;
    return here.slice(-path.length) === path;
  }

  /* --- header --- */
  function buildHeader() {
    var header = document.createElement("header");
    header.className = "site-header";

    var bar = document.createElement("div");
    bar.className = "bar";

    var brand = document.createElement("a");
    brand.className = "brand";
    brand.href = url("index.html");
    brand.innerHTML = '<span>VNgine<span class="dot">.</span></span>';
    bar.appendChild(brand);

    var nav = document.createElement("nav");
    nav.className = "site-nav";
    MAP.nav.forEach(function (item) {
      if (item.path === "index.html") return; // the brand is the home link
      var a = document.createElement("a");
      a.href = url(item.path);
      a.textContent = item.title;
      if (item.external) { a.target = "_blank"; a.rel = "noopener"; }
      // section highlight: /wiki/foo/bar.html activates the "Wiki" entry
      var section = item.path.split("/")[0];
      if (!item.external && here.indexOf("/" + section + "/") !== -1) a.className = "active";
      nav.appendChild(a);
    });
    bar.appendChild(nav);
    header.appendChild(bar);
    return header;
  }

  /* --- wiki tree --- */
  function buildTree(nodes) {
    var ul = document.createElement("ul");
    ul.className = "tree";
    var containsActive = false;

    nodes.forEach(function (node) {
      var li = document.createElement("li");
      var active = isCurrent(node.path);

      var a = document.createElement("a");
      a.href = url(node.path);
      a.textContent = node.title;
      if (active) { a.className = "active"; containsActive = true; }

      if (node.children && node.children.length) {
        li.className = "branch";
        var row = document.createElement("div");
        row.className = "branch-row";

        var twisty = document.createElement("button");
        twisty.className = "twisty";
        twisty.type = "button";
        twisty.setAttribute("aria-label", "Toggle " + node.title);
        twisty.textContent = "▾";
        row.appendChild(twisty);
        row.appendChild(a);
        li.appendChild(row);

        var sub = buildTree(node.children);
        li.appendChild(sub.el);

        var open = active || sub.containsActive;
        if (!open) { li.className = "branch collapsed"; twisty.textContent = "▸"; }
        if (sub.containsActive || active) containsActive = true;

        twisty.addEventListener("click", function () {
          var collapsed = li.className.indexOf("collapsed") !== -1;
          li.className = collapsed ? "branch" : "branch collapsed";
          twisty.textContent = collapsed ? "▾" : "▸";
        });
      } else {
        li.appendChild(a);
      }
      ul.appendChild(li);
    });

    return { el: ul, containsActive: containsActive };
  }

  /* --- footer --- */
  function buildFooter() {
    var f = document.createElement("footer");
    f.className = "site-footer";
    f.innerHTML =
      '<div class="bar">' +
        '<span>VNgine — a visual novel engine for SailfishOS</span>' +
        '<a href="https://github.com/ThijssjihT/VNgine" target="_blank" rel="noopener">Source on GitHub</a>' +
      '</div>';
    return f;
  }

  /* --- mount --- */
  document.addEventListener("DOMContentLoaded", function () {
    document.body.insertBefore(buildHeader(), document.body.firstChild);

    var host = document.querySelector("[data-wiki-tree]");
    if (host) {
      var title = document.createElement("p");
      title.className = "tree-title";
      title.textContent = "Documentation";
      host.appendChild(title);
      host.appendChild(buildTree(MAP.wiki).el);
    }

    document.body.appendChild(buildFooter());
  });
})();
