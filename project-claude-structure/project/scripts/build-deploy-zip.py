#!/usr/bin/env python3
"""Build AMAUTA backend deploy ZIPs for cPanel.

Genera 2 archivos:
  - amauta-backend-deploy.zip  (SOLO package.json + package-lock.json + dist/)
  - prisma_engines.zip         (pre-generado Linux engines para .prisma/client/)

Flujo en cPanel:
  1. Extraer amauta-backend-deploy.zip en ~/backapi
  2. Subir node_modules/ desde tu Windows (ya tienes todo npm installed localmente)
  3. npm start  (o npm install si necesitas refrescar algo)

Si npm install en cPanel falla por RAM:
  1. Subir node_modules desde Windows (contiene binaries Linux si installaste con --platform=linux)
  2. O usa los pre-generados en prisma_engines.zip
"""

import zipfile, os, shutil, json

PROJECT = '/mnt/d/dev/papa/amauta/project-claude-structure/project'
BACKEND = os.path.join(PROJECT, 'backend')
DEPLOY_ZIP = os.path.join(PROJECT, 'amauta-backend-deploy.zip')
ENGINES_ZIP = os.path.join(PROJECT, 'prisma_engines.zip')
ENGINES_DIR = os.path.join(PROJECT, 'prisma_engines_tmp')

def clean(d):
    if os.path.exists(d):
        shutil.rmtree(d)
    os.makedirs(d)

# ── 1. Build main ZIP: package + package-lock + dist ─────────────────
print("Construyendo amauta-backend-deploy.zip ...")
files_to_add = []

# package.json — postinstall vacío
pkg_path = os.path.join(BACKEND, 'package.json')
with open(pkg_path) as f:
    pkg = json.load(f)
pkg['scripts']['postinstall'] = ''
pkg_tmp = os.path.join(PROJECT, '__pkg_tmp.json')
with open(pkg_tmp, 'w') as f:
    json.dump(pkg, f, indent=2)

# dist/
dist_path = os.path.join(BACKEND, 'dist')
count = 0
for root, dirs, fnames in os.walk(dist_path):
    dirs[:] = [d for d in dirs if d != 'node_modules']
    for fname in fnames:
        full = os.path.join(root, fname)
        arc = os.path.relpath(full, BACKEND).replace(os.sep, '/')
        files_to_add.append((full, arc))
        count += 1

with zipfile.ZipFile(DEPLOY_ZIP, 'w', zipfile.ZIP_DEFLATED) as zf:
    zf.write(pkg_tmp, 'package.json')
    lock_path = os.path.join(BACKEND, 'package-lock.json')
    if os.path.exists(lock_path):
        zf.write(lock_path, 'package-lock.json')
    for full, arc in files_to_add:
        zf.write(full, arc)

os.remove(pkg_tmp)

print(f"  → {os.path.getsize(DEPLOY_ZIP)/1024:.0f} KB, {count} archivos en dist/ + package.json")

# ── 2. Build prisma_engines.zip (engines Linux pre-generados) ─────────
print("\nConstruyendo prisma_engines.zip ...")
clean(ENGINES_DIR)

prisma_src = os.path.join(BACKEND, 'node_modules', '.prisma', 'client')
engine_files = []
for fname in os.listdir(prisma_src):
    if 'windows' in fname.lower() or fname.endswith('.wasm'):
        print(f"  SKIP: {fname}")
        continue
    src = os.path.join(prisma_src, fname)
    new_name = fname.replace('.so.node', '.bin') if fname.endswith('.so.node') else fname
    shutil.copy2(src, os.path.join(ENGINES_DIR, new_name))
    engine_files.append(new_name)
    print(f"  {fname} → {new_name}")

with zipfile.ZipFile(ENGINES_ZIP, 'w', zipfile.ZIP_DEFLATED) as zf:
    for fname in engine_files:
        zf.write(os.path.join(ENGINES_DIR, fname), fname)

shutil.rmtree(ENGINES_DIR)

print(f"  → {os.path.getsize(ENGINES_ZIP)/1024/1024:.1f} MB, {len(engine_files)} archivos")
print(f"\nListo.")
print(f"  Deploy ZIP:   {DEPLOY_ZIP}")
print(f"  Engines ZIP:  {ENGINES_ZIP}")