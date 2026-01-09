import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Briefcase, UserCircle } from "lucide-react";

/**
 * CONTOH DATA
 * nanti ganti dari API / props / store
 */
const mahasiswa = {
  nama_lengkap: "John Doe",
  nim: "123456789",
  email: "john.doe@example.com",
  phone: "+1 (555) 000-0000",
  alamat: "Cimahi Selatan",
  provinsi: "Jawa Barat",
  kelurahan: "Cimahi Selatan",
  kode_pos: "40513",
  rt: "01",
  rw: "01",
  no_rumah: "123",
  jenis_kelamin: "Laki-laki",
  tempat_lahir: "Bandung",
  tanggal_lahir: "2001-01-01",
  nik: "1234567890123456",
  agama: "Islam",
  anak_ke: "1",
  jenis_tinggal: "Milik Sendiri",
  pemilik_kps: true,
  jurusan: "Teknik Informatika",
  program_studi: "Informatika",
  jalur_masuk: "Prestasi",
};

function DisplayField({
  label,
  value,
}: {
  label: string;
  value?: string | null;
}) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      <Input
        value={value ?? "-"}
        disabled
        readOnly
        className="bg-muted text-muted-foreground cursor-default"
      />
    </div>
  );
}

export function ProfileVerification() {
  return (
    <div className="w-full max-w-7xl mx-auto grid grid-cols-[300px_1fr] gap-6 items-start">
      {/* SIDEBAR KIRI */}
      <div className="sticky top-6 h-fit">
        <Card>
          <CardContent>
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="h-32 w-32">
                <AvatarImage src="" />
                <AvatarFallback className="text-2xl">
                  {mahasiswa.nama_lengkap[0]}
                </AvatarFallback>
              </Avatar>

              <div className="text-center space-y-1">
                <h3 className="font-semibold text-lg">
                  {mahasiswa.nama_lengkap}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {mahasiswa.nim}
                </p>
                <p className="text-xs text-muted-foreground">
                  {mahasiswa.jalur_masuk}
                </p>
              </div>

              <div className="w-full pt-4 border-t space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Briefcase className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">
                    {mahasiswa.jurusan}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Briefcase className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">
                    {mahasiswa.program_studi}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* KONTEN KANAN */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <UserCircle className="h-6 w-6" />
            <CardTitle>Daftar Isian Penunjang UKT</CardTitle>
          </div>
        </CardHeader>

        <CardContent className="space-y-8">
          {/* BIODATA MAHASISWA */}
          <section className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">
              Biodata Mahasiswa
            </h3>

            <div className="grid grid-cols-2 gap-6">
              <DisplayField label="Nama Lengkap" value={mahasiswa.nama_lengkap} />
              <DisplayField label="NIM" value={mahasiswa.nim} />
              <DisplayField label="Email" value={mahasiswa.email} />
              <DisplayField label="Phone Number" value={mahasiswa.phone} />
              <DisplayField label="Alamat" value={mahasiswa.alamat} />
              <DisplayField label="Provinsi" value={mahasiswa.provinsi} />
              <DisplayField label="Kelurahan" value={mahasiswa.kelurahan} />
              <DisplayField label="Kode Pos" value={mahasiswa.kode_pos} />
              <DisplayField label="RT" value={mahasiswa.rt} />
              <DisplayField label="RW" value={mahasiswa.rw} />
              <DisplayField label="No. Rumah" value={mahasiswa.no_rumah} />
              <DisplayField label="Jenis Kelamin" value={mahasiswa.jenis_kelamin} />
              <DisplayField label="Tempat Lahir" value={mahasiswa.tempat_lahir} />
              <DisplayField label="Tanggal Lahir" value={mahasiswa.tanggal_lahir} />
              <DisplayField label="NIK" value={mahasiswa.nik} />
              <DisplayField label="Agama" value={mahasiswa.agama} />
              <DisplayField label="Anak Ke" value={mahasiswa.anak_ke} />
              <DisplayField label="Jenis Tinggal" value={mahasiswa.jenis_tinggal} />
              <DisplayField
                label="Penerima KPS"
                value={mahasiswa.pemilik_kps ? "Ya" : "Tidak"}
              />
            </div>
          </section>

          {/* ACTION */}
          <div className="flex gap-4 pt-4 border-t">
            <Button className="flex-1">Verifikasi</Button>
            <Button variant="outline" className="flex-1">
              Perlu Perbaikan
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
