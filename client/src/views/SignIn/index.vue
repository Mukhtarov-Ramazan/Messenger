<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();

const email = ref("");
const password = ref("");

const signIn = async () => {
  await store.dispatch('SIGN_IN', {
    email: email.value,
    password: password.value,
  });

  router.push('/home')
};</script>

<template>
  <div class="sign-in">
    <div class="sign-in__container">
      <h2 class="sign-in__title">Войти в аккаунт</h2>

      <form @submit.prevent class="sign-in__form">
        <input type="email" placeholder="Введите почту" v-model="email"/>
        <input type="password" placeholder="Введите пароль" v-model="password"/>

        <button class="btn sign-in__btn" @click="signIn">войти</button>
      </form>

      <p class="sign-in__hint">Если у Вас нет аккаунта, то <router-link to="/sign-up">Зарегестрируйтесь</router-link></p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.sign-in {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  &__container {
    width: 100%;
    max-width: 350px;
    padding: 40px;
    border-radius: 20px;
    box-shadow: .5px .5px 9px 1px #766AC8;
  }

  &__title {
    font-size: 34px;
    font-weight: 700;
    text-align: center;

    &::after{
      content: '';
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
      transition: all .3s linear;

      &:not(:last-child){
        margin-bottom: 20px;
      }
      &:focus{
        border: 1.5px solid #766AC8;
      }
    }
  }
  &__btn{
    margin-top: 10px;
  }
  &__hint{
    text-align: center;
    font-size: 14px;
    font-weight: 300;
    color: #a0a0a0;

    a{
      color: #766AC8;
    }
  }
}
</style>
