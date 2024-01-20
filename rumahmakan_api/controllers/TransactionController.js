import Transaction from "../models/TransactionModel.js";

// Fungsi untuk mendapatkan semua transaksi
export const getTransactions = async (req, res) => {
    try {
        // Mengambil semua transaksi dari basis data
        const response = await Transaction.findAll();
        
        // Mengirim respons JSON dengan status 200 dan data transaksi
        res.status(200).json(response);
    } catch (error) {
        // Menangani kesalahan dengan mencetak pesan kesalahan ke konsol
        console.log(error.message);
    }
}

// Fungsi untuk mendapatkan transaksi berdasarkan ID
export const getTransactionById = async (req, res) => {
    try {
        // Mencari transaksi berdasarkan ID di basis data
        const response = await Transaction.findOne({
            where: {
                id: req.params.id
            }
        });

        // Mengirim respons JSON dengan status 200 dan data transaksi yang ditemukan
        res.status(200).json(response);
    } catch (error) {
        // Menangani kesalahan dengan mencetak pesan kesalahan ke konsol
        console.log(error.message);
    }
}

// Fungsi untuk membuat transaksi baru
export const createTransaction = async (req, res) => {
    try {
        // Menyimpan transaksi baru ke dalam basis data berdasarkan tubuh permintaan (req.body)
        await Transaction.create(req.body);

        // Mengirim respons JSON dengan status 201 dan pesan bahwa transaksi berhasil dibuat
        res.status(201).json({ msg: "Transaction Created" });
    } catch (error) {
        // Menangani kesalahan dengan mencetak pesan kesalahan ke konsol
        console.log(error.message);
    }
}

// Fungsi untuk memperbarui transaksi berdasarkan ID
export const updateTransaction = async (req, res) => {
    try {
        // Memperbarui transaksi di basis data berdasarkan tubuh permintaan (req.body) dan ID transaksi
        await Transaction.update(req.body, {
            where: {
                id: req.params.id
            }
        });

        // Mengirim respons JSON dengan status 200 dan pesan bahwa transaksi berhasil diperbarui
        res.status(200).json({ msg: "Transaction Updated" });
    } catch (error) {
        // Menangani kesalahan dengan mencetak pesan kesalahan ke konsol
        console.log(error.message);
    }
}

// Fungsi untuk menghapus transaksi berdasarkan ID
export const deleteTransaction = async (req, res) => {
    try {
        // Menghapus transaksi dari basis data berdasarkan ID transaksi
        await Transaction.destroy({
            where: {
                id: req.params.id
            }
        });

        // Mengirim respons JSON dengan status 200 dan pesan bahwa transaksi berhasil dihapus
        res.status(200).json({ msg: "Transaction Deleted" });
    } catch (error) {
        // Menangani kesalahan dengan mencetak pesan kesalahan ke konsol
        console.log(error.message);
    }
}
