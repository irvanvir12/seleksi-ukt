import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { ArrowLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Input } from "./ui/input";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "./ui/tabs";
import {
  Briefcase,
  UserCircle,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface ProfileFormData {
  namaLengkap: string;
  nim: string;
  email: string;
  nomorHandphone: string;
  alamat: string;
  provinsi: string;
  kelurahan: string;
  kodePos: string;
  rt: string;
  rw: string;
  no: string;
  tempatLahir: string;
  tanggalLahir: string;
  nik: string;
  anakKe: string;

  // orang tua / wali
  namaAyah: string;
  pekerjaanAyah: string;
  penghasilanAyah: string;
  pendidikanAyah: string;

  namaIbu: string;
  pekerjaanIbu: string;
  penghasilanIbu: string;
  pendidikanIbu: string;

  namaWali: string;
  hubunganWali: string;
  penghasilanWali: string;

  keteranganLainnya: string;
}

export function ProfileForm({ onBack }: { onBack?: () => void }) {
  const { register, watch, handleSubmit } = useForm<ProfileFormData>();

  // DATA DARI DB (contoh)
  const [jenisKelamin] = useState("Laki-laki");
  const [agama] = useState("Islam");
  const [jenisTinggal] = useState("Milik Sendiri");
  const [pemilikKPS] = useState("Tidak");
  const [jalurMasuk] = useState("Prestasi");
  const [department] = useState("Teknik Informatika");
  const [programStudi] = useState("Informatika");

  const namaLengkap = watch("namaLengkap");
  const nim = watch("nim");

  const onSubmit = (data: ProfileFormData) => {
    console.log("VERIFIKASI:", data);
  };

  return (
    <div className="w-full max-w-7xl mx-auto grid grid-cols-[300px_1fr] gap-6 items-start">
      {/* ================= SIDEBAR ================= */}
      <div>
        {onBack && (
          <Button
            variant="outline"
            onClick={onBack}
            className="mb-4 bg-white"
          >
            <ArrowLeft className="mr-2 size-4" />
            Kembali ke Daftar
          </Button>
        )}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="h-32 w-32">
                <AvatarImage src="" />
                <AvatarFallback className="text-2xl">
                  {namaLengkap?.[0] || "U"}
                </AvatarFallback>
              </Avatar>

              <div className="text-center space-y-1">
                <h3 className="font-semibold text-lg">
                  {namaLengkap || "Nama Mahasiswa"}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {nim || "NIM"}
                </p>
                <p className="text-xs text-muted-foreground">{jalurMasuk}</p>
              </div>

              <div className="w-full pt-4 border-t space-y-2">
                <div className="flex gap-2 text-sm">
                  <Briefcase className="h-4 w-4" />
                  {department}
                </div>
                <div className="flex gap-2 text-sm">
                  <Briefcase className="h-4 w-4" />
                  {programStudi}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ================= KONTEN KANAN ================= */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <UserCircle className="h-6 w-6" />
            <CardTitle>Daftar Isian Penunjang UKT</CardTitle>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Tabs defaultValue="mahasiswa" className="space-y-6">
              <TabsList className="grid grid-cols-5 w-full">
                <TabsTrigger value="mahasiswa">Data Mahasiswa</TabsTrigger>
                <TabsTrigger value="ayah">Data Ayah</TabsTrigger>
                <TabsTrigger value="ibu">Data Ibu</TabsTrigger>
                <TabsTrigger value="wali">Data Wali</TabsTrigger>
                <TabsTrigger value="pendukung">Pendukung</TabsTrigger>
              </TabsList>

              {/* ===== TAB MAHASISWA ===== */}
              <TabsContent value="mahasiswa">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Nama Lengkap</Label>
                    <Input {...register("namaLengkap")} readOnly disabled />
                  </div>

                  <div className="space-y-2">
                    <Label>NIM</Label>
                    <Input {...register("nim")} readOnly disabled />
                  </div>

                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input {...register("email")} readOnly disabled />
                  </div>

                  <div className="space-y-2">
                    <Label>Nomor HP</Label>
                    <Input {...register("nomorHandphone")} readOnly disabled />
                  </div>

                  <div className="space-y-2">
                    <Label>Alamat</Label>
                    <Input {...register("alamat")} readOnly disabled />
                  </div>

                  <div className="space-y-2">
                    <Label>Provinsi</Label>
                    <Input {...register("provinsi")} readOnly disabled />
                  </div>

                  <div className="space-y-2">
                    <Label>Kelurahan</Label>
                    <Input {...register("kelurahan")} readOnly disabled />
                  </div>

                  <div className="space-y-2">
                    <Label>Kode Pos</Label>
                    <Input {...register("kodePos")} readOnly disabled />
                  </div>

                  <div className="space-y-2">
                    <Label>RT</Label>
                    <Input {...register("rt")} readOnly disabled />
                  </div>

                  <div className="space-y-2">
                    <Label>RW</Label>
                    <Input {...register("rw")} readOnly disabled />
                  </div>

                  <div className="space-y-2">
                    <Label>No. Rumah</Label>
                    <Input {...register("no")} readOnly disabled />
                  </div>

                  <div className="space-y-2">
                    <Label>Tempat Lahir</Label>
                    <Input {...register("tempatLahir")} readOnly disabled />
                  </div>

                  <div className="space-y-2">
                    <Label>Tanggal Lahir</Label>
                    <Input {...register("tanggalLahir")} readOnly disabled />
                  </div>

                  <div className="space-y-2">
                    <Label>NIK</Label>
                    <Input {...register("nik")} readOnly disabled />
                  </div>

                  <div className="space-y-2">
                    <Label>Anak Ke</Label>
                    <Input {...register("anakKe")} readOnly disabled />
                  </div>

                  <div className="space-y-2">
                    <Label>Jenis Kelamin</Label>
                    <Input value={jenisKelamin} readOnly disabled />
                  </div>

                  <div className="space-y-2">
                    <Label>Agama</Label>
                    <Input value={agama} readOnly disabled />
                  </div>

                  <div className="space-y-2">
                    <Label>Jenis Tinggal</Label>
                    <Input value={jenisTinggal} readOnly disabled />
                  </div>

                  <div className="space-y-2">
                    <Label>Pemilik KPS</Label>
                    <Input value={pemilikKPS} readOnly disabled />
                  </div>
                </div>
              </TabsContent>

              {/* ===== TAB AYAH ===== */}
              <TabsContent value="ayah">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Nama Ayah</Label>
                    <Input {...register("namaAyah")} readOnly disabled />
                  </div>

                  <div className="space-y-2">
                    <Label>Pekerjaan Ayah</Label>
                    <Input {...register("pekerjaanAyah")} readOnly disabled />
                  </div>

                  <div className="space-y-2">
                    <Label>Penghasilan Ayah</Label>
                    <Input {...register("penghasilanAyah")} readOnly disabled />
                  </div>

                  <div className="space-y-2">
                    <Label>Pendidikan Ayah</Label>
                    <Input {...register("pendidikanAyah")} readOnly disabled />
                  </div>
                </div>
              </TabsContent>

              {/* ===== TAB IBU ===== */}
              <TabsContent value="ibu">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Nama Ibu</Label>
                    <Input {...register("namaIbu")} readOnly disabled />
                  </div>

                  <div className="space-y-2">
                    <Label>Pekerjaan Ibu</Label>
                    <Input {...register("pekerjaanIbu")} readOnly disabled />
                  </div>

                  <div className="space-y-2">
                    <Label>Penghasilan Ibu</Label>
                    <Input {...register("penghasilanIbu")} readOnly disabled />
                  </div>

                  <div className="space-y-2">
                    <Label>Pendidikan Ibu</Label>
                    <Input {...register("pendidikanIbu")} readOnly disabled />
                  </div>
                </div>
              </TabsContent>

              {/* ===== TAB WALI ===== */}
              <TabsContent value="wali">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Nama Wali</Label>
                    <Input {...register("namaWali")} readOnly disabled />
                  </div>

                  <div className="space-y-2">
                    <Label>Hubungan Wali</Label>
                    <Input {...register("hubunganWali")} readOnly disabled />
                  </div>

                  <div className="space-y-2">
                    <Label>Penghasilan Wali</Label>
                    <Input {...register("penghasilanWali")} readOnly disabled />
                  </div>
                </div>
              </TabsContent>

              {/* ===== TAB PENDUKUNG ===== */}
              <TabsContent value="pendukung">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2 col-span-2">
                    <Label>Keterangan Pendukung Lainnya</Label>
                    <Input {...register("keteranganLainnya")} readOnly disabled />
                  </div>
                </div>
              </TabsContent>

              <div className="flex gap-4 pt-4 border-t">
                <Button type="submit" className="flex-1">Verifikasi</Button>
                <Button type="button" variant="outline" className="flex-1">
                  Tolak
                </Button>
              </div>
            </Tabs>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}