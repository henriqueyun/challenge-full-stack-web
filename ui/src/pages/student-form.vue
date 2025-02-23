<template>
  <v-toolbar :title="getTitle()" />	
  <v-container
    fluid
    class="ga-5"
  >
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
      v-model="student.ra"
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
      v-if="isFormValid"
      class="d-flex pb-3"
    >
      Preencha os campos
    </span>
    <span class="d-flex ga-5">
      <v-btn
        :color="isFormValid ? 'grey-lighten-2' : ''" 
        :readonly="isFormValid"
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
import { computed, reactive } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { email, helpers, required } from '@vuelidate/validators'

  const method = 'create'
  const student = reactive({
    name: '',
    ra: '',
    cpf: '',
    email: ''
  })

  const mandatoryFieldMsg = 'O campo é obrigatório'

  const rules = {
    name: { required: helpers.withMessage(mandatoryFieldMsg, required) },
    ra: { required: helpers.withMessage(mandatoryFieldMsg, required) },
    cpf: { required: helpers.withMessage(mandatoryFieldMsg, required) },
    email: { required: helpers.withMessage(mandatoryFieldMsg, required), email}
  }

  const $v = useVuelidate(rules, student)

  const isFormValid = computed(() => $v.value.$invalid)

  const performAction = async () => {
    if (method === 'create') {
      await studentsService.create(student)
      return 
    }
    alert ('O editar ainda não foi implementado')
  }

  const getTitle = () => {
    const action = method === 'create' ? 'Cadastro' : 'Edição'
    return `${action} de Aluno`
  }
</script>
