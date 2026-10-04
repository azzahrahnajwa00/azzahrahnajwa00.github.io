/* =========================================================
   Portofolio Najwa Az Zahrah — js/main.js
   ========================================================= */
(function () {
  "use strict";

  /* ---------- 1. Tahun di footer ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- 2. Header berubah saat digulir ---------- */
  var header = document.getElementById("header");
  function onScrollHeader() {
    if (!header) return;
    header.classList.toggle("scrolled", window.scrollY > 40);
  }
  window.addEventListener("scroll", onScrollHeader, { passive: true });
  onScrollHeader();

  /* ---------- 3. Menu navigasi (mobile) ---------- */
  var navToggle = document.getElementById("navToggle");
  var nav = document.getElementById("nav");

  function closeNav() {
    if (!nav || !navToggle) return;
    nav.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  }

  if (navToggle && nav) {
    navToggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });
    nav.querySelectorAll(".nav-link").forEach(function (link) {
      link.addEventListener("click", closeNav);
    });
  }

  /* ---------- 4. Highlight menu sesuai posisi scroll ---------- */
  var sections = Array.prototype.slice.call(document.querySelectorAll("main section[id]"));
  var navLinks = Array.prototype.slice.call(document.querySelectorAll(".nav-link"));

  function setActiveLink() {
    var pos = window.scrollY + 130;
    var currentId = sections.length ? sections[0].id : "";
    sections.forEach(function (sec) {
      if (sec.offsetTop <= pos) currentId = sec.id;
    });
    navLinks.forEach(function (link) {
      link.classList.toggle("active", link.getAttribute("href") === "#" + currentId);
    });
  }
  window.addEventListener("scroll", setActiveLink, { passive: true });
  setActiveLink();

  /* ---------- 5. Animasi muncul saat digulir ---------- */
  var revealEls = document.querySelectorAll(".reveal");

  function countUp(el) {
    var target = parseInt(el.getAttribute("data-count"), 10) || 0;
    var duration = 1300;
    var start = performance.now();
    function frame(now) {
      var progress = Math.min((now - start) / duration, 1);
      el.textContent = Math.floor(progress * target);
      if (progress < 1) requestAnimationFrame(frame);
      else el.textContent = target + "+";
    }
    requestAnimationFrame(frame);
  }

  if ("IntersectionObserver" in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.15 });
    revealEls.forEach(function (el) { revealObserver.observe(el); });

    var barObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("animate");
        barObserver.unobserve(entry.target);
      });
    }, { threshold: 0.4 });
    document.querySelectorAll(".bar span").forEach(function (b) { barObserver.observe(b); });

    var statObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        countUp(entry.target);
        statObserver.unobserve(entry.target);
      });
    }, { threshold: 0.6 });
    document.querySelectorAll(".stat-num").forEach(function (n) { statObserver.observe(n); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("visible"); });
    document.querySelectorAll(".bar span").forEach(function (b) { b.classList.add("animate"); });
    document.querySelectorAll(".stat-num").forEach(function (n) {
      n.textContent = n.getAttribute("data-count") + "+";
    });
  }
  /* ---------- 6. Galeri karya (dibuat dari data) ---------- */
  var artworks = [
    { src: "assets/karya-1.jpg", title: "Karakter Wanita",       cat: "Ilustrasi Karakter" },
    { src: "assets/karya-2.jpg", title: "Duo Bertelinga Hewan",   cat: "Ilustrasi Digital" },
    { src: "assets/karya-3.jpg", title: "Gitaris Berambut Putih", cat: "Desain Karakter" },
    { src: "assets/karya-4.jpg", title: "Original Character",     cat: "Ilustrasi Karakter" },
    { src: "assets/karya-5.jpg", title: "Adegan Melankolis",      cat: "Digital Painting" },
    { src: "assets/karya-6.jpg", title: "Chibi Bertopi",          cat: "Seni Chibi" }
  ];

  var gallery = document.getElementById("gallery");
  if (gallery) {
    artworks.forEach(function (art, i) {
      var item = document.createElement("figure");
      item.className = "gallery-item reveal";
      item.setAttribute("tabindex", "0");
      item.setAttribute("role", "button");
      item.setAttribute("aria-label", "Perbesar karya " + art.title);
      item.style.transitionDelay = (i * 70) + "ms";

      item.innerHTML =
        '<img src="' + art.src + '" alt="' + art.title + ' - karya digital art Najwa Az Zahrah" loading="lazy" />' +
        '<figcaption class="gallery-overlay">' +
          "<h4>" + art.title + "</h4>" +
          "<span>" + art.cat + "</span>" +
        "</figcaption>";

      item.addEventListener("click", function () { openLightbox(art); });
      item.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openLightbox(art); }
      });

      gallery.appendChild(item);
    });

    var galItems = gallery.querySelectorAll(".gallery-item");
    if ("IntersectionObserver" in window) {
      var galObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("visible");
          galObserver.unobserve(entry.target);
        });
      }, { threshold: 0.15 });
      galItems.forEach(function (el) { galObserver.observe(el); });
    } else {
      galItems.forEach(function (el) { el.classList.add("visible"); });
    }
  }

  /* ---------- 7. Lightbox ---------- */
  var lightbox = document.createElement("div");
  lightbox.className = "lightbox";
  lightbox.innerHTML =
    '<button class="lightbox-close" aria-label="Tutup">&times;</button><img alt="" />';
  document.body.appendChild(lightbox);

  var lightboxImg = lightbox.querySelector("img");

  function openLightbox(art) {
    lightboxImg.src = art.src;
    lightboxImg.alt = art.title;
    lightbox.classList.add("open");
    document.body.style.overflow = "hidden";
  }
  function closeLightbox() {
    lightbox.classList.remove("open");
    document.body.style.overflow = "";
  }
  lightbox.addEventListener("click", function (e) {
    if (e.target === lightbox || e.target.classList.contains("lightbox-close")) closeLightbox();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") { closeLightbox(); closeNav(); }
  });

  /* ---------- 8. Formulir kontak: validasi + kirim ke email (FormSubmit) ---------- */
  var form = document.getElementById("contactForm");
  var note = document.getElementById("formNote");
  var submitBtn = form ? form.querySelector('button[type="submit"]') : null;
  var submitLabel = submitBtn ? submitBtn.innerHTML : "";

  function showNote(text, type) {
    if (!note) return;
    note.textContent = text;
    note.className = "form-note " + (type || "");
  }

  function setSending(isSending) {
    if (!submitBtn) return;
    submitBtn.disabled = isSending;
    submitBtn.innerHTML = isSending
      ? 'Mengirim... <i class="fa-solid fa-spinner fa-spin"></i>'
      : submitLabel;
  }

  if (form) {
    form.addEventListener("submit", function (e) {
      var nama = form.nama.value.trim();
      var email = form.email.value.trim();
      var pesan = form.pesan.value.trim();
      var emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

      [form.nama, form.email, form.pesan].forEach(function (f) { f.classList.remove("error"); });
      note.className = "form-note";

      /* --- 1) Validasi dulu --- */
      if (!nama) { e.preventDefault(); form.nama.classList.add("error"); return showNote("Nama belum diisi.", "err"); }
      if (!emailOk) { e.preventDefault(); form.email.classList.add("error"); return showNote("Alamat email belum valid.", "err"); }
      if (!pesan) { e.preventDefault(); form.pesan.classList.add("error"); return showNote("Pesan belum diisi.", "err"); }

      /* --- 2) Kirim lewat AJAX supaya pengunjung tetap di halaman ini --- */
      e.preventDefault();
      setSending(true);
      showNote("Sedang mengirim pesanmu...", "");

      fetch(form.action.replace("formsubmit.co/", "formsubmit.co/ajax/"), {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({
          nama: nama,
          email: email,
          pesan: pesan,
          _subject: "Pesan baru dari Portofolio Najwa Az Zahrah",
          _template: "table",
          _captcha: "false"
        })
      })
        .then(function (res) {
          if (!res.ok) throw new Error("Gagal mengirim");
          return res.json();
        })
        .then(function () {
          setSending(false);
          showNote("Terima kasih, " + nama + "! Pesanmu sudah terkirim. \u2764", "ok");
          form.reset();
        })
        .catch(function () {
          /* --- 3) Cadangan: kalau AJAX tidak bisa (mis. dibuka dari file), kirim cara biasa --- */
          setSending(false);
          showNote("Mengalihkan ke pengiriman langsung...", "");
          form.submit();
        });
    });
  }

})();
