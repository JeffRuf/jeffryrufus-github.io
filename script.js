// Footer year (safe)
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Scroll reveal animation (safe)
const els = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) e.target.classList.add("show");
      }
    },
    { threshold: 0.12 }
  );
  els.forEach((el) => io.observe(el));
} else {
  els.forEach((el) => el.classList.add("show"));
}

/* Cinematic hero strip slideshow */
const strip = document.querySelector(".visual-strip");
if (strip) {
  const images = [
    "https://iticollege.edu/wp-content/uploads/2025/03/3-1.jpeg",
    "https://erepublic.brightspotcdn.com/dims4/default/0da9238/2147483647/strip/true/crop/1119x583+0+23/resize/840x438!/quality/90/?url=http%3A%2F%2Ferepublic-brightspot.s3.us-west-2.amazonaws.com%2F7b%2F49%2F7295bf98e6d75ae4e77738bbe461%2Fshutterstock-1118639732.jpg",
    "https://www.allaboutai.com/wp-content/uploads/2024/09/turtlebot3-gazebo-maze-simulation.png",
    "https://global.discourse-cdn.com/nvidia/original/3X/6/6/66ff0270cbb7415dbed06f33aba1bf355ae84145.jpeg",
    "https://www.beningo.com/wp-content/uploads/2023/05/Screenshot-2023-05-08-at-3.38.58-PM-1024x549.png"
  ];

  const FADE_MS = 2200;  // match CSS
  const HOLD_MS = 9000;  // display time

  let i = 0;

  const setBg = (url) => {
    strip.style.backgroundImage = `url("${url}")`;
    strip.style.backgroundSize = "cover";
    strip.style.backgroundPosition = "center";
  };

  // preload
  images.forEach(src => { const img = new Image(); img.src = src; });

  setBg(images[0]);
  strip.style.opacity = "1";

  setInterval(() => {
    i = (i + 1) % images.length;
    strip.style.opacity = "0";
    setTimeout(() => {
      setBg(images[i]);
      strip.style.opacity = "1";
    }, FADE_MS);
  }, HOLD_MS);
}

/* =========================
   Fancy gallery lightbox
   ========================= */
function ensureLightbox() {
  let lb = document.querySelector(".lightbox");
  if (lb) return lb;

  lb = document.createElement("div");
  lb.className = "lightbox";
  lb.innerHTML = `
    <div class="lightbox-card" role="dialog" aria-modal="true" aria-label="Image viewer">
      <button class="lightbox-close" aria-label="Close">×</button>
      <img class="lightbox-img" alt="" />
      <div class="lightbox-cap"></div>
    </div>
  `;
  document.body.appendChild(lb);

  // Close actions
  const close = () => lb.classList.remove("show");
  lb.addEventListener("click", (e) => {
    if (e.target === lb) close();
  });
  lb.querySelector(".lightbox-close").addEventListener("click", close);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });

  return lb;
}

function hookGallery() {
  const images = document.querySelectorAll(".media-grid img");
  if (!images.length) return;

  const lb = ensureLightbox();
  const lbImg = lb.querySelector(".lightbox-img");
  const lbCap = lb.querySelector(".lightbox-cap");

  images.forEach((img) => {
    img.addEventListener("click", () => {
      const fig = img.closest("figure");
      const cap = fig ? fig.querySelector("figcaption") : null;

      lbImg.src = img.src;
      lbImg.alt = img.alt || "Project image";
      lbCap.textContent = cap ? cap.textContent : (img.alt || "");

      lb.classList.add("show");
    });
  });
}

hookGallery();

/* =========================
   Copy code buttons
   ========================= */
function hookCopyButtons() {
  document.querySelectorAll("[data-copy]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const targetId = btn.getAttribute("data-copy");
      const codeEl = document.getElementById(targetId);
      if (!codeEl) return;

      const text = codeEl.innerText;
      try {
        await navigator.clipboard.writeText(text);
        const old = btn.textContent;
        btn.textContent = "Copied ✓";
        setTimeout(() => (btn.textContent = old), 1200);
      } catch {
        const old = btn.textContent;
        btn.textContent = "Copy failed";
        setTimeout(() => (btn.textContent = old), 1200);
      }
    });
  });
}

hookCopyButtons();
