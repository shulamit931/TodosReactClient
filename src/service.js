import axios from 'axios';

const apiUrl = "https://todosserver.onrender.com"

axios.defaults.baseURL = apiUrl;
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
    const result = await axios.post(`/login`, { UserName: username, Password: password })
    console.log(result, "result");
    if (result?.data) {
      saveAccessToken(result.data)
      return result.data
    }
    return false;

  },
  Register: async (username, password) => {
    const result = await axios.post(`/register`, { UserName: username, Password: password })
    console.log(result, "result");
    if (result?.data) {
      console.log(result.data)
      saveAccessToken(result.data)
      return result.data
    }
    return false;
  },
  getTasks: async () => {
    const result = await axios.get(`/items`)
    console.log(result, "result");
    return result.data;
  },

  addTask: async (name) => {
    console.log('addTask', name)
    await axios.post(`/items`, { Name: name, IsComplete: false })
    return {};
  },

  setCompleted: async (id, isComplete) => {
    console.log('setCompleted', { id, isComplete })
    await axios.put(`/items/${id}`, { Id: id, IsCompleted: isComplete })
    return {};
  },

  deleteTask: async (id) => {
    console.log('deleteTask')
    await axios.delete(`/items/${id}`)
  }
};
