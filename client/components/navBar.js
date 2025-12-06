import React from 'react';
import Link from 'next/link';

export default function NavBar() {
  return (
    <div>
      <Link
        href="/"
        className="navbar-brand"
        style={{
          marginBottom: '6rem',
          fontWeight: 'bold',
        }}
      >
        <span style={{ flexGrow: 1 }}>ClientLock</span>
      </Link>

      <nav style={{ display: 'flex', flexDirection: 'row', gap: '5rem', flexGrow: 1 }}>
        <Link className="nav-link" href="/agent/view">
          <span>Agents</span>
        </Link>
        <Link className="nav-link" href="/law/view">
          <span>Law Services</span>
        </Link>
        <Link className="nav-link" href="/meeting/view/">
          <span>My Meetings</span>
        </Link>
      </nav>
    </div>
  );
}
