class NavBar extends HTMLElement {
  connectedCallback() {
    const currentPath = window.location.pathname;

    this.innerHTML = `
      <div x-data="{ open: false }" class="absolute top-0 left-0 w-full z-20 flex items-center justify-between p-4 bg-white">
        <!-- Logo -->
        <div class="flex items-center gap-2 text-blue-700 font-bold text-lg">
          
          Tripooly
        </div>

        <!-- Desktop Menu -->
        <div class="hidden md:flex items-center gap-6 text-blue-700 font-medium">
          <a href="/" class="nav-link" data-path="/">Home</a>
          <a href="/about" class="nav-link" data-path="/about-us.html">About</a>
          <a href="/contact" class="nav-link" data-path="/contact-us.html">Contact</a>
          <button class="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold hover:bg-blue-700">Sign in</button>
        </div>

        <!-- Hamburger -->
        <div class="md:hidden">
          <button @click="open = true" class="text-blue-700 focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        <!-- Fullscreen Mobile Menu -->
        <div 
          x-show="open" 
          x-transition:enter="transition ease-out duration-300" 
          x-transition:enter-start="opacity-0 scale-95" 
          x-transition:enter-end="opacity-100 scale-100" 
          x-transition:leave="transition ease-in duration-200" 
          x-transition:leave-start="opacity-100 scale-100" 
          x-transition:leave-end="opacity-0 scale-95" 
          class="fixed inset-0 z-50 bg-white flex flex-col items-center justify-center text-center p-8 space-y-6 text-blue-700"
          style="display: none;"
        >
          <!-- Close Button -->
          <button @click="open = false" class="absolute top-4 right-4 text-2xl text-blue-700">
            &times;
          </button>

          <!-- Menu Items -->
          <a href="/" class="nav-link text-lg font-semibold hover:text-blue-500" data-path="/">Home</a>
          <a href="/about" class="nav-link text-lg font-semibold hover:text-blue-500" data-path="/about">About</a>
          <a href="/contact" class="nav-link text-lg font-semibold hover:text-blue-500" data-path="/contact">Contact</a>
        </div>
      </div>
    `;

    // Highlight link sesuai path aktif
    const navLinks = this.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      const path = link.dataset.path;
      const isActive = (currentPath === path) || (currentPath === '/' && path === '/');
      if (isActive) {
        link.classList.add('text-blue-900', 'font-bold', 'underline');
      }
    });
  }
}

customElements.define('nav-bar', NavBar);
