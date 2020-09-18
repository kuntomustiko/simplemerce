import React, { Component } from "react";

import { Link } from "react-router-dom";

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from "reactstrap";

import { connect } from "react-redux";

import { onLogoutUser } from "../actions/index";

class Header extends Component {
  state = {
    isOpen: false,
  };

  toggle = () => this.setState({ isOpen: !this.state.isOpen });

  // Menentukan apa yang harus ditampilkan di header (Register dan login) atau (Hello, username)
  renderNav = () => {
    // Jika tidak login
    if (this.props.uname == "") {
      return (
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink tag={Link} to="/register">
              Register
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to="/login">
              Login
            </NavLink>
          </NavItem>
        </Nav>
      );
    }

    // Jika login
    return (
      <Nav className="ml-auto" navbar>
        <UncontrolledDropdown nav inNavbar>
          <DropdownToggle nav caret>
            {/* kita tampilkan data yang telah kita ambil dari store redux */}
            Hello, {this.props.uname}
          </DropdownToggle>
          <DropdownMenu right>
            {/* harus ada tag dan to untuk alamat tujuan */}
            <NavLink tag={Link} to="/manageproduct">
              <DropdownItem> Manage Product</DropdownItem>
            </NavLink>

            <NavLink tag={Link} to="/cart">
              <DropdownItem>Cart</DropdownItem>
            </NavLink>

            <DropdownItem divider />
            {/* jika sebuah function di panggil tapi tidak menggunakan tanda kurung
                        maka dia tidak akan langsung dijalankan sampai sebuah event atau kondisi yang memanggilnya */}
            <DropdownItem onClick={this.props.onLogoutUser}>
              Logout
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </Nav>
    );
  };

  render() {
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand tag={Link} to="/">
            reactstrap
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            {/* kalau pakai tanda kurung () maka sebuah function langsung dijalankan */}
            {this.renderNav()}
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

// ketika kita ingin menampilkan siapa yang sudah login, maka kita harus mengambil data dari store redux
// ambil data maka kita menggunakan connect dan mapStateToProps

// menerima sebuah data dari reducer
// mengambil utuh seluruh store maka kita harus memilih apa yang akan kita ambil
let mapStateToProps = (state) => {
  return {
    uname: state.auth.username,
  };
};

// menaruh sebuah data di reducer harus taruh di sebelah kanan
// mengambil sebuah data dari reducer maka harus di taruh sebelah kiri
export default connect(mapStateToProps, { onLogoutUser })(Header);
