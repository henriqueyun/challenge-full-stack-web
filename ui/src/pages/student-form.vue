<template>
  <v-toolbar :title="getTitle()" />	
  <v-container
    fluid
    class="ga-5"
  >
    <v-dialog
      v-model="showSuccessDialog"
      max-width="400"
    >
      <v-card
        :title="successMsg"
      />
    </v-dialog>
    <v-dialog
      v-model="showErrorDialog"
      max-width="400"
    >
      <v-card
        title="Erro ao cadastrar aluno"
        class="pb-1"
      >
        <span 
          v-for="message in errorMessages"
          :key="message"
          class="ml-5 mb-2"
        >
          {{ message }}
        </span>
      </v-card>
    </v-dialog>
    <v-text-field 
      v-model="student.name"
      label="Nome"
      :error-messages="$v.name.$errors.map(e => e.$message).join(';')"
      @input="$v.name.$touch"
    />
    <v-text-field 
      v-model="student.email"
      label="E-mail"
      :error-messages="$v.email.$errors.map(e => e.$message).join(';')"
      @input="$v.email.$touch"
    />
    <v-text-field 
      v-model.number="student.ra"
      label="RA"
      :error-messages="$v.ra.$errors.map(e => e.$message).join(';')"
      @input="$v.ra.$touch"
    />
    <v-text-field 
      v-model="student.cpf"
      label="CPF"
      :error-messages="$v.cpf.$errors.map(e => e.$message).join(';')"
      @input="$v.cpf.$touch"
    />
    <span
      v-if="!isFormValid"
      class="d-flex pb-3"
    >
      Preencha os campos
    </span>
    <span class="d-flex ga-5">
      <v-btn
        :color="!isFormValid ? 'grey-lighten-2' : ''" 
        :readonly="!isFormValid"
        :loading="isLoading"
        @click="performAction()"
      >
        {{ method === 'create' ? 'Cadastrar' : 'Editar' }}
      </v-btn>
      <v-btn>
        Cancelar
      </v-btn>
    </span>
  </v-container>
</template>

<script lang="ts" setup>
import studentsService from '@/services/students-service'
import { computed, reactive, ref } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { email, helpers, required } from '@vuelidate/validators'
import Student from '@/types/Student'
import { ZodError } from 'zod'

  const method = 'create'
  const student = reactive<Student>({
    name: 'Henrique',
    ra: 123,
    cpf: '123',
    email: 'user@email.com'
  })

  const mandatoryFieldMsg = 'O campo é obrigatório'

  const rules = {
    name: { required: helpers.withMessage(mandatoryFieldMsg, required) },
    ra: { required: helpers.withMessage(mandatoryFieldMsg, required) },
    cpf: { required: helpers.withMessage(mandatoryFieldMsg, required) },
    email: { required: helpers.withMessage(mandatoryFieldMsg, required), email }
  }

  const $v = useVuelidate(rules, student)

  const isFormValid = computed(() => !$v.value.$invalid)

  
  const showSuccessDialog = ref(false)
  const successMsg = ref('O aluno foi cadastrado')

  const showErrorDialog = ref(false)
  const errorMessages = reactive<string[]>([])

  const isLoading = ref(false)

  const performAction = async () => {
    try {
      errorMessages.length = 0
      isLoading.value = true
      if (method === 'create') {
        const response = await studentsService.create(student)
        if (response.ok) {
          showSuccessDialog.value = true
          return
        }

        const expectedStatus = {
          '400': async () => {
            const data = await response.json() as { error: ZodError }
            const errors = data.error.issues.map(i => i.message).join(';')
            errorMessages.push(errors)
          },
          '409': async () => {
            const data = await response.json()
            errorMessages.push(data.message)
          }
        }

        try {
          const status = response.status.toString() as keyof typeof expectedStatus
          if (status in expectedStatus) {
            await expectedStatus[status]()
          } else {
            errorMessages.push('Erro desconhecido')
          }
        } catch (err) {          
          console.error(err)
        }


        showErrorDialog.value = true
        return
      }
      alert ('O editar ainda não foi implementado')
    } catch (err) {
      console.error(err)
    } finally {
      isLoading.value = false
    }
  }

  const getTitle = () => {
    const action = method === 'create' ? 'Cadastro' : 'Edição'
    return `${action} de Aluno`
  }
</script>
