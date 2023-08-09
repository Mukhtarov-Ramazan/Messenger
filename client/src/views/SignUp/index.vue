<script setup>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();

const email = ref("");
const password = ref("");
// const confirmPassword = ref("");

const error = computed(() => store.getters.ERROR)

const signUp = async () => {
  if (password.value === confirmPassword.value) {
    await store.dispatch("SIGN_UP", {
      email: email.value,
      password: password.value,
    });

    router.push("/home");
  } else {
    alert("Пароль не совпадает");
  }
};
</script>

<template>
  <div class="sign-up">
    <div class="sign-up__container">
      <div class="sign-up__content">
        <h2 class="sign-up__title">Регистрация</h2>

        <form @submit.prevent class="sign-up__form">
          <input type="email" placeholder="Введите почту" v-model="email" />
          <input
            type="password"
            placeholder="Введите пароль"
            v-model="password"
          />
          <!-- <input
            type="password"
            placeholder="Подтвердите пароль"
            v-model="confirmPassword"
          /> -->

          <button class="btn sign-up__btn" @click="signUp">
            зарегестрироваться
          </button>
        </form>

        <p class="sign-up__hint">
          Если у Вас есть аккаунт, то
          <router-link to="/">Войдите в него</router-link>
        </p>
      </div>

      <div class="sign-up__error" v-if="error !== ''">
        <p>{{error}}</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.sign-up {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  &__container {
    width: 100%;
    max-width: 350px;
  }
  
  &__content {
    width: 100%;
    padding: 40px;
    border-radius: 20px;
    box-shadow: 0.5px 0.5px 9px 1px #766ac8;
    margin-bottom: 40px;
  }

  &__title {
    font-size: 34px;
    font-weight: 700;
    text-align: center;

    &::after {
      content: "";
      display: block;
      width: 100px;
      height: 2px;
      margin: 25px auto;
      background-color: #fafafa;
    }
  }

  &__form {
    display: flex;
    flex-direction: column;
    margin-bottom: 30px;

    input {
      padding: 12.5px;
      background-color: #2c2c2c;
      border: 1.5px solid #2c2c2c;
      color: #fafafa;
      font-size: 16px;
      font-weight: 500;
      border-radius: 8px;
      letter-spacing: 1px;
      transition: all 0.3s linear;

      &:not(:last-child) {
        margin-bottom: 20px;
      }
      &:focus {
        border: 1.5px solid #766ac8;
      }
    }
  }
  &__btn {
    margin-top: 10px;
  }
  &__hint {
    text-align: center;
    font-size: 14px;
    font-weight: 300;
    color: #a0a0a0;

    a {
      color: #766ac8;
    }
  }

  &__error {
    width: 100%;
    padding: 40px;
    border-radius: 20px;
    box-shadow: 0.5px 0.5px 9px 1px #ff647c;
  }
}
</style>
