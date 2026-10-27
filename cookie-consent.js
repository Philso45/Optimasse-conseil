(function () {
  'use strict';

  var STORAGE_KEY = 'om_cookie_consent';
  var PIXEL_ID = '1036304956133147';
  var pixelLoaded = false;

  function getConsent() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      return null;
    }
  }

  function setConsent(value) {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch (e) { /* ignore */ }
  }

  /**
   * Charge le Meta Pixel si absent du head (pages secondaires).
   * Sur index.html le snippet est déjà en haut du <head> : on ne re-track pas PageView.
   */
  function loadMetaPixel() {
    if (pixelLoaded || typeof window === 'undefined') return;
    pixelLoaded = true;

    if (typeof window.fbq === 'function') {
      return;
    }

    !(function (f, b, e, v, n, t, s) {
      if (f.fbq) return;
      n = f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = !0;
      n.version = '2.0';
      n.queue = [];
      t = b.createElement(e);
      t.async = !0;
      t.src = v;
      s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s);
    })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

    window.fbq('init', PIXEL_ID);
    window.fbq('track', 'PageView');
  }

  function hideBanner(banner) {
    if (!banner) return;
    banner.setAttribute('hidden', '');
    banner.classList.add('hidden');
  }

  function showBanner(banner) {
    if (!banner) return;
    banner.removeAttribute('hidden');
    banner.classList.remove('hidden');
  }

  function buildBanner() {
    var banner = document.createElement('div');
    banner.id = 'cookie-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-live', 'polite');
    banner.setAttribute('aria-label', 'Consentement aux cookies');
    banner.className =
      'fixed inset-x-0 bottom-0 z-[100] border-t border-white/10 bg-night/95 text-slate-200 shadow-[0_-12px_40px_-16px_rgba(15,23,42,0.45)] backdrop-blur-md';

    banner.innerHTML =
      '<div class="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-4 sm:flex-row sm:items-center sm:justify-between lg:px-8">' +
      '<p class="text-sm leading-relaxed text-slate-300 sm:max-w-2xl">' +
      'Nous utilisons des cookies pour analyser notre trafic et mesurer l\'efficacité de nos campagnes. ' +
      '<a href="/politique-confidentialite" class="font-medium text-emerald underline-offset-2 hover:text-emerald-400 hover:underline">En savoir plus</a>.' +
      '</p>' +
      '<div class="flex shrink-0 flex-wrap gap-2">' +
      '<button type="button" id="cookie-refuse" ' +
      'class="inline-flex items-center justify-center rounded-md border border-white/20 px-4 py-2.5 text-sm font-medium text-white transition hover:border-white/40 hover:bg-white/5">' +
      'Refuser</button>' +
      '<button type="button" id="cookie-accept" ' +
      'class="inline-flex items-center justify-center rounded-md bg-emerald px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-600">' +
      'Accepter</button>' +
      '</div></div>';

    document.body.appendChild(banner);

    banner.querySelector('#cookie-accept').addEventListener('click', function () {
      setConsent('accepted');
      hideBanner(banner);
      loadMetaPixel();
    });

    banner.querySelector('#cookie-refuse').addEventListener('click', function () {
      setConsent('refused');
      hideBanner(banner);
    });

    return banner;
  }

  function init() {
    var consent = getConsent();
    /* Sur la home le Pixel est déjà dans le <head> : pas de second PageView. */
    if (typeof window.fbq === 'function') {
      pixelLoaded = true;
      if (consent !== 'refused' && consent !== 'accepted') {
        buildBanner();
      }
      return;
    }
    if (consent === 'accepted') {
      loadMetaPixel();
      return;
    }
    if (consent === 'refused') {
      return;
    }
    buildBanner();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
