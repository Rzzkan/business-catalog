import { reactive } from 'vue'

// Default categories configuration
const defaultCategories = [
  { name: 'Makanan', icon: 'utensils', color: '#FA6781' },
  { name: 'Minuman', icon: 'coffee', color: '#59B292' },
  { name: 'Fashion', icon: 'shirt', color: '#FFC94D' },
  { name: 'Kerajinan', icon: 'palette', color: '#E0A96D' },
  { name: 'Jasa', icon: 'wrench', color: '#4A5568' }
]

const storedCategories = localStorage.getItem('umkm-categories')
const initialCategories = storedCategories ? JSON.parse(storedCategories) : defaultCategories
if (!storedCategories) {
  localStorage.setItem('umkm-categories', JSON.stringify(defaultCategories))
}

const defaultUmkmList = [
    {
      id: 1,
      namaUsaha: 'Warung Nasi Padang Bu Ani',
      namaPemilik: 'Ani Suryani',
      kategori: 'Makanan',
      deskripsi: 'Warung nasi padang legendaris yang sudah berdiri sejak 1998. Menyajikan masakan Padang autentik dengan bumbu rempah khas Minang yang diracik langsung oleh Bu Ani.',
      kontak: {
        telepon: '0812-3456-7890',
        whatsapp: '0812-3456-7890',
        instagram: '@nasipadangbuani',
        email: 'buani.padang@gmail.com'
      },
      jamOperasional: [
        { hari: 'Senin - Jumat', jam: '08:00 - 21:00' },
        { hari: 'Sabtu', jam: '08:00 - 22:00' },
        { hari: 'Minggu', jam: '09:00 - 20:00' }
      ],
      produk: [
        { nama: 'Nasi Rendang', harga: 25000, deskripsi: 'Nasi putih dengan rendang daging sapi' },
        { nama: 'Nasi Ayam Pop', harga: 22000, deskripsi: 'Nasi dengan ayam pop khas Padang' },
        { nama: 'Nasi Gulai Ikan', harga: 20000, deskripsi: 'Nasi dengan gulai ikan kakap segar' },
        { nama: 'Nasi Dendeng Batokok', harga: 28000, deskripsi: 'Nasi dengan dendeng batokok balado' },
        { nama: 'Nasi Gulai Tunjang', harga: 30000, deskripsi: 'Nasi dengan gulai tunjang empuk' },
        { nama: 'Es Teh Manis', harga: 5000, deskripsi: 'Teh manis dingin segar' },
        { nama: 'Es Jeruk', harga: 7000, deskripsi: 'Jeruk peras segar dengan es' }
      ],
      metodePembayaran: ['Tunai', 'QRIS', 'GoPay', 'OVO', 'Dana'],
      alamat: 'Jl. Merdeka No. 45, Kelurahan Sukamaju, Kecamatan Cibeunying, Bandung',
      mapsEmbed: '',
      foto: {
        utama: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800',
        tempat: [
          'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600',
          'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=600'
        ],
        produk: [
          'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600',
          'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600',
          'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600'
        ],
        menu: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600'
      },
      featured: true
    },
    {
      id: 2,
      namaUsaha: 'Kedai Kopi Nusantara',
      namaPemilik: 'Budi Santoso',
      kategori: 'Minuman',
      deskripsi: 'Kedai kopi specialty yang menyajikan kopi-kopi terbaik dari seluruh Nusantara. Dari Gayo hingga Toraja, setiap biji kopi dipanggang dengan penuh cinta.',
      kontak: {
        telepon: '0856-7890-1234',
        whatsapp: '0856-7890-1234',
        instagram: '@kopinusantara',
        email: 'kopinusantara@gmail.com'
      },
      jamOperasional: [
        { hari: 'Senin - Kamis', jam: '07:00 - 22:00' },
        { hari: 'Jumat - Sabtu', jam: '07:00 - 23:00' },
        { hari: 'Minggu', jam: '08:00 - 21:00' }
      ],
      produk: [
        { nama: 'Kopi Gayo V60', harga: 28000, deskripsi: 'Pour over V60 dengan biji kopi Gayo Aceh' },
        { nama: 'Kopi Toraja Latte', harga: 32000, deskripsi: 'Latte dengan espresso biji Toraja' },
        { nama: 'Es Kopi Susu Gula Aren', harga: 25000, deskripsi: 'Signature drink dengan gula aren asli' },
        { nama: 'Matcha Latte', harga: 30000, deskripsi: 'Matcha premium Jepang dengan susu segar' },
        { nama: 'Roti Bakar Coklat', harga: 18000, deskripsi: 'Roti bakar dengan selai coklat premium' },
        { nama: 'Croissant Butter', harga: 22000, deskripsi: 'Croissant renyah dengan butter import' }
      ],
      metodePembayaran: ['Tunai', 'QRIS', 'GoPay', 'OVO', 'Dana', 'Kartu Debit', 'Kartu Kredit'],
      alamat: 'Jl. Braga No. 12, Bandung Wetan, Bandung',
      mapsEmbed: '',
      foto: {
        utama: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800',
        tempat: [
          'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=600',
          'https://images.unsplash.com/photo-1559305616-3f99cd43e353?w=600'
        ],
        produk: [
          'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600',
          'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600',
          'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600'
        ],
        menu: 'https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=600'
      },
      featured: true
    },
    {
      id: 3,
      namaUsaha: 'Batik Sekar Jagad',
      namaPemilik: 'Sri Wahyuni',
      kategori: 'Fashion',
      deskripsi: 'Pengrajin batik tulis asli Solo yang mempertahankan tradisi batik tulis dengan motif klasik dan kontemporer. Setiap lembar batik dibuat dengan tangan selama 2-4 minggu.',
      kontak: {
        telepon: '0878-1234-5678',
        whatsapp: '0878-1234-5678',
        instagram: '@batiksekarjagad',
        email: 'sekarjagad.batik@gmail.com'
      },
      jamOperasional: [
        { hari: 'Senin - Sabtu', jam: '09:00 - 17:00' },
        { hari: 'Minggu', jam: 'Tutup' }
      ],
      produk: [
        { nama: 'Batik Tulis Parang', harga: 450000, deskripsi: 'Kain batik tulis motif parang klasik' },
        { nama: 'Batik Tulis Mega Mendung', harga: 550000, deskripsi: 'Kain batik tulis motif mega mendung Cirebon' },
        { nama: 'Kemeja Batik Pria', harga: 350000, deskripsi: 'Kemeja lengan panjang batik tulis' },
        { nama: 'Dress Batik Wanita', harga: 400000, deskripsi: 'Dress elegan dengan motif batik modern' },
        { nama: 'Syal Batik', harga: 150000, deskripsi: 'Syal sutra dengan motif batik' },
        { nama: 'Tas Batik', harga: 200000, deskripsi: 'Tote bag dengan aksen kain batik' }
      ],
      metodePembayaran: ['Tunai', 'Transfer Bank', 'QRIS'],
      alamat: 'Jl. Laweyan No. 8, Laweyan, Solo',
      mapsEmbed: '',
      foto: {
        utama: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800',
        tempat: [
          'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600',
          'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=600'
        ],
        produk: [
          'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600',
          'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=600',
          'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600'
        ],
        menu: null
      },
      featured: true
    },
    {
      id: 4,
      namaUsaha: 'Bakso Mas Joko',
      namaPemilik: 'Joko Widodo',
      kategori: 'Makanan',
      deskripsi: 'Bakso sapi jumbo legendaris dengan kuah kaldu yang gurih dan kaya rempah. Bakso dibuat fresh setiap hari dari daging sapi pilihan tanpa bahan pengawet.',
      kontak: {
        telepon: '0813-9876-5432',
        whatsapp: '0813-9876-5432',
        instagram: '@baksomasjoko',
        email: 'baksomasjoko@gmail.com'
      },
      jamOperasional: [
        { hari: 'Senin - Sabtu', jam: '10:00 - 21:00' },
        { hari: 'Minggu', jam: '10:00 - 15:00' }
      ],
      produk: [
        { nama: 'Bakso Jumbo', harga: 20000, deskripsi: 'Bakso sapi ukuran jumbo isi 5 butir' },
        { nama: 'Bakso Urat', harga: 22000, deskripsi: 'Bakso dengan urat sapi kenyal' },
        { nama: 'Bakso Beranak', harga: 25000, deskripsi: 'Bakso jumbo isi bakso kecil di dalamnya' },
        { nama: 'Mie Ayam Bakso', harga: 18000, deskripsi: 'Mie ayam dengan topping bakso' },
        { nama: 'Pangsit Goreng', harga: 10000, deskripsi: 'Pangsit goreng renyah isi ayam' },
        { nama: 'Es Jeruk Segar', harga: 6000, deskripsi: 'Jeruk peras segar' }
      ],
      metodePembayaran: ['Tunai', 'QRIS', 'GoPay'],
      alamat: 'Jl. Pahlawan No. 23, Kota Malang',
      mapsEmbed: '',
      foto: {
        utama: 'https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=800',
        tempat: [
          'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=600',
          'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600'
        ],
        produk: [
          'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=600',
          'https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=600',
          'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=600'
        ],
        menu: null
      },
      featured: true
    },
    {
      id: 5,
      namaUsaha: 'Kerajinan Kayu Jati Indah',
      namaPemilik: 'Hendra Wijaya',
      kategori: 'Kerajinan',
      deskripsi: 'Produsen kerajinan dan furniture kayu jati berkualitas tinggi. Setiap produk dibuat oleh pengrajin berpengalaman dengan detail finishing yang sempurna.',
      kontak: {
        telepon: '0821-5678-9012',
        whatsapp: '0821-5678-9012',
        instagram: '@jatiindahcraft',
        email: 'jatiindah.craft@gmail.com'
      },
      jamOperasional: [
        { hari: 'Senin - Sabtu', jam: '08:00 - 17:00' },
        { hari: 'Minggu', jam: 'Tutup' }
      ],
      produk: [
        { nama: 'Meja Tamu Jati', harga: 2500000, deskripsi: 'Meja tamu minimalis kayu jati solid' },
        { nama: 'Kursi Goyang', harga: 1800000, deskripsi: 'Kursi goyang klasik kayu jati' },
        { nama: 'Rak Buku Jati', harga: 1500000, deskripsi: 'Rak buku 5 tingkat kayu jati' },
        { nama: 'Miniatur Kapal', harga: 350000, deskripsi: 'Miniatur kapal Pinisi kayu jati' },
        { nama: 'Tatakan Gelas Set', harga: 75000, deskripsi: 'Set 6 tatakan gelas ukir jati' },
        { nama: 'Figura Foto', harga: 120000, deskripsi: 'Bingkai foto ukir kayu jati' }
      ],
      metodePembayaran: ['Tunai', 'Transfer Bank', 'QRIS'],
      alamat: 'Jl. Jati Raya No. 15, Jepara, Jawa Tengah',
      mapsEmbed: '',
      foto: {
        utama: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800',
        tempat: [
          'https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=600',
          'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600'
        ],
        produk: [
          'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600',
          'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=600',
          'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=600'
        ],
        menu: null
      },
      featured: true
    },
    {
      id: 6,
      namaUsaha: 'Martabak Manis Pak Rahmat',
      namaPemilik: 'Rahmat Hidayat',
      kategori: 'Makanan',
      deskripsi: 'Martabak manis dan telur yang sudah terkenal di seluruh kota. Dengan topping melimpah dan adonan yang tebal empuk, martabak Pak Rahmat selalu bikin ketagihan.',
      kontak: {
        telepon: '0857-2345-6789',
        whatsapp: '0857-2345-6789',
        instagram: '@martabakpakrahmat',
        email: 'martabakrahmat@gmail.com'
      },
      jamOperasional: [
        { hari: 'Senin - Minggu', jam: '16:00 - 23:00' }
      ],
      produk: [
        { nama: 'Martabak Manis Coklat Keju', harga: 45000, deskripsi: 'Martabak manis dengan topping coklat dan keju melimpah' },
        { nama: 'Martabak Manis Kacang', harga: 40000, deskripsi: 'Martabak manis klasik kacang wijen' },
        { nama: 'Martabak Manis Pandan Susu', harga: 42000, deskripsi: 'Martabak pandan dengan susu kental' },
        { nama: 'Martabak Telur Spesial', harga: 50000, deskripsi: 'Martabak telur dengan daging sapi dan telur ayam kampung' },
        { nama: 'Martabak Telur Ayam', harga: 35000, deskripsi: 'Martabak telur isi ayam cincang' },
        { nama: 'Martabak Mini Mix', harga: 30000, deskripsi: 'Set 4 martabak mini berbagai rasa' }
      ],
      metodePembayaran: ['Tunai', 'QRIS', 'GoPay', 'OVO'],
      alamat: 'Jl. Asia Afrika No. 67, Bandung',
      mapsEmbed: '',
      foto: {
        utama: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800',
        tempat: [
          'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=600',
          'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=600'
        ],
        produk: [
          'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600',
          'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600',
          'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=600'
        ],
        menu: null
      },
      featured: true
    },
    {
      id: 7,
      namaUsaha: 'Toko Jamu Sehat Waras',
      namaPemilik: 'Siti Nurhaliza',
      kategori: 'Minuman',
      deskripsi: 'Produsen jamu tradisional yang mengolah jamu dari bahan-bahan alami tanpa pengawet. Resep turun temurun yang sudah terjaga keasliannya selama 3 generasi.',
      kontak: {
        telepon: '0899-8765-4321',
        whatsapp: '0899-8765-4321',
        instagram: '@jamusehatwaras',
        email: 'jamusehatwaras@gmail.com'
      },
      jamOperasional: [
        { hari: 'Senin - Sabtu', jam: '06:00 - 15:00' },
        { hari: 'Minggu', jam: 'Tutup' }
      ],
      produk: [
        { nama: 'Jamu Beras Kencur', harga: 8000, deskripsi: 'Jamu segar dari beras dan kencur pilihan' },
        { nama: 'Jamu Kunyit Asam', harga: 8000, deskripsi: 'Jamu kunyit asam untuk stamina' },
        { nama: 'Jamu Temulawak', harga: 10000, deskripsi: 'Jamu temulawak untuk kesehatan liver' },
        { nama: 'Wedang Jahe', harga: 7000, deskripsi: 'Wedang jahe hangat penyegar badan' },
        { nama: 'Paket Jamu Botol (6pcs)', harga: 60000, deskripsi: 'Paket 6 botol jamu berbagai varian' },
        { nama: 'Serbuk Kunyit', harga: 25000, deskripsi: 'Serbuk kunyit murni 100gr' }
      ],
      metodePembayaran: ['Tunai', 'QRIS', 'Transfer Bank'],
      alamat: 'Jl. Kauman No. 3, Yogyakarta',
      mapsEmbed: '',
      foto: {
        utama: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800',
        tempat: [
          'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600',
          'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=600'
        ],
        produk: [
          'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600',
          'https://images.unsplash.com/photo-1563911892437-1feda0179e1b?w=600',
          'https://images.unsplash.com/photo-1544252890-c3132031a158?w=600'
        ],
        menu: null
      },
      featured: true
    },
    {
      id: 8,
      namaUsaha: 'Sate Ayam Madura Pak Slamet',
      namaPemilik: 'Slamet Riyadi',
      kategori: 'Makanan',
      deskripsi: 'Sate ayam Madura asli dengan bumbu kacang yang kental dan gurih. Daging ayam kampung dipotong kecil-kecil dan dibakar di atas arang kelapa untuk cita rasa yang sempurna.',
      kontak: {
        telepon: '0822-3344-5566',
        whatsapp: '0822-3344-5566',
        instagram: '@satepakslamet',
        email: 'satepakslamet@gmail.com'
      },
      jamOperasional: [
        { hari: 'Senin - Minggu', jam: '15:00 - 22:00' }
      ],
      produk: [
        { nama: 'Sate Ayam (10 tusuk)', harga: 25000, deskripsi: 'Sate ayam kampung 10 tusuk dengan lontong' },
        { nama: 'Sate Ayam (20 tusuk)', harga: 45000, deskripsi: 'Sate ayam kampung 20 tusuk dengan lontong' },
        { nama: 'Sate Kambing (10 tusuk)', harga: 35000, deskripsi: 'Sate kambing muda 10 tusuk' },
        { nama: 'Soto Ayam', harga: 18000, deskripsi: 'Soto ayam kampung kuah bening' },
        { nama: 'Nasi Putih', harga: 5000, deskripsi: 'Nasi putih hangat' },
        { nama: 'Es Teh Manis', harga: 5000, deskripsi: 'Teh manis dingin' }
      ],
      metodePembayaran: ['Tunai', 'QRIS'],
      alamat: 'Jl. Kaliurang KM 5, Sleman, Yogyakarta',
      mapsEmbed: '',
      foto: {
        utama: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=800',
        tempat: [
          'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=600',
          'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600'
        ],
        produk: [
          'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=600',
          'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600',
          'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=600'
        ],
        menu: null
      },
      featured: true
    },
    {
      id: 9,
      namaUsaha: 'Bengkel Motor Maju Jaya',
      namaPemilik: 'Agus Prasetyo',
      kategori: 'Jasa',
      deskripsi: 'Bengkel motor rumahan yang melayani servis ringan, ganti oli, tune up, kelistrikan, dan perawatan harian motor matic maupun bebek. Pengerjaan transparan dengan estimasi biaya di awal.',
      kontak: {
        telepon: '0812-7788-9900',
        whatsapp: '0812-7788-9900',
        instagram: '@bengkelmajujaya',
        email: 'bengkelmajujaya@gmail.com'
      },
      jamOperasional: [
        { hari: 'Senin - Sabtu', jam: '08:00 - 18:00' },
        { hari: 'Minggu', jam: '09:00 - 14:00' }
      ],
      produk: [
        { nama: 'Servis Ringan Motor', harga: 65000, deskripsi: 'Pemeriksaan mesin, busi, filter, rantai, dan rem' },
        { nama: 'Ganti Oli', harga: 55000, deskripsi: 'Penggantian oli mesin standar termasuk jasa' },
        { nama: 'Tune Up', harga: 95000, deskripsi: 'Penyetelan mesin untuk performa harian' },
        { nama: 'Cek Kelistrikan', harga: 45000, deskripsi: 'Pengecekan aki, lampu, starter, dan kabel' },
        { nama: 'Tambal Ban Tubeless', harga: 20000, deskripsi: 'Tambal ban tubeless cepat untuk motor' }
      ],
      metodePembayaran: ['Tunai', 'QRIS', 'Transfer Bank'],
      alamat: 'Jl. Veteran No. 18, Denpasar, Bali',
      mapsEmbed: 'https://www.google.com/maps?q=Jl.%20Veteran%20No.%2018%2C%20Denpasar%2C%20Bali&output=embed',
      foto: {
        utama: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800',
        tempat: [
          'https://images.unsplash.com/photo-1625047509168-a7026f36de04?w=600',
          'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=600'
        ],
        produk: [
          'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=600',
          'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=600',
          'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?w=600'
        ],
        menu: null
      },
      featured: true
    }
]

const storedUmkm = localStorage.getItem('umkm-list')
let initialUmkm = storedUmkm ? JSON.parse(storedUmkm) : defaultUmkmList

const defaultFacilitiesMap = {
  1: ['Toilet', 'Tempat Parkir', 'Meja & Tempat Duduk'],
  2: ['WiFi', 'AC', 'Toilet', 'Meja & Tempat Duduk', 'Pembayaran Non-Tunai'],
  3: ['Toilet', 'Tempat Parkir', 'AC', 'Pembayaran Non-Tunai'],
  4: ['Toilet', 'Tempat Parkir', 'Meja & Tempat Duduk'],
  5: ['Toilet', 'Tempat Parkir', 'Pembayaran Non-Tunai'],
  6: ['Tempat Parkir', 'Meja & Tempat Duduk'],
  7: ['Toilet', 'Meja & Tempat Duduk'],
  8: ['Toilet', 'Tempat Parkir', 'Meja & Tempat Duduk'],
  9: ['Toilet', 'Tempat Parkir', 'WiFi', 'Meja & Tempat Duduk']
}

initialUmkm.forEach(u => {
  if (!u.hasOwnProperty('fasilitas')) {
    u.fasilitas = defaultFacilitiesMap[u.id] || []
  }
})

localStorage.setItem('umkm-list', JSON.stringify(initialUmkm))

// Reactive store for UMKM data
export const umkmStore = reactive({
  categoriesList: initialCategories,
  reports: JSON.parse(localStorage.getItem('umkm-reports') || '[]'),
  umkmList: initialUmkm,

  // Get all UMKM
  getAll() {
    return this.umkmList
  },

  // Get UMKM by ID
  getById(id) {
    return this.umkmList.find(u => u.id === Number(id))
  },

  // Search UMKM
  search(query) {
    const q = query.toLowerCase()
    return this.umkmList.filter(u =>
      u.namaUsaha.toLowerCase().includes(q) ||
      u.namaPemilik.toLowerCase().includes(q) ||
      u.kategori.toLowerCase().includes(q) ||
      u.deskripsi.toLowerCase().includes(q) ||
      u.produk.some(p => p.nama.toLowerCase().includes(q))
    )
  },

  // Get UMKM by category
  getByCategory(kategori) {
    return this.umkmList.filter(u => u.kategori === kategori)
  },

  // Get random UMKM
  getRandom(categories = null) {
    const pool = Array.isArray(categories) && categories.length
      ? this.umkmList.filter(u => categories.includes(u.kategori))
      : this.umkmList
    return pool[Math.floor(Math.random() * pool.length)]
  },

  // Backward-compatible alias
  getRandomFood() {
    return this.getRandom(['Makanan'])
  },

  // Get all categories
  getCategories() {
    return this.categoriesList.map(c => c.name)
  },

  addCategory(catObj) {
    const cleanName = catObj.name.trim()
    if (!cleanName || this.categoriesList.some(c => c.name.toLowerCase() === cleanName.toLowerCase())) {
      return false
    }
    this.categoriesList.push({
      name: cleanName,
      icon: catObj.icon || 'grid',
      color: catObj.color || '#59B292'
    })
    localStorage.setItem('umkm-categories', JSON.stringify(this.categoriesList))
    return true
  },

  updateCategory(oldName, catObj) {
    const cleanName = catObj.name.trim()
    if (!cleanName) return false
    if (this.categoriesList.some(c => c.name !== oldName && c.name.toLowerCase() === cleanName.toLowerCase())) {
      return false
    }

    const index = this.categoriesList.findIndex(c => c.name === oldName)
    if (index !== -1) {
      this.categoriesList[index] = {
        name: cleanName,
        icon: catObj.icon || 'grid',
        color: catObj.color || '#59B292'
      }

      this.umkmList.forEach((u) => {
        if (u.kategori === oldName) u.kategori = cleanName
      })

      localStorage.setItem('umkm-list', JSON.stringify(this.umkmList))
      localStorage.setItem('umkm-categories', JSON.stringify(this.categoriesList))
      return true
    }
    return false
  },

  deleteCategory(name) {
    if (this.umkmList.some(u => u.kategori === name)) {
      return false
    }

    const index = this.categoriesList.findIndex(c => c.name === name)
    if (index !== -1) {
      this.categoriesList.splice(index, 1)
      localStorage.setItem('umkm-categories', JSON.stringify(this.categoriesList))
      return true
    }
    return false
  },

  // Add new UMKM
  add(umkm) {
    const newId = this.umkmList.length ? Math.max(...this.umkmList.map(u => u.id)) + 1 : 1
    if (umkm.kategori && !this.getCategories().includes(umkm.kategori)) {
      this.categoriesList.push({ name: umkm.kategori, icon: 'grid', color: '#59B292' })
      localStorage.setItem('umkm-categories', JSON.stringify(this.categoriesList))
    }
    this.umkmList.push({ ...umkm, id: newId })
    localStorage.setItem('umkm-list', JSON.stringify(this.umkmList))
    return newId
  },

  // Update UMKM
  update(id, data) {
    const index = this.umkmList.findIndex(u => u.id === Number(id))
    if (index !== -1) {
      this.umkmList[index] = { ...this.umkmList[index], ...data }
      localStorage.setItem('umkm-list', JSON.stringify(this.umkmList))
      return true
    }
    return false
  },

  // Delete UMKM
  delete(id) {
    const index = this.umkmList.findIndex(u => u.id === Number(id))
    if (index !== -1) {
      this.umkmList.splice(index, 1)
      localStorage.setItem('umkm-list', JSON.stringify(this.umkmList))
      return true
    }
    return false
  },

  // Add a report
  addReport(report) {
    const newReport = {
      id: Date.now(),
      umkmId: Number(report.umkmId),
      namaUsaha: report.namaUsaha,
      tipe: report.tipe, // 'kesalahan_data' | 'toko_tutup'
      detail: report.detail || '',
      tanggal: new Date().toISOString(),
      status: 'pending' // 'pending' | 'resolved'
    }
    this.reports.push(newReport)
    localStorage.setItem('umkm-reports', JSON.stringify(this.reports))
  },

  // Resolve a report
  resolveReport(reportId) {
    const index = this.reports.findIndex(r => r.id === Number(reportId))
    if (index !== -1) {
      this.reports[index].status = 'resolved'
      localStorage.setItem('umkm-reports', JSON.stringify(this.reports))
      return true
    }
    return false
  },

  // Delete a report
  deleteReport(reportId) {
    const index = this.reports.findIndex(r => r.id === Number(reportId))
    if (index !== -1) {
      this.reports.splice(index, 1)
      localStorage.setItem('umkm-reports', JSON.stringify(this.reports))
      return true
    }
    return false
  }
})

function getContrastColor(hex) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000
  return (yiq >= 128) ? '#1F2937' : '#FFFFFF'
}

export const getCategoryStyle = (kategori, isDarkTheme = false) => {
  const cat = umkmStore.categoriesList?.find(c => c.name === kategori)
  const hex = cat ? cat.color : '#9CA3AF'
  return {
    backgroundColor: hex,
    color: getContrastColor(hex)
  }
}

export const getCategoryLightStyle = (kategori, isDarkTheme = false) => {
  const cat = umkmStore.categoriesList?.find(c => c.name === kategori)
  const hex = cat ? cat.color : '#9CA3AF'
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  const alpha = isDarkTheme ? 0.25 : 0.12
  return {
    backgroundColor: `rgba(${r}, ${g}, ${b}, ${alpha})`,
    color: hex
  }
}

export const getCategoryColor = (kategori) => {
  const colors = {
    Makanan: 'bg-coral/90 text-white',
    Minuman: 'bg-primary/90 text-white',
    Fashion: 'bg-accent text-gray-800',
    Kerajinan: 'bg-cream-dark text-gray-700',
    Jasa: 'bg-slate-800/90 text-white'
  }
  return colors[kategori] || 'bg-gray-200 text-gray-700'
}

export const getCategoryLightColor = (kategori) => {
  const colors = {
    Makanan: 'bg-coral/15 text-coral',
    Minuman: 'bg-primary/15 text-primary',
    Fashion: 'bg-accent/20 text-accent-dark',
    Kerajinan: 'bg-cream text-cream-dark',
    Jasa: 'bg-slate-100 text-slate-700'
  }
  return colors[kategori] || 'bg-gray-100 text-gray-600'
}

export const checkOperationalStatus = (jamOperasional) => {
  if (!jamOperasional || !jamOperasional.length) {
    return { isOpen: false, status: 'closed', text: 'Tutup' }
  }

  const daysOfWeek = ['minggu', 'senin', 'selasa', 'rabu', 'kamis', 'jumat', 'sabtu']
  const daySequence = ['senin', 'selasa', 'rabu', 'kamis', 'jumat', 'sabtu', 'minggu']
  
  const now = new Date()
  const currentDayIndex = now.getDay()
  const currentDayName = daysOfWeek[currentDayIndex]
  const currentMin = now.getHours() * 60 + now.getMinutes()

  let scheduleToday = null

  for (const entry of jamOperasional) {
    const hariStr = entry.hari.toLowerCase().trim()
    
    if (hariStr.includes('-') || hariStr.includes('–')) {
      const parts = hariStr.split(/[-–]/).map(p => p.trim())
      if (parts.length === 2) {
        const startIdx = daySequence.indexOf(parts[0])
        const endIdx = daySequence.indexOf(parts[1])
        const currentSeqIdx = daySequence.indexOf(currentDayName)
        
        if (startIdx !== -1 && endIdx !== -1 && currentSeqIdx !== -1) {
          let matches = false
          if (startIdx <= endIdx) {
            matches = currentSeqIdx >= startIdx && currentSeqIdx <= endIdx
          } else {
            // wraps around (e.g. Jumat - Senin)
            matches = currentSeqIdx >= startIdx || currentSeqIdx <= endIdx
          }
          
          if (matches) {
            scheduleToday = entry
            break
          }
        }
      }
    } else if (hariStr === currentDayName) {
      scheduleToday = entry
      break
    }
  }

  if (!scheduleToday) {
    return { isOpen: false, status: 'closed', text: 'Tutup' }
  }

  const jamStr = scheduleToday.jam.trim()
  if (jamStr.toLowerCase() === 'tutup') {
    return { isOpen: false, status: 'closed', text: 'Tutup' }
  }
  if (jamStr.toLowerCase() === 'buka 24 jam') {
    return { isOpen: true, status: 'open', text: 'Buka 24 Jam' }
  }

  // Parse time range (HH:MM - HH:MM)
  const timeParts = jamStr.split(/[-–]/).map(t => t.trim())
  if (timeParts.length === 2) {
    const parseTime = (str) => {
      const [h, m] = str.split(':').map(Number)
      return h * 60 + m
    }
    try {
      const startMin = parseTime(timeParts[0])
      const endMin = parseTime(timeParts[1])

      let isOpen = false
      let remainingMin = 0

      if (startMin <= endMin) {
        isOpen = currentMin >= startMin && currentMin <= endMin
        if (isOpen) {
          remainingMin = endMin - currentMin
        }
      } else {
        // wraps past midnight (e.g. 16:00 - 02:00 -> startMin=960, endMin=120)
        isOpen = currentMin >= startMin || currentMin <= endMin
        if (isOpen) {
          if (currentMin >= startMin) {
            remainingMin = (1440 - currentMin) + endMin
          } else {
            remainingMin = endMin - currentMin
          }
        }
      }

      if (isOpen) {
        if (remainingMin > 0 && remainingMin <= 30) {
          return {
            isOpen: true,
            status: 'closing_soon',
            text: 'Tutup Segera'
          }
        }
        return {
          isOpen: true,
          status: 'open',
          text: 'Buka'
        }
      } else {
        return {
          isOpen: false,
          status: 'closed',
          text: 'Tutup'
        }
      }
    } catch (e) {
      return { isOpen: false, status: 'closed', text: 'Tutup' }
    }
  }

  return { isOpen: false, status: 'closed', text: 'Tutup' }
}

export const sanitizeUrl = (url, allowedProtocols = ['http:', 'https:', 'mailto:', 'tel:']) => {
  if (!url) return ''
  const trimmed = url.trim()
  
  if (trimmed.startsWith('//')) {
    return trimmed
  }

  if (!trimmed.includes(':') && !trimmed.includes('/') && !trimmed.includes('?')) {
    return trimmed
  }

  try {
    const parsed = new URL(trimmed)
    if (allowedProtocols.includes(parsed.protocol.toLowerCase())) {
      return trimmed
    }
  } catch (e) {
    const hasProtocol = /^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(trimmed)
    if (!hasProtocol) {
      return trimmed
    }
  }
  return '#'
}


