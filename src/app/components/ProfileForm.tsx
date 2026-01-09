import { useForm } from "react-hook-form";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { toast } from "sonner";
import { User, Mail, Phone, MapPin, Briefcase, Calendar, Upload, UserCircle } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface ProfileFormData {
  namaLengkap: string;
  alamat: string;
  rt: string;
  rw: string;
  no: string;
  kelurahan: string;
  provinsi: string;
  kodePos: string;
  jenisKelamin: string;
  nomorHandphone: string;
  email: string;
  tempatLahir: string;
  tanggalLahir: string;
  nik: string;
  agama: string;
  anakKe: string;
  jenisTinggal: string;
  pemilikKPS: string;
  department: string;
  nim: string;
  jalurMasuk: string;
  programStudi: string;
}

export function ProfileForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<ProfileFormData>();

  const [avatarUrl, setAvatarUrl] = useState<string>("");
  const [department, setDepartment] = useState<string>("");
  const [jenisKelamin, setJenisKelamin] = useState<string>("");
  const [agama, setAgama] = useState<string>("");
  const [jalurMasuk, setJalurMasuk] = useState<string>("");
  const [programStudi, setProgramStudi] = useState<string>("");
  const [jenisTinggal, setJenisTinggal] = useState<string>("");
  const [pemilikKPS, setPemilikKPS] = useState<string>("");

  const namaLengkap = watch("namaLengkap");
  const nim = watch("nim");

  const onSubmit = (data: ProfileFormData) => {
    console.log("Profile data:", { ...data, department, avatar: avatarUrl });
    toast.success("Profile created successfully!");
    reset();
    setDepartment("");
    setAvatarUrl("");
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAvatarUrl(url);
      toast.success("Avatar uploaded successfully!");
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto grid grid-cols-[300px_1fr] gap-6">
      {/* Left Sidebar - Profile Preview */}
      <Card className="h-fit sticky top 0">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <Avatar className="h-32 w-32">
                <AvatarImage src={avatarUrl} />
                <AvatarFallback className="text-2xl">
                  {namaLengkap?.[0] || "U"}
                </AvatarFallback>
              </Avatar>
              <label
                htmlFor="avatar-upload"
                className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-2 cursor-pointer hover:bg-primary/90 transition"
              >
                <Upload className="h-4 w-4" />
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarUpload}
                />
              </label>
            </div>

            <div className="text-center w-full space-y-1">
              <h3 className="font-semibold text-lg">
                {namaLengkap ? namaLengkap : "Nama Mahasiswa"}
              </h3>
              <p className="text-sm text-muted-foreground">{nim || "NIM"}</p>
              <p className="text-xs text-muted-foreground">{jalurMasuk || "Jalur Masuk"}</p>
            </div>

            <div className="w-full pt-4 border-t space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Briefcase className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">{department || "Jurusan"}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Briefcase className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">{programStudi || "Program Studi"}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Right Side - Form */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <UserCircle className="h-6 w-6" />
            <div>
              <CardTitle><h3 className="font-semibold text-lg">Daftar Isian Penunjang UKT</h3></CardTitle>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Personal Information Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold border-b pb-2">Biodata Mahasiswa</h3>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="namaLengkap">
                    Nama Lengkap <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="namaLengkap"
                      placeholder="John Doe"
                      className="pl-10"
                      {...register("namaLengkap", {
                        required: "Nama lengkap is required",
                        minLength: {
                          value: 2,
                          message: "Nama lengkap must be at least 2 characters",
                        },
                      })}
                    />
                  </div>
                  {errors.namaLengkap && (
                    <p className="text-sm text-red-500">{errors.namaLengkap.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="nim">
                    NIM <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="nim"
                      placeholder="123456789"
                      className="pl-10"
                      {...register("nim", {
                        required: "NIM is required",
                        minLength: {
                          value: 9,
                          message: "NIM must be at least 9 characters",
                        },
                      })}
                    />
                  </div>
                  {errors.nim && (
                    <p className="text-sm text-red-500">{errors.nim.message}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="email">
                    Email <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="john.doe@example.com"
                      className="pl-10"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address",
                        },
                      })}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-sm text-red-500">{errors.email.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="nomorHandphone">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="nomorHandphone"
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      className="pl-10"
                      {...register("nomorHandphone", {
                        pattern: {
                          value: /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,4}[-\s.]?[0-9]{1,9}$/,
                          message: "Invalid phone number",
                        },
                      })}
                    />
                  </div>
                  {errors.nomorHandphone && (
                    <p className="text-sm text-red-500">{errors.nomorHandphone.message}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="alamat">Alamat</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="alamat"
                      placeholder="New York, USA"
                      className="pl-10"
                      {...register("alamat")}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="provinsi">Provinsi</Label>
                  <Input
                    id="provinsi"
                    type="text"
                    placeholder="Jawa Barat"
                    {...register("provinsi")}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="kelurahan">Kelurahan</Label>
                  <Input
                    id="kelurahan"
                    type="text"
                    placeholder="Cimahi Selatan"
                    {...register("kelurahan")}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="kodePos">Kode Pos</Label>
                  <Input
                    id="kodePos"
                    type="text"
                    placeholder="40513"
                    {...register("kodePos")}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="rt">RT</Label>
                  <Input
                    id="rt"
                    type="text"
                    placeholder="01"
                    {...register("rt")}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rw">RW</Label>
                  <Input
                    id="rw"
                    type="text"
                    placeholder="01"
                    {...register("rw")}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="no">No. Rumah</Label>
                  <Input
                    id="no"
                    type="text"
                    placeholder="123"
                    {...register("no")}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="jenisKelamin">
                    Jenis Kelamin <span className="text-red-500">*</span>
                  </Label>
                  <Select value={jenisKelamin} onValueChange={setJenisKelamin}>
                    <SelectTrigger id="jenisKelamin">
                      <SelectValue placeholder="Select jenis kelamin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="laki-laki">Laki-laki</SelectItem>
                      <SelectItem value="perempuan">Perempuan</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="tempatLahir">Tempat Lahir</Label>
                  <Input
                    id="tempatLahir"
                    type="text"
                    placeholder="Bandung"
                    {...register("tempatLahir")}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tanggalLahir">Tanggal Lahir</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="tanggalLahir"
                      type="date"
                      className="pl-10"
                      {...register("tanggalLahir")}
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="nik">NIK</Label>
                  <Input
                    id="nik"
                    type="text"
                    placeholder="1234567890123456"
                    {...register("nik")}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="agama">
                    Agama <span className="text-red-500">*</span>
                  </Label>
                  <Select value={agama} onValueChange={setAgama}>
                    <SelectTrigger id="agama">
                      <SelectValue placeholder="Select agama" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="islam">Islam</SelectItem>
                      <SelectItem value="kristen">Kristen</SelectItem>
                      <SelectItem value="hindu">Hindu</SelectItem>
                      <SelectItem value="budha">Budha</SelectItem>
                      <SelectItem value="konghucu">Konghucu</SelectItem>
                      <SelectItem value="atheis">Atheis</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="anakKe">Anak Ke</Label>
                  <Input
                    id="anakKe"
                    type="text"
                    placeholder="1"
                    {...register("anakKe")}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="jenisTinggal">
                    Jenis Tinggal <span className="text-red-500">*</span>
                  </Label>
                  <Select value={jenisTinggal} onValueChange={setJenisTinggal}>
                    <SelectTrigger id="jenisTinggal">
                      <SelectValue placeholder="Select jenis tinggal" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="milik-sendiri">Milik Sendiri</SelectItem>
                      <SelectItem value="sewa">Sewa</SelectItem>
                      <SelectItem value="kontrak">Kontrak</SelectItem>
                      <SelectItem value="tinggal-bersama-keluarga">Tinggal Bersama Keluarga</SelectItem>
                      <SelectItem value="kost">Kost</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="pemilikKPS">
                    Pemilik KPS <span className="text-red-500">*</span>
                  </Label>
                  <Select value={pemilikKPS} onValueChange={setPemilikKPS}>
                    <SelectTrigger id="pemilikKPS">
                      <SelectValue placeholder="Pilih status KPS" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ya">Ya</SelectItem>
                      <SelectItem value="tidak">Tidak</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Professional Information Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold border-b pb-2">Biodata Orang Tua/Wali</h3>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="department">
                      Department <span className="text-red-500">*</span>
                    </Label>
                    <Select value={department} onValueChange={setDepartment}>
                      <SelectTrigger id="department">
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="engineering">Engineering</SelectItem>
                        <SelectItem value="design">Design</SelectItem>
                        <SelectItem value="product">Product</SelectItem>
                        <SelectItem value="marketing">Marketing</SelectItem>
                        <SelectItem value="sales">Sales</SelectItem>
                        <SelectItem value="hr">Human Resources</SelectItem>
                        <SelectItem value="finance">Finance</SelectItem>
                        <SelectItem value="operations">Operations</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="jalurMasuk">
                      Jalur Masuk <span className="text-red-500">*</span>
                    </Label>
                    <Select value={jalurMasuk} onValueChange={setJalurMasuk}>
                      <SelectTrigger id="jalurMasuk">
                        <SelectValue placeholder="Select jalur masuk" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="umum">Umum</SelectItem>
                        <SelectItem value="prestasi">Prestasi</SelectItem>
                        <SelectItem value="beasiswa">Beasiswa</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="programStudi">
                    Program Studi <span className="text-red-500">*</span>
                  </Label>
                  <Select value={programStudi} onValueChange={setProgramStudi}>
                    <SelectTrigger id="programStudi">
                      <SelectValue placeholder="Select program studi" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="informatika">Informatika</SelectItem>
                      <SelectItem value="sistemInformasi">Sistem Informasi</SelectItem>
                      <SelectItem value="teknikElektro">Teknik Elektro</SelectItem>
                      <SelectItem value="teknikMesin">Teknik Mesin</SelectItem>
                      <SelectItem value="teknikKimia">Teknik Kimia</SelectItem>
                      <SelectItem value="teknikIndustri">Teknik Industri</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-4 pt-4 border-t">
                <Button type="submit" size="lg" className="flex-1">
                  Create Profile
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  onClick={() => {
                    reset();
                    setDepartment("");
                    setAvatarUrl("");
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}