import re, html, base64

SRC = open("playbook_final.md").read().splitlines()

def b64(name):
    return base64.b64encode(open(f"fonts/{name}.ttf", "rb").read()).decode()

def slug(s):
    s = re.sub(r"^\d+\.\s*", "", s)
    s = re.sub(r"^Rung \d+:\s*", "", s)
    return re.sub(r"[^a-z0-9]+", "-", s.lower()).strip("-")

def inline(s, prompt=False):
    s = html.escape(s, quote=False)
    s = re.sub(r"\*\*(.+?)\*\*", r"<strong>\1</strong>", s)
    s = re.sub(r"\[([^\]]+)\]\((https?://[^)]+)\)", r'<a href="\2">\1</a>', s)
    if prompt:
        s = re.sub(r"\[([^\]]+)\]", r'<span class="fill">[\1]</span>', s)
    else:
        s = s.replace("[link]", '<span class="fill">[link]</span>')
    return s

NOTE_RE = re.compile(r"^\[((?:CONFIRM|OPTIONAL|REMOVE|HAVE)[^\]]*)\]\s*(.*)$")

# ---------- parse ----------
title = SRC[0][2:]
meta = [l for l in SRC[1:5] if l.strip()]
body = SRC[5:]

out = []
toc = []
section = None
i = 0
open_section = False
open_block = None  # 'rung' | 'profile' | 'guard'

def close_block():
    global open_block
    if open_block:
        out.append("</div>")
        open_block = None

def close_section():
    global open_section
    close_block()
    if open_section:
        out.append("</section>")
        open_section = False

LADDER = None  # filled from table
RUNGNUM = {'Writes':1,'Translates':2,'Reads':3,'Sees':4,'Counts':5,'Plans':6,'Watches':7,'Acts':8}

while i < len(body):
    line = body[i]
    if not line.strip():
        i += 1; continue

    if line.startswith("## "):
        close_section()
        text = line[3:]
        section = text
        sid = slug(text.split(":")[0])
        if text.startswith("Want the full playbook"):
            sid = "full-playbook"
        toc.append((sid, text.split(":")[0]))
        out.append(f'<section id="{sid}" class="sec">')
        out.append(f"<h2>{inline(text)}</h2>")
        open_section = True
        i += 1; continue

    if line.startswith("### "):
        close_block()
        text = line[4:]
        if section.startswith("The ladder"):
            m = re.match(r"Rung (\d+): (.*)", text)
            n, name = m.group(1), m.group(2)
            new = n in ("2", "4", "6", "7")
            tag = '<span class="tag new">New in this playbook</span>' if new else '<span class="tag">From the talk</span>'
            out.append(f'<div class="rung" id="rung-{n}"><div class="rung-head"><div class="rung-num" aria-hidden="true">{n}</div>')
            out.append(f'<h3><span class="vh">Rung {n}: </span>{inline(name)}</h3>{tag}</div>')
            open_block = "rung"
        elif section.startswith("The four guardrails"):
            m = re.match(r"(\d+)\. (.*)", text)
            out.append(f'<div class="guard"><h3><span class="guard-num" aria-hidden="true">{m.group(1)}</span>'
                       f'<span class="vh">Guardrail {m.group(1)}: </span>{inline(m.group(2))}</h3>')
            open_block = "guard"
        else:
            out.append(f'<div class="profile"><h3>{inline(text)}</h3>')
            open_block = "profile"
        i += 1; continue

    if line.startswith("```"):
        i += 1; buf = []
        while not body[i].startswith("```"):
            buf.append(body[i]); i += 1
        i += 1
        txt = "\n".join(buf)
        out.append('<div class="template"><div class="copy-row"><span class="copy-label">Business context template</span>'
                   '<button class="copy" type="button" data-copy="tpl">Copy template</button></div>'
                   f'<pre id="tpl">{html.escape(txt)}</pre></div>')
        continue

    if line.startswith("> "):
        txt = line[2:]
        pid = f"p{i}"
        out.append(f'<div class="prompt"><p id="{pid}">{inline(txt, prompt=True)}</p>'
                   f'<button class="copy" type="button" data-copy="{pid}">Copy prompt</button></div>')
        i += 1; continue

    if line.startswith("|"):
        rows = []
        while i < len(body) and body[i].startswith("|"):
            rows.append([c.strip() for c in body[i].strip("|").split("|")]); i += 1
        LADDER = rows[2:]
        rungs = []
        for n, job, example in reversed(LADDER):
            rungs.append(f'<li class="lrung"><a href="#rung-{n}">'
                         f'<span class="ln">{n}</span><span class="lj">{html.escape(job)}</span>'
                         f'<span class="lw">{html.escape(example)}</span></a></li>')
        out.append('<nav class="ladder" aria-label="The eight rungs of the ladder"><ol reversed>'
                   + "".join(rungs) + "</ol></nav>")
        continue

    if line.startswith("- "):
        items = []
        while i < len(body) and body[i].startswith("- "):
            li = inline(body[i][2:])
            if open_block == "profile":
                li = re.sub(r"<strong>(\w+) for you:</strong>",
                            lambda mm: f'<strong><a href="#rung-{RUNGNUM[mm.group(1)]}">{mm.group(1)} for you</a>:</strong>', li)
            items.append(f"<li>{li}</li>"); i += 1
        out.append("<ul>" + "".join(items) + "</ul>")
        continue

    if re.match(r"\d+\. ", line):
        items = []
        while i < len(body) and re.match(r"\d+\. ", body[i]):
            items.append(f"<li>{inline(re.sub(r'^\d+\. ', '', body[i]))}</li>"); i += 1
        out.append("<ol class=\"plain\">" + "".join(items) + "</ol>")
        continue

    m = NOTE_RE.match(line)
    if m:
        out.append(f'<div class="todo" role="note"><strong>Editor note:</strong> {html.escape(m.group(1))}</div>')
        if m.group(2):
            out.append(f"<p>{inline(m.group(2))}</p>")
        i += 1; continue

    # paragraph
    cls = ""
    if line.startswith("**Guardrail"):
        cls = ' class="g-label"'
    elif line.startswith("**Watch out for"):
        cls = ' class="watch"'
    elif line.startswith("The talk came down to one habit"):
        out.append('<p class="habit-lead">The talk came down to one habit:</p>'
                   '<p class="habit">Not sure if AI can do it? Ask it.</p>')
        i += 1; continue
    if not cls and line.rstrip().endswith(":"):
        cls = ' class="lead-in"'
    out.append(f"<p{cls}>{inline(line)}</p>")
    i += 1

close_section()

toc_html = "".join(f'<li><a href="#{sid}">{html.escape(t)}</a></li>' for sid, t in toc
                   if sid not in ("about-the-author", "the-fine-print"))

t1, t2 = title.split(": ", 1)
meta_html = "".join(f"<p>{html.escape(m)}</p>" for m in meta)

CSS = open("style.css").read()
CSS = CSS.replace("__REG__", b64("AtkinsonHyperlegible-Regular")) \
         .replace("__BOLD__", b64("AtkinsonHyperlegible-Bold")) \
         .replace("__ITAL__", b64("AtkinsonHyperlegible-Italic"))

JS = """
document.querySelectorAll('button.copy').forEach(function (btn) {
  var label = btn.textContent;
  btn.addEventListener('click', function () {
    var text = document.getElementById(btn.dataset.copy).innerText;
    function done(ok) {
      btn.textContent = ok ? 'Copied' : 'Press and hold the text to copy';
      btn.classList.toggle('done', ok);
      setTimeout(function () { btn.textContent = label; btn.classList.remove('done'); }, 2200);
    }
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(function () { done(true); }, function () { fallback(); });
    } else { fallback(); }
    function fallback() {
      try {
        var ta = document.createElement('textarea');
        ta.value = text; ta.setAttribute('readonly', ''); ta.style.position = 'fixed'; ta.style.opacity = '0';
        document.body.appendChild(ta); ta.select();
        var ok = document.execCommand('copy'); document.body.removeChild(ta); done(ok);
      } catch (e) { done(false); }
    }
  });
});
"""

page = f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>{html.escape(title)}</title>
<meta name="description" content="A free starter playbook for small business owners: four guardrails, a business context template, and starter prompts for eight jobs AI can do for you.">
<style>{CSS}</style>
</head>
<body>
<header class="hero">
  <div class="wrap">
    <h1>{html.escape(t1)}<span>{html.escape(t2)}</span></h1>
    <div class="meta">{meta_html}</div>
    <p class="pdf-link"><a href="ai-without-the-hype-starter-playbook.pdf">Download the PDF version</a></p>
  </div>
</header>
<nav class="toc wrap" aria-label="Contents"><h2 class="toc-h">In this playbook</h2><ol>{toc_html}</ol></nav>
<main class="wrap">
{chr(10).join(out)}
</main>
<div class="live" aria-live="polite"></div>
<script>{JS}</script>
</body>
</html>"""
open("playbook.html", "w").write(page)
print("ok", len(page))
