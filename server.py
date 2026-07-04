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
        clean_path = self.path.split('?')[0].split('#')[0]
        
        if clean_path == "/api/list-images":
            try:
                import json
                images_dir = os.path.join(DIRECTORY, "images")
                if not os.path.exists(images_dir):
                    os.makedirs(images_dir)
                
                # List files
                files = os.listdir(images_dir)
                valid_extensions = ('.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg', '.png', '.PNG')
                image_files = [f for f in files if f.lower().endswith(valid_extensions)]
                
                self.send_response(200)
                self.send_header('Content-Type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(json.dumps({"status": "success", "images": image_files}).encode('utf-8'))
                return
            except Exception as e:
                self.send_response(400)
                self.send_header('Content-Type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(json.dumps({"status": "error", "message": str(e)}).encode('utf-8'))
                return

        clean_path_strip = clean_path.lstrip("/")
        # 1. Check if file exists in the root directory
        if os.path.isfile(os.path.join(DIRECTORY, clean_path_strip)):
            return super().do_GET()
            
        # 2. Check if file exists in the public directory
        public_path = os.path.join(DIRECTORY, "public", clean_path_strip)
        if os.path.isfile(public_path):
            self.path = "/public/" + clean_path_strip
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
        
        elif clean_path == "/api/upload-image":
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            try:
                import json
                import base64
                upload_data = json.loads(post_data.decode('utf-8'))
                filename = upload_data.get("filename")
                base64_data = upload_data.get("base64Data")
                
                if not filename or not base64_data:
                    raise Exception("Missing filename or base64Data")
                
                # Extract clean filename to avoid directory traversal
                safe_filename = os.path.basename(filename)
                
                # Ensure images/ directory exists
                images_dir = os.path.join(DIRECTORY, "images")
                if not os.path.exists(images_dir):
                    os.makedirs(images_dir)
                
                # Decode base64
                if "," in base64_data:
                    base64_data = base64_data.split(",")[1]
                
                file_bytes = base64.b64decode(base64_data)
                
                # Write to images/filename
                file_path = os.path.join(images_dir, safe_filename)
                with open(file_path, "wb") as f:
                    f.write(file_bytes)
                
                # Also write to dist/images/filename if dist exists
                dist_images_dir = os.path.join(DIRECTORY, "dist", "images")
                if os.path.isdir(os.path.join(DIRECTORY, "dist")):
                    if not os.path.exists(dist_images_dir):
                        os.makedirs(dist_images_dir)
                    with open(os.path.join(dist_images_dir, safe_filename), "wb") as f:
                        f.write(file_bytes)
                
                # Also write to public/images/filename if public/images exists
                public_images_dir = os.path.join(DIRECTORY, "public", "images")
                if os.path.isdir(public_images_dir):
                    if not os.path.exists(public_images_dir):
                        os.makedirs(public_images_dir)
                    with open(os.path.join(public_images_dir, safe_filename), "wb") as f:
                        f.write(file_bytes)

                self.send_response(200)
                self.send_header('Content-Type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(json.dumps({
                    "status": "success", 
                    "message": "Image uploaded successfully",
                    "url": "images/" + safe_filename
                }).encode('utf-8'))
                return
            except Exception as e:
                self.send_response(400)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({"status": "error", "message": str(e)}).encode('utf-8'))
                return

        elif clean_path == "/api/delete-image":
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            try:
                import json
                delete_data = json.loads(post_data.decode('utf-8'))
                filename = delete_data.get("filename")
                if not filename:
                    raise Exception("Missing filename")
                
                # Prevent directory traversal
                safe_filename = os.path.basename(filename)
                
                # Paths
                paths_to_delete = [
                    os.path.join(DIRECTORY, "images", safe_filename),
                    os.path.join(DIRECTORY, "dist", "images", safe_filename),
                    os.path.join(DIRECTORY, "public", "images", safe_filename)
                ]
                
                deleted_any = False
                for path in paths_to_delete:
                    if os.path.isfile(path):
                        os.remove(path)
                        deleted_any = True
                
                self.send_response(200)
                self.send_header('Content-Type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(json.dumps({"status": "success", "message": f"Deleted {safe_filename}"}).encode('utf-8'))
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
