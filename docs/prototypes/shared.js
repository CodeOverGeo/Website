// Shared progressive-enhancement runtime for georufino.com Phase 3 prototypes (#47)
// Implements modern-web-guidance patterns: navbar, tabs, copy-button, plus ?page=home|speaking view switching.

// 1. Conditional polyfills (feature-detected, never loaded unconditionally)
if (typeof HTMLElement !== 'undefined' && !Object.hasOwn(HTMLElement.prototype, 'popover')) {
  import('https://unpkg.com/@oddbird/popover-polyfill@latest/dist/popover.min.js').catch(() => {});
}
if (typeof HTMLElement !== 'undefined' && !Object.hasOwn(HTMLElement.prototype, 'focusGroup')) {
  import('https://esm.sh/@microsoft/focusgroup-polyfill').then((m) => m.polyfill?.()).catch(() => {});
}

// 2. View router (?page=home | ?page=speaking) so `/` and `/speaking` can be inspected via URL or nav click
function initViewSwitcher() {
  const views = document.querySelectorAll('[data-page-view]');
  const navLinks = document.querySelectorAll('[data-page-link]');
  if (!views.length) return;

  function setPage(page, push = false) {
    const target = page === 'speaking' ? 'speaking' : 'home';
    for (const v of views) {
      v.hidden = v.dataset.pageView !== target;
    }
    for (const link of navLinks) {
      if (link.dataset.pageLink === target) {
        link.setAttribute('aria-current', 'page');
      } else {
        link.removeAttribute('aria-current');
      }
    }
    // Update switcher links to preserve active page across Directions A/B/C
    for (const dirLink of document.querySelectorAll('[data-direction-link]')) {
      const base = dirLink.getAttribute('data-direction-href');
      if (base) {
        dirLink.setAttribute('href', target === 'speaking' ? `${base}?page=speaking` : base);
      }
    }
    if (push) {
      const url = new URL(window.location.href);
      if (target === 'speaking') url.searchParams.set('page', 'speaking');
      else url.searchParams.delete('page');
      window.history.pushState({ page: target }, '', url);
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
    // Close mobile menu popover if open
    const menu = document.getElementById('site-menu');
    if (menu && menu.hasAttribute('popover') && menu.matches(':popover-open')) {
      menu.hidePopover();
    }
  }

  const initial = new URLSearchParams(window.location.search).get('page') || 'home';
  setPage(initial, false);

  document.addEventListener('click', (event) => {
    const trigger = event.target.closest('[data-page-trigger]');
    if (!trigger) return;
    event.preventDefault();
    setPage(trigger.dataset.pageTrigger, true);
  });

  window.addEventListener('popstate', () => {
    const p = new URLSearchParams(window.location.search).get('page') || 'home';
    setPage(p, false);
  });
}

// 3. Responsive Site Navigation (`navbar` guide: single semantic <nav>, dynamic overflow measurement)
function initResponsiveNavbar() {
  const header = document.querySelector('.site-header');
  const inner = header?.querySelector('.header-inner');
  const menu = document.getElementById('site-menu');
  if (!header || !inner || !menu) return;

  let lastCollapsedWidth = 0;

  function syncNavLayout() {
    const currentlyWide = header.classList.contains('is-wide');
    const width = header.clientWidth;

    // While collapsed, only re-measure when the header has grown (avoids resize thrashing)
    if (!currentlyWide && width <= lastCollapsedWidth) return;

    const wasOpen =
      !currentlyWide &&
      menu.hasAttribute('popover') &&
      (menu.matches(':popover-open') || menu.classList.contains(':popover-open'));

    header.classList.add('is-measuring', 'is-wide');
    menu.removeAttribute('popover');

    const fits = inner.scrollWidth <= inner.clientWidth;

    if (fits) {
      lastCollapsedWidth = 0;
    } else {
      header.classList.remove('is-wide');
      menu.setAttribute('popover', 'auto');
      lastCollapsedWidth = width;
      if (wasOpen && typeof menu.showPopover === 'function') {
        try {
          menu.showPopover();
        } catch {}
      }
    }

    requestAnimationFrame(() => {
      header.classList.remove('is-measuring');
    });
  }

  const ro = new ResizeObserver(() => syncNavLayout());
  ro.observe(header);
  ro.observe(menu);
  syncNavLayout();
  if (document.fonts?.ready) {
    document.fonts.ready.then(() => syncNavLayout());
  }
}

// 4. Accessible Speaker Bio Tabs (`tabs` guide: selection follows focus, hidden="until-found", beforematch)
function initBioTabs() {
  for (const container of document.querySelectorAll('.bio-tabs')) {
    const tablist = container.querySelector('[focusgroup]');
    const tabs = Array.from(tablist?.querySelectorAll('button[type="button"]') ?? []);
    const panels = Array.from(container.querySelectorAll('[role="tabpanel"]'));
    if (!tabs.length || !panels.length) continue;

    // Ensure explicit roles if native focusgroup has not assigned them yet
    if (!tablist.hasAttribute('role')) tablist.setAttribute('role', 'tablist');
    for (const tab of tabs) {
      if (!tab.hasAttribute('role')) tab.setAttribute('role', 'tab');
    }

    function selectTab(selected, moveFocus = false) {
      for (const tab of tabs) {
        const isSelected = tab === selected;
        tab.setAttribute('aria-selected', isSelected ? 'true' : 'false');
        tab.toggleAttribute('focusgroupstart', isSelected);
        tab.tabIndex = isSelected ? 0 : -1;
      }
      for (const panel of panels) {
        const isMatch = panel.getAttribute('aria-labelledby') === selected.id;
        if (isMatch) {
          panel.removeAttribute('hidden');
        } else {
          panel.setAttribute('hidden', 'until-found');
        }
      }
      selected.scrollIntoView({ block: 'nearest', inline: 'nearest', container: 'nearest' });
      if (moveFocus) selected.focus();
    }

    for (const tab of tabs) {
      tab.addEventListener('click', () => selectTab(tab, false));
      tab.addEventListener('focus', () => {
        if (tab.getAttribute('aria-selected') !== 'true') selectTab(tab, false);
      });
    }

    // Keyboard arrow support when native focusgroup isn't active
    tablist.addEventListener('keydown', (event) => {
      if (Object.hasOwn(HTMLElement.prototype, 'focusGroup')) return;
      const idx = tabs.indexOf(document.activeElement);
      if (idx === -1) return;
      let next = -1;
      if (event.key === 'ArrowRight') next = (idx + 1) % tabs.length;
      else if (event.key === 'ArrowLeft') next = (idx - 1 + tabs.length) % tabs.length;
      else if (event.key === 'Home') next = 0;
      else if (event.key === 'End') next = tabs.length - 1;
      if (next !== -1) {
        event.preventDefault();
        selectTab(tabs[next], true);
      }
    });

    // Sync selection if browser Find-in-Page reveals a hidden="until-found" panel
    for (const panel of panels) {
      panel.addEventListener('beforematch', () => {
        const owner = tabs.find((t) => t.id === panel.getAttribute('aria-labelledby'));
        if (owner) selectTab(owner, false);
      });
    }
  }
}

// 5. Copy Button (`copy-button` guide: Invoker Commands + fallback, live region via opacity, VoiceOver \u00A0)
function initCopyButtons() {
  const timers = new WeakMap();
  let lastMessage = '';

  function legacyCopy(text) {
    const previousFocus = document.activeElement;
    const field = Object.assign(document.createElement('textarea'), { value: text });
    field.setAttribute('readonly', '');
    field.style.cssText = 'position:fixed;inset-block-start:0;opacity:0';
    document.body.append(field);
    field.select();
    try {
      return document.execCommand('copy');
    } finally {
      field.remove();
      previousFocus?.focus({ preventScroll: true });
    }
  }

  function report(button, ok) {
    const tip = button.nextElementSibling;
    clearTimeout(timers.get(button));
    button.removeAttribute('data-copied');
    button.removeAttribute('data-failed');
    let message = ok ? 'Copied' : 'Copy failed';
    if (message === lastMessage) message += '\u00A0';
    lastMessage = message;
    if (tip) tip.textContent = '';
    void button.offsetWidth;
    button.setAttribute(ok ? 'data-copied' : 'data-failed', '');
    requestAnimationFrame(() => {
      if (tip) tip.textContent = message;
    });
    timers.set(
      button,
      setTimeout(() => {
        button.removeAttribute('data-copied');
        button.removeAttribute('data-failed');
        if (tip) tip.textContent = '';
      }, 2200),
    );
  }

  async function copy(button, target) {
    const text = target.matches('input, textarea') ? target.value : target.innerText.trim();
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      report(button, true);
    } catch {
      if (legacyCopy(text)) report(button, true);
      else report(button, false);
    }
  }

  if ('CommandEvent' in window) {
    document.addEventListener(
      'command',
      (event) => {
        if (event.command?.startsWith('--copy')) {
          copy(event.source, event.target);
        }
      },
      true,
    );
  } else {
    document.addEventListener('click', (event) => {
      if (event.defaultPrevented) return;
      const button = event.target.closest('button[command^="--copy"]');
      if (!button) return;
      const target = document.getElementById(button.getAttribute('commandfor'));
      if (target) copy(button, target);
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initViewSwitcher();
  initResponsiveNavbar();
  initBioTabs();
  initCopyButtons();
});
