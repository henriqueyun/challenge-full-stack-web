<template>
  <v-toolbar title="Consultas de Alunos" />
  <v-container fluid>
    <v-row>
      <v-col>
        <v-btn
          class="flex-grow-0"
          @click="router.replace('/student-form/create')"
        >
          Cadastrar Aluno
        </v-btn>
      </v-col>
      <v-col class="d-flex ga-5">
        <v-text-field
          v-model="searchText"
          label="Digite sua busca"
          clearable
          @click:clear="searchStudents()"
        />
        <v-btn
          class="flex-grow-0"
          :disabled="!searchText"
          @click="searchStudents()"
        >
          Pesquisar
        </v-btn>
      </v-col>
    </v-row>
    <v-data-table 
      :items="!!searchedStudents.length ? searchedStudents : students"
      :headers="headers"
      no-data-text="Sem alunos disponíveis"
    >
      <template #item.actions="{ item, index }">
        <span class="d-flex ga-3">
          <v-btn
            variant="outlined"

            @click="router.replace(`/student-form/update/${item.ra}`)"
          >Editar</v-btn>
          <v-btn
            variant="outlined"
            :loading="isIndexLoading(index)"
            :disabled="isIndexLoading(index)"
          >Excluir</v-btn>
        </span>
        <v-dialog
          :dialog="showConfirmDialog"
          text="Confirma a exclusão?"
        >
          <v-btn
            variant="outlined"
            @click="remove(item.ra, index)"
          >
            Confirmar
          </v-btn>
          <v-btn
            @click="showConfirmDialog = false"
          >
            Cancelar
          </v-btn>
        </v-dialog>
      </template>
    </v-data-table>
  </v-container>
  <v-snackbar
    v-model="showEmptySearch"
    timeout="4000"
  >
    Nenhum aluno corresponde à busca
  </v-snackbar>
</template>

<script setup lang="ts">
import router from '@/router'
import studentsService from '@/services/students-service'
import StudentDTO from '@/types/StudentDTO'
import { onMounted, reactive, ref } from 'vue'

  const students = reactive<StudentDTO[]>([])
  const searchedStudents = reactive<StudentDTO[]>([])
  const isLoading = ref(false)

  const headers = [
    { title: 'Nome', key: 'name'},
    { title: 'E-mail', key: 'email'},
    { title: 'Registro Acadêmico', key: 'ra'},
    { title: 'CPF', key: 'cpf'},
    { title: 'Ações', key: 'actions' }
  ]

  const removedIndex = ref(-1)

  function isIndexLoading(index: number) {
    return removedIndex.value === index
  }
  
  const showConfirmDialog = ref(false)

  async function remove(ra: string | number, index: number) {
    console.log('man???')
    removedIndex.value = index
    try {
      await studentsService.remove(ra)
      await getData()
    } catch (err) {
      console.error(err)
    } finally {
      removedIndex.value = -1
    }
  }

  function formatCPF(cpf: string): string {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  }

  const searchText = ref('')
  const showEmptySearch = ref(false)

  const searchStudents = () => {
    if (!searchText.value) {
      return
    }
    searchedStudents.length = 0
    const filtered = [...students.filter(s => {
      return s.name
        .toLowerCase()
        .includes(searchText.value.toLowerCase())
    })]

    if (!filtered.length) {
      showEmptySearch.value = true
      return
    }
    searchedStudents.push(...filtered)
    searchText.value = ''
  }

  const getData = async () => {
      try {
        isLoading.value = true
        students.length = 0
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

  onMounted(() => {
    getData()
  })
</script>
