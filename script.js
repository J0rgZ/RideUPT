// Configuración - URLs del repositorio de GitHub
const GITHUB_REPO = 'J0rgZ/RideUPT';
const GITHUB_PAGES_URL = 'https://J0rgZ.github.io/RideUPT';
// URL de descarga del APK (desde GitHub Pages o Releases)
const GITHUB_DOWNLOAD_URL = `${GITHUB_PAGES_URL}/RideUPT.apk`;
const GITHUB_REPO_URL = `https://github.com/${GITHUB_REPO}`;

// Función para generar el QR code
function generateQRCode() {
    // Limpiar el contenedor si ya existe un QR
    const qrContainer = document.getElementById('qrcode');
    if (qrContainer) {
        qrContainer.innerHTML = '';
        
        // Crear un canvas para el QR code
        const canvas = document.createElement('canvas');
        qrContainer.appendChild(canvas);
        
        // Generar el QR code con la URL de descarga
        QRCode.toCanvas(canvas, GITHUB_DOWNLOAD_URL, {
            width: 256,
            colorDark: '#6366f1',
            colorLight: '#ffffff',
            errorCorrectionLevel: 'H',
            margin: 2
        }, function (error) {
            if (error) {
                console.error('Error al generar QR:', error);
                qrContainer.innerHTML = '<p style="color: red;">Error al generar código QR</p>';
            }
        });
    }
}

// Actualizar enlaces cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    // Generar QR code
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

