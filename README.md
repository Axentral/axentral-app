# axentral-app

Landing page estática de Axentral con despliegue en Netlify y función keep-alive para mantener activo el proyecto de Supabase.

## Estructura

```text
axentral-app/
├── index.html
├── netlify.toml
└── netlify/
    ├── ReadMe_keep_alive.md
    └── functions/
        ├── keep-alive.js
        ├── keep-alive-scheduled.js
        └── lib/
            └── supabase-keep-alive.js
```

## Despliegue

Netlify publica el sitio desde la raíz del repositorio y carga las funciones desde `netlify/functions`.

## Variables de entorno requeridas

Configurar en Netlify → Site configuration → Environment variables:

- `SUPABASE_URL`: URL del proyecto de Supabase, por ejemplo `https://xxxx.supabase.co`.
- `SUPABASE_ANON_KEY`: publishable/anon key del proyecto.

Nunca guardar claves reales dentro del repositorio.

## Keep-alive de Supabase

- Endpoint manual de diagnóstico: `/keep-alive`.
- Función programada: `keep-alive-scheduled`.
- Frecuencia: `0 8 */4 * *` — cada 4 días a las 08:00 UTC.
- El diagnóstico solo devuelve `status: "ok"` cuando Supabase responde con HTTP 2xx.

Después de desplegar, verificar en Netlify → Functions que `keep-alive-scheduled` aparezca con etiqueta `Scheduled` y usar `Run now` para probar el cron.
