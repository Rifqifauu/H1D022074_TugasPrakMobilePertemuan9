import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-mahasiswa',
  templateUrl: './mahasiswa.page.html',
  styleUrls: ['./mahasiswa.page.scss'],
})
export class MahasiswaPage implements OnInit {
  dataMahasiswa: any;
  modalTambah: any;
  id: any;
  nama: any;
  jurusan: any;
  modalEdit: any;

  constructor(private api: ApiService, private modal: ModalController) { }

  ngOnInit() {
    this.getMahasiswa();
  }
  openModalEdit(isOpen: boolean, idget: any) {
    this.modalEdit = isOpen;
    this.id = idget;
    console.log(this.id);
    this.ambilMahasiswa(this.id);
    this.modalTambah = false;
    this.modalEdit = true;
  }

  getMahasiswa() {
    this.api.tampil('tampil.php').subscribe({
      next: (res: any) => {
        console.log('sukses', res);
        this.dataMahasiswa = res;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  resetModal() {
    this.id = null;
    this.nama = '';
    this.jurusan = '';
  }
  openModalTambah(isOpen: boolean) {
    this.modalTambah = isOpen;
    this.resetModal();
    this.modalTambah = true;
    this.modalEdit = false;
  }

  cancel() {
    this.modal.dismiss();
    this.modalTambah = false;
    this.modalEdit = false;
    this.resetModal();
  }
  

  tambahMahasiswa() {
    if (this.nama !== '' && this.jurusan !== '') {
      let data = {
        nama: this.nama,
        jurusan: this.jurusan,
      };
      this.api.tambah(data, 'tambah.php').subscribe({
        next: (hasil: any) => {
          console.log('berhasil tambah mahasiswa', hasil);
          this.getMahasiswa();
          this.resetModal();
          this.modalTambah = false;
          this.modal.dismiss();
        },
        error: (err: any) => {
          console.log('gagal tambah mahasiswa', err);
        },
      });
    } else {
      console.log('gagal tambah mahasiswa karena masih ada data yang kosong');
    }
  }
  hapusMahasiswa(id: any) {
    this.api.hapus(id,
      'hapus.php?id=').subscribe({
        next: (res: any) => {
          console.log('sukses', res);
          this.getMahasiswa();
          console.log('berhasil hapus data');
        },
        error: (error: any) => {
          console.log('gagal');
        }
      })
  }
  ambilMahasiswa(id: any) {
    this.api.lihat(id,
      'lihat.php?id=').subscribe({
        next: (hasil: any) => {
          console.log('sukses', hasil);
          let mahasiswa = hasil;
          this.id = mahasiswa.id;
          this.nama = mahasiswa.nama;
          this.jurusan = mahasiswa.jurusan;
        },
        error: (error: any) => {
          console.log('gagal ambil data');
        }
      })
  }
  editMahasiswa() {
    let data = {
      id: this.id,
      nama: this.nama,
      jurusan: this.jurusan
    }
    this.api.edit(data, 'edit.php')
      .subscribe({
        next: (hasil: any) => {
          console.log(hasil);
          this.resetModal();
          this.getMahasiswa();
          console.log('berhasil edit Mahasiswa');
          this.modalEdit = false;
          this.modal.dismiss();
        },
        error: (err: any) => {
          console.log('gagal edit Mahasiswa');
        }
      })
  }
}