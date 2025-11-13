// Configuración - URLs del repositorio de GitHub
const GITHUB_REPO = 'J0rgZ/RideUPT';
const GITHUB_PAGES_URL = 'https://J0rgZ.github.io/RideUPT';
// URL de descarga del APK (desde GitHub Pages o Releases)
const GITHUB_DOWNLOAD_URL = `${GITHUB_PAGES_URL}/RideUPT.apk`;
const GITHUB_REPO_URL = `https://github.com/${GITHUB_REPO}`;

// Función para generar el QR code usando API externa (método principal y más confiable)
function generateQRCode() {
    const qrContainer = document.getElementById('qrcode');
    if (!qrContainer) {
        console.error('No se encontró el contenedor del QR');
        return;
    }

    // Limpiar el contenedor
    qrContainer.innerHTML = '';
    
    // URL para el QR - usar la URL actual si estamos en GitHub Pages, sino la URL configurada
    let qrUrl;
    if (window.location.hostname.includes('github.io')) {
        // Estamos en GitHub Pages
        const baseUrl = window.location.origin + window.location.pathname.replace(/\/[^/]*$/, '');
        qrUrl = baseUrl + '/RideUPT.apk';
    } else {
        // Estamos en local o otro servidor
        qrUrl = GITHUB_DOWNLOAD_URL;
    }
    
    console.log('Generando QR para:', qrUrl);

    // Usar API externa de QR code (método más confiable y sin dependencias)
    const encodedUrl = encodeURIComponent(qrUrl);
    const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=256x256&data=${encodedUrl}&color=2563eb&bgcolor=ffffff&margin=2`;
    
    const img = document.createElement('img');
    img.src = qrApiUrl;
    img.alt = 'Código QR - Escanea para descargar RideUPT';
    img.style.width = '256px';
    img.style.height = '256px';
    img.style.display = 'block';
    img.style.margin = '0 auto';
    img.style.borderRadius = '8px';
    
    // Mostrar mensaje de carga
            qrContainer.innerHTML = '<p style="color: #2563eb; padding: 20px;">Cargando código QR...</p>';
    
    img.onload = function() {
        console.log('QR cargado exitosamente');
        qrContainer.innerHTML = '';
        qrContainer.appendChild(img);
    };
    
    img.onerror = function() {
        console.error('Error al cargar QR desde API externa');
        // Intentar con otra API de respaldo
        const backupApiUrl = `https://chart.googleapis.com/chart?chs=256x256&cht=qr&chl=${encodedUrl}`;
        const backupImg = document.createElement('img');
        backupImg.src = backupApiUrl;
        backupImg.alt = 'Código QR';
        backupImg.style.width = '256px';
        backupImg.style.height = '256px';
        backupImg.style.display = 'block';
        backupImg.style.margin = '0 auto';
        
        backupImg.onerror = function() {
            qrContainer.innerHTML = '<p style="color: red; padding: 20px;">Error al cargar código QR. Por favor, usa el botón de descarga directa.</p>';
        };
        
        backupImg.onload = function() {
            qrContainer.innerHTML = '';
            qrContainer.appendChild(backupImg);
        };
        
        qrContainer.innerHTML = '';
        qrContainer.appendChild(backupImg);
    };
    
    // Agregar la imagen al contenedor
    qrContainer.appendChild(img);
}

// Actualizar enlaces cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM cargado, generando QR...');
    // Generar QR inmediatamente usando API externa (método confiable)
    generateQRCode();
    
    // Actualizar enlaces de descarga
    const downloadBtn = document.getElementById('downloadBtn');
    if (downloadBtn) {
        downloadBtn.href = GITHUB_DOWNLOAD_URL;
    }
    
    // Actualizar enlaces de GitHub
    const githubLinks = document.querySelectorAll('a[href*="github.com/tu-usuario"]');
    githubLinks.forEach(link => {
        link.href = link.href.replace('github.com/tu-usuario/RideUPT', `github.com/${GITHUB_REPO}`);
    });
    
    // Actualizar el QR code para que apunte a la URL de descarga directa
    // El QR code se regenerará automáticamente con la URL correcta
    
    // Agregar animación suave al hacer scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observar elementos para animación
    const animatedElements = document.querySelectorAll('.feature, .download-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Efecto de hover mejorado en botones
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Función para copiar URL al portapapeles (opcional)
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(function() {
        // Mostrar notificación de éxito
        showNotification('URL copiada al portapapeles');
    }, function(err) {
        console.error('Error al copiar: ', err);
    });
}

// Función para mostrar notificaciones (opcional)
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #6366f1;
        color: white;
        padding: 15px 25px;
        border-radius: 50px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Agregar estilos de animación para notificaciones
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

