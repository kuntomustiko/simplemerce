import React, { Component } from 'react'
import axios from '../config/axios'
import { onLoginUser } from '../actions/index';
import { connect } from 'react-redux';
import Swal from 'sweetalert2';
import { Redirect } from 'react-router-dom';

class Cart extends Component {
    state = {
        cart: [],
        editQty: [],
        cartTotal: [],
        totalHargaCart: ''
    }


    componentDidMount() {
        this.ambilCart();
    }

    ambilCart = () => {
        axios.get('/cart').then((res) => {
            let result = res.data.filter((obj) => {
                return (obj.username == this.props.uname)
            })
            this.setState({ cart: result })
        })
    }

    hapusProduk = (id) => {
        console.log(`ID Barang ke - ${id}`);
        Swal.fire({
            title: 'Yakin gan?',
            text: "Anda tidak bisa mengembalikannya lagi!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((res) => {
            if (res.value) {
                axios.delete(`/cart/${id}`)
                    .then((res) => {
                        Swal.fire(
                            'Berhasil di Hapus!',
                            'Produk Berhasil di hapus.',
                            'success'
                        )
                        this.ambilCart()
                    });
            }
        })
    }

    totalCart = () => {
        var totalHargaCart = 0
        console.log(this.state.cart);

        let price = this.state.cart.map((res) => {
            let totalHarga = res.price_products_cart * res.qty_products_cart
            totalHargaCart += totalHarga
            console.log(res.price_products_cart);

            return (
                <tr>
                    <td>{res.id_products_cart}</td>
                    <td>{res.name_products_cart}</td>
                    <td>{res.qty_products_cart}</td>
                    <td>
                        Rp. {res.price_products_cart.toLocaleString('in')}
                    </td>
                    <td>
                        Rp. {totalHarga.toLocaleString('in')}
                    </td>
                </tr>
            )
        })
        
        return (
            <tbody>
                {price}
                <tr>
                    <td colSpan="4"><b>Total</b></td>
                    <td>Rp. {totalHargaCart.toLocaleString('in')}</td>
                </tr>
            </tbody>
        )
    }

    renderCart = () => {
        return this.state.cart.map((cart) => {
            return (
                <tr key={cart.id}>
                    <td>{cart.id_products_cart}</td>
                    <td>{cart.name_products_cart}</td>
                    <td>{cart.desc_products_cart}</td>
                    <td>RP. {cart.price_products_cart}</td>
                    <td>{cart.qty_products_cart}</td>
                    <td>
                        <img className="img-thumbnail list" src={cart.src_products_cart} alt="" />
                    </td>
                    <td>
                        <button onClick={() => { this.hapusProduk(cart.id) }} className="btn btn-block btn-danger">Delete</button>
                    </td>
                </tr>
            )
        })
    }

    render() {
        if (this.props.uname) {
            return (
                <div className="container">
                    {/* List Products */}
                    <h1 className="text-center display-3 my-2">Cart</h1>
                    <table className="table table-hover text-center mb-5">
                        <thead>
                            <tr>
                                <th scope="col">ID Produk</th>
                                <th scope="col">Nama Produk</th>
                                <th scope="col">Deskripsi Produk</th>
                                <th scope="col">Harga</th>
                                <th scope="col">QTY</th>
                                <th scope="col">Gambar</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderCart()}
                        </tbody>
                    </table>
                    <div className="container">
                        <div className="mt-3 ">
                            <div className="row">
                                <div className="col mx-auto text-center">
                                    <button data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample" type="button" class="btn btn-outline-primary">Checkout</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="collapse" id="collapseExample">
                        <div class="card card-body">
                            <div className="container">
                                <h1 className="text-center display-3 my-2">Cart</h1>
                                <table className="table table-hover text-center mb-5">
                                    <thead>
                                        <tr>
                                            <th scope="col">ID</th>
                                            <th scope="col">NAME</th>
                                            <th scope="col">QTY</th>
                                            <th scope="col">PRICE</th>
                                            <th scope="col">TOTAL</th>
                                        </tr>
                                    </thead>
                                    {this.totalCart()}
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        else {
            return <Redirect to="/" />
        }
    }
}


let mapStateToProps = (state) => {
    return {
        uname: state.auth.username
    }
}

export default connect(mapStateToProps, { onLoginUser })(Cart)