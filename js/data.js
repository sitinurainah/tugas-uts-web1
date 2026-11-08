// Data Pengguna untuk Halaman Login
const dataPengguna = [
    {
        id: 1,
        nama: "Rina Wulandari",
        email: "rina@gmail.com",
        password: "rina123",
        role: "User",
    },
    {
        id: 2,
        nama: "Agus Pranoto",
        email: "agus@gmail.com",
        password: "agus123",
        role: "User",
    },
    {
        id: 3,
        nama: "Siti Marlina",
        email: "siti@gmail.com",
        password: "siti123",
        role: "Admin",
    }
];

// Data Katalog Buku untuk Halaman Stok / Katalog
const dataKatalog = [
    {
        kodeBarang: "ASIP4301",
        namaBarang: "Pengantar Ilmu Komunikasi",
        jenisBarang: "Buku Ajar",
        edisi: "2",
        stok: 548,
        harga: "Rp 180.000",
        cover: "img/pengantar_komunikasi.jpg",
        deskripsi: "Buku pengantar yang membahas proses komunikasi, unsur-unsur interaksi, media, serta peran komunikasi dalam kehidupan sosial dan organisasi."
    },
    {
        kodeBarang: "EKMA4002",
        namaBarang: "Manajemen Keuangan",
        jenisBarang: "Buku Ajar",
        edisi: "3",
        stok: 392,
        harga: "Rp 220.000",
        cover: "img/manajemen_keuangan.jpg",
        deskripsi: "Membahas pengelolaan keuangan perusahaan, analisis laporan keuangan, investasi, sumber pendanaan, dan pengambilan keputusan keuangan."
    },
    {
        kodeBarang: "EKMA4310",
        namaBarang: "Kepemimpinan",
        jenisBarang: "Buku Ajar",
        edisi: "1",
        stok: 278,
        harga: "Rp 150.000",
        cover: "img/kepemimpinan.png",
        deskripsi: "Mengulas konsep kepemimpinan, gaya memimpin, motivasi tim, komunikasi organisasi, pengambilan keputusan, dan pengembangan pemimpin."
    },
    {
        kodeBarang: "BIOL4211",
        namaBarang: "Mikrobiologi Dasar",
        jenisBarang: "Buku Ajar",
        edisi: "2",
        stok: 165,
        harga: "Rp 200.000",
        cover: "img/mikrobiologi.jpg",
        deskripsi: "Pengenalan mikroorganisme meliputi struktur sel, pertumbuhan, metabolisme, peran mikroba, teknik laboratorium, serta aplikasinya."
    },
    {
        kodeBarang: "PAUD4401",
        namaBarang: "Perkembangan Anak Usia Dini",
        jenisBarang: "Buku Ajar",
        edisi: "4",
        stok: 204,
        harga: "Rp 250.000",
        cover: "img/paud_perkembangan.jpg",
        deskripsi: "Membahas tahapan perkembangan anak usia dini, kebutuhan tumbuh kembang, stimulasi, pembelajaran, dan peran lingkungan dalam pertumbuhannya."
    }
];

const dataKatalogBuku = dataKatalog;

// Data Tracking Pengiriman
const dataTracking = {
    "20230012": {
        nomorDO: "20230012",
        nama: "Rina Wulandari",
        status: "Dalam Perjalanan",
        ekspedisi: "JNE",
        tanggalKirim: "2025-08-25",
        paket: "0JKT01",
        total: "Rp 180.000",
        perjalanan: [
            {
                waktu: "2025-08-25 10:12:20",
                keterangan: "Penerimaan di Loket: TANGERANG SELATAN. Pengirim: Universitas Terbuka"
            },
            {
                waktu: "2025-08-25 14:07:56",
                keterangan: "Tiba di Hub: TANGERANG SELATAN"
            },
            {
                waktu: "2025-08-25 17:15:00",
                keterangan: "Diteruskan ke Kantor Jakarta Selatan"
            }
        ]
    },
    "20230013": {
        nomorDO: "20230013",
        nama: "Agus Pranoto",
        status: "Selesai",
        ekspedisi: "Pos Indonesia",
        tanggalKirim: "2025-08-25",
        paket: "0UPBJJBDG",
        total: "Rp 220.000",
        perjalanan: [
            {
                waktu: "2025-08-25 10:12:20",
                keterangan: "Penerimaan di Loket: TANGERANG SELATAN. Pengirim: Universitas Terbuka"
            },
            {
                waktu: "2025-08-25 14:07:56",
                keterangan: "Tiba di Hub: TANGERANG SELATAN"
            },      
            {
                waktu: "2025-08-25 16:30:10",
                keterangan: "Diteruskan ke Kantor Kota Bandung"
            },
            {
                waktu: "2025-08-26 12:15:33",
                keterangan: "Tiba di Hub: Kota BANDUNG"
            },
            {
                waktu: "2025-08-26 15:06:12",
                keterangan: "Proses antar ke Cimahi"
            },
            {
                waktu: "2025-08-26 20:00:00",
                keterangan: "Selesai Antar. Penerima: Agus Pranoto"
            }
        ]
    }
};

const dataPesanan = [
    { idOrder: "20230012", pemesan: "Rina Wulandari", buku: "Pengantar Ilmu Komunikasi", jumlah: 1, total: "Rp 180.000", status: "Dalam Perjalanan", tgl: "2025-08-25" },
    { idOrder: "20230013", pemesan: "Agus Pranoto", buku: "Manajemen Keuangan", jumlah: 1, total: "Rp 220.000", status: "Selesai", tgl: "2025-08-25" }
];