import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Users, GraduationCap, Building2, DollarSign } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, Sector } from "recharts";
import { useState } from "react";

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

const COLORS = {
  tahun: ['#2563eb', '#3b82f6', '#60a5fa', '#93c5fd'],
  jalur: ['#059669', '#10b981', '#34d399', '#6ee7b7'],
  jurusan: ['#d97706', '#f59e0b', '#fbbf24', '#fcd34d', '#fde68a'],
  prodi: ['#dc2626', '#ef4444', '#f87171', '#fca5a5', '#fb923c', '#f97316', '#fb923c', '#fdba74', '#fed7aa', '#fde047'],
  ukt: ['#7c3aed', '#8b5cf6', '#a78bfa', '#c4b5fd', '#ddd6fe'],
};

// Custom label component for pie chart
const renderActiveShape = (props: any) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;
  
  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 10}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
    </g>
  );
};

export function Beranda({ username }: BerandaProps) {
  const [activeTahun, setActiveTahun] = useState<number | undefined>(undefined);
  const [activeJalur, setActiveJalur] = useState<number | undefined>(undefined);
  const [activeUKT, setActiveUKT] = useState<number | undefined>(undefined);

  // Transform data for pie charts
  const tahunData = Object.entries(statistics.perTahun).map(([name, value]) => ({ name, value }));
  const jalurData = Object.entries(statistics.perJalurMasuk).map(([name, value]) => ({ name, value }));
  const uktData = Object.entries(statistics.perJenisUKT).map(([name, value]) => ({ name, value }));

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">Selamat Datang, {username}!</h1>
        <p className="text-muted-foreground mt-2">
          Dashboard Statistik Mahasiswa Baru
        </p>
      </div>

      {/* Total Mahasiswa */}
      <Card className="bg-gradient-to-b from-blue-600 to-blue-700 text-white">
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
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  activeIndex={activeTahun}
                  activeShape={renderActiveShape}
                  data={tahunData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  dataKey="value"
                  onMouseEnter={(_, index) => setActiveTahun(index)}
                  onMouseLeave={() => setActiveTahun(undefined)}
                >
                  {tahunData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS.tahun[index % COLORS.tahun.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
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
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  activeIndex={activeJalur}
                  activeShape={renderActiveShape}
                  data={jalurData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  dataKey="value"
                  onMouseEnter={(_, index) => setActiveJalur(index)}
                  onMouseLeave={() => setActiveJalur(undefined)}
                >
                  {jalurData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS.jalur[index % COLORS.jalur.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Per Jenis UKT */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <span className="mr-2 text-lg font-semibold">Rp</span>
            Per Jenis UKT
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                activeIndex={activeUKT}
                activeShape={renderActiveShape}
                data={uktData}
                cx="50%"
                cy="50%"
                innerRadius={80}
                outerRadius={100}
                dataKey="value"
                onMouseEnter={(_, index) => setActiveUKT(index)}
                onMouseLeave={() => setActiveUKT(undefined)}
              >
                {uktData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS.ukt[index % COLORS.ukt.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}