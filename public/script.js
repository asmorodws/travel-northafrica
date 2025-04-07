

const container = document.getElementById("destinations");

fetch("destination.json")
  .then((response) => response.json())
  .then((destinations) => {
    const typeOrder = { country: 0, city: 1 };
    destinations.sort((a, b) => typeOrder[a.type] - typeOrder[b.type]);

    // ✅ Limit to only the first 10 destinations
    const limitedDestinations = destinations.slice(0, 10);

    limitedDestinations.forEach((dest, index) => {
      const isSlider = dest.images.length > 1;
      const section = document.createElement("section");
      section.className =
        "relative section-full snap-start flex flex-col justify-end text-white pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]";

      const imagesHTML = isSlider
        ? `
        <div class="absolute top-0 left-0 w-full h-full flex overflow-x-auto snap-x snap-mandatory scroll-smooth" id="slider${index}">
          ${dest.images
            .map(
              (img) =>
                `<img src="${img}" class="w-full h-full object-cover  object-[center_50%] flex-none snap-start" alt="${dest.title}"/>`
            )
            .join("")}
        </div>
        <div class="absolute bottom-[35%] left-4 z-30 flex gap-2 bg-black/40 p-2 px-4 rounded-full slider-nav" data-slider="slider${index}">
          ${dest.images
            .map(
              (_, i) =>
                `<button data-index="${i}" class="w-2.5 h-2.5 rounded-full border border-white"></button>`
            )
            .join("")}
        </div>
        `
        : `<img src="${dest.images[0]}" class="absolute inset-0 w-full h-full object-cover  object-[center_50%] z-0" alt="${dest.title}"/>`;

      section.innerHTML = `
        ${imagesHTML}
        <div class="relative z-30 bg-blue-100 text-gray-900 rounded-t-3xl p-6 space-y-2">
          <div class="mb-5">
            <button type="button" class="viewAllBtn items-center text-blue-500 gap-1 pb-4 text-sm font-bold text-blue sm:hidden flex">
              <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" class="text-sm transform rotate-180" viewBox="0 0 16 16" fill="currentColor"><path d="..."></path></svg>
              View All
            </button>
            <h2 class="text-4xl font-bold text-red-900 font-['Playfair_Display'] leading-snug">${dest.title.toUpperCase()}</h2>
            <h3 class="font-neue font-extrabold uppercase text-red-900">${dest.type.toUpperCase()} | ${dest.country.toUpperCase()}</h3>
          </div>
          <div class="flex mt-8 items-center">
            <a href="${dest.link}" class="w-full h-10 flex justify-center items-center bg-white px-4 py-2 rounded-full border border-gray-300 text-blue-600 font-semibold hover:bg-blue-200">
              Read more 
            </a>
          </div>
        </div>
      `;

      container.appendChild(section);
    });

    setupSliders();
    setupModalTriggers();
    setupTabs(destinations); // gunakan semua data dari JSON; // ⚠️ Pass the limited list to tabs too
  });


let globalDestinations = [];

function setupTabs(destinations) {
  globalDestinations = destinations;

  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabContent = document.getElementById("tabContent");

  function renderContent(type) {
    if (type === 'country') {
      const uniqueCountries = [...new Set(destinations.map(dest => dest.country))]
        .sort((a, b) => a.localeCompare(b));
  
      tabContent.innerHTML = `
        <div class="flex flex-col items-start gap-4">
          ${uniqueCountries.map(country => `
            <button class="text-2xl font-bold uppercase text-red-800 hover:text-blue-600 transition" data-country="${country}">
              ${country}
            </button>
          `).join('')}
        </div>`;
    } else {
      const filtered = destinations
        .filter(d => d.type === type)
        .sort((a, b) => a.title.localeCompare(b.title));
  
      tabContent.innerHTML = `
        <div class="flex flex-col items-start gap-4">
          ${filtered.map(dest => `
            <button class="text-2xl font-bold uppercase text-red-800 hover:text-blue-600 transition" data-title="${dest.title}">
              ${dest.title}
            </button>
          `).join('')}
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

  tabButtons[0]?.click(); // Trigger default tab
}
tabContent.addEventListener("click", (e) => {
  const countryTarget = e.target.closest("[data-country]");
  if (countryTarget) {
    const country = countryTarget.dataset.country;
    const section = [
      ...document.querySelectorAll("#destinations section"),
    ].find((sec) =>
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
    const section = [
      ...document.querySelectorAll("#destinations section"),
    ].find((sec) =>
      sec.querySelector("h2")?.textContent.includes(title.toUpperCase())
    );

    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      document.getElementById("canvaModal")?.classList.add("hidden");
    }
    return;
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
