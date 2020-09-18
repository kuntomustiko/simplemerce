import React, { Component } from "react";
import axios from "axios";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

// hanya return tampilan saja tidak ada tentang data, hanya kiriman dari ManageProduct
export default class ModalEdit extends Component {
  state = {
    editName: "",
    editDesc: "",
    editPrice: "",
    editSrc: "",
  };

  render() {
    return (
      <div>
        {/* <Modal isOpen={this.state.modal} toggle = {this.onCancelToggle} > jika ingin klik sembarang menutup modal*/}
        <Modal isOpen={this.props.a}>
          <ModalHeader>Edit your product</ModalHeader>
          <ModalBody>
            Name :
            <input
              className="form-control"
              type="text"
              //    default
              //   (e) => {data yang di intputkan berada di sini}

              // e --> itu object yang didapatkan ketika kita men-trigger suatu event handler (onChange dll)
              // dan karena kita hanya membutuhkan niali yang dinputkan maka kita ambil dari object e tersebut dengan e.target.value

              // data yang di inputkan akan di simapn ke dalam state
              onChange={(e) => {
                this.setState({ editName: e.target.value });
              }}
              placeholder={this.props.b.name}
            />
            Desc :
            <input
              className="form-control"
              type="text"
              onChange={(e) => {
                this.setState({ editDesc: e.target.value });
              }}
              placeholder={this.props.b.desc}
            />
            Price :
            <input
              className="form-control"
              type="text"
              onChange={(e) => {
                this.setState({ editPrice: e.target.value });
              }}
              placeholder={this.props.b.price}
            />
            Img :
            <input
              className="form-control"
              type="text"
              onChange={(e) => {
                this.setState({ editSrc: e.target.value });
              }}
              placeholder={this.props.b.src}
            />
          </ModalBody>
          <ModalFooter>
            <Button outline color="warning" onClick={this.props.c}>
              Cancel
            </Button>
            {/* this.state akan masuk ke 'editObj' pada function 'onSaveProduct' di komponen 'ManageProduct' */}
            <Button
              outline
              color="success"
              onClick={() => {
                this.props.d(this.state);
              }}
            >
              Save
            </Button>
          </ModalFooter>
        </Modal>
     
     
      </div>
    );
  }
}
