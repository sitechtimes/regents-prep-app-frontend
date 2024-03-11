import { defineStore } from 'pinia';
import { ref } from 'vue';

export const userState = defineStore('user', () => {
  // state
  const email = ref('');
  const username = ref('');
  const fullname = ref('');
  const access_token = ref('');
  const refresh_token = ref('');
  const user_type = ref(null);
  const loggedIn = ref(false);
  const config = useRuntimeConfig();

  // actions
  const getUser = async (email: string, password: string) => {
    try {
      const response = await fetch(`${config.public.API_URL}/api/token/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: email,
          password: password,
        }),
      })
        .then((res) => res.json())
        .then(async (data) => {
          access_token.value = data.access;
          refresh_token.value = data.refresh;
          loggedIn.value = true;
          console.log(access_token.value, refresh_token.value);
        })
    } catch (error) {
      console.log(error);
    }
  };

  const getUserCredentials = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_URL}/api/user/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${access_token.value}`,
        },
      })
        .then((res) => res.json())
        .then(async (data) => {
          email.value = data.email;
          username.value = data.username;
          fullname.value = data.fullname;
          user_type.value = data.user_type;
        })

      // router.push('home'); // You'll need to handle routing differently
    } catch (error) {
      console.log(error);
    }
  };

  return {
    email,
    username,
    fullname,
    access_token,
    refresh_token,
    user_type,
    loggedIn,
    getUser,
    getUserCredentials,
  };
});