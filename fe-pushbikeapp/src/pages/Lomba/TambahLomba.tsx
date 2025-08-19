import { useState } from "react";
import LombaForm from "./LombaForm";

type PesertaRow = {
  id: number;
  nama: string;
  plat_number: string;
  community: string;
  point1: number;
  point2: number;
};

export default function TambahLomba() {
  const [formData, setFormData] = useState<any | null>(null);
  const [batches, setBatches] = useState<PesertaRow[][]>([]);
  const [showPesertaForm, setShowPesertaForm] = useState(false);

  const handleFormSubmit = (data: any) => {
    setFormData(data);

    const jmlPeserta = Number(data.peserta);
    let jumlahBatch = data.kategori === "kualifikasi" ? Number(data.batch) : 1;

    const allBatches: PesertaRow[][] = [];
    const pesertaPerBatch = Math.ceil(jmlPeserta / jumlahBatch);
    let pesertaId = 1;

    for (let b = 0; b < jumlahBatch; b++) {
      const pesertaBatch: PesertaRow[] = [];
      for (let i = 0; i < pesertaPerBatch && pesertaId <= jmlPeserta; i++) {
        pesertaBatch.push({
          id: pesertaId,
          nama: `Peserta ${pesertaId}`,
          plat_number: "-",
          community: "-",
          point1: 0,
          point2: 0,
        });
        pesertaId++;
      }
      allBatches.push(pesertaBatch);
    }

    setBatches(allBatches);
  };

  const handleInputPeserta = () => setShowPesertaForm(true);

  const handlePesertaChange = (
    batchIdx: number,
    id: number,
    key: keyof PesertaRow,
    value: string | number
  ) => {
    const updatedBatches = [...batches];
    updatedBatches[batchIdx] = updatedBatches[batchIdx].map((p) =>
      p.id === id ? { ...p, [key]: value } : p
    );
    setBatches(updatedBatches);
  };

  const processBatch = (peserta: PesertaRow[]) => {
    if (peserta.length === 0) return [];
    const withTotal = peserta.map((u, idx) => ({
      ...u,
      gate1: idx + 1,
      gate2: ((idx + 5) % peserta.length) + 1,
      total: u.point1 + u.point2,
    }));

    const sorted = [...withTotal].sort((a, b) => b.total - a.total); // urut desc

    return sorted.map((u, idx) => ({
      ...u,
      rank: idx + 1,
      category:
        idx + 1 <= 3
          ? "Final Pro"
          : idx + 1 <= 6
          ? "Semi Final"
          : "Rep",
    }));
  };

  return (
    <div className="p-6">
      {!formData ? (
        <LombaForm onSubmit={handleFormSubmit} />
      ) : (
        <div>
          <h2 className="text-xl font-bold mb-4">
            🏁 {formData.nama} ({formData.kategori}) - {formData.tanggal}
          </h2>

          <button
            className="mb-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            onClick={handleInputPeserta}
          >
            Input Peserta
          </button>

          {batches.map((pesertaBatch, batchIdx) => {
            const processedData = processBatch(pesertaBatch);

            return (
              <div key={batchIdx} className="mb-8">
                {batches.length > 1 && (
                  <h3 className="text-lg font-semibold mb-2">
                    Batch {batchIdx + 1}
                  </h3>
                )}

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
                      {processedData.map((u) => (
                        <tr key={u.id} className="hover:bg-gray-50">
                          <td className="px-4 py-2 border">{u.gate1}</td>
                          <td className="px-4 py-2 border">{u.gate2}</td>
                          <td className="px-4 py-2 border">
                            {showPesertaForm ? (
                              <input
                                type="text"
                                value={u.nama}
                                onChange={(e) =>
                                  handlePesertaChange(batchIdx, u.id, "nama", e.target.value)
                                }
                                className="border rounded px-2 py-1 w-full"
                              />
                            ) : (
                              u.nama
                            )}
                          </td>
                          <td className="px-4 py-2 border">
                            {showPesertaForm ? (
                              <input
                                type="text"
                                value={u.plat_number}
                                onChange={(e) =>
                                  handlePesertaChange(batchIdx, u.id, "plat_number", e.target.value)
                                }
                                className="border rounded px-2 py-1 w-full"
                              />
                            ) : (
                              u.plat_number
                            )}
                          </td>
                          <td className="px-4 py-2 border">
                            {showPesertaForm ? (
                              <input
                                type="text"
                                value={u.community}
                                onChange={(e) =>
                                  handlePesertaChange(batchIdx, u.id, "community", e.target.value)
                                }
                                className="border rounded px-2 py-1 w-full"
                              />
                            ) : (
                              u.community
                            )}
                          </td>
                          <td className="px-4 py-2 border text-center">
                            {showPesertaForm ? (
                              <input
                                type="number"
                                value={u.point1}
                                onChange={(e) =>
                                  handlePesertaChange(batchIdx, u.id, "point1", Number(e.target.value))
                                }
                                className="border rounded px-2 py-1 w-full text-center"
                              />
                            ) : (
                              u.point1
                            )}
                          </td>
                          <td className="px-4 py-2 border text-center">
                            {showPesertaForm ? (
                              <input
                                type="number"
                                value={u.point2}
                                onChange={(e) =>
                                  handlePesertaChange(batchIdx, u.id, "point2", Number(e.target.value))
                                }
                                className="border rounded px-2 py-1 w-full text-center"
                              />
                            ) : (
                              u.point2
                            )}
                          </td>
                          <td className="px-4 py-2 border text-center">{u.total}</td>
                          <td className="px-4 py-2 border text-center font-bold">{u.rank}</td>
                          <td className="px-4 py-2 border">{u.category}</td>
                        </tr>
                      ))}
                      {processedData.length === 0 && (
                        <tr>
                          <td colSpan={10} className="text-center py-4 text-gray-500">
                            Tidak ada peserta.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
