<script setup>
import { ref } from 'vue'
import { register } from '@/services/auth'
import { useRouter } from 'vue-router'

const router = useRouter()

const registerForm = ref({
  username: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const errors = ref({})
const serverError = ref('')

const validateForm = () => {
  errors.value = {}

  if (!registerForm.value.username) {
    errors.value.username = "Le nom d'utilisateur est requis."
  }

  if (!registerForm.value.email) {
    errors.value.email = "L'email est requis."
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(registerForm.value.email)) {
    errors.value.email = "L'email n'est pas valide."
  }

  if (!registerForm.value.password) {
    errors.value.password = "Le mot de passe est requis."
  }

  if (!registerForm.value.confirmPassword) {
    errors.value.confirmPassword = "La confirmation est requise."
  } else if (registerForm.value.password !== registerForm.value.confirmPassword) {
    errors.value.confirmPassword = "Les mots de passe ne correspondent pas."
  }

  return Object.keys(errors.value).length === 0
}

const handleRegister = async () => {
  if (validateForm()) {
    try {
      const data = await register({
        username: registerForm.value.username,
        email: registerForm.value.email,
        password: registerForm.value.password
      })
      if (!data) {
        serverError.value = 'Erreur, veuillez réessayer.'
        return
      }
      router.push('/login')
    } catch (error) {
      serverError.value = error.message
      console.error('Erreur lors de la connexion :', error)
    }
  }
}
</script>

<template>
  <main class="min-h-screen flex items-center justify-center bg-gray-100 px-4">
    <div class="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
      <h2 class="text-2xl font-semibold mb-6 text-center">Inscription</h2>

      <form @submit.prevent="handleRegister" class="space-y-4">
        <div>
          <label for="username" class="block mb-1 text-sm font-medium">Nom d'utilisateur</label>
          <input type="text" name="username" id="username" v-model="registerForm.username"  class="w-full border border-gray-300 rounded px-3 py-2" />
          <p v-if="errors.username" class="text-red-500 text-sm mt-1">{{ errors.username }}</p>
        </div>

        <div>
          <label for="email" class="block mb-1 text-sm font-medium">Email</label>
          <input type="text" name="email" id="email" v-model="registerForm.email"  class="w-full border border-gray-300 rounded px-3 py-2" />
          <p v-if="errors.email" class="text-red-500 text-sm mt-1">{{ errors.email }}</p>
        </div>

        <div>
          <label for="password" class="block mb-1 text-sm font-medium">Mot de passe</label>
          <input type="password" name="password" id="password" v-model="registerForm.password" class="w-full border border-gray-300 rounded px-3 py-2" />
          <p v-if="errors.password" class="text-red-500 text-sm mt-1">{{ errors.password }}</p>
        </div>

        <div>
          <label for="confirmPassword" class="block mb-1 text-sm font-medium">Confirmer le mot de passe</label>
          <input type="password" name="confirmPassword" id="confirmPassword" v-model="registerForm.confirmPassword" class="w-full border border-gray-300 rounded px-3 py-2" />
          <p v-if="errors.confirmPassword" class="text-red-500 text-sm mt-1">{{ errors.confirmPassword }}</p>
        </div>

        <RouterLink to="/login" class="text-sm text-blue-600 hover:underline block">
          Déjà inscrit ? Connectez-vous
        </RouterLink>

        <p v-if="serverError" class="text-red-600 text-sm text-center">{{ serverError }}</p>

        <button type="submit" class='w-full bg-black text-white px-4 py-2 rounded cursor-pointer mt-4'>S'inscrire</button>
      </form>
    </div>
  </main>
</template>
