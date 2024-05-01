<template>
  <v-container>
    <v-responsive>
      <v-card class="mx-auto bg-red" dark>
        <v-card-title class="text-center ">
          <h1 class="display-4 flex-wrap white--text">Todo Application</h1>
        </v-card-title>
      </v-card>

      <form class="mt-6"  @submit.prevent="submitForm">
        <div class="form-class">
          <v-text-field v-model="name.value.value" :counter="10" :error-messages="name.errorMessage.value"
            label="Name"></v-text-field>

          <v-text-field v-model="task.value.value" :counter="70" :error-messages="task.errorMessage.value"
            label="Task"></v-text-field>


            <v-text-field v-model="taskCategory.value.value" :counter="10" :error-messages="taskCategory.errorMessage.value"
            label="Task Category"></v-text-field>

          <v-select v-model="status.value.value" :error-messages="status.errorMessage.value" :items="items"
            label="Status"></v-select>

        </div>
        <v-btn class="me-4 bg-red" type="submit">
          submit
        </v-btn>

        <v-btn @click="handleReset">
          clear
        </v-btn>
      </form>
      <v-text-field class="mt-6" v-model="search" label="Search" outlined></v-text-field>
      <v-table>
        <thead>
          <tr>
            <th class="text-left">Name</th>
            <th class="text-left">Task</th>
            <th class="text-left">Task Category</th>
            <th class="text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="todo in filteredTodos" :key="todo.name">
            <td>{{ todo.name }}</td>
            <td>{{ todo.task }}</td>
            <td>{{ todo.taskCategory }}</td>
            <td>{{ todo.status }}</td>
          </tr>
        </tbody>
      </v-table>
    </v-responsive>
  </v-container>
</template>

<script setup>
import { useStore } from "vuex"
import { onMounted, computed } from "vue";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
import { ref } from "vue";
import { useField, useForm } from 'vee-validate'

const store = useStore();

const { handleSubmit, handleReset } = useForm({
  validationSchema: {
    name(value) {
      if (value?.length >= 2) return true
      return 'Name needs to be at least 2 characters.'
    },
    task(value) {
      if (value?.length >= 2) return true
      return 'Task needs to be at least 2 characters.'
    },
    taskCategory(value) {
      if (value?.length >= 2) return true
      return 'Task Category needs to be at least 2 characters.'
    },
    status(value) {
      if (value) return true
      return 'Select an item.'
    },
  },
})
const name = useField('name')
const task = useField('task')
const taskCategory = useField('taskCategory')
const status = useField('status')

const items = ref(['Pending', 'In Progress', 'Completed'])

const submitForm = handleSubmit(values => {

  store.dispatch('addTodoToDatabase', values);
  handleReset();
})

onMounted(async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "todoTask"));
    const newData = [];
    querySnapshot.forEach((doc) => {
      newData.push(doc.data());
    });
    store.state.todos = newData; // Update Vuex state directly
    console.log(store.state.todos);
  } catch (error) {
    console.error("Error getting documents: ", error);
  }
});

const filteredTodos = computed(() => {
  const searchTerm = search.value.toLowerCase();
  return store.state.todos.filter(todo =>
    todo.name.toLowerCase().includes(searchTerm) ||
    todo.task.toLowerCase().includes(searchTerm) ||
    todo.status.toLowerCase().includes(searchTerm)
  );
});

const search = ref('');
</script>
<style scoped>
.v-text-field,
.v-select ,
.v-input__control{
  width: 400px;
  gap: 2px;
}

.form-class {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
</style>
