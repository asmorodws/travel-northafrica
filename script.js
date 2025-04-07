  const container = document.getElementById('destinations');

  fetch('destination.json')
    .then(response => response.json())
    .then(destinations => {
        const typeOrder = { country: 0, city: 1 };

        destinations.sort((a, b) => {
          return typeOrder[a.type] - typeOrder[b.type];
        });
    
      destinations.forEach((dest, index) => {
        const isSlider = dest.images.length > 1;
        const section = document.createElement('section');
        section.className = 'relative section-full snap-start flex flex-col justify-end text-white pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]';
        
        const imagesHTML = isSlider
          ? `
          <div class="absolute top-0 left-0 w-full h-full flex overflow-x-auto snap-x snap-mandatory scroll-smooth" id="slider${index}">
            ${dest.images.map(img => `<img src="${img}" class="w-full h-full sm:h-full sm:w-full object-cover object-center flex-none snap-start" alt="${dest.title}"/>
`).join('')}
          </div>
          <div class="absolute bottom-60 left-4 z-30 flex gap-2 bg-black/40 p-2 px-4 rounded-full slider-nav" data-slider="slider${index}">
            ${dest.images.map((_, i) => `<button data-index="${i}" class="w-2.5 h-2.5 rounded-full border border-white"></button>`).join('')}
          </div>
          `
          : `<img src="${dest.images[0]}" class="absolute inset-0 w-full h-full object-cover object-center z-0" alt="${dest.title}"/>
`;

        section.innerHTML = `
          ${imagesHTML}
          <div class="relative z-30 bg-blue-100 text-gray-900 rounded-t-3xl p-6 space-y-2">
            <div class="mb-5">
                <button id="viewAllBtn" type="button" class="items-center text-blue-500 gap-1 pb-4 text-sm font-bold text-blue sm:hidden flex">
                  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" class="text-sm transform rotate-180" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M14.6942 7.70001C14.6564 7.60851 14.6006 7.52554 14.5302 7.45601L8.82315 1.75101C8.68031 1.6148 8.49052 1.53882 8.29315 1.53882C8.09578 1.53882 7.90599 1.6148 7.76315 1.75101C7.69346 1.82066 7.63817 1.90336 7.60045 1.99439C7.56273 2.08541 7.54331 2.18298 7.54331 2.28151C7.54331 2.38004 7.56273 2.47761 7.60045 2.56863C7.63817 2.65966 7.69346 2.74236 7.76315 2.81201L12.1902 7.23901H1.93115C1.73224 7.23901 1.54147 7.31803 1.40082 7.45868C1.26017 7.59933 1.18115 7.7901 1.18115 7.98901C1.18115 8.18792 1.26017 8.37869 1.40082 8.51934C1.54147 8.65999 1.73224 8.73901 1.93115 8.73901H12.1902L7.76315 13.167C7.62647 13.3084 7.55078 13.4978 7.55239 13.6945C7.55401 13.8911 7.6328 14.0793 7.77179 14.2184C7.91078 14.3575 8.09885 14.4365 8.2955 14.4383C8.49215 14.4401 8.68164 14.3646 8.82315 14.228L14.5302 8.52101C14.6349 8.41609 14.7063 8.2826 14.7355 8.13726C14.7646 7.99193 14.7503 7.84121 14.6942 7.70401V7.70001Z"></path></svg>
                  View All
                </button>
               <h2 class="text-4xl font-bold text-red-900 font-['Playfair_Display'] leading-snug">${dest.title.toUpperCase()}</h2>
<h3 class="font-neue font-extrabold uppercase text-red-900">${dest.type.toUpperCase()} | ${dest.country.toUpperCase()}</h3>

            </div>
            <div class="flex mt-8 items-center">
              <a href="${dest.link}" class="w-full h-10 flex justify-center items-center bg-white px-4 py-2 rounded-full border border-gray-300 text-blue-600 font-semibold hover:bg-blue-200">
                Read more 
              </a>
              <button type="button" class="fh-10 flex justify-center items-center bg-white p-3 mx-2 rounded-full border border-gray-300 text-blue-600 font-semibold hover:bg-blue-200"><svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.5385 0.167877C10.4589 0.0873547 10.3558 0.0324505 10.2429 0.0105797C10.1301 -0.0112912 10.0131 0.000924944 9.90764 0.0455782C9.80591 0.0901223 9.71946 0.161944 9.65848 0.252565C9.5975 0.343186 9.56455 0.448824 9.56351 0.557009V3.99249C7.01009 4.13698 4.60991 5.22083 2.85319 7.02267C1.09647 8.82451 0.115749 11.2084 0.111328 13.6874V15.4775C0.111378 15.5917 0.147744 15.7032 0.215478 15.7967C0.283212 15.8902 0.379023 15.9612 0.489874 16H0.684883C0.769733 15.9988 0.853374 15.9803 0.930424 15.9458C1.00747 15.9114 1.07623 15.8616 1.13226 15.7999L2.11877 14.6881C3.03653 13.6292 4.16875 12.7641 5.44536 12.1464C6.72197 11.5287 8.11579 11.1715 9.54056 11.0969V14.4991C9.5394 14.6091 9.57132 14.7172 9.63243 14.81C9.69354 14.9027 9.78119 14.9763 9.8847 15.0216C9.99113 15.0605 10.1067 15.0696 10.2182 15.048C10.3297 15.0264 10.4328 14.9749 10.5156 14.8993L17.7195 7.91717C17.7732 7.86549 17.8159 7.80401 17.845 7.73626C17.8741 7.66852 17.8891 7.59586 17.8891 7.52248C17.8891 7.44909 17.8741 7.37643 17.845 7.30869C17.8159 7.24095 17.7732 7.17946 17.7195 7.12778L10.5385 0.167877ZM10.7106 13.1427V10.5077C10.7106 10.3602 10.6502 10.2188 10.5426 10.1146C10.4351 10.0103 10.2892 9.95177 10.1371 9.95177C8.4454 9.95022 6.7739 10.3077 5.24003 10.9992C3.70616 11.6907 2.34713 12.6993 1.25844 13.9543V13.6874C1.25994 12.5574 1.49109 11.4386 1.93867h-10 flex justify-center items-center bg-white px-4 py-2 rounded-full border border-gray-300 text-blue-600 font-semibold hover:bg-blue-200 10.3952C2.38625 9.35166 3.04151 8.40382 3.86703 7.60577C4.69256 6.80772 5.67217 6.17508 6.74996 5.74397C7.82774 5.31286 8.98257 5.09172 10.1485 5.09318C10.3006 5.09318 10.4465 5.03461 10.5541 4.93036C10.6617 4.82611 10.7221 4.68471 10.7221 4.53728V1.90229L16.4576 7.51692L10.7106 13.1427Z" fill="#0057D9"></path><path d="M10.7106 13.1427V10.5077C10.7106 10.3602 10.6502 10.2188 10.5426 10.1146C10.4351 10.0103 10.2892 9.95177 10.1371 9.95177C8.4454 9.95022 6.7739 10.3077 5.24003 10.9992C3.70616 11.6907 2.34713 12.6993 1.25844 13.9543V13.6874C1.25994 12.5574 1.49109 11.4386 1.93867 10.3952C2.38625 9.35166 3.04151 8.40382 3.86703 7.60577C4.69256 6.80772 5.67217 6.17508 6.74996 5.74397C7.82774 5.31286 8.98257 5.09172 10.1485 5.09318C10.3006 5.09318 10.4465 5.03461 10.5541 4.93036C10.6617 4.82611 10.7221 4.68471 10.7221 4.53728V1.90229L16.4576 7.51692L10.7106 13.1427Z" fill="#0057D9"></path></svg></button>
            </div>
          </div>
        `;
        container.appendChild(section);
      });

      setupSliders();
      setupModalTriggers();
      setupTabs(destinations); // <-- add this
    });

    let globalDestinations = [];

    function setupTabs(destinations) {
      globalDestinations = destinations;
    
      const tabButtons = document.querySelectorAll('.tab-btn');
      const tabContent = document.getElementById('tabContent');
    
      function renderContent(type) {
        const filtered = destinations.filter(d => d.type === type);
        tabContent.innerHTML = filtered.map(dest => `
          <div class="text-2xl font-bold uppercase text-red-800">${dest.title}</div>
        `).join('');
      }
    
      tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
          tabButtons.forEach(b => {
            b.classList.remove('bg-red-800', 'text-white');
            b.classList.add('border', 'border-blue-500', 'text-blue-500');
          });
    
          btn.classList.remove('border', 'border-blue-500', 'text-blue-500');
          btn.classList.add('bg-red-800', 'text-white');
    
          tabContent.classList.add('opacity-0');
          setTimeout(() => {
            renderContent(btn.dataset.type);
            tabContent.classList.remove('opacity-0');
          }, 200);
        });
      });
    
      // Trigger default
      tabButtons[0].click();
    }
    

  function setupSliders() {
    document.querySelectorAll('.slider-nav').forEach(nav => {
      const sliderId = nav.dataset.slider;
      const slider = document.getElementById(sliderId);
      const buttons = nav.querySelectorAll('button');

      buttons[0]?.classList.add('active');

      buttons.forEach(btn => {
        btn.addEventListener('click', () => {
          const index = parseInt(btn.dataset.index);
          slider.scrollTo({ left: slider.clientWidth * index, behavior: 'smooth' });

          buttons.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
        });
      });

      slider.addEventListener('scroll', () => {
        const scrollLeft = slider.scrollLeft;
        const width = slider.clientWidth;
        const index = Math.round(scrollLeft / width);

        buttons.forEach((b, i) => {
          b.classList.toggle('active', i === index);
        });
      });
    });
  }

  function setupModalTriggers() {
    const modal = document.getElementById('canvaModal');
    const openBtns = document.querySelectorAll('#viewAllBtn');
    const closeBtn = document.getElementById('closeModal');

    openBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        modal?.classList.remove('hidden');
      });
    });

    closeBtn?.addEventListener('click', () => {
      modal?.classList.add('hidden');
    });

    window.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal?.classList.add('hidden');
      }
    });
  }
