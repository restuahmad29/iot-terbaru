// Data Default awal jika LocalStorage kosong
const defaultPlants = [
  {
    id: 1,
    name: "Tomat",
    moisture: "60% - 80%",
    minMoisture: 60,
    image: "https://images.unsplash.com/photo-1592841200221-a6898f307baa",
    description: "Tomat membutuhkan kelembaban stabil agar buah berkembang baik dan mencegah pembusukan ujung buah.",
  },
  {
    id: 2,
    name: "Cabai",
    moisture: "50% - 70%",
    minMoisture: 50,
    image: "https://images.unsplash.com/photo-1588252303782-cb80119abd6d",
    description: "Cabai tidak suka tanah terlalu basah karena akar mudah busuk. Penyiraman sebaiknya dilakukan perlahan.",
  },
];

// Ambil data dari LocalStorage
let plants = JSON.parse(localStorage.getItem("smart_garden_plants")) || defaultPlants;

// DETEKSI ROLE YANG SEDANG LOGIN (Asumsi: 'admin' atau 'user')
// Jika di auth.js belum disetting, kamu bisa mengujinya dengan mengetik localStorage.setItem('role', 'admin') di console browser
const currentUserRole = localStorage.getItem("role") || "user"; 

const container = document.getElementById("plantContainer");
const modal = document.getElementById("crudModal");
const plantForm = document.getElementById("plantForm");
const addBtn = document.getElementById("admin-add-btn");

// === FUNGSI READ DENGAN PENGECEKAN HAK AKSES ===
function renderCatalog() {
  if (!container) return;
  container.innerHTML = "";

  // 1. Tampilkan / Sembunyikan Tombol Utama "Tambah Tanaman" di pojok kanan atas
  if (currentUserRole === "admin") {
    addBtn.classList.remove("hidden");
  } else {
    addBtn.classList.add("hidden");
  }

  // 2. Render list kartu tanaman
  plants.forEach(plant => {
    // Logika pengkondisian tombol aksi: jika admin, render tombolnya. Jika user, kosongkan ('').
    const adminActionsHtml = currentUserRole === "admin" ? `
      <div class="absolute top-4 right-4 flex gap-2 opacity-90">
        <button onclick="editPlant(${plant.id})" class="p-2.5 bg-white hover:bg-gray-100 text-gray-700 rounded-xl shadow-md transition-transform active:scale-90 cursor-pointer">
          <i data-lucide="edit-2" class="w-4 h-4"></i>
        </button>
        <button onclick="deletePlant(${plant.id})" class="p-2.5 bg-red-500 hover:bg-red-600 text-white rounded-xl shadow-md transition-transform active:scale-90 cursor-pointer">
          <i data-lucide="trash-2" class="w-4 h-4"></i>
        </button>
      </div>
    ` : "";

    container.innerHTML += `
      <div class="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 group transition-all hover:shadow-md relative flex flex-col justify-between">
        <div>
          <div class="h-52 w-full overflow-hidden relative bg-gray-100">
            <img src="${plant.image}" class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" alt="${plant.name}" />
            
            ${adminActionsHtml}
          </div>

          <div class="p-6">
            <h2 class="text-2xl font-black text-gray-800 mb-3">${plant.name}</h2>
            
            <div class="flex flex-wrap gap-2 mb-4">
              <div class="flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-xl font-bold text-xs">
                <i data-lucide="droplet" class="w-3.5 h-3.5"></i>
                <span>Ideal: ${plant.moisture}</span>
              </div>
              <div class="flex items-center gap-1.5 bg-blue-50 text-blue-700 px-3 py-1 rounded-xl font-bold text-xs">
                <i data-lucide="gauge" class="w-3.5 h-3.5"></i>
                <span>Siram < ${plant.minMoisture}%</span>
              </div>
            </div>

            <p class="text-gray-500 leading-relaxed text-sm">
              ${plant.description}
            </p>
          </div>
        </div>
      </div>
    `;
  });

  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }
}

// === FUNGSI VALIDASI TAMBAHAN (Mencegah User bypass lewat Inspect Console) ===
function checkAdminAccess() {
  if (currentUserRole !== "admin") {
    alert("Akses ditolak! Anda bukan admin.");
    return false;
  }
  return true;
}

function openModal() {
  if (!checkAdminAccess()) return;
  document.getElementById("modalTitle").innerText = "Tambah Tanaman Baru";
  plantForm.reset();
  document.getElementById("plantId").value = "";
  modal.classList.remove("hidden");
  if (typeof lucide !== "undefined") lucide.createIcons();
}

function closeModal() {
  modal.classList.add("hidden");
}

function savePlant(event) {
  event.preventDefault();
  if (!checkAdminAccess()) return;

  const id = document.getElementById("plantId").value;
  const name = document.getElementById("plantName").value;
  const moisture = document.getElementById("plantMoisture").value;
  const minMoisture = parseInt(document.getElementById("plantMinMoisture").value);
  const image = document.getElementById("plantImage").value;
  const description = document.getElementById("plantDescription").value;

  if (id) {
    plants = plants.map(p => p.id == id ? { id: parseInt(id), name, moisture, minMoisture, image, description } : p);
  } else {
    plants.push({ id: Date.now(), name, moisture, minMoisture, image, description });
  }

  localStorage.setItem("smart_garden_plants", JSON.stringify(plants));
  renderCatalog();
  closeModal();
}

function editPlant(id) {
  if (!checkAdminAccess()) return;
  const plant = plants.find(p => p.id === id);
  if (!plant) return;

  document.getElementById("modalTitle").innerText = "Edit Informasi Tanaman";
  document.getElementById("plantId").value = plant.id;
  document.getElementById("plantName").value = plant.name;
  document.getElementById("plantMoisture").value = plant.moisture;
  document.getElementById("plantMinMoisture").value = plant.minMoisture;
  document.getElementById("plantImage").value = plant.image;
  document.getElementById("plantDescription").value = plant.description;

  modal.classList.remove("hidden");
  if (typeof lucide !== "undefined") lucide.createIcons();
}

function deletePlant(id) {
  if (!checkAdminAccess()) return;
  if (confirm("Apakah kamu yakin ingin menghapus tanaman ini dari katalog?")) {
    plants = plants.filter(p => p.id !== id);
    localStorage.setItem("smart_garden_plants", JSON.stringify(plants));
    renderCatalog();
  }
}

document.addEventListener("DOMContentLoaded", renderCatalog);