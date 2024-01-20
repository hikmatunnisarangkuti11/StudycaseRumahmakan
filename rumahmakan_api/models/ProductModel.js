// Mengimpor modul Sequelize dari paket sequelize
import { Sequelize } from "sequelize";

// Mengimpor objek 'db' yang merupakan koneksi database dari file konfigurasi Database.js
import db from "../config/Database.js";

// Mendeklarasikan objek 'DataTypes' dari Sequelize
const { DataTypes } = Sequelize;

// Mendefinisikan model 'Product' dengan kolom-kolom dan konfigurasi tertentu
const Product = db.define(
  "products", // Nama tabel di database
  {
    id: {
      type: DataTypes.INTEGER, // Tipe data untuk kolom id
      primaryKey: true, // Menandakan bahwa ini adalah primary key
      autoIncrement: true, // Menandakan bahwa nilai id akan diincrement secara otomatis
    },
    name: {
      type: DataTypes.STRING(256), // Tipe data untuk kolom name, string dengan panjang maksimal 256 karakter
      allowNull: false, // Tidak boleh kosong (NOT NULL)
      unique: true, // Harus unik di dalam tabel
    },
    price: {
      type: DataTypes.INTEGER, // Tipe data untuk kolom price
      allowNull: false, // Tidak boleh kosong (NOT NULL)
    },
  },
  {
    freezeTableName: true, // Menyatakan bahwa nama tabel harus sesuai dengan nama yang didefinisikan (freezeTableName)
  }
);

// Menentukan relasi antara model Product dan model Transaction
Product.associate = function (models) {
  Product.hasMany(models.Transaction, {
    foreignKey: 'products', // Kolom foreign key yang menghubungkan model Product dengan model Transaction
    onDelete: 'CASCADE', // Aksi yang akan diambil jika ada transaksi yang terkait dengan produk dan produk dihapus (CASCADE)
    onUpdate: 'CASCADE', // Aksi yang akan diambil jika ada pembaruan pada produk yang mempengaruhi transaksi (CASCADE)
  });
};

// Mengekspor model Product agar dapat digunakan di file lain
export default Product;

// Memastikan bahwa struktur tabel di database sesuai dengan definisi model
(async () => {
  await db.sync();
})();
