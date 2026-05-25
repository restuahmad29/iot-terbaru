function renderSidebar() {
  const sidebarContainer = document.getElementById("sidebar-container");
  if (!sidebarContainer) return;

  // Mendeteksi halaman aktif saat ini berdasarkan nama file URL
  const currentPath = window.location.pathname.split("/").pop();

  sidebarContainer.innerHTML = `
    <div class="md:hidden bg-emerald-950 text-white flex justify-between items-center p-4 w-full sticky top-0 z-50 shadow-md">
      <div class="flex items-center gap-2">
        <i data-lucide="sprout" class="w-6 h-6 text-emerald-400"></i>
        <span class="font-black text-lg tracking-tight">Smart Garden</span>
      </div>
      <button id="menu-toggle" class="p-2 rounded-xl bg-emerald-900 hover:bg-emerald-800 focus:outline-none transition-colors cursor-pointer">
        <i id="hamburger-icon" data-lucide="menu" class="w-6 h-6"></i>
        <i id="close-icon" data-lucide="x" class="w-6 h-6 hidden"></i>
      </button>
    </div>

    <aside id="sidebar-menu" class="fixed inset-y-0 left-0 transform -translate-x-full md:sticky md:top-0 md:translate-x-0 transition-transform duration-300 ease-in-out w-64 bg-emerald-900 text-white p-6 flex flex-col justify-between border-r border-emerald-950 h-screen z-40 pt-20 md:pt-6 overflow-y-auto">
      <div>
        <div class="hidden md:flex items-center gap-3 mb-10 px-2">
          <i data-lucide="sprout" class="w-7 h-7 text-emerald-400"></i>
          <span class="font-black text-xl tracking-tight">Smart Garden</span>
        </div>

        <nav class="space-y-2">
          <a href="dashboard.html" class="flex items-center gap-3 px-4 py-3 rounded-2xl transition-all ${currentPath === 'dashboard.html' || currentPath === '' ? 'bg-emerald-800 text-white font-bold' : 'text-emerald-100/70 hover:bg-emerald-800 hover:text-white font-semibold'}">
            <i data-lucide="layout-dashboard" class="w-5 h-5"></i>
            <span>Dashboard</span>
          </a>

          <a href="monitoring.html" class="flex items-center gap-3 px-4 py-3 rounded-2xl transition-all ${currentPath === 'monitoring.html' ? 'bg-emerald-800 text-white font-bold' : 'text-emerald-100/70 hover:bg-emerald-800 hover:text-white font-semibold'}">
            <i data-lucide="line-chart" class="w-5 h-5"></i>
            <span>Monitoring</span>
          </a>

          <a href="catalog.html" class="flex items-center gap-3 px-4 py-3 rounded-2xl transition-all ${currentPath === 'catalog.html' ? 'bg-emerald-800 text-white font-bold' : 'text-emerald-100/70 hover:bg-emerald-800 hover:text-white font-semibold'}">
            <i data-lucide="book-open" class="w-5 h-5"></i>
            <span>Katalog</span>
          </a>

          <a href="education.html" class="flex items-center gap-3 px-4 py-3 rounded-2xl transition-all ${currentPath === 'education.html' ? 'bg-emerald-800 text-white font-bold' : 'text-emerald-100/70 hover:bg-emerald-800 hover:text-white font-semibold'}">
            <i data-lucide="book-open" class="w-5 h-5"></i>
            <span>Edukasi</span>
          </a>
        </nav>
      </div>
      
      <div class="pt-4 border-t border-emerald-800/60 px-2 mt-auto">
        <button onclick="logout()" class="w-full bg-red-500 hover:bg-red-600 text-white font-bold p-3 rounded-xl transition-colors cursor-pointer text-sm flex items-center justify-center gap-2">
          <i data-lucide="log-out" class="w-4 h-4"></i>
          <span>Logout</span>
        </button>
      </div>
    </aside>

    <div id="sidebar-overlay" class="fixed inset-0 bg-black/40 hidden z-30 transition-opacity md:hidden"></div>
  `;

  // === LOGIKA JAVASCRIPT UNTUK RESPONSIF INTERAKTIF ===
  const menuToggle = document.getElementById("menu-toggle");
  const sidebarMenu = document.getElementById("sidebar-menu");
  const sidebarOverlay = document.getElementById("sidebar-overlay");
  const hamburgerIcon = document.getElementById("hamburger-icon");
  const closeIcon = document.getElementById("close-icon");

  function toggleMenu() {
    const isOpened = sidebarMenu.classList.contains("translate-x-0");

    if (isOpened) {
      sidebarMenu.classList.remove("translate-x-0");
      sidebarMenu.classList.add("-translate-x-full");
      sidebarOverlay.classList.add("hidden");
      hamburgerIcon.classList.remove("hidden");
      closeIcon.classList.add("hidden");
    } else {
      sidebarMenu.classList.remove("-translate-x-full");
      sidebarMenu.classList.add("translate-x-0");
      sidebarOverlay.classList.remove("hidden");
      hamburgerIcon.classList.add("hidden");
      closeIcon.classList.remove("hidden");
    }
  }

  menuToggle.addEventListener("click", toggleMenu);
  sidebarOverlay.addEventListener("click", toggleMenu);

  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }
}

document.addEventListener("DOMContentLoaded", renderSidebar);