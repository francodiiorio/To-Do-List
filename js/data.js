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


let tareas = new Array;
//Array que va a ser utilizado en la entrega final
let tareasFinalizadas = new Array;
