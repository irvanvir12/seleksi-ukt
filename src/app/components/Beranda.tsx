import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Users, GraduationCap, Building2, DollarSign } from "lucide-react";

interface BerandaProps {
  username: string;
}

// Mock statistics data
const statistics = {
  totalMahasiswa: 10,
  perTahun: {
    "2024": 5,
    "2023": 5,
  },
  perJalurMasuk: {
    "SNBP": 4,
    "SNBT": 3,
    "Mandiri": 2,
    "KIP": 2,
  },
  perJurusan: {
    "Teknik": 5,
    "Ekonomi": 2,
    "Psikologi": 1,
    "Ilmu Sosial": 1,
    "Farmasi": 1,
  },
  perProdi: {
    "Teknik Informatika": 1,
    "Sistem Informasi": 1,
    "Teknik Elektro": 1,
    "Teknik Sipil": 1,
    "Teknik Mesin": 1,
    "Akuntansi": 1,
    "Manajemen": 1,
    "Psikologi": 1,
    "Ilmu Komunikasi": 1,
    "Farmasi": 1,
  },
  perJenisUKT: {
    "UKT 2": 2,
    "UKT 3": 2,
    "UKT 4": 3,
    "UKT 5": 2,
    "UKT 6": 1,
  },
};

export function Beranda({ username }: BerandaProps) {
  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">Selamat Datang, {username}!</h1>
        <p className="text-muted-foreground mt-2">
          Dashboard Statistik Mahasiswa Baru
        </p>
      </div>

      {/* Total Mahasiswa */}
      <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100">Total Mahasiswa</p>
              <p className="text-4xl font-bold mt-2">{statistics.totalMahasiswa}</p>
            </div>
            <Users className="h-16 w-16 opacity-80" />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-6">
        {/* Per Tahun Angkatan */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <GraduationCap className="mr-2 h-5 w-5" />
              Per Tahun Angkatan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(statistics.perTahun).map(([tahun, jumlah]) => (
                <div key={tahun} className="flex justify-between items-center">
                  <span className="text-muted-foreground">{tahun}</span>
                  <span className="font-semibold">{jumlah} mahasiswa</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Per Jalur Masuk */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Building2 className="mr-2 h-5 w-5" />
              Per Jalur Masuk
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(statistics.perJalurMasuk).map(([jalur, jumlah]) => (
                <div key={jalur} className="flex justify-between items-center">
                  <span className="text-muted-foreground">{jalur}</span>
                  <span className="font-semibold">{jumlah} mahasiswa</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Per Jurusan */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Building2 className="mr-2 h-5 w-5" />
              Per Jurusan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(statistics.perJurusan).map(([jurusan, jumlah]) => (
                <div key={jurusan} className="flex justify-between items-center">
                  <span className="text-muted-foreground">{jurusan}</span>
                  <span className="font-semibold">{jumlah} mahasiswa</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Per Program Studi */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <GraduationCap className="mr-2 h-5 w-5" />
              Per Program Studi
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {Object.entries(statistics.perProdi).map(([prodi, jumlah]) => (
                <div key={prodi} className="flex justify-between items-center">
                  <span className="text-muted-foreground text-sm">{prodi}</span>
                  <span className="font-semibold">{jumlah}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Per Jenis UKT */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <DollarSign className="mr-2 h-5 w-5" />
            Per Jenis UKT
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-5 gap-4">
            {Object.entries(statistics.perJenisUKT).map(([jenis, jumlah]) => (
              <div key={jenis} className="text-center p-4 bg-muted rounded-lg">
                <p className="text-2xl font-bold">{jumlah}</p>
                <p className="text-sm text-muted-foreground mt-1">{jenis}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
