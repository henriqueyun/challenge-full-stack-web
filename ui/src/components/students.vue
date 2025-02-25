<template>
  <v-toolbar title="Alunos" />
  <v-container fluid>
    <v-row>
      <v-col>
        <v-btn
          class="flex-grow-0"
          @click="router.replace('student-form')"
        >
          Cadastrar Aluno
        </v-btn>
      </v-col>
      <v-col class="d-flex ga-5">
        <v-text-field
          label="Digite sua busca"
        />
        <v-btn
          class="flex-grow-0"
        >
          Pesquisar
        </v-btn>
      </v-col>
    </v-row>
    <v-data-table 
      :items="students"
      no-data-text="Sem alunos disponíveis"
    />
  </v-container>
</template>

<script setup lang="ts">
import router from '@/router'
import studentsService from '@/services/students-service'
import CreateStudentDTO from '@/types/CreateStudentDTO'
import { onMounted, reactive, ref } from 'vue'

  const students = reactive<CreateStudentDTO[]>([])
  const isLoading = ref(false)

  onMounted(() => {
    isLoading.value = true
    const getData = async () => {
      try {
        const response = await studentsService.findAll()
        if (!response.ok) {
          throw new Error('Erro desconhecido')
        }
        const data = await response.json() as CreateStudentDTO[]
        students.push(...data)
      } catch (err) {
        console.error(err) 
      } finally {
        isLoading.value = false
      }
    }
    getData()
  })
</script>
