import { defineStore } from 'pinia';
import { ref } from 'vue';

export const userState = defineStore('user', () => {
  // state
  const email = ref<String>('');
  const username = ref<String>('');
  const fullname = ref<String>('');
  const access_token = ref<String>('');
  const refresh_token = ref<String>('');
  const user_type = ref<String | null>(null);
  const loggedIn = ref<Boolean>(false);
  const config = useRuntimeConfig();

  // actions
  const $getUser = async (email: string, password: string) => {
    try {
      let fullUserName = email;
      if (email.includes('@')) {
          fullUserName = email.split('@')[0];
      }
      const response = await fetch(`${config.public.API_URL}/api/token/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: fullUserName,
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

  const $getUserCredentials = async () => {
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
    $getUser,
    $getUserCredentials,
  };
});