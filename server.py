import http.server
import socketserver
import os
import sys

PORT = 3000
DIRECTORY = "."

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def do_GET(self):
        # Strip query parameters/hashes
        clean_path = self.path.split('?')[0].split('#')[0].lstrip("/")
        
        # 1. Check if file exists in the root directory
        if os.path.isfile(os.path.join(DIRECTORY, clean_path)):
            return super().do_GET()
            
        # 2. Check if file exists in the public directory
        public_path = os.path.join(DIRECTORY, "public", clean_path)
        if os.path.isfile(public_path):
            self.path = "/public/" + clean_path
            return super().do_GET()
            
        # 3. Fallback to index.html for other paths (SPA Routing)
        self.path = "/index.html"
        return super().do_GET()

if __name__ == "__main__":
    # Ensure port 3000 is used and bind to 0.0.0.0
    handler = Handler
    # Allow address reuse to avoid port binding conflicts on reload
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("0.0.0.0", PORT), handler) as httpd:
        print(f"Serving HTTP on 0.0.0.0 port {PORT} (http://127.0.0.1:{PORT}/) ...")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nKeyboard interrupt received, exiting.")
            sys.exit(0)
