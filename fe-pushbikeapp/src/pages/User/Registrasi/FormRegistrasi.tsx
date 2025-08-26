// src/pages/Registrasi.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { UserType } from "@/types/users";

type LombaType = {
  id: number;
  nama: string;
  deskripsi: string;
};

const lombaList: LombaType[] = [
  { id: 1, nama: "GP1", deskripsi: "Grand Prix 1 - BMX Challenge" },
  { id: 2, nama: "GP2", deskripsi: "Grand Prix 2 - Pump Track Battle" },
  { id: 3, nama: "GP3", deskripsi: "Grand Prix 3 - Urban Street Race" },
];

export default function Registrasi() {
  const navigate = useNavigate();

  const [selectedLomba, setSelectedLomba] = useState<LombaType | null>(null);
  const [formData, setFormData] = useState({
    nama: "",
    plat_number: "",
    community: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedLomba) return;

    const newUser: UserType = {
      id_pendaftaran: Date.now(), // sementara auto-generate
      nama: formData.nama,
      plat_number: formData.plat_number,
      community: formData.community,
      point1: 0,
      point2: 0,
    };

    console.log("Data dikirim:", { lomba: selectedLomba, user: newUser });
    // TODO: axios.post("/users", { lomba: selectedLomba, ...newUser })

    setSelectedLomba(null);
    setFormData({ nama: "", plat_number: "", community: "" });
    navigate("/hasil-live");
  };

  return (
    <div className="min-h-screen bg-[#222831] p-6 font-poppins">
      <h1 className="text-3xl font-bold text-center mb-8 text-[#00ADB5]">
        Pilih Lomba
      </h1>

      {/* Card Lomba */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {lombaList.map((lomba) => (
          <div
            key={lomba.id}
            className="bg-[#393E46] border border-[#222831] shadow-sm rounded-2xl p-6 cursor-pointer hover:shadow-lg hover:border-[#00ADB5] transition"
            onClick={() => setSelectedLomba(lomba)}
          >
            <h2 className="text-xl font-semibold text-[#EEEEEE]">
              {lomba.nama}
            </h2>
            <p className="text-[#EEEEEE] mt-2">{lomba.deskripsi}</p>
          </div>
        ))}
      </div>

      {/* Modal Form */}
      {selectedLomba && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-[#393E46] rounded-2xl shadow-lg w-full max-w-md p-6 relative">
            {/* Tombol Close */}
            <button
              className="absolute top-3 right-3 text-[#EEEEEE] hover:text-[#00ADB5] transition"
              onClick={() => setSelectedLomba(null)}
            >
              ✖
            </button>

            <h2 className="text-2xl font-bold mb-6 text-center text-[#00ADB5]">
              Registrasi {selectedLomba.nama}
            </h2>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-[#EEEEEE] font-medium">Nama</label>
                <input
                  type="text"
                  name="nama"
                  value={formData.nama}
                  onChange={handleChange}
                  className="w-full mt-1 p-2 bg-[#222831] text-[#EEEEEE] border border-[#00ADB5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00ADB5]"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-[#EEEEEE] font-medium">Plat Number</label>
                <input
                  type="text"
                  name="plat_number"
                  value={formData.plat_number}
                  onChange={handleChange}
                  className="w-full mt-1 p-2 bg-[#222831] text-[#EEEEEE] border border-[#00ADB5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00ADB5]"
                  required
                />
              </div>

              <div className="mb-6">
                <label className="block text-[#EEEEEE] font-medium">Community</label>
                <input
                  type="text"
                  name="community"
                  value={formData.community}
                  onChange={handleChange}
                  className="w-full mt-1 p-2 bg-[#222831] text-[#EEEEEE] border border-[#00ADB5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00ADB5]"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#00ADB5] hover:bg-[#EEEEEE] hover:text-[#222831] text-white font-semibold p-3 rounded-lg shadow-md transition"
              >
                Daftar
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
