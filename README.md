# Sistem Manajemen Data Mahasiswa

Sebuah sistem manajemen data mahasiswa sederhana yang dibangun dengan Angular dan Ionic yang mengimplementasikan operasi CRUD untuk mengelola data mahasiswa.

## Fitur Utama

- Membuat data mahasiswa baru
- Membaca/Melihat data mahasiswa yang ada
- Memperbarui informasi mahasiswa
- Menghapus data mahasiswa

## Penjelasan Operasi CRUD

### 1. Create (Tambah)

Sistem memungkinkan penambahan mahasiswa baru melalui proses berikut:
```typescript
tambahMahasiswa() {
  // Memvalidasi bahwa nama dan jurusan tidak kosong
  if (this.nama !== '' && this.jurusan !== '') {
    let data = {
      nama: this.nama,
      jurusan: this.jurusan,
    };
    // Mengirim permintaan POST ke tambah.php
    this.api.tambah(data, 'tambah.php').subscribe({...});
  }
}
```

### 2. Read (Tampil)

Data mahasiswa diambil dengan dua cara:

#### Menampilkan Semua Mahasiswa
```typescript
getMahasiswa() {
  // Mengambil semua data mahasiswa dari tampil.php
  this.api.tampil('tampil.php').subscribe({...});
}
```

#### Melihat Data Mahasiswa Tertentu
```typescript
ambilMahasiswa(id: any) {
  // Mengambil data mahasiswa spesifik menggunakan lihat.php
  this.api.lihat(id, 'lihat.php?id=').subscribe({...});
}
```

### 3. Update (Edit)

Proses edit informasi mahasiswa:
1. Membuka modal edit dengan data yang ada
2. Memperbarui informasi
3. Mengirim perubahan
```typescript
editMahasiswa() {
  let data = {
    id: this.id,
    nama: this.nama,
    jurusan: this.jurusan
  }
  // Mengirim permintaan PUT ke edit.php
  this.api.edit(data, 'edit.php').subscribe({...});
}
```

### 4. Delete (Hapus)

Proses menghapus data mahasiswa:
```typescript
hapusMahasiswa(id: any) {
  // Mengirim permintaan DELETE ke hapus.php
  this.api.hapus(id, 'hapus.php?id=').subscribe({...});
}
```

## Pengelolaan Modal

Sistem menggunakan Modal Controller dari Ionic untuk penanganan formulir:

- `openModalTambah()`: Membuka modal untuk menambah mahasiswa baru
- `openModalEdit()`: Membuka modal untuk mengedit mahasiswa
- `cancel()`: Menutup modal dan mereset formulir
- `resetModal()`: Membersihkan isian formulir

## Integrasi API

Sistem berkomunikasi dengan backend PHP melalui endpoint berikut:
- `tampil.php`: Permintaan GET untuk mengambil semua data mahasiswa
- `tambah.php`: Permintaan POST untuk menambah mahasiswa baru
- `edit.php`: Permintaan PUT untuk memperbarui data mahasiswa
- `hapus.php`: Permintaan DELETE untuk menghapus mahasiswa
- `lihat.php`: Permintaan GET untuk mengambil data satu mahasiswa

## Struktur Data

Data mahasiswa terdiri dari field berikut:
- `id`: Pengenal unik
- `nama`: Nama mahasiswa
- `jurusan`: Jurusan mahasiswa

## Dependensi

- Angular
- Ionic Angular
- ApiService (Layanan kustom untuk permintaan HTTP)
- ModalController dari @ionic/angular

## Struktur Komponen

```typescript
@Component({
  selector: 'app-mahasiswa',
  templateUrl: './mahasiswa.page.html',
  styleUrls: ['./mahasiswa.page.scss'],
})
```


