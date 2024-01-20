// Mengimpor modul jwt untuk manajemen JSON Web Tokens
import jwt from "jsonwebtoken";

// Fungsi middleware untuk memverifikasi token akses
export const verifyToken = (req, res, next) => {
    // Mengambil nilai Authorization dari header permintaan
    const authHeader = req.headers['authorization'];
    
    // Memeriksa apakah Authorization header ada dan token akses ditemukan
    const token = authHeader && authHeader.split(' ')[1];
    
    // Jika token akses tidak ditemukan, kirim status 401 (Unauthorized)
    if (token == null) return res.sendStatus(401);
    
    // Verifikasi token akses menggunakan secret key
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        // Jika terjadi kesalahan dalam verifikasi, kirim status 403 (Forbidden)
        if (err) return res.sendStatus(403);
        
        // Jika verifikasi berhasil, menyimpan data yang di-decode dari token ke dalam properti email pada objek req
        req.email = decoded.email;
        
        // Melanjutkan ke middleware atau handler berikutnya
        next();
    });
}
