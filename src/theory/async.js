// Kode javascript dibagi menjadi dua jenis, synchrounous dan asynchrounous
// synchrounous : prosesnya akan ditunggu hingga selesai, baru menjalankan kode berikutnya
// asynchrounous : prosesnya tidak ditunggu hingga selesai, langsung menjalankan kode berikutnya
// Untuk itu, jika ada kode yang akan di running tepat setelah kode async selesai, kita menulisnya di dalam .then()

let run = () => {
    console.log('Kedua')
}

console.log('Pertama')

setTimeout(
    run,
    3000
)

console.log('Ketiga')