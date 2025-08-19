// src/components/pages/LiveResult/ResultList.tsx
import { useEffect, useState, useMemo } from "react";
import { getUsers } from "@/services/api"; // ganti sesuai api kamu
import type { UserType } from "@/types/users";

export default function ResultList() {
  const [data, setData] = useState<UserType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

 useEffect(() => {
  getUsers()
    .then(({ data }) => {
      console.log("API response:", data);

      if (Array.isArray(data)) {
        setData(data);
      } else {
        console.error("Format response API tidak sesuai:", data);
        setData([]);
      }
    })
    .catch(() => alert("Gagal mengambil data peserta"));
}, []);

  // Hitung ranking & kategori
  const processedData = useMemo(() => {
    const withTotal = data.map((u, idx) => ({
      ...u,
      gate1: idx + 1,
      gate2: ((idx + 5) % data.length) + 1,
      total: u.point1 + u.point2,
    }));

    const sorted = [...withTotal].sort((a, b) => a.total - b.total);

    return sorted.map((u, idx) => {
      let category = "";
      if (idx + 1 <= 3) category = "Final Pro";
      else if (idx + 1 <= 6) category = "Semi Final";
      else category = "Rep";

      return {
        ...u,
        rank: idx + 1,
        category,
      };
    });
  }, [data]);

  const totalPages = Math.ceil(processedData.length / itemsPerPage);
  const pageData = processedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="w-full">
      <h2 className="text-xl font-bold mb-4">🏁 Live Race Result</h2>
      <div className="overflow-x-auto rounded-lg shadow border">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-700 uppercase">
            <tr>
              <th className="px-4 py-3 border">Gate Start Moto 1</th>
              <th className="px-4 py-3 border">Gate Start Moto 2</th>
              <th className="px-4 py-3 border">Nama Peserta</th>
              <th className="px-4 py-3 border">No Plat</th>
              <th className="px-4 py-3 border">Asal Komunitas</th>
              <th className="px-4 py-3 border">Point Moto 1</th>
              <th className="px-4 py-3 border">Point Moto 2</th>
              <th className="px-4 py-3 border">Total Point</th>
              <th className="px-4 py-3 border">Rank</th>
              <th className="px-4 py-3 border">Class Category</th>
            </tr>
          </thead>
          <tbody className="text-gray-800">
            {pageData.map((u) => (
              <tr key={u.id_pendaftaran} className="hover:bg-gray-50">
                <td className="px-4 py-2 border">{u.gate1}</td>
                <td className="px-4 py-2 border">{u.gate2}</td>
                <td className="px-4 py-2 border">{u.nama}</td>
                <td className="px-4 py-2 border">{u.plat_number}</td>
                <td className="px-4 py-2 border">{u.community}</td>
                <td className="px-4 py-2 border text-center">{u.point1}</td>
                <td className="px-4 py-2 border text-center">{u.point2}</td>
                <td className="px-4 py-2 border text-center">{u.total}</td>
                <td className="px-4 py-2 border text-center font-bold">
                  {u.rank}
                </td>
                <td className="px-4 py-2 border">{u.category}</td>
              </tr>
            ))}
            {pageData.length === 0 && (
              <tr>
                <td colSpan={10} className="text-center py-4 text-gray-500">
                  Tidak ada data peserta.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-end items-center gap-2 mt-4">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`w-8 h-8 rounded ${
              currentPage === i + 1
                ? "bg-indigo-600 text-white"
                : "bg-white text-gray-800 border"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
