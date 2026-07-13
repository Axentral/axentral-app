# ContaAI MVP Roadmap

## Objetivo

ContaAI es un sistema financiero modular para pequeñas y medianas empresas de Latinoamérica.

El objetivo del MVP es construir un núcleo financiero sólido, desacoplado de la legislación de un país específico y preparado para crecer mediante configuraciones y módulos.

Durante el MVP no se implementarán funcionalidades específicas de un país.

Después de esta consolidación, este documento queda como referencia oficial del MVP. Durante el MVP solo podrá actualizarse el estado de las fases del roadmap: completada, en progreso o pendiente. La arquitectura y el alcance no deberán modificarse salvo decisión explícita del proyecto.

---

## Principios

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

## Arquitectura oficial

```text
ContaAI

├── Finanzas
├── Ventas
├── Compras
├── Inventario
├── Nómina
└── IA
```

Esta estructura NO debe modificarse durante el MVP.

Las funciones administrativas del sistema, como usuarios, roles, permisos, auditoría o configuración técnica, deberán tratarse como infraestructura y no como un módulo funcional de negocio.

---

## Contenido de cada módulo

### Finanzas

Responsabilidad:

Administrar toda la información financiera y contable.

```text
Finanzas

├── Configuración
├── Plan de cuentas
├── Catálogos
├── Movimientos / Diario
├── Bancos y Caja
├── Presupuesto
├── Estados Financieros
├── Indicadores
└── Dashboard
```

No contiene:

* Clientes
* Proveedores
* Facturación
* Inventario
* Nómina

---

### Ventas

Contendrá en versiones posteriores:

* Clientes
* Cotizaciones
* Facturación
* Cuentas por cobrar
* Reportes

Forma parte de la arquitectura oficial, pero no forma parte del alcance del MVP actual.

---

### Compras

Contendrá en versiones posteriores:

* Proveedores
* Órdenes de compra
* Compras
* Cuentas por pagar

Forma parte de la arquitectura oficial, pero no forma parte del alcance del MVP actual.

---

### Inventario

Contendrá en versiones posteriores:

* Productos
* Entradas
* Salidas
* Kardex
* Existencias

Forma parte de la arquitectura oficial, pero no forma parte del alcance del MVP actual.

---

### Nómina

Contendrá en versiones posteriores:

* Empleados
* Planillas
* Deducciones
* Beneficios

Forma parte de la arquitectura oficial, pero no forma parte del alcance del MVP actual.

---

### IA

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

## Roadmap oficial del MVP

- [x] Fase 0 — Arquitectura
- [x] Fase 1 — Shell
- [x] Fase 2 — Configuración
- [ ] Fase 3 — Plan de cuentas
- [ ] Fase 4 — Catálogos
- [ ] Fase 5 — Movimientos / Diario
- [ ] Fase 6 — Bancos y Caja
- [ ] Fase 7 — Presupuesto
- [ ] Fase 8 — Estados Financieros
- [ ] Fase 9 — Indicadores
- [ ] Fase 10 — Dashboard
- [ ] Fase 11 — IA

---

## Dependencias del Roadmap

Las dependencias oficiales del MVP son:

```text
Configuración

↓

Plan de cuentas

↓

Catálogos

↓

Movimientos / Diario

↓

Bancos y Caja

↓

Presupuesto

↓

Estados Financieros

↓

Indicadores

↓

Dashboard

↓

IA
```

Reglas:

* Un módulo solo puede depender de módulos anteriores.
* No se permiten dependencias circulares.
* Ninguna fase puede comenzar mientras la anterior no esté aprobada.
* No se desarrollarán dos fases del roadmap simultáneamente.

---

## Versión 2

No desarrollar durante el MVP:

* Ventas
* Compras
* Inventario
* Nómina

Estos módulos forman parte de la arquitectura oficial, pero su implementación comenzará únicamente después de finalizar el roadmap completo del módulo Finanzas.

---

## Reglas del MVP

Durante el MVP, Ventas, Compras, Inventario y Nómina deben entenderse de la siguiente forma:

* Forman parte de la arquitectura oficial.
* No forman parte del alcance del MVP actual.
* Su implementación comenzará únicamente después de finalizar el roadmap completo del módulo Finanzas.

Durante el MVP se mantienen fuera de alcance:

* Reglas fiscales específicas.
* Impuestos.
* IVA.
* NIIF específicas.
* Multiempresa.
* Multiusuario.
* Activos fijos.
* Conciliación bancaria avanzada.
* CRM.
* POS.
* Integraciones bancarias.
* XML fiscal.
* Otras funcionalidades no incluidas en el roadmap.

---

## Regla de implementación

Cada fase debe cumplir las siguientes condiciones:

* Tener una única responsabilidad.
* Poder probarse de forma aislada.
* No romper módulos anteriores.
* No modificar la arquitectura.
* No duplicar código.
* No mezclar interfaz con lógica.
* No implementar funcionalidades futuras.

---

## Definition of Done

Toda fase deberá cumplir como mínimo:

* Compila correctamente.
* No rompe módulos anteriores.
* Tiene validaciones.
* Tiene pruebas para la lógica implementada.
* Está integrada al Shell.
* Respeta el roadmap.
* Respeta la arquitectura.
* No introduce dependencias innecesarias.
* No introduce entidades nuevas fuera del alcance de la fase.
* La documentación correspondiente está actualizada.
* Fue revisada y aprobada antes de iniciar la siguiente fase.

---

## Principio de Alcance

Cada fase implementará únicamente la funcionalidad necesaria para cumplir el objetivo de esa fase.

Si durante el desarrollo surge una mejora que no sea indispensable para completar la fase actual:

* No deberá implementarse.
* No deberá modificar la arquitectura.
* No deberá modificar el roadmap.
* Deberá registrarse únicamente en el Backlog.

El objetivo es evitar el crecimiento descontrolado del alcance (scope creep).

---

## Backlog

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

El Backlog nunca modifica la fase actual.

El Backlog nunca modifica la arquitectura.

El Backlog nunca modifica el roadmap.

---

## Uso obligatorio

A partir de este documento, todas las implementaciones futuras deberán respetar este roadmap.

Toda implementación futura deberá comenzar revisando este documento.

Antes de iniciar una nueva fase deberá verificarse que la implementación pertenece al roadmap oficial.

Si una tarea no pertenece al roadmap, no debe implementarse durante el MVP.

Ningún prompt posterior podrá modificar el roadmap o la arquitectura salvo una decisión explícita del proyecto.
