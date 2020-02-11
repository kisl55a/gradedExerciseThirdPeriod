let usersData = [
    {
        id:1,
        username: "Dmitrii",
        password: "sha1$2bebdae1$1$27b91157059f39e4f569337577651811ce207d29"
    },
    {
        id:2,
        username: "Nursultan",
        password: "asdasd"
    },
    {
        id:3,
        username: "Long",
        password: "asdasdadasdasd"
    }
]

module.exports = {
    getUserById: (id) => usersData.find(u => u.id == id),

    getUserByName: (username) => usersData.find(u => u.username == username),

    getAllUsers: () => usersData,

    addNewUser: (user) => {
        usersData.push(user)
        return user
    }
  }