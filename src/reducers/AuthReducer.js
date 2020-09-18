// ini salah satu dari division reducers
// reducers adalah sebuah function

// Reducer / Divisi
// state = data dari brankas
// actuib = form dari user
/*  
action = {
    type: 'REGISTRATIONS',
    payload: {
        name: 'John',
        job: 'Doctor'
    }
}
action = {
    type: 'STOR',
    payload: {
        name: 'John',
        job: 3000
    }
}
*/

// menentukan nilai awal ketika aplikasi pertama kali dijalankan / setiap buka app
let init = {
  id: "",
  username: "",
};

// redux agar kita dapat mentransfer data komponen ke komponen lainnya
// redux akan hilang ketika di restart
export default (state = init, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        id: action.payload.id,
        username: action.payload.username,
      };
    case "LOGOUT_SUCCESS":
      // memnaggil state dan merubah variabel apa yang ingin dirubah
      return { ...state, id: "", username: "" };
    default:
      // pilihan terakhir
      return state;
  }
};

// let action = {
//     type: 'LOGIN_SUCCESS',
//     payload: {
//         id: "1",
//         username: rochafi
//     }
// }

// let mobil = { name: 'Avanza', seat: 4 }
// let car = { ...mobil, name: 'expander' }
// let car = { name: 'expander', seat: 4 }
