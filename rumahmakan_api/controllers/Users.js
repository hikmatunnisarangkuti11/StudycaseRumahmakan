import Users from "../models/UserModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// Fungsi untuk mendapatkan daftar pengguna (tanpa menampilkan password)
export const getUsers = async (req, res) => {
    try {
        // Mengambil daftar pengguna dari basis data hanya dengan atribut tertentu (id, name, email)
        const users = await Users.findAll({
            attributes: ['id', 'name', 'email']
        });
        // Mengirimkan daftar pengguna sebagai respons JSON
        res.json(users);
    } catch (error) {
        // Menangani kesalahan dengan mencetak pesan kesalahan ke konsol
        console.log(error);
    }
}

// Fungsi untuk melakukan registrasi pengguna
export const Register = async (req, res) => {
    const { name, email, password, confPassword } = req.body;

    // Memeriksa apakah password dan confirmPassword cocok
    if (password !== confPassword) return res.status(400).json({ msg: "Password dan confirmPassword tidak cocok" });

    // Menghasilkan salt untuk penggunaan bcrypt
    const salt = await bcrypt.genSalt();
    // Menghash password menggunakan bcrypt
    const hashPassword = await bcrypt.hash(password, salt);

    try {
        // Menyimpan informasi pengguna yang di-hash ke dalam basis data
        await Users.create({
            name: name,
            email: email,
            password: hashPassword
        });
        // Mengirimkan respons JSON bahwa registrasi berhasil
        res.json({ msg: "Register Berhasil" })
    } catch (error) {
        // Menangani kesalahan dengan mencetak pesan kesalahan ke konsol
        console.log(error);
    }
}

// Fungsi untuk melakukan login pengguna
export const Login = async (req, res) => {
    try {
        // Mencari pengguna berdasarkan alamat email di basis data
        const user = await Users.findAll({
            where: {
                email: req.body.email,
            },
        });

        // Memeriksa apakah password yang dimasukkan sesuai dengan password di basis data
        const match = await bcrypt.compare(req.body.password, user[0].password);
        if (!match) {
            // Mengirimkan respons JSON bahwa password salah jika tidak sesuai
            return res.status(400).json({ msg: "Wrong Password" });
        }

        // Mendapatkan informasi pengguna
        const userId = user[0].id;
        const name = user[0].name;
        const email = user[0].email;

        // Membuat access token dan refresh token baru
        const accessToken = jwt.sign(
            { userId, name, email },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '20s' }
        );

        const refreshToken = jwt.sign(
            { userId, name, email },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );

        // Menyimpan refresh token di basis data
        await Users.update({ refresh_token: refreshToken }, { where: { id: userId } });

        // Menetapkan cookie refreshToken di respons
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        });

        // Mengirimkan access token sebagai respons JSON
        res.json({ accessToken });
    } catch (error) {
        // Mengirimkan respons JSON bahwa alamat email tidak ditemukan jika terjadi kesalahan
        return res.status(404).json({ msg: "Email tidak ditemukan" });
    }
};

// Fungsi untuk logout pengguna
export const Logout = async (req, res) => {
    // Mendapatkan refreshToken dari cookie
    const refreshToken = req.cookies.refreshToken;
    
    // Jika tidak ada refreshToken, kirim status 204 (No Content)
    if (!refreshToken) return res.sendStatus(204);

    // Mencari pengguna berdasarkan refreshToken di basis data
    const user = await Users.findAll({
        where: {
            refresh_token: refreshToken
        }
    });

    // Jika pengguna tidak ditemukan, kirim status 204 (No Content)
    if (!user[0]) return res.sendStatus(204);

    // Mendapatkan ID pengguna
    const userId = user[0].id;

    // Menghapus refresh token di basis data
    await Users.update({ refresh_token: null }, {
        where: {
            id: userId
        }
    });

    // Menghapus cookie refreshToken
    res.clearCookie('refreshToken');

    // Mengirim status 200 (OK)
    return res.sendStatus(200);
}
