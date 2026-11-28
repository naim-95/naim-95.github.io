document.addEventListener('DOMContentLoaded', () => {
  // Set footer year
  const yearSpan = document.getElementById('current-year');
  if (yearSpan) {
    yearSpan.textContent = String(new Date().getFullYear());
  }

  // Mobile Menu Toggle
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileItems = document.querySelectorAll('.mobile-nav-item');

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      mobileDrawer.classList.toggle('hidden');
    });

    mobileItems.forEach((item) => {
      item.addEventListener('click', () => {
        mobileDrawer.classList.add('hidden');
      });
    });
  }

  // Project Specification Accordion
  const triggers = document.querySelectorAll('.accordion-trigger');

  triggers.forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const content = trigger.nextElementSibling;
      const label = trigger.querySelector('.toggle-label');
      const isExpanded = trigger.getAttribute('aria-expanded') === 'true';

      trigger.setAttribute('aria-expanded', String(!isExpanded));
      if (content) {
        content.classList.toggle('hidden');
      }

      if (label) {
        label.textContent = isExpanded ? '[+ EXPAND]' : '[- COLLAPSE]';
      }
    });
  });

  // One-Click Email Copy
  const copyBtn = document.getElementById('copy-btn');
  if (copyBtn) {
    copyBtn.addEventListener('click', async () => {
      const email = copyBtn.getAttribute('data-email');
      const originalLabel = copyBtn.textContent;
      try {
        await navigator.clipboard.writeText(email);
        copyBtn.textContent = 'COPIED TO CLIPBOARD ✓';
        setTimeout(() => {
          copyBtn.textContent = originalLabel;
        }, 2200);
      } catch (err) {
        window.location.href = `mailto:${email}`;
      }
    });
  }

  // Image Lightbox Viewer
  const lightbox = document.getElementById('image-lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.getElementById('lightbox-close');
  const zoomableImages = document.querySelectorAll('img[data-lightbox-src], #systems figure img');

  function openLightbox(src, caption, alt) {
    if (!lightbox || !lightboxImg || !src) return;
    lightboxImg.src = src;
    lightboxImg.alt = alt || caption || 'Expanded project image';
    if (lightboxCaption) {
      lightboxCaption.textContent = caption || alt || 'Project Figure';
    }
    lightbox.classList.remove('hidden');
    lightbox.classList.add('flex');
    document.body.classList.add('lightbox-open');
  }

  function closeLightbox() {
    if (!lightbox || !lightboxImg) return;
    lightbox.classList.add('hidden');
    lightbox.classList.remove('flex');
    lightboxImg.src = '';
    document.body.classList.remove('lightbox-open');
  }

  zoomableImages.forEach((img) => {
    img.classList.add('cursor-zoom-in');
    img.addEventListener('click', () => {
      const figCaption = img.closest('figure')?.querySelector('figcaption')?.textContent?.trim();
      const src = img.getAttribute('data-lightbox-src') || img.getAttribute('src');
      const caption = img.getAttribute('data-lightbox-caption') || figCaption || img.alt;
      openLightbox(src, caption, img.alt);
    });
  });

  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }

  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox && !lightbox.classList.contains('hidden')) {
      closeLightbox();
    }
  });
});