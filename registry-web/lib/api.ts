const API_BASE_URL = 'http://51.75.118.170:20246';

export interface PackageInfo {
  name: string;
  version: string;
  description?: string;
  author?: string;
  license?: string;
}

export async function getPackages(): Promise<PackageInfo[]> {
  const response = await fetch(`${API_BASE_URL}/packages`);
  if (!response.ok) throw new Error('Failed to fetch packages');
  return response.json();
}

export async function getPackage(name: string): Promise<PackageInfo | null> {
  const response = await fetch(`${API_BASE_URL}/packages/${name}`);
  if (response.status === 404) return null;
  if (!response.ok) throw new Error('Failed to fetch package');
  return response.json();
}
