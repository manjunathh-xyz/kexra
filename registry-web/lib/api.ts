// Mock API for registry
export interface PackageInfo {
  name: string;
  version: string;
  description?: string;
  author?: string;
  license?: string;
  repository?: string;
}

export async function getPackages(): Promise<PackageInfo[]> {
  // Mock data
  return [
    {
      name: 'math',
      version: '1.0.0',
      description: 'Built-in math module',
      author: 'Kexra Team',
      license: 'MIT',
    },
    {
      name: 'math-extra',
      version: '0.1.0',
      description: 'Extra math utilities',
      author: 'manjunathh-xyz',
      license: 'MIT',
    },
  ];
}

export async function getPackage(name: string): Promise<PackageInfo | null> {
  const packages = await getPackages();
  return packages.find((p) => p.name === name) || null;
}
