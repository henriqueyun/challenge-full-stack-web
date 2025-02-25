<template>
  <v-toolbar :title="`${isCreate() ? 'Cadastro' : 'Edição'} de Aluno`" />	
  <v-container
    fluid
    class="ga-5"
  >
    <v-dialog
      v-model="showSuccessDialog"
      max-width="400"
      persistent
    >
      <v-card
        :title="`O aluno foi ${method === 'create' ? 'cadastrado' : 'editado' }`"
      >
        <template #actions>
          <v-btn @click="router.replace('/')">
            Ver alunos
          </v-btn>
        </template>
      </v-card>
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
      placeholder="Informe apenas um e-mail"
      :loading="fieldsLoading"
      :disabled="fieldsLoading"
      :error-messages="$v.name.$errors.map(e => e.$message).join('; ')"
      @input="$v.name.$touch"
    />
    <v-text-field 
      v-model="student.email"
      label="E-mail"
      placeholder="Informe apenas um e-mail"
      :loading="fieldsLoading"
      :disabled="fieldsLoading"
      :error-messages="$v.email.$errors.map(e => e.$message).join('; ')"
      @input="$v.email.$touch"
    />
    <v-text-field
      v-if="isCreate()"
      model-value="(Gerado automáticamente)"
      disabled
      label="RA"
    />
    <v-text-field
      v-else
      v-model.number="ra"
      disabled
      :loading="fieldsLoading"
      label="RA"
    />
    <v-text-field 
      v-model="student.cpf"
      v-mask="['###########']"
      label="CPF"
      placeholder="Informe o número do documento"
      :loading="fieldsLoading"
      :disabled="fieldsLoading || method !== 'create'"
      :error-messages="$v.cpf.$errors.map(e => e.$message).join('; ')"
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
      <v-btn @click="router.replace('/')">
        Cancelar
      </v-btn>
    </span>
  </v-container>
</template>

<script lang="ts" setup>
import studentsService from '@/services/students-service'
import { computed, onMounted, reactive, ref } from 'vue'
import CreateStudentDTO from '@/types/CreateStudentDTO'
import { ZodError } from 'zod'
import router from '@/router'
import { useRoute } from 'vue-router'

  const route = useRoute()
  
  const method = route.path === '/student-form/create' ? 'create' : 'update'
  
  const ra = ref()

  const fieldsLoading = ref(false)
  const getStudent = async () => {
    if (method !== 'create') {
      
      const pathRA = route.params.ra
      if (!pathRA) {
        router.replace('/')
      }

      try {
        fieldsLoading.value = true
        const response = await studentsService.find(pathRA.toString())
        if (response.ok) {
          const data = await response.json() as StudentDTO
          ra.value = pathRA
          Object.assign(student, data)
        }
      } catch (err) {
        console.error(err)
        errorMessages.push('Erro ao buscar informações para edição do aluno')
      } finally {
        fieldsLoading.value = false
      }
    }
  }

  onMounted(() => {
    getStudent()
  })


  const student = reactive<CreateStudentDTO>({
    name: 'Oliver Noah Barros',
    cpf: '94220758666',
    email: 'victor_enrico_rodrigues@purkyt.com'
  })

  const mandatoryFieldMsg = 'O campo é obrigatório'

  import { cpf } from 'cpf-cnpj-validator'
  import StudentDTO from '@/types/StudentDTO'
import useVuelidate from '@vuelidate/core'
import { email, helpers, required } from '@vuelidate/validators'

  const isCPFValid = (value: string) => cpf.isValid(value)

  const rules = {
    name: { required: helpers.withMessage(mandatoryFieldMsg, required) },
    cpf: { required: helpers.withMessage(mandatoryFieldMsg, required),  isCPFValid: helpers.withMessage('CPF inválido', isCPFValid)},
    email: { required: helpers.withMessage(mandatoryFieldMsg, required), email: helpers.withMessage('Formato do e-mail inválido', email) }
  }

  const $v = useVuelidate(rules, student)

  const isFormValid = computed(() => !$v.value.$invalid)

  const showSuccessDialog = ref(false)

  const showErrorDialog = ref(false)
  const errorMessages = reactive<string[]>([])

  const isLoading = ref(false)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleError = async (response: any) => {
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
  }

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
        handleError(response)
        showErrorDialog.value = true
        return
      }

      const response = await studentsService.update(ra.value, student)
        if (response.ok) {
          showSuccessDialog.value = true
          return
        }
        handleError(response)
        showErrorDialog.value = true
        return
    } catch (err) {
      showErrorDialog.value = true
      console.error(err)
    } finally {
      isLoading.value = false
    }
  }
  
  const isCreate = () => {
    return method === 'create'
  }
</script>
