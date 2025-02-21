<template>
  <nav-bar/>
  <v-toolbar title="Alunos"/>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-btn
          class="flex-grow-0"
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

  </v-container>
</template>

<script setup lang="ts">
  //
</script>
