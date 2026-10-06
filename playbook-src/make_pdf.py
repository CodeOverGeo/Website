# Renders playbook.html to the PDF using its built-in print styles.
# Requires: pip install playwright && playwright install chromium
from playwright.sync_api import sync_playwright
import pathlib
url = pathlib.Path("playbook.html").resolve().as_uri()
with sync_playwright() as p:
    b = p.chromium.launch()
    pg = b.new_page(); pg.goto(url); pg.wait_for_timeout(500)
    pg.pdf(path="ai-without-the-hype-starter-playbook.pdf", format="Letter", print_background=True,
           prefer_css_page_size=True, display_header_footer=True, header_template="<span></span>",
           footer_template='<div style="font-size:8pt;width:100%;text-align:center;color:#56645D;font-family:Verdana,sans-serif">AI Without the Hype: The Starter Playbook &nbsp;|&nbsp; georufino.com &nbsp;|&nbsp; Page <span class="pageNumber"></span> of <span class="totalPages"></span></div>',
           margin={"top": "0.6in", "bottom": "0.75in", "left": "0.65in", "right": "0.65in"})
    b.close()
print("PDF written")
