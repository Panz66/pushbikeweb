 
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-indigo-600">Dashboard Admin</h1>
        <button
          onClick={() => navigate("TambahLomba")}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded shadow"
        >
          + Tambah Perlombaan
        </button>
      </div>

      {/* Banner / ilustrasi sederhana */}
      <div className="bg-yellow-100 rounded-lg p-6 mb-6 shadow">
        <h2 className="text-xl font-semibold mb-2">Selamat datang di Push Bike Anak-anak!</h2>
        <p className="text-gray-700">
          Dashboard ini untuk admin mengelola perlombaan push bike, menambahkan peserta, dan melihat hasil balapan.
        </p>

        {/* Ilustrasi sederhana */}
        <div className="mt-4 flex gap-4">
          <div className="w-16 h-16 bg-red-400 rounded-full flex items-center justify-center text-white font-bold">
            🚴‍♂️
          </div>
          <div className="w-16 h-16 bg-blue-400 rounded-full flex items-center justify-center text-white font-bold">
            🚴‍♀️
          </div>
          <div className="w-16 h-16 bg-green-400 rounded-full flex items-center justify-center text-white font-bold">
            🚲
          </div>
        </div>
      </div>

      {/* Informasi tambahan */}
      <div className="bg-white rounded-lg p-6 shadow">
        <h3 className="font-semibold text-lg mb-2">Tips Admin:</h3>
        <ul className="list-disc list-inside text-gray-700">
          <li>Gunakan tombol "Tambah Perlombaan" untuk membuat lomba baru.</li>
          <li>Pastikan data peserta lengkap agar hasil balapan valid.</li>
          <li>Lihat hasil lomba di halaman "Hasil Balapan".</li>
        </ul>
      </div>
    </div>
  );
}

