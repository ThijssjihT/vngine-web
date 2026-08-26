/* Renders card lists from window.SITE_MAP into any element with
   data-cards="tools" | "games", or data-cards-children="<path in the wiki tree>". */

(function () {
  var BASE = window.SITE_BASE || "";
  var MAP = window.SITE_MAP || {};

  function url(p) { return /^https?:/.test(p) ? p : BASE + p; }

  function card(item) {
    var a = document.createElement("a");
    a.className = "card";
    a.href = url(item.path);

    if (item.banner) {
      a.className = "card banner-card";
      var bg = document.createElement("div");
      bg.className = "card-banner";
      bg.style.backgroundImage = "url('" + url(item.banner) + "')";
      a.appendChild(bg);
    }

    var body = document.createElement("div");
    body.className = "card-body";
    var html = "<h3>" + item.title + "</h3>";
    if (item.blurb) html += "<p>" + item.blurb + "</p>";
    if (item.status && item.status !== "ready") {
      html += '<p class="status">' + item.status + "</p>";
    }
    body.innerHTML = html;
    a.appendChild(body);
    return a;
  }

  function findNode(nodes, path) {
    for (var i = 0; i < nodes.length; i++) {
      if (nodes[i].path === path) return nodes[i];
      if (nodes[i].children) {
        var hit = findNode(nodes[i].children, path);
        if (hit) return hit;
      }
    }
    return null;
  }

  document.addEventListener("DOMContentLoaded", function () {
    var hosts = document.querySelectorAll("[data-cards]");
    Array.prototype.forEach.call(hosts, function (host) {
      var list = MAP[host.getAttribute("data-cards")] || [];
      host.className = "cards";
      list.forEach(function (item) { host.appendChild(card(item)); });
    });

    var kidHosts = document.querySelectorAll("[data-cards-children]");
    Array.prototype.forEach.call(kidHosts, function (host) {
      var node = findNode(MAP.wiki || [], host.getAttribute("data-cards-children"));
      host.className = "cards";
      ((node && node.children) || []).forEach(function (item) {
        host.appendChild(card(item));
      });
    });
  });
})();
