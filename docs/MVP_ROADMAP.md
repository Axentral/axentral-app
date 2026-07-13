# ContaAI MVP Roadmap

## Objetivo

ContaAI es un sistema financiero modular para pequeñas y medianas empresas de Latinoamérica.

El objetivo del MVP es construir un núcleo financiero sólido, desacoplado de la legislación de un país específico y preparado para crecer mediante configuraciones y módulos.

Durante el MVP no se implementarán funcionalidades específicas de un país.

---

# Principios

Todo el desarrollo deberá respetar:

* Simplicidad.
* Modularidad.
* Bajo acoplamiento.
* Alta cohesión.
* Reutilización.
* Escalabilidad.
* Separación de responsabilidades.
* Código fácil de probar.
* Código fácil de mantener.

---

# Arquitectura oficial

ContaAI

├── Finanzas
├── Ventas
├── Compras
├── Inventario
├── Nómina
├── IA
└── Administración

Esta estructura NO debe modificarse durante el MVP.

---

# Contenido de cada módulo

## Finanzas

Responsabilidad:

Administrar toda la información financiera y contable.

Contiene:

* Configuración
* Plan de cuentas
* Catálogos
* Movimientos / Diario
* Bancos y Caja
* Presupuesto
* Estados Financieros
* Indicadores
* Dashboard

No contiene:

* Clientes
* Proveedores
* Facturación
* Inventario
* Nómina

---

## Ventas

Contendrá en versiones posteriores:

* Clientes
* Cotizaciones
* Facturación
* Cuentas por cobrar
* Reportes

No forma parte del MVP.

---

## Compras

Contendrá:

* Proveedores
* Órdenes de compra
* Compras
* Cuentas por pagar

No forma parte del MVP.

---

## Inventario

Contendrá:

* Productos
* Entradas
* Salidas
* Kardex
* Existencias

No forma parte del MVP.

---

## Nómina

Contendrá:

* Empleados
* Planillas
* Deducciones
* Beneficios

No forma parte del MVP.

---

## IA

Responsabilidad:

Consumir información del sistema para:

* Explicar indicadores.
* Detectar inconsistencias.
* Generar reportes.
* Responder preguntas.

La IA nunca debe modificar información financiera.

La IA nunca debe realizar los cálculos financieros principales.

Siempre utilizará información calculada por el sistema.

---

# Roadmap oficial del MVP

Fase 0

Arquitectura

Estado:

Completada.

---

Fase 1

Shell de ContaAI

Estado:

Completada.

---

Fase 2

Configuración

Estado:

Completada.

---

Fase 3

Plan de cuentas

Pendiente.

---

Fase 4

Catálogos

Pendiente.

---

Fase 5

Movimientos / Diario

Pendiente.

---

Fase 6

Bancos y Caja

Pendiente.

---

Fase 7

Presupuesto

Pendiente.

---

Fase 8

Estados Financieros

Pendiente.

---

Fase 9

Indicadores

Pendiente.

---

Fase 10

Dashboard

Pendiente.

---

Fase 11

IA

Pendiente.

---

# Versión 2

No desarrollar durante el MVP:

* Ventas
* Compras
* Inventario
* Nómina

---

# Reglas de dependencia

Los módulos solo pueden depender de módulos anteriores.

Ejemplo:

Plan de cuentas

↓

Movimientos

↓

Bancos y Caja

↓

Estados Financieros

↓

Indicadores

↓

Dashboard

↓

IA

Nunca al contrario.

No deben existir dependencias circulares.

---

# Reglas del MVP

Durante el MVP NO se deben agregar:

* Nuevos módulos.
* Nuevas entidades.
* Funcionalidades fuera del roadmap.
* Reglas fiscales específicas.
* Impuestos.
* IVA.
* NIIF específicas.
* Multiempresa.
* Multiusuario.
* Activos fijos.
* Conciliación bancaria avanzada.
* Nómina.
* Facturación.
* Inventario.
* Compras.
* Ventas.

Todo eso pertenece a versiones futuras.

---

# Regla de implementación

Cada fase debe cumplir las siguientes condiciones:

* Tener una única responsabilidad.
* Poder probarse de forma aislada.
* No romper módulos anteriores.
* No modificar la arquitectura.
* No duplicar código.
* No mezclar interfaz con lógica.
* No implementar funcionalidades futuras.

---

# Backlog

Si durante cualquier implementación surge una mejora:

No implementarla.

No modificar la arquitectura.

Agregar únicamente una entrada bajo un apartado llamado:

Backlog Futuro

Incluyendo:

* Nombre.
* Motivo.
* Impacto.

Nada más.

---

# Uso obligatorio

A partir de este documento, todas las implementaciones futuras deberán respetar este roadmap.

Antes de iniciar una nueva fase deberá verificarse que la implementación pertenece al roadmap oficial.

Si una tarea no pertenece al roadmap, no debe implementarse durante el MVP.

---

## Observaciones

* La arquitectura oficial indicada en este documento agrega los módulos Nómina y Administración respecto a definiciones previas de ContaAI que solo contemplaban Finanzas, Ventas, Compras, Inventario e IA. No se modifica el roadmap solicitado; esta diferencia queda registrada como observación.
* El apartado Versión 2 enumera Ventas, Compras, Inventario y Nómina como módulos fuera del MVP, pero no menciona Administración. Se conserva el contenido funcional solicitado y se registra esta omisión para revisión futura.
