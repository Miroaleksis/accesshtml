// Site header web component
class SiteHeader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <header class="site-header">
        <a href="#main-content" class="skip-link button">Skip to main content</a>
        <a href="index.html" class="site-logo">
          <img src="images/Logo.svg" alt="Home page">
        </a>
        <button class="nav-toggle icon" aria-label="Main menu" aria-expanded="false" aria-controls="site-nav"></button>
        <nav id="site-nav" class="site-nav" aria-label="Main menu">
          <ul>
            <li><a href="index.html">Patterns</a></li>
            <li><a href="attributes.html">Elements & Attributes</a></li>
            <li><a href="about.html">About</a></li>
          </ul>
        </nav>
      </header>
    `;

    const path = window.location.pathname;
    this.querySelectorAll('.site-nav a').forEach(link => {
      const href = link.getAttribute('href');
      if (path.endsWith(href) || (href === 'index.html' && (path.endsWith('/') || path === '/'))) {
        link.setAttribute('aria-current', 'page');
      }
    });

    const toggle = this.querySelector('.nav-toggle');
    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
    });
  }
}
customElements.define('site-header', SiteHeader);

// Breadcrumb bar web component
class BreadcrumbBar extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <nav class="breadcrumb-bar" aria-label="Breadcrumb">
        <ol class="breadcrumb-trail"></ol>
      </nav>
    `;

    const trail = this.querySelector('.breadcrumb-trail');
    const h1 = document.querySelector('h1');
    const parentMeta = document.querySelector('meta[name="breadcrumb-parent"]');

    function createItem(text, href, current) {
      const li = document.createElement('li');
      li.className = 'icon';
      if (current) {
        li.setAttribute('aria-current', 'page');
        li.textContent = text;
      } else {
        const a = document.createElement('a');
        a.href = href;
        a.textContent = text;
        li.appendChild(a);
      }
      return li;
    }

    trail.appendChild(createItem('Patterns', 'index.html'));

    if (parentMeta) {
      const [url, label] = parentMeta.content.split('|');
      trail.appendChild(createItem(label, url));
    }

    if (h1) trail.appendChild(createItem(h1.textContent, null, true));
  }
}
customElements.define('breadcrumb-bar', BreadcrumbBar);

// On This Page web component
class OnThisPage extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <aside class="page-aside">
        <div class="on-this-page">
          <h2>On This Page</h2>
          <ol class="on-this-page-links"></ol>
        </div>
      </aside>
    `;

    const buildList = () => {
      const list = this.querySelector('.on-this-page-links');
      document.querySelectorAll('.page-section h2, .page-description h2').forEach(el => {
        const text = el.textContent.trim();
        if (!el.id) {
          el.id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
        }
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = '#' + el.id;
        a.textContent = text;
        li.appendChild(a);
        list.appendChild(li);
      });
    };

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', buildList);
    } else {
      buildList();
    }
  }
}
customElements.define('on-this-page', OnThisPage);

// Site footer web component
class SiteFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <footer class="site-footer">
        <div class="site-footer-main">
          <a href="index.html" class="site-logo">
            <img src="images/Logo.svg" alt="Home page">
          </a>
          <div class="site-footer-links">
            <nav aria-labelledby="footer-nav-1-heading">
              <h2 id="footer-nav-1-heading">Library</h2>
              <ul>
                <li><a href="index.html">Patterns</a></li>
                <li><a href="attributes.html">Elements & Attributes</a></li>
                <li><a href="about.html">About</a></li>
              </ul>
            </nav>
            <nav aria-labelledby="footer-nav-2-heading">
              <h2 id="footer-nav-2-heading">Resources</h2>
              <ul>
                <li><a href="contact.html">Contact</a></li>
                <li><a href="accessibility-statement.html">Accessibility Statement</a></li>
                <li><a href="how-this-site-was-made.html">How This Site Was Made</a></li>
              </ul>
            </nav>
          </div>
        </div>
        <div class="site-footer-sub">
          <p>© 2026</p>
          <a href="#top" class="icon">Back to top</a>
        </div>
      </footer>
    `;
  }
}
customElements.define('site-footer', SiteFooter);
