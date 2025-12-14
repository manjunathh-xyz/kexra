export interface PackageManifest {
  name: string;
  version: string;
  description?: string;
  author?: string;
  license?: string;
  dependencies?: Record<string, string>;
}

export class PackageManager {
  private manifestPath = 'kexra.json';
  private modulesDir = 'kex_modules';
  private registryDir = '.kexra-registry/packages';

  init(): void {
    const fs = require('fs');
    if (fs.existsSync(this.manifestPath)) {
      console.error('kexra.json already exists');
      return;
    }
    const manifest: PackageManifest = {
      name: 'my-project',
      version: '0.1.0',
      dependencies: {},
    };
    fs.writeFileSync(this.manifestPath, JSON.stringify(manifest, null, 2));
    console.log('Created kexra.json');
  }

  install(pkg?: string): void {
    const fs = require('fs');
    const path = require('path');

    if (!pkg) {
      // Install dependencies from manifest
      const manifest = this.readManifest();
      for (const [name, version] of Object.entries(manifest.dependencies || {})) {
        this.installPackage(name, version as string);
      }
      return;
    }

    // Parse pkg@version
    const [name, version] = pkg.split('@');
    this.installPackage(name, version || 'latest');
  }

  private installPackage(name: string, version: string): void {
    const fs = require('fs');
    const path = require('path');

    const pkgDir = path.join(this.modulesDir, name);
    if (fs.existsSync(pkgDir)) {
      console.log(`${name} already installed`);
      return;
    }

    // Check registry
    const regPkgDir = path.join(this.registryDir, name);
    if (!fs.existsSync(regPkgDir)) {
      console.error(`Package ${name} not found in registry`);
      return;
    }

    // Find version
    // @ts-ignore
    const versions = fs.readdirSync(regPkgDir).filter((f) => f !== 'latest');
    let selectedVersion = version;
    if (version === 'latest') {
      selectedVersion = versions.sort().pop()!;
    } else {
      // Simple semver match, for now exact
      if (!versions.includes(version)) {
        console.error(`Version ${version} not found`);
        return;
      }
    }

    // Copy from registry
    const srcDir = path.join(regPkgDir, selectedVersion);
    fs.mkdirSync(pkgDir, { recursive: true });
    fs.copyFileSync(path.join(srcDir, 'kexra.json'), path.join(pkgDir, 'kexra.json'));
    fs.copyFileSync(path.join(srcDir, 'index.kx'), path.join(pkgDir, 'index.kx'));

    console.log(`Installed ${name}@${selectedVersion}`);
  }

  private readManifest(): PackageManifest {
    const fs = require('fs');
    if (!fs.existsSync(this.manifestPath)) {
      return { name: '', version: '' };
    }
    return JSON.parse(fs.readFileSync(this.manifestPath, 'utf-8'));
  }

  update(pkg?: string): void {
    // TODO: implement
    console.log(`Updating ${pkg || 'dependencies'}...`);
  }

  remove(pkg: string): void {
    // TODO: implement
    console.log(`Removing ${pkg}...`);
  }

  list(): void {
    // TODO: implement
    console.log('Installed packages:');
  }

  publish(): void {
    const fs = require('fs');
    const path = require('path');

    if (!fs.existsSync(this.manifestPath)) {
      console.error('kexra.json not found');
      process.exit(1);
    }

    const manifest: PackageManifest = JSON.parse(fs.readFileSync(this.manifestPath, 'utf-8'));

    // Validate
    if (
      !manifest.name ||
      !manifest.version ||
      !manifest.description ||
      !manifest.author ||
      !manifest.license
    ) {
      console.error(
        'Missing required fields in kexra.json: name, version, description, author, license'
      );
      process.exit(1);
    }

    if (!fs.existsSync('src/index.kx')) {
      console.error('src/index.kx not found');
      process.exit(1);
    }

    // Check if already published
    const pkgDir = path.join(this.registryDir, manifest.name);
    const versionFile = path.join(pkgDir, `${manifest.version}.tar.gz`);
    if (fs.existsSync(versionFile)) {
      console.error(`Version ${manifest.version} already published`);
      process.exit(1);
    }

    // Create registry dir
    if (!fs.existsSync(this.registryDir)) {
      fs.mkdirSync(this.registryDir, { recursive: true });
    }
    if (!fs.existsSync(pkgDir)) {
      fs.mkdirSync(pkgDir, { recursive: true });
    }

    // Create tar.gz (simulate with zip or copy)
    // For simplicity, copy files to a dir
    const tempDir = path.join(pkgDir, manifest.version);
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir);
    }
    fs.copyFileSync(this.manifestPath, path.join(tempDir, 'kexra.json'));
    fs.copyFileSync('src/index.kx', path.join(tempDir, 'index.kx'));

    console.log(`Publishing ${manifest.name}@${manifest.version}…`);
    console.log('✓ Package validated');
    console.log('✓ Uploaded successfully');
    console.log('✓ Available at registry');
    console.log('Done.');
  }
}
