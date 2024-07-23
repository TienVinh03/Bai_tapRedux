import { createSlice } from "@reduxjs/toolkit";
//1. khai báo khởi tạo state
const initialState = {
    listTodo :[] // chứa danh sách công việc
}
//2. thiết lập cho reducer và định nghĩa các action
const todoSlice = createSlice({
    name : 'todo',
    initialState,
    reducers:{
        addTodo (state, action){
            state.listTodo.push( action.payload );
        },
          deleteTodo (state, action){
            state.listTodo = state.listTodo.filter(row => row.id !== action.payload);
 },updateTodo (state, action){
    // lấy tham số truyền vào
    const {id, title,description,total,date,type} = action.payload;
    // tìm bản ghi phù hợp với tham số truyền vào
    const todo = state.listTodo.find(row => row.id === id);
    // update
    if(todo){
        todo.title = title; // gán giá trị
        todo.description = description; // gán giá trị
        todo.total = total; // gán giá trị
        todo.date = date; // gán giá trị
        todo.type = type; // gán giá trị
    }
},   toggleTodoStatus(state, action) {
    // tìm các todo, nếu cái nào phù hợp thì cập nhật trạng thái
    const todo = state.listTodo.find(row => row.id === action.payload);
    if (todo) {
      todo.type = !todo.type;
    }
  },
       
        
    }
});
// export các thành phần để bên screen có thể sử dụng
export const {addTodo,deleteTodo,updateTodo,toggleTodoStatus} = todoSlice.actions;
export default todoSlice.reducer;