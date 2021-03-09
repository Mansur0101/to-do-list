var app = new Vue({
    el: '#app',
    data: {
            todo: null,
            todos: {}
            
        },
    created() {
            this.todos = JSON.parse(localStorage.getItem('todos'));
    },
    methods: {
        todoDone(bool){
            if(bool) 
            return "checked"
        },
        format(date) {
            date = new Date(date);

            let day = ('0' + date.getDate()).slice(-2);
            let month = ('0' + (date.getMonth() + 1)).slice(-2);
            let year = date.getFullYear();
            let hour = date.getHours();
            let min = date.getMinutes();
            let seconds = date.getSeconds();

            return year + '-' + month + '-' + day + " " + hour +":"+ min +":"+seconds;
        },
        doneTodo(id){
            let selectedTodo = this.todos.filter(el => {
                if(el.timestamp === id) {
                    if(el.isDone == false)
                        el.isDone = true
                    else
                        el.isDone = false
                } 
                return el 
             })
            localStorage.setItem("todos", JSON.stringify(selectedTodo))
            
        },
        delTodo(id){
            this.todos = this.todos.filter((el) =>{return el.timestamp != id; });
            localStorage.setItem("todos", JSON.stringify(this.todos))
        },
        getDoneTodos(){
            let len = []
            if(this.todos != null){
                 len = this.todos.filter(el => {return el.isDone != false})
            }
           return len.length
        },
        getIncompleteTodos(){
            let len = []
            if(this.todos != null){
                 len = this.todos.filter(el => {return el.isDone != true})
            }
           return len.length
        },
        saveTodo()
        {
            if(this.todo === null || this.todo === "") {
                alert("Please fill the todo");
            }else{
                let oldItem = JSON.parse(localStorage.getItem("todos")) || [];
                let item = {
                        name: this.todo,
                        timestamp: Date.now(),
                        isDone: false
                    
                }
                oldItem.push(item);
                localStorage.setItem("todos", JSON.stringify(oldItem));
            }
            this.todos = JSON.parse(localStorage.getItem("todos"))
    },
    }
});