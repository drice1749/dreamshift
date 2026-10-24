// The night timeline's scroll effect for browsers without CSS scroll-driven
// animations (see home.css): the line fills as you scroll, and each screen is
// full size at the middle of the window, smaller above and below.
(function () {
  if (window.CSS && CSS.supports('animation-timeline: view()')) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var line = document.querySelector('.timeline');
  var imgs = Array.prototype.slice.call(document.querySelectorAll('.vis img'));
  if (!line || !imgs.length) return;
  var queued = false;
  function update() {
    queued = false;
    var h = window.innerHeight;
    var r = line.getBoundingClientRect();
    var lit = (h * 0.6 - r.top) / r.height;
    line.style.setProperty('--lit', Math.max(0, Math.min(1, lit)).toFixed(3));
    imgs.forEach(function (img) {
      var b = img.getBoundingClientRect();
      var off = Math.abs(b.top + b.height / 2 - h / 2) / (h / 2 + b.height / 2);   // 0 at the middle
      var t = Math.max(0, Math.min(1, off));
      img.style.setProperty('--zoom', (1 - 0.16 * t).toFixed(3));
      img.style.setProperty('--glow', (1 - 0.6 * t).toFixed(3));
    });
  }
  function onScroll() { if (!queued) { queued = true; requestAnimationFrame(update); } }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  update();
})();
