import React, { Component } from "react";
import axios from "../config/axios";

import Swal from "sweetalert2";

// import modal
import ModalEdit from "./ModalEdit";

import { Redirect } from "react-router-dom";

class ManageProduct extends Component {
  // state --> untuk menyimpan data pada komponent ini saja
  // ex: kita selesai ambil data dari server dan ingin di tampilkan / render
  // tapi kita tidak bisa langsung menampilkan data setelah kita ambil data dari server
  // hasil data yang di ambil dari server harus di simpan terlebih dahulu ke state
  // baru setelah itu data yang telah di simpan dalam state baru bisa kita gunakan untuk menampilkan data
  state = {
    products: [],
    editProduct: {},
    // modal = true --> maka modal akan muncul
    // modal = false --> maka modal tidak akan muncul
    modal: false,
  };

  // proses mount terjadi ketika component dibuat dan pertama kali di-render/dimasukkan ke dalam DOM
  // akan dirunning 1x dan di running setelah render
  // ketika buka halaman langsung ada datanya (tanpa harus di tekan tombol atau event apapun) maka gunakan function ini
  // digunakan untuk request data ke server ketika halaman pertama kali dibuka
  componentDidMount() {
    this.getData();
  }

  // Tugas hari sabtu : Render Map
  // untuk mengolah yang akan ditampilkan di dalam table
  renderList = () => {
    // this.state.products = [ {}, {}, {} ]
    // product = {id, name, desc, price, src}
    return this.state.products.map((product) => {
      product.price = product.price.toLocaleString("en");
      return (
        <tr>
          <td>{product.id}</td>
          <td>{product.name}</td>
          <td>{product.desc}</td>
          <td>Rp. {product.price}</td>
          {/* <td><img width="50" src={product.src} alt=""/></td> */}
          <td>
            <img class="list" src={product.src} alt="" />
          </td>
          <td>
            <button
              onClick={() => {
                this.onEditToggle(product.id);
              }}
              className="btn btn-outline-primary btn-block btn-sm"
            >
              Edit
            </button>
            <button
              // ketika kita click maka akan menjalan sebuah function yang membutuhkan isi parameter
              // penulisan onClick yang menajalan function yang membutuhkan inputan isi parameter atau tidak ada inputan parameter, berbeda penulisannya
              onClick={() => {
                this.onDeleteProduct(product.id);
              }}
              className="btn btn-outline-danger btn-block btn-sm"
            >
              Delete
            </button>
          </td>
        </tr>
      );
    });
  };

  // Ambil data
  getData = () => {
    axios.get("/products").then((res) => {
      this.setState({ products: res.data, modal: false });
    });
  };

  // Input Data
  onAddProduct = () => {
    // Ambil data dari "Input Product"
    let name_source = this.name.value;
    let desc_source = this.desc.value;
    let price_source = parseInt(this.price.value);
    let src_source = this.src.value;

    // Taruh data ke database "db.json"
    axios
      .post("/products", {
        name: name_source,
        desc: desc_source,
        price: price_source,
        src: src_source,
      })
      .then((res) => {
        // setelah menaruh data ke database maka langsung mengambil data dari database dan menjalankan render lagi dengan this.setState
        this.getData();
      });
  };

  // Delete Data
  onDeleteProduct = (id) => {
    // setelah menghapus maka kita langsung mengambil data terbaru
    // axios.delete(
    //     `http://localhost:2020/products/${id}`
    // ).then((res) => {
    //     this.getData()
    // })

    Swal.fire({
      title: "Apakah kamu yakin?",
      text: "Kamu tidak bisa mengembalikannya lagi!",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya!",
    }).then((res) => {
      // res.value bernilai true jika kita memilih 'Ya' , sebaliknya
      // mendelet berdasarkan id karena hanya id saja yang unik dan dimiliki produk
      // setiap kita selesai delete maka kita langsung memanggil data terbaru (data sisa yang tidak terdelete)
      // apapun isi respon yang diberikan setelah berhasil reqeust, kita tidak memperdulikannya
      // http://localhost:2020/products/${id} --> http://localhost:2020/products/4
      if (res.value) {
        // setelah kita melakukan request, maka respon seperti apa yang akan kita lakukan
        axios.delete(`/products/${id}`).then((res) => {
          Swal.fire("Berhasil!", "Produk berhasil di hapus.", "success");
          this.getData();
        });
      }
    });
  };

  // Edit
  onEditToggle = (id) => {
    // kita akan melakukan edit pada suatu data
    // kita butuh mengetahui data mana yang akan kita edit --> membutuhkan id dari data yang akan kita edit.
    //

    // res.data = {id, name, price, desc, src}
    axios.get(`/products/${id}`).then((res) => {
      this.setState({ modal: true, editProduct: res.data });
    });
  };

  // Save
  onSaveProduct = (editObj) => {
    // editObj { editName: "New Name", editDesc: "New Description", editPrice: "New Price", editSrc: "New Image" }
    // Ambil data
    let name = editObj.editName
      ? editObj.editName
      : this.state.editProduct.name;

    let price = parseInt(
      editObj.editPrice ? editObj.editPrice : this.state.editProduct.price
    );

    let desc = editObj.editDesc
      ? editObj.editDesc
      : this.state.editProduct.desc;

    let src = editObj.editSrc ? editObj.editSrc : this.state.editProduct.src;

    // Edit data
    // kita request ke serve untuk update dengan menggunakan method patch dan dibutuhkan data yang akan di update ke server
    axios
      .patch(`/products/${this.state.editProduct.id}`, {
        name,
        price,
        desc,
        src,
      })
      .then((res) => {
        this.getData();
      });
  };

  // Cancel
  onCancelToggle = () => {
    // ketika button cancel di klik --> maka modal akan tertutup
    // untuk menutup modal maka kita harus mengubah state modal menjadi false
    this.setState({ modal: false });
  };

  // tag-tag tampilan html ini di dapatkan dari getBoostrap.
  // ketika kita membuat html maka kita bisa menggunakan pure html atau berbasis component (menggunakan reactstrap)
  render() {
    return (
      <div className="container">
        <h1 className="text-center display-4">Manage Product</h1>
        <table class="table table-hover text-center mb-5 table-bordered">
          <thead className="thead-dark">
            <tr>
              <th scope="col">ID</th>
              <th scope="col">NAME</th>
              <th scope="col">DESC</th>
              <th scope="col">PRICE</th>
              <th scope="col">PICTURE</th>
              <th scope="col">ACTION</th>
            </tr>
          </thead>
          <tbody>{this.renderList()}</tbody>
        </table>
        {/* Tugas hari minggu */}
        {/* Input Product */}

        <h1 className="text-center display-4">Input Product</h1>
        <table class="table table-hover text-center mb-5">
          <thead>
            <tr>
              <td scope="col">
                <input
                  ref={(input) => {
                    this.name = input;
                  }}
                  placeholder="name"
                  className="form-control"
                  type="text"
                />
              </td>
              <td scope="col">
                <input
                  ref={(input) => {
                    this.desc = input;
                  }}
                  placeholder="description"
                  className="form-control"
                  type="text"
                />
              </td>
              <td scope="col">
                <input
                  ref={(input) => {
                    this.price = input;
                  }}
                  placeholder="price"
                  className="form-control"
                  type="text"
                />
              </td>
              <td scope="col">
                <input
                  ref={(input) => {
                    this.src = input;
                  }}
                  placeholder="image"
                  className="form-control"
                  type="text"
                />
              </td>
              <td scope="col">
                <button
                  onClick={this.onAddProduct}
                  className="btn btn-outline-primary btn-block btn-sm"
                >
                  input
                </button>
              </td>
            </tr>
          </thead>
        </table>

        {/* ini komponent yang di import dari komponent lainnya (ModalEdit) */}
        {/* modal={this.state.modal} ini adalah data yang akan dikirim ke ModalEdit atau data yang akan digunakan / data yang dibutuhkan didalam proses ModalEdit atau component lain */}

        {/* a={this.state.modal} --> a = key yang akan digunakan pada component lain jika ingin menggunakan data dalam component ini */}
        {/* a={this.state.modal} --> {this.state.modal} = data dari component ini yang akan digunakan pada component lain */}
        <ModalEdit
          a={this.state.modal}
          b={this.state.editProduct}
          c={this.onCancelToggle}
          d={this.onSaveProduct}
        />
      </div>
    );
  }
}

export default ManageProduct;

// Urutan Running:
// 1. render() -> Menampilkan Table kosong
// 2. componentDidMount()
//   - axios.get()
//   - this.setState() -> data pada state berubah -> re-render
// 3. render() -> Menampilkan table dengan data
// 4. Menambahkan data baru
//   - axios.get()
//   - this.setState() -> update data pada state -> re-render

// componentDidMount() --> hanya akan di jalankan 1x saja ketika component baru dibuat

// axios.post --> itu kode asyncronous --> di akan menjalankan kode dibawahnya walaupun proses axios nya belum selesai

// kode asycnronous biasanya dibuat dari libarary yang kita pakai
//.then --> asyncronous

// async wait untuk menghandle asyncronous
