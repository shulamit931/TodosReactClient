import axios from 'axios';

setAuthorizationBearer();

function saveAccessToken(authResult) {
  localStorage.setItem("access_token", authResult.token);
  setAuthorizationBearer();
}

axios.interceptors.response.use(
  res => res,
  err => console.log(err, "error")
)

function setAuthorizationBearer() {
  const accessToken = localStorage.getItem("access_token");
  if (accessToken) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  }
}

export default {

  login: async (username, password) => {
    const result = await axios.post(`${process.env.REACT_APP_API}/login`, { UserName: username, Password: password })
    console.log(result, "result");
    if (result?.data) {
      saveAccessToken(result.data)
      return result.data
    }
    return false;

  },
  Register: async (username, password) => {
    const result = await axios.post(`${process.env.REACT_APP_API}/register`, { UserName: username, Password: password })
    console.log(result, "result");
    if (result?.data) {
      console.log(result.data)
      saveAccessToken(result.data)
      return result.data
    }
    return false;
  },
  getTasks: async () => {
    const result = await axios.get(`${process.env.REACT_APP_API}/items`)
    console.log(result, "result");
    return result.data;
  },

  addTask: async (name) => {
    console.log('addTask', name)
    await axios.post(`${process.env.REACT_APP_API}/items`, { Name: name, IsCompleted: false })
    return {};
  },

  setCompleted: async (id, isComplete) => {
    console.log('setCompleted', { id, isComplete })
    await axios.put(`${process.env.REACT_APP_API}/items/${id}`, { Id: id, IsCompleted: isComplete })
    return {};
  },

  deleteTask: async (id) => {
    console.log('deleteTask')
    await axios.delete(`${process.env.REACT_APP_API}/items/${id}`)
  }
};
