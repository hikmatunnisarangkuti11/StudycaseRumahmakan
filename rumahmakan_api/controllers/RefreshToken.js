import Users from "../models/UserModel.js";
import jwt from "jsonwebtoken";

// Fungsi untuk melakukan refresh token
export const refreshToken = async (req, res) => {
    try {
        // Mendapatkan refresh token dari cookie
        const refreshToken = req.cookies.refreshToken;
        
        // Jika tidak ada refresh token, kirim status 401 (Unauthorized)
        if (!refreshToken) return res.sendStatus(401);

        // Mencari pengguna berdasarkan refresh token di basis data
        const user = await Users.findAll({
            where: {
                refresh_token: refreshToken
            }
        });

        // Jika pengguna tidak ditemukan, kirim status 403 (Forbidden)
        if (!user[0]) return res.sendStatus(403);

        // Verifikasi refresh token menggunakan secret key
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decode) => {
            // Jika ada kesalahan dalam verifikasi, kirim status 403 (Forbidden)
            if (err) return res.sendStatus(403);

            // Mendapatkan data pengguna dari hasil query database
            const userId = user[0].id;
            const name = user[0].name;
            const email = user[0].email;

            // Membuat access token baru dengan data pengguna dan secret key
            const accessToken = jwt.sign({ userId, name, email }, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: '15s' // Token berlaku selama 15 detik
            });

            // Mengirimkan access token sebagai respons JSON
            res.json({ accessToken });
        });
    } catch (error) {
        // Menangani kesalahan dengan mencetak pesan kesalahan ke konsol
        console.log(error);
    }
}
