// ✅ CONFIGURACIÓN COMPLETA DE EMAILJS CON TUS CLAVES REALES
// ===========================================================

// 🎯 TUS CLAVES REALES DE EMAILJS:
// ================================

// 1. Public Key (de Account > General)
const PUBLIC_KEY = '02yI80fW8Y6NyiDZZ';

// 2. Service ID (de Email Services)
const SERVICE_ID = 'service_default'; // Servicio por defecto de EmailJS

// 3. Template ID (de Email Templates)
const TEMPLATE_ID = 'template_vvgtrua';

// 4. Private Key (de Account > General)
const PRIVATE_KEY = 'F5n02FU3Ia3p5lPtqNatQ';

// 📝 INSTRUCCIONES PARA CONFIGURAR TU CÓDIGO:
// ============================================

// PASO 1: Abre el archivo Js/portafolio.js
// PASO 2: Busca la línea 4 que dice: emailjs.init('YOUR_PUBLIC_KEY');
// PASO 3: Reemplázala con: emailjs.init('02yI80fW8Y6NyiDZZ');

// PASO 4: Busca la función initContactForm
// PASO 5: Busca esta línea:
//        await emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', formData);
// PASO 6: Reemplázala con:
//        await emailjs.send('service_default', 'template_vvgtrua', formData);

// ✅ CONFIGURACIÓN FINAL COMPLETA:
// ================================

// En Js/portafolio.js línea 4:
emailjs.init('02yI80fW8Y6NyiDZZ');

// En la función initContactForm:
await emailjs.send(
    'service_default',
    'template_vvgtrua',
    {
        from_name: formData.from_name,
        from_email: formData.from_email,
        message: formData.message
    }
);

// 🎉 ¡LISTO! TU FORMULARIO AHORA ENVIARÁ EMAILS REALES

// 📧 PRUEBA TU CONFIGURACIÓN:
// ===========================
// 1. Abre tu portafolio en el navegador
// 2. Ve a la sección de contacto
// 3. Llena el formulario con datos de prueba
// 4. Envía el mensaje
// 5. Deberías recibir el email en tu bandeja de entrada

// 💡 NOTAS IMPORTANTES:
// ====================
// - Los emails pueden tardar unos segundos en llegar
// - Revisa tu carpeta de spam si no los ves
// - EmailJS tiene un límite gratuito de 200 emails por mes
// - Si tienes problemas, verifica que las claves sean correctas

// 🚀 ¡TU PORTAFOLIO ESTÁ COMPLETAMENTE FUNCIONAL!