// Inside Vuex store (store.js)
import Vuex from 'vuex';
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/firebase";
import { v4 as uuidv4 } from "uuid";
const store = new Vuex.Store({
  state: {
    todos: [] // State to store todos
  },
  mutations: {
    // Mutation to add a todo to the state
    addTodo(state, todo) {
      state.todos.unshift(todo);
    }
  },
  actions: {
    async addTodoToDatabase({ commit }, todoData) {
      // Basic validation to ensure todoData contains required fields
      if (!todoData || !todoData.name || !todoData.task || !todoData.taskCategory || !todoData.status) {
        console.error("Error: Invalid todo data");
        return;
      }
  
      try {
        // Add a document to the 'todoTask' collection in Firestore
        const docRef = await addDoc(collection(db, "todoTask"), {
          todo_id: uuidv4(), // Generate a unique ID for the todo item
          name: todoData.name,
          task: todoData.task,
          taskCategory: todoData.taskCategory,
          status: todoData.status,
          createdAt: serverTimestamp(), // Current timestamp for creation
          updatedAt: serverTimestamp() // Current timestamp for update
        });
        console.log("Todo added to database with ID:", docRef.id);
  
        // Commit the mutation to update Vuex state
        commit('addTodo', todoData);
      } catch (error) {
        console.error("Error adding todo to database: ", error);
      }
    }
  },
  
  modules: {}
});

export {store}