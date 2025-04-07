class TripoolyFooter extends HTMLElement {
    constructor() {
      super();
  
      this.innerHTML = `
        <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
        <section class="section-full snap-start bg-gray-900 text-white flex flex-col justify-center py-16">
          <div class="max-w-6xl px-5 mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          
            <div>
              <h2 class="text-2xl font-bold text-white">Tripooly</h2>
              <p class="mt-4 text-gray-300">
                Discover the best destinations in North Africa with Tripooly. Explore cities, culture, and hidden gems like never before.
              </p>
            </div>
  
            <div>
              <h3 class="text-xl font-semibold mb-4">Quick Links</h3>
              <ul class="space-y-2 text-gray-300">
                <li><a href="#" class="hover:text-white transition">About Us</a></li>
                <li><a href="#" class="hover:text-white transition">Contact</a></li>
               
              </ul>
            </div>
  
            <div>
              <h3 class="text-xl font-semibold mb-4">Contact</h3>
              <p class="text-gray-300 mb-2">Email: <a href="mailto:support@tripooly.com" class="hover:text-white">support@tripooly.com</a></p>
              <p class="text-gray-300 mb-4">Phone: <a href="tel:+1234567890" class="hover:text-white">+1 234 567 890</a></p>
              
              <div class="flex space-x-4 mt-4">
                <a href="#" aria-label="Facebook" class="text-gray-300 hover:text-white">
                  <svg class="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M22 12a10 10 0 1 0-11.5 9.9v-7H8v-2.9h2.5V9.5c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.3.2 2.3.2v2.5H15c-1.2 0-1.6.7-1.6 1.5v1.8h2.8L16.7 15h-2.3v7A10 10 0 0 0 22 12z"/></svg>
                </a>
                <a href="#" aria-label="Instagram" class="text-gray-300 hover:text-white">
                  <svg class="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M7 2C4.8 2 3 3.8 3 6v12c0 2.2 1.8 4 4 4h10c2.2 0 4-1.8 4-4V6c0-2.2-1.8-4-4-4H7zm0 2h10c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H7c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zm5 2.9a5.1 5.1 0 1 0 0 10.2 5.1 5.1 0 0 0 0-10.2zm0 2.1a3 3 0 1 1 0 6.1 3 3 0 0 1 0-6.1zm4.6-.6a1.2 1.2 0 1 1-2.4 0 1.2 1.2 0 0 1 2.4 0z"/></svg>
                </a>
                <a href="#" aria-label="Twitter" class="text-gray-300 hover:text-white">
                  <svg class="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 0 1-3.2.9 4.5 4.5 0 0 0 2-2.5 9.6 9.6 0 0 1-3 1.2A4.8 4.8 0 0 0 16.5 2a4.7 4.7 0 0 0-4.7 4.7c0 .4 0 .8.1 1.1A13.2 13.2 0 0 1 3.1 2.4a4.7 4.7 0 0 0-.6 2.3c0 1.6.8 3 2 3.8a4.6 4.6 0 0 1-2.1-.6v.1a4.7 4.7 0 0 0 3.8 4.6 5 5 0 0 1-2.1.1 4.7 4.7 0 0 0 4.4 3.3A9.5 9.5 0 0 1 2 19.6a13.3 13.3 0 0 0 7.2 2.1c8.6 0 13.3-7.1 13.3-13.3v-.6A9.5 9.5 0 0 0 23 3z"/></svg>
                </a>
              </div>
            </div>
          </div>
  
          <div class="text-center text-gray-500 text-sm mt-10">
            &copy; 2025 Tripooly. All rights reserved.
          </div>
        </section>
      `;
    }
  }
  
  customElements.define('tripooly-footer', TripoolyFooter);
  