import axios from "axios";

export default {
  state: {
    apiKey: "AIzaSyCnYVK9uM6XDe2d-dZmErHeNQfrzZdaZEM",
    userInfo: {},
    error: ''
  },
  mutations: {
    SET_USER_INFO(state, response) {
      state.userInfo = {
        token: response.data.idToken,
        email: response.data.email,
        userId: response.data.localId,
        refreshToken: response.data.refreshToken,
        expiresIn: response.data.expiresIn,
      };   
    },

    SET_ERROR(state, err) {
      console.log(err);
      switch (err){
        case 'EMAIL_EXISTS':
          state.error = 'Пользователь с такой почтой уже существует'
          break
        case 'INVALID_EMAIL':
          state.error = 'Неправильно введенный почтовый адрес'
          break
        case 'WEAK_PASSWORD : Password should be at least 6 characters':
          state.error = 'Пароль не должен содержать меньше 6 символов'
          break 
        default:
          state.error = 'Что-то не так! Проверти правильно-ли введены данные'
          break
      }
    }
  },
  actions: {
    async SIGN_UP({ commit, state }, payload) {
      try {
        const response = await axios.post(
          `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${state.apiKey}`,
          {
            ...payload,
            returnSecureToken: true,
          }
        );
        // console.log(response);
        localStorage.setItem(
          "userTokens",
          JSON.stringify({
            token: response.data.idToken,
            refreshToken: response.data.refreshToken,
            expiresIn: response.data.expiresIn,
          })
        );
        commit("SET_USER_INFO", response);
      } catch (err) {
        // console.log(err.response);
        commit("SET_ERROR", err.response.data.error.message);
        throw err.value;
      }
    },
    async SIGN_IN({ commit, state }, payload) {
      try {
        const response = await axios.post(
          `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${state.apiKey}`,
          {
            ...payload,
            returnSecureToken: true,
          }
        );
        console.log(response);
        localStorage.setItem(
          "userTokens",
          JSON.stringify({
            token: response.data.idToken,
            refreshToken: response.data.refreshToken,
            expiresIn: response.data.expiresIn,
          })
        );
        commit("SET_USER_INFO", response.data);
      } catch (err) {
        console.log(err.response);
        throw error.value;
      }
    },
  },
  getters: {
    USER_INFO(state) {
      return state.userInfo;
    },
    ERROR(state) {
      return state.error;
    },
  },
};
