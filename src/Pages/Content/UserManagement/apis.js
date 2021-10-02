import axiosBackend from "../../../Helper/axiosBackend";


export async function LoadAllUsersData() {
  var users = null;
  await axiosBackend.get('/users')
  .then((response) => {
    var tempUsers = response.data.users
    tempUsers.forEach((user, index) => {
      user.index = index + 1;
    });
    users = Object.assign({}, tempUsers)
  })
  .catch(() => { })

  return users;
}