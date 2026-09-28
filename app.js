(() => {
  const c = window.CARSIDEA_CONFIG;
  if (!c) return;
  const money = new Intl.NumberFormat('ja-JP');
  document.querySelectorAll('[data-price]').forEach(el => {
    const value = c.prices[el.dataset.price];
    if (Number.isFinite(value)) el.textContent = money.format(value);
  });
  document.querySelectorAll('[data-limit]').forEach(el => el.textContent = c.monitorLimit);
  document.querySelectorAll('[data-monitor]').forEach(el => el.hidden = !c.monitorEnabled);
  let line;
  try { const u = new URL(c.lineUrl); if (u.protocol === 'https:') line = u.href; } catch {}
  if (line) {
    document.querySelectorAll('a.line').forEach(el => { el.href = line; });
    document.querySelectorAll('[data-line-ready]').forEach(el => el.hidden = false);
    document.querySelectorAll('[data-line-pending]').forEach(el => el.hidden = true);
  }
  document.querySelectorAll('[data-operator]').forEach(el => el.textContent = c.operatorName || 'CARSIDEA運営事務局');
  if (c.contactEmail) {
    document.querySelectorAll('[data-email]').forEach(el => el.textContent = c.contactEmail);
    document.querySelectorAll('[data-email-row]').forEach(el => el.hidden = false);
  }
  try {
    const u = new URL(c.siteUrl);
    if (u.protocol === 'https:' && document.body.dataset.page !== 'placeholder') {
      const canonical = document.createElement('link'); canonical.rel = 'canonical'; canonical.href = u.href; document.head.append(canonical);
      const og = document.createElement('meta'); og.setAttribute('property', 'og:url'); og.content = u.href; document.head.append(og);
    }
  } catch {}
})();
