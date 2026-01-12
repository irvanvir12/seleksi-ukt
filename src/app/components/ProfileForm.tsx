import { useState } from "react";
import { useForm } from "react-hook-form";
import { ArrowLeft, UserCircle, Eye } from "lucide-react";
import { toast } from "sonner";

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Checkbox } from "./ui/checkbox";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";

/* ======================================================
   KOMPONEN FIELD VERIFIKASI
====================================================== */
interface FieldWithVerificationProps {
  label: string;
  value?: string;
  registerProps?: any;
  fieldName?: string;
  hasFile?: boolean;
  verificationValue?: string;
  onVerificationChange?: (field: string, value: string) => void;
}

function FieldWithVerification({
  label,
  value,
  registerProps,
  fieldName = "",
  hasFile = false,
  verificationValue = "",
  onVerificationChange,
}: FieldWithVerificationProps) {
  const handleViewDocument = () => {
    if (hasFile) {
      toast.info(`Membuka dokumen: ${label}`);
    } else {
      toast.warning(`Tidak ada dokumen untuk: ${label}`);
    }
  };

  const handleRadioChange = (value: string) => {
    if (onVerificationChange && fieldName) {
      onVerificationChange(fieldName, value);
    }
  };

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Input {...registerProps} value={value} readOnly disabled />
      <div className="flex items-center gap-3 pt-1">
        <Button
          type="button"
          variant={hasFile ? "outline" : "secondary"}
          size="sm"
          onClick={handleViewDocument}
          className="h-8 text-xs"
        >
          <Eye className="h-3 w-3 mr-1" />
          {hasFile ? "Lihat" : "Kosong"}
        </Button>
        <RadioGroup
          value={verificationValue}
          onValueChange={handleRadioChange}
          className="flex items-center gap-4"
        >
          <div className="flex items-center gap-2">
            <RadioGroupItem value="sesuai" id={`${fieldName}-sesuai`} />
            <label htmlFor={`${fieldName}-sesuai`} className="text-xs cursor-pointer">
              Sesuai
            </label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="tidak_sesuai" id={`${fieldName}-tidak_sesuai`} />
            <label htmlFor={`${fieldName}-tidak_sesuai`} className="text-xs cursor-pointer">
              Tidak Sesuai
            </label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
}

/* ======================================================
   INTERFACE
====================================================== */
interface ProfileFormData {
  namaLengkap: string;
  nim: string;
  email: string;
  nomorHandphone: string;
  alamat: string;
  provinsi: string;
  kelurahan: string;
  tempatLahir: string;
  tanggalLahir: string;
  nik: string;
  anakKe: string;
  statusOrtu: string;

  namaAyah: string;
  nikAyah: string;
  alamatAyah: string;
  keadaanAyah: string;
  pekerjaanAyah: string;
  penghasilanAyah: string;
  pendidikanAyah: string;
  pajakAyah: string;

  namaIbu: string;
  nikIbu: string;
  alamatIbu: string;
  keadaanIbu: string;
  pekerjaanIbu: string;
  penghasilanIbu: string;
  pendidikanIbu: string;
  pajakIbu: string;

  namaWali: string;
  hubunganWali: string;
  nikWali: string;
  alamatWali: string;
  pendidikanWali: string;
  pekerjaanWali: string;
  penghasilanWali: string;
  pajakWali: string;

  pemilikKIPSKTMDTKSKKS: string;
  jumlahAnakTanggunganOrangTua: string;
  pemilikTempatTinggal: string;
  jumlahKendaraanDimiliki: string;
  pembayaranPBB: string;
  pembayaranPLN: string;
  suratPernyataanOrangTuaPerokok: string;
}

/* ======================================================
   COMPONENT
====================================================== */
export function ProfileForm({
  onBack,
  selectedNIM,
  onVerificationComplete
}: {
  onBack?: () => void;
  selectedNIM?: string | null;
  onVerificationComplete?: (nim: string) => void;
}) {
  const { register, handleSubmit } = useForm<ProfileFormData>();

  /* ===== DATA DUMMY ===== */
  const [jenisKelamin] = useState("Laki-laki");
  const [agama] = useState("Islam");
  const [jenisTinggal] = useState("Milik Sendiri");
  const [pemilikKPS] = useState("Tidak");
  const [statusOrtu] = useState("Hidup");
  const [jalurMasuk] = useState("Prestasi");
  const [jurusan] = useState("Teknik Informatika");
  const [programStudi] = useState("Informatika");

  /* ===== STATUS FILE UPLOAD (DUMMY - SIMULASI) ===== */
  const [fileStatus] = useState<Record<string, boolean>>({
    statusOrtu: true, // Ada file
    pendidikanAyah: true,
    pekerjaanAyah: false, // Tidak ada file
    penghasilanAyah: true,
    pajakAyah: false,
    pendidikanIbu: true,
    pekerjaanIbu: true,
    penghasilanIbu: false,
    pajakIbu: true,
    pendidikanWali: false,
    pekerjaanWali: true,
    penghasilanWali: true,
    pajakWali: false,
    pemilikKIPSKTMDTKSKKS: true,
    jumlahAnakTanggunganOrangTua: true,
    pemilikTempatTinggal: false,
    jumlahKendaraanDimiliki: true,
    pembayaranPBB: true,
    pembayaranPLN: false,
    suratPernyataanOrangTuaPerokok: true,
  });

  /* ===== STATUS VERIFIKASI ===== */
  const [verificationStatus, setVerificationStatus] = useState<Record<string, string>>({});

  const handleVerificationChange = (field: string, value: string) => {
    setVerificationStatus((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  /* ===== WIZARD TAB ===== */
  const tabs = ["mahasiswa", "ayah", "ibu", "wali", "pendukung"] as const;
  type TabKey = (typeof tabs)[number];

  const [activeTab, setActiveTab] = useState<TabKey>("mahasiswa");
  const currentIndex = tabs.indexOf(activeTab);
  const progress = ((currentIndex + 1) / tabs.length) * 100;

  const [openConfirm, setOpenConfirm] = useState(false);

  /* ===== VALIDASI (DISIAPKAN, DINONAKTIFKAN) ===== */
  const validateCurrentTab = () => {
    /*
    // Aktifkan saat data real
    return false;
    */
    return true;
  };

  const onSubmit = (data: ProfileFormData) => {
    console.log("VERIFIKASI (SIMULASI):", data);
    toast.success("Data berhasil diverifikasi dan UKT telah ditetapkan!");

    // Close confirmation dialog
    setOpenConfirm(false);

    // Call verification complete handler
    if (onVerificationComplete && selectedNIM) {
      // Use timeout to allow toast to show first
      setTimeout(() => {
        onVerificationComplete(selectedNIM);
      }, 500);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto grid grid-cols-[300px_1fr] gap-6 items-start">
      {/* ================= SIDEBAR ================= */}
      <div>
        {onBack && (
          <Button variant="outline" onClick={onBack} className="mb-4 bg-white">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Kembali ke Daftar
          </Button>
        )}

        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="h-32 w-32">
                <AvatarImage src="" />
                <AvatarFallback className="text-2xl">FOTO</AvatarFallback>
              </Avatar>

              <div className="w-full pt-4 border-t space-y-2 text-sm">
                <div className="flex gap-2">
                  <span className="font-medium w-28">Jalur Masuk</span>: {jalurMasuk}
                </div>
                <div className="flex gap-2">
                  <span className="font-medium w-28">Jurusan</span>: {jurusan}
                </div>
                <div className="flex gap-2">
                  <span className="font-medium w-28">Program Studi</span>: {programStudi}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ================= CONTENT ================= */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <UserCircle className="h-6 w-6" />
            <CardTitle>Daftar Isian Penunjang UKT</CardTitle>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* ===== PROGRESS ===== */}
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span>Progress</span>
              <span>{currentIndex + 1} / {tabs.length}</span>
            </div>
            <div className="h-2 bg-muted rounded">
              <div
                className="h-2 bg-primary rounded transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <form>
            <Tabs
              value={activeTab}
              onValueChange={(v) => setActiveTab(v as TabKey)}
              className="space-y-6"
            >
              <TabsList className="grid grid-cols-5 w-full">
                <TabsTrigger value="mahasiswa">Data Mahasiswa</TabsTrigger>
                <TabsTrigger value="ayah">Data Ayah</TabsTrigger>
                <TabsTrigger value="ibu">Data Ibu</TabsTrigger>
                <TabsTrigger value="wali">Data Wali</TabsTrigger>
                <TabsTrigger value="pendukung">Pendukung</TabsTrigger>
              </TabsList>

              {/* ================= TAB MAHASISWA ================= */}
              <TabsContent value="mahasiswa">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2"><Label>Nama Lengkap</Label><Input {...register("namaLengkap")} readOnly disabled /></div>
                  <div className="space-y-2"><Label>NIM</Label><Input {...register("nim")} readOnly disabled /></div>
                  <div className="space-y-2"><Label>Email</Label><Input {...register("email")} readOnly disabled /></div>
                  <div className="space-y-2"><Label>Nomor HP</Label><Input {...register("nomorHandphone")} readOnly disabled /></div>
                  <div className="space-y-2"><Label>Alamat</Label><Input {...register("alamat")} readOnly disabled /></div>
                  <div className="space-y-2"><Label>Provinsi</Label><Input {...register("provinsi")} readOnly disabled /></div>
                  <div className="space-y-2"><Label>Tempat Lahir</Label><Input {...register("tempatLahir")} readOnly disabled /></div>
                  <div className="space-y-2"><Label>Tanggal Lahir</Label><Input {...register("tanggalLahir")} readOnly disabled /></div>
                  <div className="space-y-2"><Label>NIK</Label><Input {...register("nik")} readOnly disabled /></div>
                  <div className="space-y-2"><Label>Anak Ke</Label><Input {...register("anakKe")} readOnly disabled /></div>
                  <div className="space-y-2"><Label>Jenis Kelamin</Label><Input value={jenisKelamin} readOnly disabled /></div>
                  <div className="space-y-2"><Label>Agama</Label><Input value={agama} readOnly disabled /></div>
                  <div className="space-y-2"><Label>Jenis Tinggal</Label><Input value={jenisTinggal} readOnly disabled /></div>
                  <div className="space-y-2"><Label>Pemilik KPS</Label><Input value={pemilikKPS} readOnly disabled /></div>
                  <FieldWithVerification
                    label="Keadaan Orang Tua"
                    value={statusOrtu}
                    fieldName="statusOrtu"
                    hasFile={fileStatus.statusOrtu}
                    verificationValue={verificationStatus.statusOrtu}
                    onVerificationChange={handleVerificationChange}
                  />
                </div>
              </TabsContent>

              {/* ================= TAB AYAH ================= */}
              <TabsContent value="ayah">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2"><Label>Nama Ayah</Label><Input {...register("namaAyah")} readOnly disabled /></div>
                  <div className="space-y-2"><Label>NIK Ayah</Label><Input {...register("nikAyah")} readOnly disabled /></div>
                  <div className="space-y-2"><Label>Alamat Ayah</Label><Input {...register("alamatAyah")} readOnly disabled /></div>
                  <FieldWithVerification
                    label="Pendidikan Ayah"
                    registerProps={register("pendidikanAyah")}
                    fieldName="pendidikanAyah"
                    hasFile={fileStatus.pendidikanAyah}
                    verificationValue={verificationStatus.pendidikanAyah}
                    onVerificationChange={handleVerificationChange}
                  />
                  <FieldWithVerification
                    label="Pekerjaan Ayah"
                    registerProps={register("pekerjaanAyah")}
                    fieldName="pekerjaanAyah"
                    hasFile={fileStatus.pekerjaanAyah}
                    verificationValue={verificationStatus.pekerjaanAyah}
                    onVerificationChange={handleVerificationChange}
                  />
                  <FieldWithVerification
                    label="Penghasilan Ayah"
                    registerProps={register("penghasilanAyah")}
                    fieldName="penghasilanAyah"
                    hasFile={fileStatus.penghasilanAyah}
                    verificationValue={verificationStatus.penghasilanAyah}
                    onVerificationChange={handleVerificationChange}
                  />
                  <FieldWithVerification
                    label="Pajak Penghasilan Ayah"
                    registerProps={register("pajakAyah")}
                    fieldName="pajakAyah"
                    hasFile={fileStatus.pajakAyah}
                    verificationValue={verificationStatus.pajakAyah}
                    onVerificationChange={handleVerificationChange}
                  />
                  <div className="space-y-2"><Label>Keadaan Ayah</Label><Input {...register("keadaanAyah")} readOnly disabled /></div>
                </div>
              </TabsContent>

              {/* ================= TAB IBU ================= */}
              <TabsContent value="ibu">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2"><Label>Nama Ibu</Label><Input {...register("namaIbu")} readOnly disabled /></div>
                  <div className="space-y-2"><Label>NIK Ibu</Label><Input {...register("nikIbu")} readOnly disabled /></div>
                  <div className="space-y-2"><Label>Alamat Ibu</Label><Input {...register("alamatIbu")} readOnly disabled /></div>
                  <FieldWithVerification
                    label="Pendidikan Ibu"
                    registerProps={register("pendidikanIbu")}
                    fieldName="pendidikanIbu"
                    hasFile={fileStatus.pendidikanIbu}
                    verificationValue={verificationStatus.pendidikanIbu}
                    onVerificationChange={handleVerificationChange}
                  />
                  <FieldWithVerification
                    label="Pekerjaan Ibu"
                    registerProps={register("pekerjaanIbu")}
                    fieldName="pekerjaanIbu"
                    hasFile={fileStatus.pekerjaanIbu}
                    verificationValue={verificationStatus.pekerjaanIbu}
                    onVerificationChange={handleVerificationChange}
                  />
                  <FieldWithVerification
                    label="Penghasilan Ibu"
                    registerProps={register("penghasilanIbu")}
                    fieldName="penghasilanIbu"
                    hasFile={fileStatus.penghasilanIbu}
                    verificationValue={verificationStatus.penghasilanIbu}
                    onVerificationChange={handleVerificationChange}
                  />
                  <FieldWithVerification
                    label="Pajak Penghasilan Ibu"
                    registerProps={register("pajakIbu")}
                    fieldName="pajakIbu"
                    hasFile={fileStatus.pajakIbu}
                    verificationValue={verificationStatus.pajakIbu}
                    onVerificationChange={handleVerificationChange}
                  />
                  <div className="space-y-2"><Label>Keadaan Ibu</Label><Input {...register("keadaanIbu")} readOnly disabled /></div>
                </div>
              </TabsContent>

              {/* ================= TAB WALI ================= */}
              <TabsContent value="wali">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2"><Label>Nama Wali</Label><Input {...register("namaWali")} readOnly disabled /></div>
                  <div className="space-y-2"><Label>NIK Wali</Label><Input {...register("nikWali")} readOnly disabled /></div>
                  <div className="space-y-2"><Label>Alamat Wali</Label><Input {...register("alamatWali")} readOnly disabled /></div>
                  <div className="space-y-2"><Label>Hubungan Wali</Label><Input {...register("hubunganWali")} readOnly disabled /></div>
                  <FieldWithVerification
                    label="Pendidikan Wali"
                    registerProps={register("pendidikanWali")}
                    fieldName="pendidikanWali"
                    hasFile={fileStatus.pendidikanWali}
                    verificationValue={verificationStatus.pendidikanWali}
                    onVerificationChange={handleVerificationChange}
                  />
                  <FieldWithVerification
                    label="Pekerjaan Wali"
                    registerProps={register("pekerjaanWali")}
                    fieldName="pekerjaanWali"
                    hasFile={fileStatus.pekerjaanWali}
                    verificationValue={verificationStatus.pekerjaanWali}
                    onVerificationChange={handleVerificationChange}
                  />
                  <FieldWithVerification
                    label="Penghasilan Wali"
                    registerProps={register("penghasilanWali")}
                    fieldName="penghasilanWali"
                    hasFile={fileStatus.penghasilanWali}
                    verificationValue={verificationStatus.penghasilanWali}
                    onVerificationChange={handleVerificationChange}
                  />
                  <FieldWithVerification
                    label="Pajak Penghasilan Wali"
                    registerProps={register("pajakWali")}
                    fieldName="pajakWali"
                    hasFile={fileStatus.pajakWali}
                    verificationValue={verificationStatus.pajakWali}
                    onVerificationChange={handleVerificationChange}
                  />
                </div>
              </TabsContent>

              {/* ================= TAB PENDUKUNG ================= */}
              <TabsContent value="pendukung">
                <div className="grid grid-cols-2 gap-6">
                  <FieldWithVerification
                    label="Pemilik KIP / SKTM / DTKS / KKS"
                    registerProps={register("pemilikKIPSKTMDTKSKKS")}
                    fieldName="pemilikKIPSKTMDTKSKKS"
                    hasFile={fileStatus.pemilikKIPSKTMDTKSKKS}
                    verificationValue={verificationStatus.pemilikKIPSKTMDTKSKKS}
                    onVerificationChange={handleVerificationChange}
                  />
                  <FieldWithVerification
                    label="Jumlah Anak Tanggungan"
                    registerProps={register("jumlahAnakTanggunganOrangTua")}
                    fieldName="jumlahAnakTanggunganOrangTua"
                    hasFile={fileStatus.jumlahAnakTanggunganOrangTua}
                    verificationValue={verificationStatus.jumlahAnakTanggunganOrangTua}
                    onVerificationChange={handleVerificationChange}
                  />
                  <FieldWithVerification
                    label="Pemilik Tempat Tinggal"
                    registerProps={register("pemilikTempatTinggal")}
                    fieldName="pemilikTempatTinggal"
                    hasFile={fileStatus.pemilikTempatTinggal}
                    verificationValue={verificationStatus.pemilikTempatTinggal}
                    onVerificationChange={handleVerificationChange}
                  />
                  <FieldWithVerification
                    label="Jumlah Kendaraan"
                    registerProps={register("jumlahKendaraanDimiliki")}
                    fieldName="jumlahKendaraanDimiliki"
                    hasFile={fileStatus.jumlahKendaraanDimiliki}
                    verificationValue={verificationStatus.jumlahKendaraanDimiliki}
                    onVerificationChange={handleVerificationChange}
                  />
                  <FieldWithVerification
                    label="Bukti Pembayaran PBB"
                    registerProps={register("pembayaranPBB")}
                    fieldName="pembayaranPBB"
                    hasFile={fileStatus.pembayaranPBB}
                    verificationValue={verificationStatus.pembayaranPBB}
                    onVerificationChange={handleVerificationChange}
                  />
                  <FieldWithVerification
                    label="Bukti Pembayaran PLN"
                    registerProps={register("pembayaranPLN")}
                    fieldName="pembayaranPLN"
                    hasFile={fileStatus.pembayaranPLN}
                    verificationValue={verificationStatus.pembayaranPLN}
                    onVerificationChange={handleVerificationChange}
                  />
                  <FieldWithVerification
                    label="Surat Pernyataan Orang Tua Perokok"
                    registerProps={register("suratPernyataanOrangTuaPerokok")}
                    fieldName="suratPernyataanOrangTuaPerokok"
                    hasFile={fileStatus.suratPernyataanOrangTuaPerokok}
                    verificationValue={verificationStatus.suratPernyataanOrangTuaPerokok}
                    onVerificationChange={handleVerificationChange}
                  />
                </div>
              </TabsContent>

              {/* ================= NAVIGASI ================= */}
              <div className="flex gap-4 pt-4 border-t">
                {currentIndex > 0 && (
                  <Button type="button" variant="outline" className="flex-1"
                    onClick={() => setActiveTab(tabs[currentIndex - 1])}>
                    Sebelumnya
                  </Button>
                )}

                {activeTab !== "pendukung" ? (
                  <Button type="button" className="flex-1"
                    onClick={() => validateCurrentTab() && setActiveTab(tabs[currentIndex + 1])}>
                    Berikutnya
                  </Button>
                ) : (
                  <Button type="button" className="flex-1" onClick={() => setOpenConfirm(true)}>
                    Verifikasi
                  </Button>
                )}
              </div>
            </Tabs>
          </form>
        </CardContent>
      </Card>

      {/* ================= KONFIRMASI ================= */}
      <AlertDialog open={openConfirm} onOpenChange={setOpenConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Konfirmasi Verifikasi</AlertDialogTitle>
            <AlertDialogDescription>
              Pastikan seluruh data sudah benar. Proses ini masih simulasi.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction onClick={handleSubmit(onSubmit)}>
              Ya, Verifikasi
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}