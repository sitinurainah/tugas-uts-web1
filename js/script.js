document.addEventListener("DOMContentLoaded", () => {
    const activeUser = JSON.parse(localStorage.getItem("userLogin"));
    const profileName = document.getElementById("profileName");
    if (profileName && activeUser) profileName.textContent = activeUser.nama;

    const bookCount = document.getElementById("bookCount");
    if (bookCount && typeof dataKatalogBuku !== "undefined") {
        bookCount.textContent = dataKatalogBuku.length;
        const totalStock = document.getElementById("totalStock");
        if (totalStock) {
            const stok = dataKatalogBuku.reduce((total, buku) => total + (Number(buku.stok) || 0), 0);
            totalStock.textContent = stok.toLocaleString("id-ID");
        }
    }

    // 1. Logika Login & Otentikasi
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const emailInput = document.getElementById("email").value.trim();
            const passwordInput = document.getElementById("password").value.trim();
            
            const userFound = typeof dataPengguna !== 'undefined' 
                ? dataPengguna.find(u => u.email === emailInput && u.password === passwordInput)
                : null;
            
            if (userFound) {
                alert(`Login Berhasil! Selamat datang, ${userFound.nama} (${userFound.role})`);
                localStorage.setItem("userLogin", JSON.stringify(userFound));
                window.location.href = "dashboard.html";
            } else {
                alert("email/password yang anda masukkan salah");
            }
        });
    }

    // Modal Triggers
    const btnLupa = document.getElementById("btnLupa");
    if (btnLupa) {
        btnLupa.addEventListener("click", (e) => {
            e.preventDefault();
            document.getElementById("modalLupa").style.display = "flex";
        });
    }

    const btnDaftar = document.getElementById("btnDaftar");
    if (btnDaftar) {
        btnDaftar.addEventListener("click", (e) => {
            e.preventDefault();
            document.getElementById("modalDaftar").style.display = "flex";
        });
    }

    // 2. Dashboard Greeting Berdasarkan Waktu Lokal & Sesi
    const greetingEl = document.getElementById("greeting");
    if (greetingEl) {
        const hour = new Date().getHours();
        let waktu = "pagi";
        if (hour >= 11 && hour < 15) waktu = "siang";
        else if (hour >= 15 && hour < 18) waktu = "sore";
        else if (hour >= 18 || hour < 4) waktu = "malam";
        
        const activeUser = JSON.parse(localStorage.getItem("userLogin"));
        const namaUser = activeUser ? activeUser.nama : "Civitas Akademika";
        
        greetingEl.innerText = `Selamat ${waktu.charAt(0).toUpperCase() + waktu.slice(1)}, ${namaUser}!`;
    }

    // 3. Render Tabel Stok Katalog Buku
    const bodyStok = document.getElementById("bodyStok");
    if (bodyStok && typeof dataKatalogBuku !== 'undefined') {
        renderTabelStok();
    }

    // 4. Render Dropdown Pilihan Buku di Checkout
    const pilihBuku = document.getElementById("pilihBuku");
    if (pilihBuku && typeof dataKatalogBuku !== 'undefined') {
        dataKatalogBuku.forEach(b => {
            let opt = document.createElement("option");
            opt.value = b.namaBarang;
            opt.textContent = `${b.namaBarang} (${b.harga})`;
            pilihBuku.appendChild(opt);
        });
    }

    const formCheckout = document.getElementById("formCheckout");
    if (formCheckout) {
        const pilihanBuku = document.getElementById("pilihBuku");
        const jumlahBuku = document.getElementById("jmlBuku");
        pilihanBuku?.addEventListener("change", updateOrderSummary);
        jumlahBuku?.addEventListener("input", updateOrderSummary);
        formCheckout.addEventListener("submit", (e) => {
            e.preventDefault();
            alert("Pesanan buku berhasil diproses dan disimpan ke sistem!");
            formCheckout.reset();
        });
    }
});

function closeModal(modalId) {
    document.getElementById(modalId).style.display = "none";
}

function renderTabelStok() {
    const bodyStok = document.getElementById("bodyStok");
    if (!bodyStok) return;
    bodyStok.innerHTML = "";
    dataKatalogBuku.forEach(item => {
        let tr = document.createElement("tr");
        tr.innerHTML = `
            <td class="book-cover-cell">
                <img class="book-cover" src="${item.cover}" alt="Sampul ${item.namaBarang}" loading="eager" decoding="sync" title="Lihat sampul ${item.namaBarang}" onerror="this.onerror=null;this.src='assets/logo.png';">
            </td>
            <td><strong>${item.kodeBarang}</strong></td>
            <td>${item.namaBarang}</td>
            <td class="book-description">${item.deskripsi || "Deskripsi buku belum tersedia."}</td>
            <td>${item.jenisBarang}</td>
            <td>Edisi ${item.edisi}</td>
            <td><span class="stock-badge">${item.stok} pcs</span></td>
            <td>${item.harga}</td>
        `;
        bodyStok.appendChild(tr);
    });
}

function filterCatalog() {
    const keyword = document.getElementById("searchCatalog")?.value.trim().toLowerCase() || "";
    document.querySelectorAll("#bodyStok tr").forEach(row => {
        row.style.display = row.textContent.toLowerCase().includes(keyword) ? "" : "none";
    });
}

function updateOrderSummary() {
    const pilihan = document.getElementById("pilihBuku");
    const jumlahInput = document.getElementById("jmlBuku");
    const checkoutBook = document.getElementById("checkoutBook");
    const summaryQty = document.getElementById("summaryQty");
    const summaryTotal = document.getElementById("summaryTotal");
    if (!pilihan || !jumlahInput || !checkoutBook || !summaryQty || !summaryTotal) return;

    const jumlah = Math.max(1, parseInt(jumlahInput.value, 10) || 1);
    const buku = typeof dataKatalogBuku !== "undefined"
        ? dataKatalogBuku.find(item => item.namaBarang === pilihan.value)
        : null;

    summaryQty.textContent = jumlah;
    if (!buku) {
        checkoutBook.textContent = "Belum ada buku dipilih";
        summaryTotal.textContent = "Rp 0";
        return;
    }

    const harga = Number(String(buku.harga).replace(/\D/g, "")) || 0;
    checkoutBook.innerHTML = `<strong>${buku.namaBarang}</strong><br><small>${buku.harga}</small>`;
    summaryTotal.textContent = "Rp " + (harga * jumlah).toLocaleString("id-ID");
}

// Fitur Tambah Baris Stok Baru Menggunakan Javascript DOM
function tambahBarisStok() {
    let kode = prompt("Masukkan Kode Barang (Contoh: TI2501):");
    if (!kode) return;
    let nama = prompt("Masukkan Nama Buku:");
    let jenis = prompt("Masukkan Jenis Barang:", "Buku Ajar");
    let edisi = prompt("Masukkan Edisi Buku:", "1");
    let stok = parseInt(prompt("Masukkan Jumlah Stok:")) || 100;
    let hargaNum = parseInt(prompt("Masukkan Harga Angka (Tanpa Rp):")) || 100000;
    let hargaFormatted = "Rp " + hargaNum.toLocaleString("id-ID");

    let newItem = {
        kodeBarang: kode,
        namaBarang: nama,
        jenisBarang: jenis,
        edisi: edisi,
        stok: stok,
        harga: hargaFormatted,
        cover: "img/buku_default.jpg"
    };

    dataKatalogBuku.push(newItem);
    renderTabelStok();
    alert("Baris stok buku baru berhasil ditambahkan secara dinamis via DOM!");
}

// 5. Tracking Pengiriman
function cariTracking() {
    const noDO = document.getElementById("inputDO").value.trim();
    const hasil = document.getElementById("hasilTracking");
    
    if (!noDO) {
        alert("Silakan masukkan Nomor Delivery Order (DO) terlebih dahulu!");
        return;
    }

    const found = typeof dataTracking !== 'undefined' ? dataTracking[noDO] : null;

    if (found) {
        document.getElementById("resPemesan").innerText = found.nama;
        document.getElementById("resStatus").innerText = found.status;
        document.getElementById("resEkspedisi").innerText = `${found.ekspedisi} (Paket: ${found.paket})`;
        document.getElementById("resTgl").innerText = found.tanggalKirim;
        document.getElementById("resTotal").innerText = found.total;

        let timelineHTML = "<ul style='list-style-type: none; padding-left: 0; margin-top: 10px;'>";
        found.perjalanan.forEach(p => {
            timelineHTML += `<li style="margin-bottom: 8px; border-left: 3px solid #3498db; padding-left: 10px;">
                <small style="color: #666;">${p.waktu}</small><br>
                <span>${p.keterangan}</span>
            </li>`;
        });
        timelineHTML += "</ul>";
        
        document.getElementById("resTimeline").innerHTML = timelineHTML;
        hasil.style.display = "block";
    } else {
        alert("Nomor Delivery Order tidak ditemukan! (Coba gunakan contoh DO: 20230012 atau 20230013)");
        hasil.style.display = "none";
    }
}