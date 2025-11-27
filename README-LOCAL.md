# Nota sobre pruebas locales

## URLs sin extensión .html

El archivo `vercel.json` solo funciona cuando el sitio está desplegado en Vercel. Para probar localmente con URLs sin extensión, usa el servidor Python personalizado incluido.

### Opción recomendada: Servidor Python personalizado

Usa el archivo `server.py` incluido que simula las rewrites de Vercel:

```bash
python3 server.py
```

O si tienes Python 3 instalado como `python`:

```bash
python server.py
```

Luego accede a:
- `http://localhost:8000/`
- `http://localhost:8000/recetas-keto-uplift`
- `http://localhost:8000/guia-keto-uplift-master-pro`
- `http://localhost:8000/guia-keto-uplift-master-pro-oferta`

Este servidor:
- ✅ Permite URLs sin extensión `.html`
- ✅ Redirige URLs con `.html` a URLs sin extensión
- ✅ Simula el comportamiento de Vercel en local

### Opción alternativa: Servidor Python simple

Si prefieres usar el servidor simple de Python (solo con URLs con extensión):

```bash
python -m http.server 8000
```

Luego accede a `http://localhost:8000/index.html` (con extensión)

## En producción (Vercel)
Una vez desplegado en Vercel, las URLs funcionarán sin extensión gracias al archivo `vercel.json`.

