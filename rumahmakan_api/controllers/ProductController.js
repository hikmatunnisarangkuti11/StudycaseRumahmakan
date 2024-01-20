// Import model Product dari file ProductModel.js
import Product from "../models/ProductModel.js";

// Fungsi untuk mendapatkan semua produk
export const getProducts = async(req, res) =>{
    try {
        // Mengambil semua produk dari basis data menggunakan Product.findAll()
        const response = await Product.findAll();
        
        // Mengirim respons JSON dengan status 200 dan data produk yang ditemukan
        res.status(200).json(response);
    } catch (error) {
        // Menangani kesalahan dengan mencetak pesan kesalahan ke konsol
        console.log(error.message);
    }
}

// Fungsi untuk mendapatkan produk berdasarkan ID
export const getProductById = async(req, res) =>{
    try {
        // Mencari produk berdasarkan ID di basis data menggunakan Product.findOne()
        const response = await Product.findOne({
            where:{
                id: req.params.id
            }
        });

        // Mengirim respons JSON dengan status 200 dan data produk yang ditemukan
        res.status(200).json(response);
    } catch (error) {
        // Menangani kesalahan dengan mencetak pesan kesalahan ke konsol
        console.log(error.message);
    }
}

// Fungsi untuk membuat produk baru
export const createProduct = async(req, res) =>{
    try {
        // Menyimpan produk baru ke dalam basis data berdasarkan tubuh permintaan (req.body)
        await Product.create(req.body);
        
        // Mengirim respons JSON dengan status 201 dan pesan bahwa produk berhasil dibuat
        res.status(201).json({msg: "Product Created"});
    } catch (error) {
        // Menangani kesalahan dengan mencetak pesan kesalahan ke konsol
        console.log(error.message);
    }
}

// Fungsi untuk memperbarui produk berdasarkan ID
export const updateProduct = async(req, res) =>{
    try {
        // Memperbarui produk di basis data berdasarkan tubuh permintaan (req.body) dan ID produk
        await Product.update(req.body,{
            where:{
                id: req.params.id
            }
        });

        // Mengirim respons JSON dengan status 200 dan pesan bahwa produk berhasil diperbarui
        res.status(200).json({msg: "Product Updated"});
    } catch (error) {
        // Menangani kesalahan dengan mencetak pesan kesalahan ke konsol
        console.log(error.message);
    }
}

// Fungsi untuk menghapus produk berdasarkan ID
export const deleteProduct = async(req, res) =>{
    try {
        // Menghapus produk dari basis data berdasarkan ID produk
        await Product.destroy({
            where:{
                id: req.params.id
            }
        });

        // Mengirim respons JSON dengan status 200 dan pesan bahwa produk berhasil dihapus
        res.status(200).json({msg: "Product Deleted"});
    } catch (error) {
        // Menangani kesalahan dengan mencetak pesan kesalahan ke konsol
        console.log(error.message);
    }
}
