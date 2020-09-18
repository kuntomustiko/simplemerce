//  Action Creator = Customers

// funtion login function logout

// object user saat login awal
// user = {id : 1 , username : 'kunto, password: 'satuduatiga}

// res.data[0] = {id: 1, username: 'kunto', password: 'satuduatiga'}
export let onLoginUser = (user) => {
  // destruct object
  let { id, username } = user;

  // localstorage -->

  // Menyimpan data di localstorage
  // stringify DARI OBJECT KE STRING
  localStorage.setItem("userData", JSON.stringify({ id, username }));

  // Mengirim data ke redux untuk kemudian disimpan di redux state
  // kita butuh data yang login untuk disimpan ke store pusat
  return {
    type: "LOGIN_SUCCESS",
    payload: {
      id: user.id,
      username: user.username,
    },
  };
};

// tidak perlu payload karena kita tidak ingin menympan data
// membuat ini untuk logout
export let onLogoutUser = () => {
  // Menghapus data dari local storage
  localStorage.removeItem("userData");

  // Mengirim data ke redux, untuk menghapus data user yang login dari redux state
  return {
    type: "LOGOUT_SUCCESS",
  };
};
