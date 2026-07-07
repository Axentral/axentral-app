Axentral — Keep-Alive para Supabase
Previene que el proyecto de Supabase se pause por inactividad (plan gratuito = 7 días sin actividad → pausa automática).
Cómo funciona
Una función serverless en Netlify hace ping a Supabase automáticamente cada hora, sin que nadie tenga que hacer nada.
Netlify Scheduler (cada hora)
        ↓
netlify/functions/keep-alive-scheduled.js
        ↓
netlify/functions/lib/supabase-keep-alive.js
        ↓
Supabase REST API → proyecto despierto ✅
Pasos para activarlo
Paso 1 — Subir los archivos al repo
Copiá estos archivos a tu repo axentral-app en GitHub:
axentral-app/
├── index.html          (ya existe)
├── netlify.toml        (reemplazar con este)
├── README.md           (este archivo)
└── netlify/
    └── functions/
        ├── keep-alive.js             (endpoint manual / diagnóstico)
        ├── keep-alive-scheduled.js   (función programada)
        └── lib/
            └── supabase-keep-alive.js (lógica compartida)
Paso 2 — Agregar las variables de entorno en Netlify
Ir a app.netlify.com → tu proyecto axentral-app
Site Settings → Environment Variables
Agregar estas dos variables:
Variable
Valor
SUPABASE_URL
https://ttidobbtcrjzzqflxayb.supabase.co
SUPABASE_ANON_KEY
tu clave publishable que empieza con sb_publishable_...
Clic en Save
Paso 3 — Verificar que Netlify recibió los cambios
Hacer push de los archivos a GitHub (rama main)
Netlify detecta el cambio y republica automáticamente
Ir a Netlify → Functions → deberías ver keep-alive-scheduled con etiqueta Scheduled
Paso 4 — Probar manualmente
Entrá a esta URL en tu navegador:
https://axentral.com/keep-alive
Si ves un JSON con "status": "ok" → el endpoint manual funciona correctamente.
Si ves un error → revisá que las variables de entorno estén bien escritas. Para validar el cron, usá Netlify → Functions → keep-alive-scheduled → Run now.
Cron schedule explicado
0 8 */4 * *
│ │  │  │ └── cualquier día de la semana
│ │  │  └──── cualquier mes
│ │  └─────── cada 4 días
│ └────────── a las 8 AM (UTC)
└──────────── minuto 0
Esto significa: ejecutar a las 8 AM UTC cada 4 días. Como Supabase pausa por inactividad, 4 días da un margen cómodo.
Variables de entorno necesarias
Variable
Dónde conseguirla
SUPABASE_URL
Supabase → Settings → API → Project URL
SUPABASE_ANON_KEY
Supabase → Settings → API → Publishable key
⚠️ NUNCA pongas estas claves directamente en el código — solo en las variables de entorno de Netlify.
Verificar que Supabase no está pausado
Ir a supabase.com → tu proyecto
Si el status dice Healthy → está activo
Si dice Paused → clic en Restore para reactivarlo manualmente
© 2025 Axentral · axentral.com