document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    document.querySelector(link.getAttribute('href'))
      .scrollIntoView({ behavior: 'smooth' });
  });
});


const selectors = ['.txt1', '.txt2', '.txt3', '.txt3a'];
const texts = {};

// Cache & clear
selectors.forEach(selector => {
  const el = document.querySelector(selector);
  if (el) {
    texts[selector] = el.textContent;
    el.textContent = '';
  }
});

// typing the text
typeSequentially(0);

function typeSequentially(index) {
  if (index >= selectors.length) return;

  const selector = selectors[index];
  const element = document.querySelector(selector);
  const text = texts[selector] || '';
  let i = 0;

  function typeWriter() {
    if (i < text.length) {
      element.textContent += text.charAt(i++);
      setTimeout(typeWriter, 100);
    } else {
      typeSequentially(index + 1);
    }
  }

  typeWriter();
}
