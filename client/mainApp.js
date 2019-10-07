class App {
    constructor() {
        this.todos = localStorage.setItem('allTodos', JSON.stringify([]));
    }
}