document.addEventListener('DOMContentLoaded', function() {
    // 1. Filtros de categoría
    const filtros = document.querySelectorAll('.btn-filtro');
    const dibujos = document.querySelectorAll('.dibujo-card');
    
    filtros.forEach(filtro => {
        filtro.addEventListener('click', function() {
            // Remover clase 'active' de todos los botones
            filtros.forEach(btn => btn.classList.remove('active'));
            // Añadir clase 'active' al botón clickeado
            this.classList.add('active');

            const categoria = this.getAttribute('data-categoria');

            // Mostrar/Ocultar dibujos según categoría
            dibujos.forEach(dibujo => {
                if (categoria === 'todos' || dibujo.getAttribute('data-categoria') === categoria) {
                    dibujo.style.display = 'block';
                } else {
                    dibujo.style.display = 'none';
                }
            });
        });
    });

    // 2. Funcionalidad "Añadir al carrito"
    const botonesCarrito = document.querySelectorAll('.dibujo-card .btn');
    
    botonesCarrito.forEach(boton => {
        boton.addEventListener('click', agregarAlCarrito);
    });

    // Actualizar contador del carrito al cargar la página
    actualizarContadorCarrito();
});

// Función para agregar productos al carrito
function agregarAlCarrito(event) {
    const boton = event.target;
    const tarjeta = boton.closest('.dibujo-card');
    
    const producto = {
        id: tarjeta.getAttribute('data-id') || Date.now(), // ID único
        titulo: tarjeta.querySelector('h3').textContent,
        precio: parseFloat(tarjeta.querySelector('p').textContent.replace('$', '')),
        imagen: tarjeta.querySelector('img').src,
        categoria: tarjeta.getAttribute('data-categoria'),
        cantidad: 1
    };

    // Obtener carrito existente o crear uno nuevo
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    
    // Verificar si el producto ya está en el carrito
    const productoExistente = carrito.find(item => item.id == producto.id);
    
    if (productoExistente) {
        productoExistente.cantidad += 1;
    } else {
        carrito.push(producto);
    }

    // Guardar en localStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));
    
    // Feedback visual
    boton.textContent = '✓ Añadido';
    setTimeout(() => {
        boton.textContent = 'Añadir al carrito';
    }, 2000);

    // Actualizar contador
    actualizarContadorCarrito();
}

// Función para actualizar el contador del carrito
function actualizarContadorCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const contador = document.getElementById('contador-carrito');
    
    if (contador) {
        const totalItems = carrito.reduce((total, item) => total + item.cantidad, 0);
        contador.textContent = totalItems;
    }
}