<script setup>
import { ref } from 'vue'
import { login } from '@/services/auth'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()

const router = useRouter()

const loginForm = ref({
  username: '',
  password: '',
})

const errors = ref({})
const serverError = ref('')

const validateForm = () => {
  errors.value = {}
  serverError.value = ''

  if (!loginForm.value.username) {
    errors.value.username = "Le nom d'utilisateur est requis."
  }

  if (!loginForm.value.password) {
    errors.value.password = "Le mot de passe est requis."
  }

  return Object.keys(errors.value).length === 0
}

const handleLogin = async () => {
  if (!validateForm()) return

  try {
    const data = await login({
      username: loginForm.value.username,
      password: loginForm.value.password
    })
    if (!data || !data.id) {
      serverError.value = 'Identifiants invalides, veuillez réessayer.'
      return
    }
    auth.login(data.id)
    router.push('/')
  } catch (error) {
    serverError.value = error.message
    console.error('Erreur lors de la connexion :', error)
  }
}
</script>

<template>
  <main class="min-h-screen flex items-center justify-center bg-gray-100 px-4">
    <div class="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
      <h2 class="text-2xl font-semibold mb-6 text-center">Connexion</h2>

      <form @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <label for="username" class="block mb-1 text-sm font-medium">Nom d'utilisateur</label>
          <input type="text" name="username" id="username" class="w-full border border-gray-300 rounded px-3 py-2" v-model="loginForm.username" />
          <p v-if="errors.username" class="text-red-500 text-sm mt-1">{{ errors.username }}</p>
        </div>

        <div>
          <label for="password" class="block mb-1 text-sm font-medium">Mot de passe</label>
          <input type="password" name="password" id="password" class="w-full border border-gray-300 rounded px-3 py-2" v-model="loginForm.password" />
          <p v-if="errors.password" class="text-red-500 text-sm mt-1">{{ errors.password }}</p>
        </div>

        <RouterLink to="/register" class="text-sm text-blue-600 hover:underline block">
          Pas encore de compte ? Inscrivez-vous ici
        </RouterLink>

        <p v-if="serverError" class="text-red-600 text-sm text-center">{{ serverError }}</p>

        <button type="submit" class='w-full bg-black text-white px-4 py-2 rounded cursor-pointer mt-4'>Se connecter</button>
      </form>
    </div>
  </main>
</template>
