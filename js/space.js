document.addEventListener("DOMContentLoaded", function() {

    const inputBusqueda = document.getElementById("inputBuscar");
    const btnBuscar = document.getElementById("btnBuscar");
    const contenedor = document.getElementById("contenedor");

    btnBuscar.addEventListener("click", function() {
        const busqueda = inputBusqueda.value.trim();  // Capturar el valor del input al hacer clic

        if(busqueda !== '') {
            fetch(`https://images-api.nasa.gov/search?q=${busqueda}`)
               .then(response => response.json())
               .then(data => {
                   const resultados = data.collection.items;

                   // Limpiamos el contenedor antes de mostrar los resultados
                   contenedor.innerHTML = '<div class="row"></div>';

                   // Seleccionamos la fila donde se colocarán las tarjetas
                   const fila = contenedor.querySelector('.row');

                   // Iteramos sobre los resultados y mostramos las imágenes en tarjetas
                   resultados.forEach(item => {
                       if(item.links && item.links[0].href) {
                           // Creamos una tarjeta para cada resultado
                           const card = `
                               <div class="col-md-4 col-sm-6">
                                   <div class="card mb-4" style="width: 100%;">
                                       <img src="${item.links[0].href}" class="card-img-top" alt="${item.data[0].title}">
                                       <div class="card-body">
                                           <h5 class="card-title">${item.data[0].title}</h5>
                                           <p class="card-text">${item.data[0].description || 'No description available'}</p>
                                       </div>
                                       
                                   </div>
                                   
                               </div>
                           `;
                           fila.innerHTML += card;  // Añadimos cada tarjeta a la fila
                       }
                   });
               })
               .catch(error => {
                   console.error('Error:', error);
                   contenedor.innerHTML = '<p>Ocurrió un error al realizar la búsqueda.</p>';
               });
        }
    });
});
