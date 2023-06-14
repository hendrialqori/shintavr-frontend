Minimal 5 menu
Website pendaftaran sekolah SMA 1 Mandor

- Login : Google (Auth) and password & sandi / Logout

- Register : {

  siswa : {
    nama: string;
    password : string
    role: siswa => Default
  }

  guru : {
    nama: string
    role : guru
  }
  
}

1. Halaman Utama

2.  Form pendaftaran {
  nik: number;
  nama_lengkap: string;
  ttl: string, contoh: Bandung, 10 Februari 2000,
  nama_ibu: string
  nama_ayah: string
  asal_sekolah: string;
  foto_ijazah: File
}

3.  Profile

4. list pendaftar {
  - permission murid : Read
  - permission guru: Read, Update, Create, Delete
}

5. List guru {
  - permission murid: Read
}

6. Admin {
  - 
}

