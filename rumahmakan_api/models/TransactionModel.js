// Mengimpor objek Sequelize dari paket sequelize
import { Sequelize } from "sequelize";

// Mengimpor objek 'db' yang merupakan koneksi database dari file konfigurasi Database.js
import db from "../config/Database.js";

// Mendeklarasikan objek 'DataTypes' dari Sequelize
const { DataTypes } = Sequelize;

// Mendefinisikan model 'Transaction' dengan kolom-kolom dan konfigurasi tertentu
const Transaction = db.define(
    "transactions", // Nama tabel di database
    {
      id: {
        type: DataTypes.INTEGER, // Tipe data untuk kolom id
        primaryKey: true, // Menandakan bahwa ini adalah primary key
        autoIncrement: true, // Menandakan bahwa nilai id akan diincrement secara otomatis
      },
      quantity: {
        type: DataTypes.INTEGER, // Tipe data untuk kolom quantity
        defaultValue: 1, // Nilai default untuk kolom quantity adalah 1
      },
      name: {
        type: DataTypes.STRING(255), // Tipe data untuk kolom name, string dengan panjang maksimal 255 karakter
        allowNull: false, // Tidak boleh kosong (NOT NULL)
        unique: true, // Harus unik di dalam tabel
      },
    },
    {
      freezeTableName: true, // Menyatakan bahwa nama tabel harus sesuai dengan nama yang didefinisikan (freezeTableName)
    }
);

// Menentukan relasi antara model Transaction dan model Product
Transaction.associate = function (models) {
    Transaction.belongsTo(models.Product, {
      foreignKey: 'products', // Kolom foreign key yang menghubungkan model Transaction dengan model Product
      onDelete: 'CASCADE', // Aksi yang akan diambil jika ada produk yang terkait dengan transaksi dan produk dihapus (CASCADE)
      onUpdate: 'CASCADE', // Aksi yang akan diambil jika ada pembaruan pada produk yang mempengaruhi transaksi (CASCADE)
    });
};

// Mengekspor model Transaction agar dapat digunakan di file lain
export default Transaction;

// Memastikan bahwa struktur tabel di database sesuai dengan definisi model
(async () => {
    await db.sync();
})();
