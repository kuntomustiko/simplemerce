import React, { Component } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { connect } from "react-redux";
import { onLoginUser } from "../actions/index";
import axios from "../config/axios";
import { Redirect } from "react-router-dom";

class ProductItem extends Component {
  state = {
    products: [],
    cart: [],
  };

  // ketika product item dijalankan maka ambil data product
  componentDidMount() {
    this.getProducts();
    this.getCart();
  }

  getProducts = () => {
    axios.get("/products").then((res) => {
      this.setState({ products: res.data });
    });
  };
  getCart = () => {
    axios.get("/cart").then((res) => {
      this.setState({ cart: res.data });
    });
  };

  onAddToCartHandle = () => {
    if (this.props.uname == "") {
      Swal.fire("Hey", `Anda belum Login!`, "error");
    } else if (!this.qty.value == "") {
      // kita ambil data dari props
      // data tersebut akan dibawa ke dalam comppnent cart ketika button addToChart di klik
      let _isiprodukId = this.props.product.id;
      let _isiqty = parseInt(this.qty.value);
      let _isiusername = this.props.uname;
      let _isinama_produk = this.props.product.name;
      let _isigambar_produk = this.props.product.src;
      let _isideskrpisi_produk = this.props.product.desc;
      let _isiharga_produk = parseInt(this.props.product.price);

      // data yang didapatkan, kita sussun menjadi object baru
      // object baru dibuat karena ada perubahan data di qty dan har produk yang diubah ke parse int
      let dataPost = {
        id_products_cart: _isiprodukId,
        username: _isiusername,
        name_products_cart: _isinama_produk,
        desc_products_cart: _isideskrpisi_produk,
        price_products_cart: _isiharga_produk,
        qty_products_cart: _isiqty,
        src_products_cart: _isigambar_produk,
      };

      console.log(_isiprodukId);

      let cekIsiArray = [];

      this.props.cart.forEach((cart) => {
        cekIsiArray.push(cart.id_products_cart == _isiprodukId);
      });

      console.log(cekIsiArray);

      let cekNoIndex = cekIsiArray.indexOf(true);

      if (cekIsiArray[cekNoIndex] == true) {
        this.props.cart[cekNoIndex].qty_products_cart += _isiqty;
        axios
          .patch(`/cart/${this.props.cart[cekNoIndex].id}`, {
            qty_products_cart: this.props.cart[cekNoIndex].qty_products_cart,
          })
          .then((res) => {
            this.setState({ cart: res.data });
          });
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
        <div
          key={this.props.product.id}
          className="card col-lg-5 col-xl-3 mx-xl-auto my-2 shadow-sm"
        >
          <img
            className="card-img-top img-thumbnail img-home mt-2 mx-auto "
            src={this.props.product.src}
            alt=""
          />
          <div className="card-body">
            <h5 className="card-title text-capitalize">
              {this.props.product.name}
            </h5>
            <p className="card-text">{this.props.product.desc}</p>
            <p className="card-text text-danger font-weight-bold">
              Rp. {this.props.product.price}
            </p>
            <input
              className="form-control"
              type="text"
              placeholder="Jumlah Qty"
              ref={(input) => {
                this.qty = input;
              }}
            />

            {/* akan berpindah ke component berdasarkan url. bukan berdasarkan component yang di panggil secara langsung --> component parent memanggil child component */}
            {/* membuat end point / ahir dari url berupa id yang dinamis, id berasal dari product id yang di klik */}
            {/* https://localhost:2020/detailproduct/2 --> 2 itu id dari product id yang di klik */}
            <Link to={`/detailproduct/${this.props.product.id}`}>
              <button className="btn btn-secondary btn-block my-2">
                Detail
              </button>
            </Link>
            <Link to={`/login`}>
              <button className="btn btn-primary btn-block">Add to Cart</button>
            </Link>
          </div>
        </div>
      );
    } else {
      return (
        <div
          key={this.props.product.id}
          className="card col-lg-5 col-xl-3  mx-xl-auto my-2 shadow-sm"
        >
          <img
            className="card-img-top img-thumbnail img-home mt-2 mx-auto "
            src={this.props.product.src}
            alt=""
          />
          <div className="card-body">
            <h5 className="card-title text-capitalize">
              {this.props.product.name}
            </h5>
            <p className="card-text">{this.props.product.desc}</p>
            <p className="card-text text-danger font-weight-bold">
              Rp. {this.props.product.price}
            </p>
            <input
              className="form-control"
              type="text"
              placeholder="Jumlah Qty"
              ref={(input) => {
                this.qty = input;
              }}
            />

            <Link to={`/detailproduct/${this.props.product.id}`}>
              <button className="btn btn-secondary btn-block my-2">
                Detail
              </button>
            </Link>
            <button
              onClick={this.onAddToCartHandle}
              className="btn btn-block btn-outline-success"
            >
              Add to Chart
            </button>
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

export default connect(mapStateToProps, { onLoginUser })(ProductItem);
