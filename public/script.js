const container = document.getElementById("destinations");

fetch("destination.json")
  .then((response) => response.json())
  .then((destinations) => {
    const typeOrder = { country: 0, city: 1 };
    destinations.sort((a, b) => typeOrder[a.type] - typeOrder[b.type]);

    const limitedDestinations = destinations.slice(0, 10);

    limitedDestinations.forEach((dest, index) => {
      const hasInstagram =
        Array.isArray(dest.instagram) && dest.instagram.length > 0;

      const section = document.createElement("section");
      section.className =
        "relative section-full snap-start flex flex-col justify-end text-white pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] overflow-y-hidden overflow-x-clip";

        const sliderHTML = hasInstagram
        ? `
        <div class="absolute top-0 left-0 w-full h-[80%] z-10 flex overflow-x-auto overflow-y-hidden pb-10 snap-x snap-mandatory scroll-smooth" id="slider${index}">
          ${dest.instagram.map((insta) => `
            <div class="w-full h-full flex-none snap-start flex flex-col bg-white overflow-hidden">
              <!-- Header -->
              <div class="flex items-center px-4 py-3 shrink-0">
                <img class="w-10 h-10 rounded-full object-cover border border-gray-300 mr-3"
                  src="${insta.profilePic}"
                  alt="@${insta.username}" loading="lazy">
                <div class="flex flex-col">
                  <span class="text-sm font-semibold text-gray-900">@${insta.username}</span>
                  <span class="text-xs text-gray-500">${insta.location || dest.title}</span>
                </div>
              </div>
      
              <!-- Image -->
              <div class="relative flex-1 overflow-hidden">
                <img class="absolute inset-0 w-full h-full object-cover object-center"
                  src="${insta.postImage}" alt="Instagram post by @${insta.username}" loading="lazy">
              </div>
      
              <!-- Footer -->
              <div class="shrink-0 px-4 py-3 text-sm text-blue-500 font-medium">
                <a href="/login?redirect=${encodeURIComponent(insta.postUrl)}" target="_blank" rel="noopener noreferrer">
  View more on Instagram
</a>

              </div>
              <hr>
      
              <div class="shrink-0 flex items-center gap-4 px-4 pt-2 text-gray-700 text-sm">
                <div class="flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" class="size-6" fill="none" viewBox="0 0 24 24"
                    stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                  </svg>
                </div>
                <div class="flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" class="size-6" fill="none" viewBox="0 0 24 24"
                    stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z" />
                  </svg>
                </div>
                <div class="flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" class="size-6" fill="none" viewBox="0 0 24 24"
                    stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15" />
                  </svg>
                </div>
              </div>
      
              <p class="shrink-0 text-black text-sm font-semibold px-5 py-2">${insta.likes || 0} Likes</p>
            </div>
          `).join("")}
        </div>
      
        <!-- Dot Navigation -->
        <div class="absolute bottom-[27%] right-4 z-20 flex gap-2 bg-black/40 p-2 px-4 rounded-full slider-nav" data-slider="slider${index}">
          ${dest.instagram.map((_, i) =>
            `<button data-index="${i}" class="w-2.5 h-2.5 rounded-full border border-white${i === 0 ? " active" : ""}"></button>`
          ).join("")}
        </div>
      `
      : "";
      

      const contentHTML = `
        <div class="relative z-30 h-[25%] bg-blue-100 text-gray-900 rounded-t-3xl px-6 py-3 space-y-2 mt-auto">
          <div class="py-2">
            <button type="button" class="viewAllBtn items-center text-blue-500 gap-1 pb-4 text-sm font-bold text-blue sm:hidden flex">
              <svg xmlns="http://www.w3.org/2000/svg" class="size-4" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
              </svg>
              View All
            </button>
            <h2 class="text-4xl font-bold text-red-900 font-['Playfair_Display'] leading-snug">${dest.title.toUpperCase()}</h2>
            <h3 class="font-neue font-extrabold uppercase text-red-900">${dest.type.toUpperCase()} | ${dest.country.toUpperCase()}</h3>
          </div>
        </div>
      `;

      section.innerHTML = sliderHTML + contentHTML;
      container.appendChild(section);
    });

    setupSliders();
    setupModalTriggers();
    setupTabs(destinations);
  });

let globalDestinations = [];

function setupTabs(destinations) {
  globalDestinations = destinations;

  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabContent = document.getElementById("tabContent");

  function renderContent(type) {
    if (type === "country") {
      const uniqueCountries = [...new Set(destinations.map((dest) => dest.country))].sort((a, b) => a.localeCompare(b));
      tabContent.innerHTML = `
        <div class="flex flex-col items-start gap-4">
          ${uniqueCountries.map((country) => `<button class="text-2xl font-bold uppercase text-red-800 hover:text-blue-600 transition" data-country="${country}">${country}</button>`).join("")}
        </div>`;
    } else {
      const filtered = destinations.filter((d) => d.type === type).sort((a, b) => a.title.localeCompare(b.title));
      tabContent.innerHTML = `
        <div class="flex flex-col items-start gap-4">
          ${filtered.map((dest) => `<button class="text-2xl font-bold uppercase text-red-800 hover:text-blue-600 transition" data-title="${dest.title}">${dest.title}</button>`).join("")}
        </div>`;
    }
  }

  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      tabButtons.forEach((b) => {
        b.classList.remove("bg-red-800", "text-white");
        b.classList.add("border", "border-blue-500", "text-blue-500");
      });

      btn.classList.remove("border", "border-blue-500", "text-blue-500");
      btn.classList.add("bg-red-800", "text-white");

      tabContent.classList.add("opacity-0");
      setTimeout(() => {
        renderContent(btn.dataset.type);
        tabContent.classList.remove("opacity-0");
      }, 200);
    });
  });

  tabButtons[0]?.click();
}

tabContent.addEventListener("click", (e) => {
  const countryTarget = e.target.closest("[data-country]");
  if (countryTarget) {
    const country = countryTarget.dataset.country;
    const section = [...document.querySelectorAll("#destinations section")].find((sec) =>
      sec.querySelector("h3")?.textContent.includes(country.toUpperCase())
    );
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      document.getElementById("canvaModal")?.classList.add("hidden");
    }
    return;
  }

  const cityTarget = e.target.closest("[data-title]");
  if (cityTarget) {
    const title = cityTarget.dataset.title;
    const section = [...document.querySelectorAll("#destinations section")].find((sec) =>
      sec.querySelector("h2")?.textContent.includes(title.toUpperCase())
    );
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      document.getElementById("canvaModal")?.classList.add("hidden");
    }
  }
});

function setupSliders() {
  document.querySelectorAll(".slider-nav").forEach((nav) => {
    const sliderId = nav.dataset.slider;
    const slider = document.getElementById(sliderId);
    const buttons = nav.querySelectorAll("button");

    buttons[0]?.classList.add("active");

    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const index = parseInt(btn.dataset.index);
        slider.scrollTo({
          left: slider.clientWidth * index,
          behavior: "smooth",
        });

        buttons.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
      });
    });

    slider.addEventListener("scroll", () => {
      const scrollLeft = slider.scrollLeft;
      const width = slider.clientWidth;
      const index = Math.round(scrollLeft / width);

      buttons.forEach((b, i) => {
        b.classList.toggle("active", i === index);
      });
    });
  });
}

function setupModalTriggers() {
  const modal = document.getElementById("canvaModal");
  const openBtns = document.querySelectorAll(".viewAllBtn");
  const closeBtn = document.getElementById("closeModal");

  openBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      modal?.classList.remove("hidden");
    });
  });

  closeBtn?.addEventListener("click", () => {
    modal?.classList.add("hidden");
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal?.classList.add("hidden");
    }
  });
}
