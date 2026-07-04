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

    def do_POST(self):
        clean_path = self.path.split('?')[0].split('#')[0]
        if clean_path == "/api/save-guides":
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            
            try:
                import json
                guides_data = json.loads(post_data.decode('utf-8'))
                
                # Write to guides.json in root
                with open(os.path.join(DIRECTORY, "guides.json"), "w", encoding="utf-8") as f:
                    json.dump(guides_data, f, indent=2, ensure_ascii=False)
                
                # Also write to dist/guides.json if it exists
                dist_dir = os.path.join(DIRECTORY, "dist")
                if os.path.isdir(dist_dir):
                    with open(os.path.join(dist_dir, "guides.json"), "w", encoding="utf-8") as f:
                        json.dump(guides_data, f, indent=2, ensure_ascii=False)
                
                self.send_response(200)
                self.send_header('Content-Type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(json.dumps({"status": "success", "message": "Guides saved successfully"}).encode('utf-8'))
                return
            except Exception as e:
                self.send_response(400)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({"status": "error", "message": str(e)}).encode('utf-8'))
                return
        
        self.send_response(404)
        self.end_headers()

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
