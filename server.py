#!/usr/bin/env python3
"""
Servidor local para desarrollo que simula las rewrites de Vercel
Permite usar URLs sin extensión .html localmente
"""
import http.server
import socketserver
import os
from urllib.parse import urlparse, unquote

PORT = 8000

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        # Parsear la URL
        parsed_path = urlparse(self.path)
        path = unquote(parsed_path.path)
        
        # Si es la raíz, servir index.html
        if path == '/' or path == '/index':
            self.path = '/index.html'
        # Si la ruta no tiene extensión, intentar agregar .html
        elif not os.path.splitext(path)[1]:
            # Verificar si existe el archivo con .html
            html_path = path + '.html'
            if os.path.exists(html_path.lstrip('/')):
                self.path = html_path
            else:
                # Si no existe, devolver 404
                self.send_error(404, "File not found")
                return
        # Si la ruta termina con .html, redirigir a la versión sin extensión (excepto index.html)
        elif path.endswith('.html') and path != '/index.html':
            # Redirigir a la versión sin extensión
            redirect_path = path[:-5]  # Quitar .html
            self.send_response(301)
            self.send_header('Location', redirect_path)
            self.end_headers()
            return
        
        # Llamar al método original para servir el archivo
        return super().do_GET()

if __name__ == "__main__":
    Handler = MyHTTPRequestHandler
    
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        print(f"Servidor iniciado en http://localhost:{PORT}")
        print("Presiona Ctrl+C para detener el servidor")
        print("\nURLs disponibles:")
        print("  - http://localhost:8000/")
        print("  - http://localhost:8000/recetas-keto-uplift")
        print("  - http://localhost:8000/guia-keto-uplift-master-pro")
        print("  - http://localhost:8000/guia-keto-uplift-master-pro-oferta")
        print()
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n\nServidor detenido.")

