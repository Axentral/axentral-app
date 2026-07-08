# Decisiones de producto y estructura — Axentral

Este documento centraliza las decisiones tomadas para transformar Axentral de una landing estática a una plataforma organizada por categorías, productos, apps y portal.

## 1. Diseño general

Se utilizará una combinación de:

- **Páginas individuales por producto, app o servicio**: cada elemento tendrá su propia página con detalle, uso, estado, precio, video explicativo y acciones de compra o acceso.
- **Categorías visuales tipo mosaico/lista**: la página de catálogo mostrará cada producto o app con una descripción corta y botón para ver más información.

## 2. Tipo de página principal

La página principal será una **plataforma tipo SaaS/ecosistema**, no solo una tienda.

La página de inicio debe explicar:

- Qué es Axentral.
- Misión, visión y propósito.
- Qué hace la empresa.
- Qué categorías existen.
- Por qué el cliente debería explorar Servicios y Apps.
- Recursos gratuitos o herramientas de prueba para motivar al usuario.

## 3. Navegación principal

La navegación inicial será:

```text
Inicio | Servicios y Apps | Conta AI | Portal | Contacto
```

### Inicio

Se enfocará en la empresa:

- Descripción breve de Axentral.
- Misión.
- Visión.
- Propósito.
- Resumen de productos, apps y soluciones.
- Recursos gratuitos para que el cliente pruebe herramientas antes de comprar.

### Servicios y Apps

Será el catálogo principal de productos y herramientas a vender.

Debe incluir:

- Mosaico o lista de productos/apps.
- Mini descripción de cada elemento.
- Estado del producto.
- Botón para ver más información.
- Página individual para cada producto o app.

Cada página individual debe incluir:

- Qué es.
- Para qué sirve.
- Cómo se usa.
- Cómo manejarlo.
- Video explicativo.
- Precio.
- Estado.
- Cómo comprarlo.
- Redirección al portal para crear cuenta, agregar al carrito y procesar la compra con datos privados.

### Conta AI

Será una sección separada del home, pensada como un producto independiente.

Debe incluir:

- Información del programa.
- Cómo se usa.
- Detalles funcionales.
- Próximas actualizaciones.
- Portal de inicio de sesión específico del programa contable.
- Lista de espera o estado de desarrollo mientras no esté disponible.

### Portal

Será la zona privada para clientes y empresas.

Debe permitir, progresivamente:

- Crear cuenta.
- Iniciar sesión.
- Comprar productos.
- Ver productos comprados.
- Ver registro de pagos.
- Ver facturas.
- Ver estados de cuenta.
- Ver gastos o pagos asociados a productos.
- Gestionar datos privados del cliente.

### Recursos

No será una categoría principal independiente al inicio. Los recursos gratuitos se integrarán en la página de inicio como herramientas, descargas o pruebas gratuitas.

### Contacto

Mantendrá los canales para consultas, soporte y comunicación directa.

## 4. Categorías principales

La estructura principal se deriva de la navegación aprobada:

- Inicio.
- Servicios y Apps.
- Conta AI.
- Portal.
- Contacto.

Dentro de **Servicios y Apps** se agruparán productos, plantillas, apps y herramientas.

## 5. Estados de productos y servicios

Cada producto, app o servicio mostrará un estado claro.

Estados sugeridos:

- **Disponible**: se puede comprar o usar.
- **En actualización**: el producto existe, pero está recibiendo mejoras o correcciones.
- **Próximamente**: aún no está disponible, pero está planificado.
- **En desarrollo**: se está construyendo activamente.
- **No disponible temporalmente**: no se puede comprar o usar por mantenimiento.

La intención es dar confianza al usuario. Si un producto no está disponible, se debe explicar que se está actualizando, corrigiendo detalles o preparando una nueva versión.

## 6. Productos destacados y catálogo

Se mostrará la estructura completa de productos y apps actuales, siempre que esté organizada con claridad para evitar confusión.

La meta es que el catálogo refleje el ecosistema actual y permita crecer en los próximos años sin cambiar la estructura base.

## 7. Apps iniciales

Se incluirán inicialmente las apps/herramientas del punto 1 al 4:

1. Control de inventarios.
2. Calculadora de precios, ganancia e IVA.
3. Control de compras y gastos personales o PyME.
4. Escáner de facturas.

La app tipo datáfono o cobro con tarjeta **no se incluirá en esta etapa** porque es demasiado pronto y requiere mayor revisión técnica, financiera y regulatoria.

## 8. Portal de clientes

El portal será parte central del flujo de compra y privacidad.

Flujo esperado:

1. El cliente ve un producto o app.
2. Abre la página de detalle.
3. Decide comprar o contratar.
4. Se redirige al portal.
5. Crea cuenta o inicia sesión.
6. Agrega al carrito.
7. Procesa compra con datos privados.
8. Accede a productos, facturas, pagos y registros desde su cuenta.

## 9. Conta AI

Conta AI se presentará como producto independiente en desarrollo, con enfoque de roadmap y lista de espera.

La página debe incluir:

- Descripción del programa.
- Uso esperado.
- Funciones principales.
- Próximas actualizaciones.
- Estado actual.
- Acceso o login cuando esté listo.
- Lista de espera mientras esté en desarrollo.

## 10. Servicios profesionales

Por el momento no se venderán servicios profesionales como línea principal.

La sección de servicios se manejará como apoyo, soporte o ayuda para entender mejor los productos.

Puede aparecer en la zona inferior del catálogo o como complemento de cada producto.

Ejemplos:

- Soporte para entender una plantilla.
- Ayuda para usar una app.
- Orientación para elegir un producto.
- Explicación de automatizaciones relacionadas.

## 11. Estilo visual

Se usará estilo **fintech profesional**, con soporte para dos temas:

- Modo oscuro.
- Modo claro.

La razón es permitir que cada usuario elija la experiencia de lectura que prefiera. Algunas personas prefieren modo claro y otras prefieren modo oscuro para cuidar la vista.

El diseño debe mantener una identidad tecnológica, financiera y profesional.

## 12. Organización técnica

El proyecto debe separarse por grupos y archivos independientes para facilitar mantenimiento y reducir riesgos.

Principios:

- Cada categoría tendrá su propia carpeta o archivo.
- Cada página de producto tendrá su propio archivo.
- El catálogo no debe depender del código interno de cada producto.
- Si una página falla, se debe poder revisar sin tocar toda la plataforma.
- CSS y JavaScript deben organizarse en archivos separados.
- Componentes comunes como navegación, botones, tarjetas y temas deben ser reutilizables cuando la estructura técnica lo permita.

Estructura sugerida inicial:

```text
axentral-app/
├── index.html
├── servicios-y-apps/
│   ├── index.html
│   ├── control-inventarios.html
│   ├── calculadora-precios-iva.html
│   ├── control-compras-gastos.html
│   └── escaner-facturas.html
├── conta-ai/
│   └── index.html
├── portal/
│   └── index.html
├── contacto/
│   └── index.html
├── assets/
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   └── main.js
│   └── img/
├── docs/
│   └── decisiones-producto.md
├── netlify/
├── README.md
└── netlify.toml
```

## Próximo paso recomendado

Antes de construir funcionalidades avanzadas, se debe crear la estructura base de páginas y archivos:

1. Separar CSS y JavaScript del `index.html`.
2. Crear páginas base para Inicio, Servicios y Apps, Conta AI, Portal y Contacto.
3. Crear páginas individuales iniciales para las cuatro apps aprobadas.
4. Agregar estados visibles a cada producto/app.
5. Preparar soporte visual para modo claro y oscuro.
