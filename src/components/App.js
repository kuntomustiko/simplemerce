// file sebagai main component di react yang menjadi container untuk seluruh component lainnya

import React, { Component } from "react";
import { Route, BrowserRouter } from "react-router-dom";

// Components
// tanpa {} karena di export menggunakan kata default
import Header from "./Header";
import Home from "./Home";
import Register from "./Register";
import Login from "./Login";
import ManageProduct from "./ManageProduct";
import Cart from "./Cart";
import DetailProduct from "./DetailProduct";

// Keeplogin
import { onLoginUser } from "../actions/index";
import { connect } from "react-redux";

// ketika kita refresh maka kita me-render ulang seluruh yang ada di App.js karena App.js sebagai indux dari seluruh component

class App extends Component {
  // kita mau ngecek, apakah ada yang data login di localstorage
  componentDidMount() {
    // ngambil data dari localstoreage
    let userData = localStorage.getItem("userData");
    // diubah ke object
    let user = JSON.parse(userData);

    // jika data user ada, maka simpan ke redux dengan membawa object user
    if (user) {
      this.props.onLoginUser(user);
    }
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Header />
          {/* exact = membuat agar tidak selalu muncul ketika page lain di klik */}
          <Route path="/" exact component={Home} />
          {/* ketika path di url nya /register maka akan di arahkan / membuka component Register */}
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/manageProduct" component={ManageProduct} />
          <Route path="/cart" component={Cart} />
        
          {/* /:idPrdct --> untuk membuat akhir url dinamis berdasarkan sebuah data / angka */}
          {/* http://localhost:2020/detailproduct/2 --> 2 itu dinamis bisa berubah-ubah*/}
          <Route path="/detailproduct/:idPrdct" component={DetailProduct} />
        </div>
      </BrowserRouter>
    );
  }
}

// karena kita hanya menaruh, maka hanya di sebelah kanan
export default connect(null, { onLoginUser })(App);
