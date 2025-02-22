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
    <v-data-table 
      :items="items"
    />
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';

  // const headers = ref([
  //   {title: '', key: '', align: 'start'},
  //   {title: '', key: '', align: 'start'},
  //   {title: '', key: '', align: 'start'},
  //   {title: '', key: '', align: 'start'},
  //   {title: '', key: '', align: 'start'},
  // ])

  const items = ref([
    { name: "João Silva", ra: 123456, email: "joao.silva@example.com", cpf: "123.456.789-09" },
    { name: "Maria Oliveira", ra: 654321, email: "maria.oliveira@example.com", cpf: "987.654.321-00" },
    { name: "Carlos Souza", ra: 789012, email: "carlos.souza@example.com", cpf: "456.789.123-45" },
    { name: "Ana Costa", ra: 345678, email: "ana.costa@example.com", cpf: "321.654.987-09" },
    { name: "Pedro Santos", ra: 901234, email: "pedro.santos@example.com", cpf: "654.321.987-00" },
    { name: "Juliana Lima", ra: 567890, email: "juliana.lima@example.com", cpf: "789.123.456-78" },
    { name: "Lucas Pereira", ra: 234567, email: "lucas.pereira@example.com", cpf: "987.123.654-32" },
    { name: "Fernanda Rocha", ra: 890123, email: "fernanda.rocha@example.com", cpf: "123.789.456-01" },
    { name: "Rafael Almeida", ra: 456789, email: "rafael.almeida@example.com", cpf: "456.123.789-02" },
    { name: "Amanda Martins", ra: 678901, email: "amanda.martins@example.com", cpf: "789.456.123-03" },
    { name: "Bruno Ferreira", ra: 123789, email: "bruno.ferreira@example.com", cpf: "321.987.654-04" },
    { name: "Patrícia Gomes", ra: 987654, email: "patricia.gomes@example.com", cpf: "654.789.321-05" },
    { name: "Daniel Ribeiro", ra: 345123, email: "daniel.ribeiro@example.com", cpf: "987.456.321-06" },
    { name: "Camila Dias", ra: 789345, email: "camila.dias@example.com", cpf: "123.654.987-07" },
    { name: "Marcos Carvalho", ra: 567123, email: "marcos.carvalho@example.com", cpf: "456.987.321-08" },
    { name: "Tatiane Nunes", ra: 234890, email: "tatiane.nunes@example.com", cpf: "789.321.654-09" },
    { name: "Gustavo Mendes", ra: 901567, email: "gustavo.mendes@example.com", cpf: "321.456.789-10" },
    { name: "Isabela Castro", ra: 678234, email: "isabela.castro@example.com", cpf: "654.123.987-11" },
    { name: "Roberto Barbosa", ra: 345901, email: "roberto.barbosa@example.com", cpf: "987.321.654-12" },
    { name: "Larissa Fernandes", ra: 123678, email: "larissa.fernandes@example.com", cpf: "123.987.456-13" }
  ])
</script>
