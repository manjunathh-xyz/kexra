import { GetStaticProps } from 'next';
import Link from 'next/link';
import { getPackages, PackageInfo } from '../lib/api';

interface HomeProps {
  packages: PackageInfo[];
}

export default function Home({ packages }: HomeProps) {
  return (
    <div
      style={{
        fontFamily: 'Arial, sans-serif',
        maxWidth: '800px',
        margin: '0 auto',
        padding: '20px',
      }}
    >
      <h1>Kexra Registry</h1>
      <p>Discover and install Kexra packages.</p>

      <input
        type="text"
        placeholder="Search packages..."
        style={{ width: '100%', padding: '10px', marginBottom: '20px' }}
      />

      <h2>Recent Packages</h2>
      <ul>
        {packages.map((pkg) => (
          <li key={pkg.name}>
            <Link href={`/package/${pkg.name}`}>
              <strong>{pkg.name}</strong> v{pkg.version}
            </Link>
            {pkg.description && <p>{pkg.description}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const packages = await getPackages();
  return {
    props: { packages },
  };
};
