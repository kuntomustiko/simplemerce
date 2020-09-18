import React, { Component } from "react";
import axios from "../config/axios";
import ProductItem from "./ProductItem";
// import { Cart } from './Cart'
import { connect } from "react-redux";

// tampilan home akan menjadi 2 bagian, filter dan tampil product

class Home extends Component {
  state = {
    products: [],
    cart: [],
  };

  // arrow function untuk function yang kita buat

  // function bawaan maka jangan menggunakan arrow function
  componentDidMount() {
    this.getProducts();
    this.getCart();
  }

  getProducts = () => {
    axios.get("/products").then((res) => {
      this.name.value = "";
      this.min.value = "";
      this.max.value = "";
      this.setState({ products: res.data });
    });
  };

  getCart = () => {
    axios.get("/cart").then((res) => {
      let result = [];

      result = res.data.filter((data) => {
      // kita hanya mengambil cart yang hanya user(username) pada cart tersebut sama persis dengan user yang ada di redux / store pusat
        return data.username == this.props.uname;
      });

      this.setState({ cart: result });
    });
  };

  // memunculkan katalog-katalog product
  renderProducts = () => {
    return this.state.products.map((product) => {
      // hanya berlaku jika price di product itu string
      // Untuk memisahkan setiap 3 digit angka dengan karakter titik.
      product.price = product.price.toLocaleString("in");

      return <ProductItem product={product} cart={this.state.cart} />;
    });
  };

  onBtnSearch = () => {
    axios.get("/products").then((res) => {
      let keyword = this.name.value;
      let min = parseInt(this.min.value);
      let max = parseInt(this.max.value);
      let filterResult = [];

      // isNaN(min) == true == min kosong
      // jika input name keyword kosong / tidak di isi maka akan tetap berisi "" (string kosong)

      if (isNaN(min) && isNaN(max)) {
        // Search by Name
        filterResult = res.data.filter((data) => {
          return (
            //
            data.name.toLowerCase().includes(keyword.toLowerCase())
          );
        });
      } else if (isNaN(max)) {
        filterResult = res.data.filter((data) => {
          // Search by Minimum and Name
          return (
            // string kosong
            data.name.toLowerCase().includes(keyword.toLowerCase()) &&
            data.price >= min
          );
        });
      } else if (isNaN(min)) {
        filterResult = res.data.filter((data) => {
          // Search by Maximum and Name
          return (
            data.name.toLowerCase().includes(keyword.toLowerCase()) &&
            data.price <= max
          );
        });
      } else {
        filterResult = res.data.filter((data) => {
          // Search by Name, Minimum, and Maximum
          return (
            data.name.toLowerCase().includes(keyword.toLowerCase()) &&
            data.price >= min &&
            data.price <= max
          );
        });
      }
      this.setState({ products: filterResult });
    });
  };

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          {/* Search Box */}

          {/* kalau lebih dari 12 colom maka akan menjadi atas bawah */}
          <div className="col-10 col-lg-3 col-xl-2">
            <div className="mt-3">
              <div className="card">
                <div className="card-title align-self-center mt-3 border-bottom border-secondary mb-1">
                  <h3>Search</h3>
                </div>
                <div className="card-body">
                  <h5>Name</h5>
                  <input
                    ref={(input) => {
                      this.name = input;
                    }}
                    className="form-control"
                    type="text"
                  />
                  <h5>Price</h5>
                  <input
                    ref={(input) => {
                      this.max = input;
                    }}
                    className="form-control my-2"
                    type="text"
                    placeholder="max"
                  />
                  <input
                    ref={(input) => {
                      this.min = input;
                    }}
                    className="form-control"
                    type="text"
                    placeholder="min"
                  />
                  <button
                    onClick={this.onBtnSearch}
                    className="btn btn-block btn-outline-primary mt-5"
                  >
                    Search
                  </button>
                  <button className="btn btn-block btn-outline-danger">
                    Reset
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* List Products */}
          <div className="col-10 col-lg-9 col-xl-7">
            <div className="row ">{this.renderProducts()}</div>
          </div>
          {/* <div className="col-10 col-lg-9 col-xl-3">
                        <div className="row mt-3 ml-2">
                            <div className="card">
                                <div className="card-title align-self-center my-3 border-bottom border-secondary mb-1">
                                    <h3>Cart</h3>
                                </div>
                                {this.addCartLayout()}
                            </div>
                        </div>
                    </div> */}
        </div>
      </div>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    uname: state.auth.username,
  };
};

export default connect(mapStateToProps, null)(Home);
