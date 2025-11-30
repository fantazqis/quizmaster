# QuizMaster 🎯

QuizMaster adalah platform quiz interaktif berbasis web yang mendukung konten berbasis JSON. Upload file quiz JSON Anda sendiri atau gunakan quiz default yang tersedia!

![QuizMaster](https://img.shields.io/badge/React-18.3.1-blue)
![Vite](https://img.shields.io/badge/Vite-5.4.2-purple)
![Tailwind](https://img.shields.io/badge/TailwindCSS-3.4.1-cyan)

## ✨ Fitur

- 📤 **Upload Quiz JSON** - Tambahkan quiz custom dengan mudah
- 🎯 **Progress Tracking** - Lacak skor dan progres Anda
- 🔥 **Streak System** - Gamifikasi dengan sistem streak
- 🏆 **Badges & Achievements** - Dapatkan achievement untuk performa sempurna
- 📱 **Responsive Design** - Bekerja sempurna di desktop dan mobile
- 🎨 **Modern UI** - Design profesional dengan Tailwind CSS

## 🚀 Deploy ke Vercel

### Cara Cepat (Recommended)

1. **Fork atau Clone repository ini**
   ```bash
   git clone https://github.com/username/quizmaster.git
   cd quizmaster
   ```

2. **Push ke GitHub Anda**
   ```bash
   git remote set-url origin https://github.com/USERNAME/quizmaster.git
   git push -u origin main
   ```

3. **Deploy ke Vercel**
   - Buka [vercel.com](https://vercel.com)
   - Klik "New Project"
   - Import repository GitHub Anda
   - Vercel akan otomatis detect Vite dan build
   - Klik "Deploy" - Selesai! 🎉

### Build Settings (Auto-detected)

```
Framework Preset: Vite
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

## 💻 Development Lokal

### Prerequisites

- Node.js 18+ 
- npm atau yarn

### Installation

1. Clone repository
   ```bash
   git clone https://github.com/username/quizmaster.git
   cd quizmaster
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Jalankan development server
   ```bash
   npm run dev
   ```

4. Buka browser di `http://localhost:5173`

### Build untuk Production

```bash
npm run build
```

File production akan ada di folder `dist/`

### Preview Production Build

```bash
npm run preview
```

## 📝 Format Quiz JSON

Buat file JSON dengan format berikut:

```json
[
  {
    "id": 1,
    "question": "Apa ibu kota Indonesia?",
    "choices": ["Jakarta", "Bandung", "Surabaya", "Medan"],
    "answer": "Jakarta",
    "explanation": "Jakarta adalah ibu kota Indonesia sejak kemerdekaan."
  },
  {
    "id": 2,
    "question": "Pertanyaan berikutnya?",
    "choices": ["A", "B", "C", "D"],
    "answer": "A",
    "explanation": "Penjelasan jawaban (opsional)"
  }
]
```

### Field yang Diperlukan:

- ✅ `id` - ID unik untuk setiap pertanyaan
- ✅ `question` - Teks pertanyaan
- ✅ `choices` - Array pilihan jawaban (minimal 2)
- ✅ `answer` - Jawaban yang benar (harus ada di choices)
- ⚪ `explanation` - Penjelasan jawaban (opsional)

## 📁 Struktur Project

```
quizmaster/
├── src/
│   ├── App.jsx          # Komponen utama QuizMaster
│   ├── main.jsx         # Entry point React
│   └── index.css        # Tailwind CSS
├── public/              # Static assets
├── index.html           # HTML template
├── package.json         # Dependencies
├── vite.config.js       # Vite configuration
├── tailwind.config.js   # Tailwind configuration
└── README.md
```

## 🎮 Cara Menggunakan

1. **Buka aplikasi** - Anda akan melihat halaman upload
2. **Upload JSON** - Klik untuk upload file quiz .json Anda, atau
3. **Quiz Default** - Gunakan quiz bawaan untuk mencoba
4. **Mulai Quiz** - Jawab pertanyaan satu per satu
5. **Lihat Hasil** - Cek skor, streak, dan achievement Anda!

## 🛠️ Tech Stack

- **React 18** - UI Library
- **Vite** - Build Tool & Dev Server
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **Vercel** - Hosting (recommended)

## 📦 Contoh File Quiz

Project ini sudah include 2 contoh file quiz:

- `contoh-quiz-indonesia.json` - Quiz bahasa Indonesia (10 pertanyaan)
- `sample-quiz-english.json` - Quiz bahasa Inggris (5 pertanyaan)

## 🤝 Contributing

Contributions are welcome! Silakan:

1. Fork repository
2. Buat branch baru (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

## 📄 License

MIT License - bebas digunakan untuk project pribadi atau komersial.

## 💡 Tips

- **Upload Quiz Baru**: Gunakan tombol "Restart" setelah quiz selesai untuk upload quiz lain
- **Perfect Score**: Dapatkan achievement khusus jika menjawab semua benar!
- **Streak Bonus**: Jawab berturut-turut dengan benar untuk mendapat streak badge

## 🐛 Troubleshooting

**Build gagal di Vercel?**
- Pastikan `package.json` ada di root folder
- Cek Node.js version di Vercel settings (pilih 18.x)

**Styling tidak muncul?**
- Pastikan `tailwind.config.js` dan `postcss.config.js` ada
- Run `npm install` ulang

**Upload JSON tidak bekerja?**
- Cek format JSON valid (gunakan JSONLint.com)
- Pastikan struktur sesuai dengan contoh

## 📞 Support

Ada pertanyaan? Buat issue di GitHub repository!

---

Made with ❤️ using React + Vite + Tailwind CSS
