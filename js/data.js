class Tarea {
    constructor(nombre, category, id){
        this.nombre = nombre
        this.category = category
        this.id = id
        this.completed = false
        }
    getNombre(){
        return this.nombre;
    }
    setNombre(newNombre){
        this.nombre = newNombre; 
    }
    getCategory(){
        return this.category;
    }
    taskCompleted(){
        this.completed=true;
    }
    
}


const tareas = new Array;
const tareasFinalizadas = new Array;

const studyTask = new Array;