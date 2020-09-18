import React, { Component } from "react";
import axios from "../config/axios";
import Swal from "sweetalert2";
import { connect } from "react-redux";
import { onLoginUser } from "../actions/index";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";

class DetailProduct extends Component {
  state = {
    product: {},
    cart: [],
  };

  componentDidMount() {
    this.getProducts();
  }

  getProducts = () => {
    // ProductItem membuat url yang memanggil DetailProduct berdasarkan id yang dinamis
    // DetailProduct yang terpanggil berdasarkan id url --> selanjutnya mengambil data dari Database berdasarkan id yang di kirimkan oleh ProductItem melalui param url

    // ini untuk mengambil url bersama dengan id nya
    // balblabla/param --> nah param ini bisa apa aja, id / nama / lainnya
    // this.props.match.params.xxxx --> cara mengambil isi dari param yang berada di url
    // xxxx --> nama param yang kita mau ambil isinya,
    // xxxx harus sesuai dengan penamaan yang dibuat di path Route di file App.js dari component yang akan membuat url tersebut
    //  <Route path="/detailproduct/:idPrdct" component={DetailProduct} />
    axios.get(`/products/${this.props.match.params.idPrdct}`).then((res) => {
      this.setState({ product: res.data });
    });
  };

  getCart = () => {
    axios.get("/cart").then((res) => {
      this.setState({ cart: res.data });
    });
  };

  onAddToCartHandle = () => {
    if (!this.qty.value == "") {
      let _isiprodukId = this.state.product.id;
      let _isiqty = parseInt(this.qty.value);
      let _isiusername = this.props.uname;
      let _isinama_produk = this.state.product.name;
      let _isigambar_produk = this.state.product.src;
      let _isideskrpisi_produk = this.state.product.desc;
      let _isiharga_produk = this.state.product.price;

      let dataPost = {
        id_products_cart: _isiprodukId,
        username: _isiusername,
        name_products_cart: _isinama_produk,
        desc_products_cart: _isideskrpisi_produk,
        price_products_cart: _isiharga_produk,
        qty_products_cart: _isiqty,
        src_products_cart: _isigambar_produk,
      };
      let cekIsiArray = [];

      this.state.cart.forEach((cart) => {
        cekIsiArray.push(cart.id_products_cart == _isiprodukId);
      });

      let cekNoIndex = cekIsiArray.indexOf(true);

      // jika id product cart itu sudah ada di dalam array
      if (cekIsiArray[cekNoIndex] == true) {
        this.state.cart[cekNoIndex].qty_products_cart += _isiqty;

        // mengirim url dengan params dan mengirim data juga qty_produc...
        // data tersebut digunakan untuk mengupdate isi dari database
        axios
          .patch(`/cart/${this.state.cart[cekNoIndex].id}`, {
            qty_products_cart: this.state.cart[cekNoIndex].qty_products_cart,
          })
          .then((res) => {
            this.setState({ cart: res.data });
          });

          // jika id product itu belum ada di dalam array berarti id product cart itu adalah data baru
      } else {
        axios.post(`/cart`, dataPost).then((res) => {
          this.setState({ cart: res.data });
        });
      }

      Swal.fire("Yeaaayy...!", `Selamat Kamu punya Barang Baru!`, "success");
    } else {
      Swal.fire("Oops...!", `Ketik dahulu jumlah yang mau dibeli!`, "error");
    }
    
    return <Redirect to="/Cart" />;
  };

  render() {
    if (this.props.uname == "") {
      return (
        <div className="container-fluid">
          <div className="row">
            <div className="card col5 mx-auto my-3 ">
              <img
                className="card-img-top"
                src={this.state.product.src}
                alt=""
              />
              <div className="card-body">
                <div style={{ height: 50 }}>
                  <h5 className="card-title">{this.state.product.name}</h5>
                </div>
                <p className="card-text">{this.state.product.desc}</p>
                <p className="card-text">Rp. {this.state.product.price}</p>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Jumlah Qty"
                  ref={(input) => {
                    this.qty = input;
                  }}
                />
                <Link to={`/login`}>
                  <button className="btn btn-primary btn-block">
                    Add to Cart
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="container-fluid">
          <div className="row">
            <div className="card col5 mx-auto my-3 ">
              <img
                className="card-img-top"
                src={this.state.product.src}
                alt=""
              />
              <div className="card-body">
                <div style={{ height: 50 }}>
                  <h5 className="card-title">{this.state.product.name}</h5>
                </div>
                <p className="card-text">{this.state.product.desc}</p>
                <p className="card-text">Rp. {this.state.product.price}</p>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Jumlah Qty"
                  ref={(input) => {
                    this.qty = input;
                  }}
                />
                <button
                  onClick={this.onAddToCartHandle}
                  className="btn btn-block btn-outline-success"
                >
                  Add to Chart
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

let mapStateToProps = (state) => {
  return {
    uname: state.auth.username,
  };
};

export default connect(mapStateToProps, { onLoginUser })(DetailProduct);
