import { defineStore } from 'pinia';
import { ref } from 'vue';

export const userState = defineStore('user', () => {
  // state
  const email = ref<String>('');
  const username = ref<String>('');
  const fullname = ref<String>('');
  const access_token = ref<String>('');
  const refresh_token = ref<String>('');
  const student = ref<Boolean>(false);
  const user_type = ref<String | null>(null);
  const loggedIn = ref<Boolean>(false);
  const config = useRuntimeConfig();

  // actions
  const $userLogin = async (email: string, password: string) => {
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
          console.log(access_token.value, refresh_token.value);
        })
    } catch (error) {
      console.log(error);
    }
  };

  const $getUserCredentials = async () => {
    try {
      const response = await fetch(`${config.public.API_URL}/api/user/`, {
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
          fullname.value = data.name;
          user_type.value = data.is_teacher ? "teacher" : "student";
          console.log(email.value, username.value, fullname.value, user_type.value);
        })

      
    } catch (error) {
      console.log(error);
    }
  };

const $userLogout = async() => {
  try {
    const response = await fetch(`${config.public.API_URL}/api/logout/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', 
        'Authorization': `Bearer ${access_token.value}`,
      },
      body: JSON.stringify({
        refresh: refresh_token.value
      }),
    })
    .then((res) => res.json())
    .then(async (data) => {
      console.log(data);
      loggedIn.value = false;
      email.value = '';
      username.value = '';
      fullname.value = '';
      access_token.value = '';
      refresh_token.value = '';
      user_type.value = '';
      sessionStorage.removeItem('session');
    })

  } catch (error) {
    console.log(error);
  }
  
};
  const $savePersistentSession = () => {
    const persistentData = JSON.stringify({
      email: email.value,
      refresh_token: refresh_token.value,
      access_token: access_token.value,
      user_type: user_type.value,
      fullname: fullname.value,
    });
    sessionStorage.setItem('session', persistentData);
    console.log('Session saved');
  }
  
  return {
    email,
    username,
    fullname,
    access_token,
    refresh_token,
    student,
    user_type,
    loggedIn,
    $userLogin,
    $userLogout,
    $getUserCredentials,
    $savePersistentSession
  };
});