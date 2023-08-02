
const $grafica = document.querySelector("#myChart");

const etiquetas = ["Study", "Home", "Work"]

const datosIngresos = {
    data: [0, 0, 0], // La data es un arreglo que debe tener la misma cantidad de valores que la cantidad de etiquetas
    // Ahora debería haber tantos background colors como datos, es decir, para este ejemplo, 4
    backgroundColor: [
        'rgba(163,221,203,0.7)',
        'rgba(232,233,161,0.7)',
        'rgba(230,181,102,0.7)',
        
    ],// Color de fondo
    borderColor: [
        'rgba(163,221,203,1)',
        'rgba(232,233,161,1)',
        'rgba(230,181,102,1)',
        
    ],// Color del borde
    borderWidth: 1,// Ancho del borde
};
var myChart = new Chart($grafica, {
    type: 'pie',// Tipo de gráfica. Puede ser dougnhut o pie
    data: {
        labels: etiquetas,
        datasets: [
            datosIngresos,
            // Aquí más datos...
        ]
    },
    
});