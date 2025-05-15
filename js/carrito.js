document.addEventListener('DOMContentLoaded', function() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const itemsContainer = document.getElementById('items-carrito');
    
    if (carrito.length === 0) {
        itemsContainer.innerHTML = '<p class="carrito-vacio">Tu carrito está vacío</p>';
        return;
    }

    itemsContainer.innerHTML = '';
    
    carrito.forEach((producto, index) => {
        const itemElement = document.createElement('div');
        itemElement.className = 'item-carrito';
        itemElement.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.titulo}">
            <div class="info-item">
                <h3>${producto.titulo}</h3>
                <p class="precio">$${producto.precio.toFixed(2)}</p>
                <div class="cantidad">
                    <button class="btn-cantidad restar" data-index="${index}">-</button>
                    <span class="numero-cantidad">${producto.cantidad}</span>
                    <button class="btn-cantidad sumar" data-index="${index}">+</button>
                </div>
                <button class="btn-eliminar" data-index="${index}">Eliminar</button>
            </div>
        `;
        
        itemsContainer.appendChild(itemElement);
    });

    // Actualizar totales
    actualizarTotales();
    
    // Configurar event listeners para los botones
    configurarBotones();
});

function actualizarTotales() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const subtotal = carrito.reduce((sum, producto) => sum + (producto.precio * producto.cantidad), 0);
    const envio = 5.00; // Costo fijo de envío
    const total = subtotal + envio;
    
    document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('total').textContent = `$${total.toFixed(2)}`;
    document.getElementById('contador-carrito').textContent = carrito.reduce((sum, p) => sum + p.cantidad, 0);
}

function configurarBotones() {
    document.querySelectorAll('.btn-cantidad, .btn-eliminar').forEach(btn => {
        btn.addEventListener('click', function() {
            const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
            const index = parseInt(this.getAttribute('data-index'));
            
            if (this.classList.contains('restar')) {
                if (carrito[index].cantidad > 1) {
                    carrito[index].cantidad--;
                } else {
                    carrito.splice(index, 1);
                }
            } 
            else if (this.classList.contains('sumar')) {
                carrito[index].cantidad++;
            }
            else if (this.classList.contains('btn-eliminar')) {
                carrito.splice(index, 1);
            }
            
            localStorage.setItem('carrito', JSON.stringify(carrito));
            location.reload(); // Recargar para ver cambios
        });
    });
}