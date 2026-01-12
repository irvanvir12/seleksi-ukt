import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

interface Student {
  nim: string;
  name: string;
  tahunAngkatan: string;
  jalurMasuk: string;
  jurusan: string;
  programStudi: string;
  jenisUKT: string;
  ukt: string;
}

// Mock data - Initial data has empty UKT for unverified students
const mockStudents: Student[] = [
  {
    nim: "2024001",
    name: "Ahmad Hidayat",
    tahunAngkatan: "2024",
    jalurMasuk: "SNBP",
    jurusan: "Teknik",
    programStudi: "Teknik Informatika",
    jenisUKT: "-",
    ukt: "-"
  },
  {
    nim: "2024002",
    name: "Siti Nurhaliza",
    tahunAngkatan: "2024",
    jalurMasuk: "SNBT",
    jurusan: "Teknik",
    programStudi: "Sistem Informasi",
    jenisUKT: "-",
    ukt: "-"
  },
  {
    nim: "2024003",
    name: "Budi Santoso",
    tahunAngkatan: "2024",
    jalurMasuk: "Mandiri",
    jurusan: "Teknik",
    programStudi: "Teknik Elektro",
    jenisUKT: "-",
    ukt: "-"
  },
  {
    nim: "2024004",
    name: "Dewi Lestari",
    tahunAngkatan: "2024",
    jalurMasuk: "SNBP",
    jurusan: "Ekonomi",
    programStudi: "Akuntansi",
    jenisUKT: "-",
    ukt: "-"
  },
  {
    nim: "2024005",
    name: "Eko Prasetyo",
    tahunAngkatan: "2024",
    jalurMasuk: "SNBT",
    jurusan: "Ekonomi",
    programStudi: "Manajemen",
    jenisUKT: "-",
    ukt: "-"
  },
  {
    nim: "2024006",
    name: "Fitri Handayani",
    tahunAngkatan: "2023",
    jalurMasuk: "KIP",
    jurusan: "Psikologi",
    programStudi: "Psikologi",
    jenisUKT: "-",
    ukt: "-"
  },
  {
    nim: "2023007",
    name: "Gunawan Wijaya",
    tahunAngkatan: "2023",
    jalurMasuk: "Mandiri",
    jurusan: "Teknik",
    programStudi: "Teknik Sipil",
    jenisUKT: "-",
    ukt: "-"
  },
  {
    nim: "2023008",
    name: "Hana Permata",
    tahunAngkatan: "2023",
    jalurMasuk: "SNBP",
    jurusan: "Ilmu Sosial",
    programStudi: "Ilmu Komunikasi",
    jenisUKT: "-",
    ukt: "-"
  },
  {
    nim: "2023009",
    name: "Indra Kusuma",
    tahunAngkatan: "2023",
    jalurMasuk: "SNBT",
    jurusan: "Teknik",
    programStudi: "Teknik Mesin",
    jenisUKT: "-",
    ukt: "-"
  },
  {
    nim: "2023010",
    name: "Julia Rahmawati",
    tahunAngkatan: "2023",
    jalurMasuk: "KIP",
    jurusan: "Farmasi",
    programStudi: "Farmasi",
    jenisUKT: "-",
    ukt: "-"
  }
];

interface StudentListProps {
  onViewStudent: (nim: string) => void;
  onVerifyStudent: (nim: string) => void;
  verifiedStudents: Record<string, boolean>;
}

export function StudentList({ onViewStudent, onVerifyStudent, verifiedStudents }: StudentListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterTahunAngkatan, setFilterTahunAngkatan] = useState("all");
  const [filterJalurMasuk, setFilterJalurMasuk] = useState("all");
  const [filterJurusan, setFilterJurusan] = useState("all");
  const [filterProgramStudi, setFilterProgramStudi] = useState("all");
  const [filterJenisUKT, setFilterJenisUKT] = useState("all");
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Get unique values for filters
  const tahunAngkatanOptions = Array.from(new Set(mockStudents.map(s => s.tahunAngkatan))).sort().reverse();
  const jalurMasukOptions = Array.from(new Set(mockStudents.map(s => s.jalurMasuk))).sort();
  const jurusanOptions = Array.from(new Set(mockStudents.map(s => s.jurusan))).sort();
  const programStudiOptions = Array.from(new Set(mockStudents.map(s => s.programStudi))).sort();
  const jenisUKTOptions = Array.from(new Set(mockStudents.map(s => s.jenisUKT))).sort();

  // Filter students
  const filteredStudents = mockStudents.filter(student => {
    const matchesSearch = searchQuery === "" || 
      student.nim.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTahunAngkatan = filterTahunAngkatan === "all" || student.tahunAngkatan === filterTahunAngkatan;
    const matchesJalurMasuk = filterJalurMasuk === "all" || student.jalurMasuk === filterJalurMasuk;
    const matchesJurusan = filterJurusan === "all" || student.jurusan === filterJurusan;
    const matchesProgramStudi = filterProgramStudi === "all" || student.programStudi === filterProgramStudi;
    const matchesJenisUKT = filterJenisUKT === "all" || student.jenisUKT === filterJenisUKT;

    return matchesSearch && matchesTahunAngkatan && matchesJalurMasuk && matchesJurusan && matchesProgramStudi && matchesJenisUKT;
  });

  // Pagination logic
  const indexOfLastStudent = currentPage * rowsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - rowsPerPage;
  const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);

  const totalPages = Math.ceil(filteredStudents.length / rowsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleRowsPerPageChange = (value: string) => {
    setRowsPerPage(Number(value));
    setCurrentPage(1); // Reset to first page when changing rows per page
  };

  return (
    <div className="w-full max-w-7xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Daftar Mahasiswa Baru</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Filter Section */}
          <div className="mb-6 space-y-4">
            {/* Search */}
            <div className="space-y-2">
              <Label>Cari berdasarkan NIM/Nama Mahasiswa</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Masukkan NIM atau Nama Mahasiswa..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="grid grid-cols-5 gap-4">
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

          {/* Rows per page selector */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Label className="text-sm">Tampilkan</Label>
              <Select value={String(rowsPerPage)} onValueChange={handleRowsPerPageChange}>
                <SelectTrigger className="w-20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                  <SelectItem value="100">100</SelectItem>
                </SelectContent>
              </Select>
              <Label className="text-sm">baris</Label>
            </div>
            <div className="text-sm text-muted-foreground">
              Menampilkan {indexOfFirstStudent + 1} - {Math.min(indexOfLastStudent, filteredStudents.length)} dari {filteredStudents.length} data
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-semibold">No</th>
                  <th className="text-left p-3 font-semibold">NIM</th>
                  <th className="text-left p-3 font-semibold">Nama Mahasiswa</th>
                  <th className="text-left p-3 font-semibold">Jalur Masuk</th>
                  <th className="text-left p-3 font-semibold">Jurusan</th>
                  <th className="text-left p-3 font-semibold">Program Studi</th>
                  <th className="text-left p-3 font-semibold">Jenis UKT</th>
                  <th className="text-left p-3 font-semibold">UKT</th>
                  <th className="text-left p-3 font-semibold">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {currentStudents.map((student, index) => {
                  const isVerified = verifiedStudents[student.nim] || false;
                  const displayJenisUKT = isVerified ? "UKT 4" : student.jenisUKT;
                  const displayUKT = isVerified ? "Rp 5.000.000" : student.ukt;
                  const actualIndex = indexOfFirstStudent + index;
                  
                  return (
                    <tr
                      key={student.nim}
                      className={index % 2 === 0 ? "bg-muted/50" : ""}
                    >
                      <td className="p-3">{actualIndex + 1}</td>
                      <td className="p-3">{student.nim}</td>
                      <td className="p-3">{student.name}</td>
                      <td className="p-3">{student.jalurMasuk}</td>
                      <td className="p-3">{student.jurusan}</td>
                      <td className="p-3">{student.programStudi}</td>
                      <td className="p-3">{displayJenisUKT}</td>
                      <td className="p-3">{displayUKT}</td>
                      <td className="p-3">
                        <Button
                          size="sm"
                          onClick={() => onVerifyStudent(student.nim)}
                        >
                          Lihat
                        </Button>
                        <Button
                          size="sm"
                          disabled
                          className={`ml-2 ${
                            isVerified 
                              ? 'bg-blue-500 text-black hover:bg-blue-500 cursor-default' 
                              : 'cursor-default'
                          }`}
                          variant={isVerified ? "default" : "secondary"}
                        >
                          {isVerified ? "Sudah Penetapan UKT" : "Belum Verifikasi"}
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-4">
            <Button
              size="sm"
              variant="outline"
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Sebelumnya
            </Button>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Halaman</span>
              <span className="text-sm font-medium">{currentPage}</span>
              <span className="text-sm text-muted-foreground">dari</span>
              <span className="text-sm font-medium">{totalPages}</span>
            </div>
            <Button
              size="sm"
              variant="outline"
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Berikutnya
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}