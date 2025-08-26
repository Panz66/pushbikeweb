// src/pages/AdminDashboard.tsx
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#222831] p-8 font-poppins">
      <h1 className="text-3xl font-bold mb-6 text-[#EEEEEE]">
        Dashboard Admin
      </h1>
      <p className="text-[#EEEEEE]/70 mb-8">Selamat datang, Admin!</p>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Card Tambah Lomba */}
        <div
          onClick={() => navigate("tambahlomba")}
          className="bg-[#393E46] shadow-md rounded-xl p-6 cursor-pointer text-center 
                     hover:bg-[#00ADB5] hover:shadow-lg transition"
        >
          <h2 className="text-xl font-semibold mb-2 text-[#EEEEEE] group-hover:text-[#222831]">
            ➕ Tambah Lomba
          </h2>
          <p className="text-[#EEEEEE]/70 group-hover:text-[#222831]">
            Tambahkan lomba baru ke sistem
          </p>
        </div>

        {/* Card Daftar Lomba */}
        <div
          className="bg-[#393E46] shadow-md rounded-xl p-6 text-center 
                     hover:bg-[#00ADB5] hover:shadow-lg transition"
        >
          <h2 className="text-xl font-semibold mb-2 text-[#EEEEEE] group-hover:text-[#222831]">
            📋 Daftar Lomba
          </h2>
          <p className="text-[#EEEEEE]/70 group-hover:text-[#222831]">
            Lihat semua lomba yang sudah dibuat
          </p>
        </div>
      </div>
    </div>
  );
}
