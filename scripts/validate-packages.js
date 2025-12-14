const fs = require('fs');
const path = require('path');

function validateSemver(version) {
  const semverRegex = /^\d+\.\d+\.\d+$/;
  return semverRegex.test(version);
}

function validatePackages() {
  const packagesDir = path.join(__dirname, '..', 'packages');
  const sitePackagesDir = path.join(__dirname, '..', 'site', 'packages');

  if (!fs.existsSync(packagesDir)) {
    console.log('No packages directory found');
    return;
  }

  const packageDirs = fs
    .readdirSync(packagesDir, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  const names = new Set();

  for (const pkgName of packageDirs) {
    const pkgDir = path.join(packagesDir, pkgName);
    const kexraJsonPath = path.join(pkgDir, 'kexra.json');
    const srcIndexPath = path.join(pkgDir, 'src', 'index.kx');

    // Check kexra.json exists
    if (!fs.existsSync(kexraJsonPath)) {
      throw new Error(`Package ${pkgName} missing kexra.json`);
    }

    // Validate kexra.json
    const kexraJson = JSON.parse(fs.readFileSync(kexraJsonPath, 'utf-8'));
    if (
      !kexraJson.name ||
      !kexraJson.version ||
      !kexraJson.description ||
      !kexraJson.author ||
      !kexraJson.license
    ) {
      throw new Error(`Package ${pkgName} kexra.json missing required fields`);
    }
    if (kexraJson.name !== pkgName) {
      throw new Error(`Package ${pkgName} folder name does not match kexra.json.name`);
    }
    if (!validateSemver(kexraJson.version)) {
      throw new Error(`Package ${pkgName} has invalid semver version`);
    }

    // Check src/index.kx exists
    if (!fs.existsSync(srcIndexPath)) {
      throw new Error(`Package ${pkgName} missing src/index.kx`);
    }

    // Check site package exists
    const sitePkgDir = path.join(sitePackagesDir, pkgName);
    if (!fs.existsSync(sitePkgDir)) {
      throw new Error(`Package ${pkgName} missing site documentation`);
    }

    // Check meta.json exists
    const metaJsonPath = path.join(sitePkgDir, 'meta.json');
    if (!fs.existsSync(metaJsonPath)) {
      throw new Error(`Package ${pkgName} missing meta.json`);
    }

    // Validate meta.json
    const metaJson = JSON.parse(fs.readFileSync(metaJsonPath, 'utf-8'));
    if (
      !metaJson.name ||
      !metaJson.version ||
      !metaJson.description ||
      !metaJson.author ||
      !metaJson.license ||
      !metaJson.repo
    ) {
      throw new Error(`Package ${pkgName} meta.json missing required fields`);
    }
    if (metaJson.name !== pkgName) {
      throw new Error(`Package ${pkgName} meta.json name does not match folder name`);
    }
    if (metaJson.version !== kexraJson.version) {
      throw new Error(`Package ${pkgName} version mismatch between kexra.json and meta.json`);
    }
    if (!validateSemver(metaJson.version)) {
      throw new Error(`Package ${pkgName} meta.json has invalid semver version`);
    }

    // Check README.md exists
    const readmePath = path.join(sitePkgDir, 'README.md');
    if (!fs.existsSync(readmePath)) {
      throw new Error(`Package ${pkgName} missing README.md`);
    }

    // Check website/index.md exists
    const websiteIndexPath = path.join(sitePkgDir, 'website', 'index.md');
    if (!fs.existsSync(websiteIndexPath)) {
      throw new Error(`Package ${pkgName} missing website/index.md`);
    }

    // Check for duplicate names
    if (names.has(kexraJson.name)) {
      throw new Error(`Duplicate package name: ${kexraJson.name}`);
    }
    names.add(kexraJson.name);
  }

  console.log('All packages validated successfully');
}

validatePackages();
