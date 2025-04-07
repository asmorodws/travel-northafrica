class TripoolyLoader extends HTMLElement {
    connectedCallback() {
      this.innerHTML = `
        <div id="loader" class="fixed inset-0 z-[9999] flex items-center justify-center bg-white transition-opacity duration-700">
          <div class="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600 border-solid border-t-4"></div>
        </div>
      `;
  
      const loader = this.querySelector("#loader");
      const start = performance.now(); // Waktu mulai
  
      window.addEventListener("load", () => {
        const end = performance.now(); // Waktu load selesai
        const elapsed = end - start;
        const minDisplay = 1000; // 1 detik minimum
  
        const delay = Math.max(0, minDisplay - elapsed);
  
        setTimeout(() => {
          loader.classList.add("opacity-0");
  
          setTimeout(() => {
            loader.style.display = "none";
          }, 700); // Sesuai transition-opacity duration
        }, delay);
      });
    }
  }
  
  customElements.define("tripooly-loader", TripoolyLoader);
  