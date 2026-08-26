/* Shared helpers for the VNgine JSON generators.
   window.VNTool: small utilities, no framework, no build step. */

window.VNTool = (function () {

  /* --- deep helpers ------------------------------------------------ */

  function isPlainObject(v) {
    return v !== null && typeof v === "object" && !Array.isArray(v);
  }

  function clone(v) {
    return isPlainObject(v) || Array.isArray(v) ? JSON.parse(JSON.stringify(v)) : v;
  }

  /* Mirrors GameEngine.js mergeStyle(): override wins, objects merge deep. */
  function mergeStyle(base, override) {
    var result = {}, key;
    for (key in base) result[key] = base[key];
    for (key in override) {
      if (isPlainObject(result[key]) && isPlainObject(override[key])) {
        result[key] = mergeStyle(result[key], override[key]);
      } else {
        result[key] = override[key];
      }
    }
    return result;
  }

  /* Returns only the parts of `value` that differ from `base`. */
  function diff(base, value) {
    var out = {}, key;
    for (key in value) {
      if (isPlainObject(base[key]) && isPlainObject(value[key])) {
        var sub = diff(base[key], value[key]);
        if (Object.keys(sub).length) out[key] = sub;
      } else if (base[key] !== value[key]) {
        out[key] = value[key];
      }
    }
    return out;
  }

  function get(obj, path) {
    var parts = path.split("."), cur = obj, i;
    for (i = 0; i < parts.length; i++) {
      if (!isPlainObject(cur) && !Array.isArray(cur)) return undefined;
      cur = cur[parts[i]];
    }
    return cur;
  }

  function set(obj, path, value) {
    var parts = path.split("."), cur = obj, i;
    for (i = 0; i < parts.length - 1; i++) {
      if (!isPlainObject(cur[parts[i]])) cur[parts[i]] = {};
      cur = cur[parts[i]];
    }
    cur[parts[parts.length - 1]] = value;
    return obj;
  }

  /* --- form binding ------------------------------------------------ */

  /* Binds every [data-key] input in `root` to `state`, calling onChange
     after each edit. data-type="number"|"float"|"string" (default string). */
  function bindForm(root, state, onChange) {
    var inputs = root.querySelectorAll("[data-key]");

    function readInput(el) {
      var t = el.getAttribute("data-type") || "string";
      var v = el.value;
      if (t === "number") { v = parseInt(v, 10); if (isNaN(v)) v = 0; }
      if (t === "float")  { v = parseFloat(v);   if (isNaN(v)) v = 0; }
      return v;
    }

    Array.prototype.forEach.call(inputs, function (el) {
      var handler = function () {
        set(state, el.getAttribute("data-key"), readInput(el));
        syncMirrors(root, state);
        onChange();
      };
      el.addEventListener("input", handler);
      el.addEventListener("change", handler);
    });

    return {
      /* push state back into the form (after loading a file / reset) */
      refresh: function () {
        Array.prototype.forEach.call(inputs, function (el) {
          var v = get(state, el.getAttribute("data-key"));
          if (v === undefined || v === null) return;
          el.value = v;
        });
        syncMirrors(root, state);
      }
    };
  }

  /* Elements with [data-mirror="some.key"] show the live value, and
     [data-pair="some.key"] keeps a colour picker and text input in sync. */
  function syncMirrors(root, state) {
    Array.prototype.forEach.call(root.querySelectorAll("[data-mirror]"), function (el) {
      var v = get(state, el.getAttribute("data-mirror"));
      var fmt = el.getAttribute("data-format");
      if (fmt === "pct") v = Math.round(v * 100) + "%";
      el.textContent = v;
    });
    Array.prototype.forEach.call(root.querySelectorAll("[data-pair]"), function (el) {
      var v = get(state, el.getAttribute("data-pair"));
      if (typeof v === "string" && el.value.toLowerCase() !== v.toLowerCase()) el.value = v;
    });
  }

  /* --- output ------------------------------------------------------ */

  function pretty(obj) { return JSON.stringify(obj, null, 4); }

  function copy(text, button) {
    function done() {
      if (!button) return;
      var old = button.textContent;
      button.textContent = "Copied";
      setTimeout(function () { button.textContent = old; }, 1400);
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done, function () { fallback(text); done(); });
    } else { fallback(text); done(); }
  }

  function fallback(text) {
    var ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand("copy"); } catch (e) {}
    document.body.removeChild(ta);
  }

  function download(text, filename) {
    var blob = new Blob([text], { type: "application/json" });
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
  }

  /* --- loading an existing file ------------------------------------ */

  /* Wires a file input and a drop zone to one callback.
     onLoad receives (parsedJson, filename). */
  function wireLoaders(opts) {
    function handleText(text, name) {
      try {
        opts.onLoad(JSON.parse(text), name || "");
      } catch (e) {
        if (opts.onError) opts.onError(e);
        else alert("That is not valid JSON:\n" + e.message);
      }
    }

    if (opts.fileInput) {
      opts.fileInput.addEventListener("change", function () {
        var f = opts.fileInput.files[0];
        if (!f) return;
        var r = new FileReader();
        r.onload = function () { handleText(r.result, f.name); };
        r.readAsText(f);
        opts.fileInput.value = "";
      });
    }

    if (opts.dropZone) {
      var dz = opts.dropZone;
      ["dragenter", "dragover"].forEach(function (ev) {
        dz.addEventListener(ev, function (e) { e.preventDefault(); dz.classList.add("over"); });
      });
      ["dragleave", "drop"].forEach(function (ev) {
        dz.addEventListener(ev, function (e) { e.preventDefault(); dz.classList.remove("over"); });
      });
      dz.addEventListener("drop", function (e) {
        var f = e.dataTransfer.files[0];
        if (!f) return;
        var r = new FileReader();
        r.onload = function () { handleText(r.result, f.name); };
        r.readAsText(f);
      });
    }

    return { handleText: handleText };
  }

  /* --- colour ------------------------------------------------------ */

  function normaliseHex(v) {
    if (typeof v !== "string") return null;
    v = v.trim();
    if (v.charAt(0) !== "#") v = "#" + v;
    if (/^#[0-9a-fA-F]{3}$/.test(v)) {
      v = "#" + v[1] + v[1] + v[2] + v[2] + v[3] + v[3];
    }
    return /^#[0-9a-fA-F]{6}$/.test(v) ? v.toLowerCase() : null;
  }

  function rgba(hex, alpha) {
    var h = normaliseHex(hex) || "#000000";
    var n = parseInt(h.slice(1), 16);
    return "rgba(" + ((n >> 16) & 255) + "," + ((n >> 8) & 255) + "," + (n & 255) + "," + alpha + ")";
  }

  return {
    isPlainObject: isPlainObject, clone: clone, mergeStyle: mergeStyle, diff: diff,
    get: get, set: set, bindForm: bindForm, syncMirrors: syncMirrors,
    pretty: pretty, copy: copy, download: download, wireLoaders: wireLoaders,
    normaliseHex: normaliseHex, rgba: rgba
  };
})();
