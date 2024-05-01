<template>
    <div>
      <v-text-field v-model="search" label="Search" outlined></v-text-field>
      <v-table>
        <thead>
          <tr>
            <th class="text-left">Name</th>
            <th class="text-left">Task</th>
            <th class="text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="todo in filteredTodos" :key="todo.name">
            <td>{{ todo.name }}</td>
            <td>{{ todo.task }}</td>
            <td>{{ todo.status }}</td>
          </tr>
        </tbody>
      </v-table>
    </div>
</template>
  
  <script>
  import { computed } from "vue";
  import { useStore } from "vuex";
  
  export default {
    props: {
      todos: {
        type: Array,
        required: true
      }
    },
    setup(props) {
      const store = useStore();
  
      const search = computed({
        get() {
          return store.state.search;
        },
        set(value) {
          store.commit("updateSearch", value);
        }
      });
  
      const filteredTodos = computed(() => {
        const searchTerm = search.value.toLowerCase();
        return props.todos.filter(
          todo =>
            todo.name.toLowerCase().includes(searchTerm) ||
            todo.task.toLowerCase().includes(searchTerm) ||
            todo.status.toLowerCase().includes(searchTerm)
        );
      });
  
      return {
        search,
        filteredTodos
      };
    }
  };
  </script>
  