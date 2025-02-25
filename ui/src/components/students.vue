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
      :headers="headers"
      no-data-text="Sem alunos disponíveis"
    />
  </v-container>
</template>

<script setup lang="ts">
import router from '@/router'
import studentsService from '@/services/students-service'
import StudentDTO from '@/types/StudentDTO'
import { onMounted, reactive, ref } from 'vue'

  const students = reactive<StudentDTO[]>([])
  const isLoading = ref(false)

  const headers = [
    { title: 'Nome', key: 'name'},
    { title: 'E-mail', key: 'email'},
    { title: 'RA', key: 'ra'},
    { title: 'CPF', key: 'cpf'},
  ]

  function formatCPF(cpf: string): string {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  }

  onMounted(() => {
    isLoading.value = true
    const getData = async () => {
      try {
        const response = await studentsService.findAll()
        if (!response.ok) {
          throw new Error('Erro desconhecido')
        }

        const data = await response.json() as StudentDTO[]
        const formatted = data.map(s => {
          s.cpf = formatCPF(s.cpf)
          s.ra = s.ra.toLocaleString('pt-BR', {
            minimumIntegerDigits: 8,
            useGrouping: false
          })
          return s
        })

        students.push(...formatted)
      } catch (err) {
        console.error(err) 
      } finally {
        isLoading.value = false
      }
    }
    getData()
  })
</script>
