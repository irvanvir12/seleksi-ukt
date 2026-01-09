import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Download, FileSpreadsheet, FileText } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function Rekap() {
  const [filterTahunAngkatan, setFilterTahunAngkatan] = useState("all");
  const [filterJalurMasuk, setFilterJalurMasuk] = useState("all");
  const [filterJurusan, setFilterJurusan] = useState("all");
  const [filterProgramStudi, setFilterProgramStudi] = useState("all");
  const [filterJenisUKT, setFilterJenisUKT] = useState("all");

  const tahunAngkatanOptions = ["2024", "2023"];
  const jalurMasukOptions = ["SNBP", "SNBT", "Mandiri", "KIP"];
  const jurusanOptions = ["Teknik", "Ekonomi", "Psikologi", "Ilmu Sosial", "Farmasi"];
  const programStudiOptions = ["Teknik Informatika", "Sistem Informasi", "Teknik Elektro", "Teknik Sipil", "Teknik Mesin", "Akuntansi", "Manajemen", "Psikologi", "Ilmu Komunikasi", "Farmasi"];
  const jenisUKTOptions = ["UKT 2", "UKT 3", "UKT 4", "UKT 5", "UKT 6"];

  const handleDownloadExcel = () => {
    toast.success("Download Excel berhasil! (Demo)");
    console.log("Downloading Excel with filters:", {
      tahunAngkatan: filterTahunAngkatan,
      jalurMasuk: filterJalurMasuk,
      jurusan: filterJurusan,
      programStudi: filterProgramStudi,
      jenisUKT: filterJenisUKT,
    });
  };

  const handleDownloadPDF = () => {
    toast.success("Download PDF berhasil! (Demo)");
    console.log("Downloading PDF with filters:", {
      tahunAngkatan: filterTahunAngkatan,
      jalurMasuk: filterJalurMasuk,
      jurusan: filterJurusan,
      programStudi: filterProgramStudi,
      jenisUKT: filterJenisUKT,
    });
  };

  return (
    <div className="p-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center">
            <Download className="mr-2 h-6 w-6" />
            Rekap Data Mahasiswa
          </CardTitle>
          <p className="text-muted-foreground">
            Download data mahasiswa dalam format Excel atau PDF berdasarkan filter yang dipilih
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Filter Section */}
          <div className="space-y-4">
            <h3 className="font-semibold">Filter Data</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Tahun Angkatan</Label>
                <Select value={filterTahunAngkatan} onValueChange={setFilterTahunAngkatan}>
                  <SelectTrigger>
                    <SelectValue placeholder="Semua" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua</SelectItem>
                    {tahunAngkatanOptions.map(tahun => (
                      <SelectItem key={tahun} value={tahun}>{tahun}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Jalur Masuk</Label>
                <Select value={filterJalurMasuk} onValueChange={setFilterJalurMasuk}>
                  <SelectTrigger>
                    <SelectValue placeholder="Semua" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua</SelectItem>
                    {jalurMasukOptions.map(jalur => (
                      <SelectItem key={jalur} value={jalur}>{jalur}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Jurusan</Label>
                <Select value={filterJurusan} onValueChange={setFilterJurusan}>
                  <SelectTrigger>
                    <SelectValue placeholder="Semua" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua</SelectItem>
                    {jurusanOptions.map(jurusan => (
                      <SelectItem key={jurusan} value={jurusan}>{jurusan}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Program Studi</Label>
                <Select value={filterProgramStudi} onValueChange={setFilterProgramStudi}>
                  <SelectTrigger>
                    <SelectValue placeholder="Semua" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua</SelectItem>
                    {programStudiOptions.map(prodi => (
                      <SelectItem key={prodi} value={prodi}>{prodi}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Jenis UKT</Label>
                <Select value={filterJenisUKT} onValueChange={setFilterJenisUKT}>
                  <SelectTrigger>
                    <SelectValue placeholder="Semua" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua</SelectItem>
                    {jenisUKTOptions.map(jenis => (
                      <SelectItem key={jenis} value={jenis}>{jenis}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Download Buttons */}
          <div className="border-t pt-6">
            <h3 className="font-semibold mb-4">Pilih Format Download</h3>
            <div className="grid grid-cols-2 gap-4">
              <Button
                onClick={handleDownloadExcel}
                className="h-auto py-6 flex-col"
                variant="outline"
              >
                <FileSpreadsheet className="h-12 w-12 mb-2 text-green-600" />
                <span className="text-lg">Download Excel</span>
                <span className="text-xs text-muted-foreground mt-1">Format .xlsx</span>
              </Button>

              <Button
                onClick={handleDownloadPDF}
                className="h-auto py-6 flex-col"
                variant="outline"
              >
                <FileText className="h-12 w-12 mb-2 text-red-600" />
                <span className="text-lg">Download PDF</span>
                <span className="text-xs text-muted-foreground mt-1">Format .pdf</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
