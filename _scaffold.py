#!/usr/bin/env python3
"""One-off scaffolder: writes skeleton pages that do not exist yet.
Never overwrites a page that already has content. Safe to re-run after
adding entries to assets/js/sitemap.js.
"""
import os, re, json, sys

ROOT = os.path.dirname(os.path.abspath(__file__))

PAGE = """<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{title} — VNgine</title>
<link rel="stylesheet" href="{base}assets/css/site.css">
<script>window.SITE_BASE = "{base}";</script>
</head>
<body>
{body}
<script src="{base}assets/js/sitemap.js"></script>
<script src="{base}assets/js/nav.js"></script>
<script src="{base}assets/js/cards.js"></script>
</body>
</html>
"""

PLAIN_BODY = """<div class="page">
  <h1>{title}</h1>
{content}
</div>"""

WIKI_BODY = """<div class="layout">
  <aside class="sidebar" data-wiki-tree></aside>
  <main>
    <h1>{title}</h1>
{content}
  </main>
</div>"""

TODO = '    <div class="todo"><strong>TODO</strong> — this page has not been written yet.</div>'


def base_for(path):
    depth = path.count("/")
    return "../" * depth if depth else ""


def write(path, title, content=TODO, wiki=False):
    full = os.path.join(ROOT, path)
    if os.path.exists(full):
        print("skip   ", path)
        return
    os.makedirs(os.path.dirname(full), exist_ok=True)
    body = (WIKI_BODY if wiki else PLAIN_BODY).format(title=title, content=content)
    with open(full, "w") as fh:
        fh.write(PAGE.format(title=title, base=base_for(path), body=body))
    print("created", path)


def load_sitemap():
    src = open(os.path.join(ROOT, "assets/js/sitemap.js")).read()
    src = src[src.index("{"): src.rindex("}") + 1]
    src = re.sub(r"/\*.*?\*/", "", src, flags=re.S)
    src = re.sub(r"(?m)^\s*//.*$", "", src)
    src = re.sub(r"(?m)\s+//\s.*$", "", src)
    src = re.sub(r"([{,]\s*)([A-Za-z_][A-Za-z0-9_]*)\s*:", r'\1"\2":', src)
    src = re.sub(r",(\s*[}\]])", r"\1", src)
    return json.loads(src)


def walk(nodes, out):
    for n in nodes:
        out.append(n)
        if n.get("children"):
            walk(n["children"], out)
    return out


def main():
    m = load_sitemap()

    write("index.html", "VNgine")
    write("games/index.html", "Games")
    write("tools/index.html", "Tools")

    for g in m.get("games", []):
        write(g["path"], g["title"])
    for t in m.get("tools", []):
        write(t["path"], t["title"])
    for n in walk(m.get("wiki", []), []):
        write(n["path"], n["title"], wiki=True)


if __name__ == "__main__":
    main()
