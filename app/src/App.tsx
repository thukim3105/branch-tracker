import { useMemo, useState } from 'react'
import './index.css'

type Branch = {
  name: string
  kind: 'main' | 'feature' | 'fix'
  updated: string
  status: 'Released' | 'In review' | 'Not released'
}

const branches: Branch[] = [
  { name: 'main', kind: 'main', updated: '12 min ago', status: 'Released' },
  { name: 'feature/checkout-flow', kind: 'feature', updated: '2 hours ago', status: 'In review' },
  { name: 'feature/saved-carts', kind: 'feature', updated: 'Yesterday', status: 'Not released' },
  { name: 'fix/tax-rounding', kind: 'fix', updated: '3 days ago', status: 'Released' },
]

const commits = [
  { hash: 'a83f2c1', title: 'Keep checkout state between steps', detail: 'Mina Park · 2 hours ago', kind: 'current' },
  { hash: 'c29bd10', title: 'Add address validation to delivery form', detail: 'Mina Park · Yesterday at 16:42', kind: 'normal' },
  { hash: '1f5a88e', title: 'Create checkout session endpoint', detail: 'Devon Lee · Yesterday at 14:18', kind: 'normal' },
  { hash: '7d0c3b4', title: 'Start checkout flow from cart', detail: 'Mina Park · Oct 9, 11:06', kind: 'merge' },
]

function App() {
  const [query, setQuery] = useState('')
  const [selectedBranch, setSelectedBranch] = useState('feature/checkout-flow')
  const visibleBranches = useMemo(
    () => branches.filter((branch) => branch.name.toLowerCase().includes(query.toLowerCase())),
    [query],
  )

  return (
    <div className="app-shell min-h-screen">
      <header className="topbar">
        <a className="brand" href="#home" aria-label="BranchFlow home">
          <span className="brand-mark" aria-hidden="true"><i /><i /><i /></span>
          <span>branchflow</span>
        </a>
        <div className="topbar-divider" />
        <button className="repo-picker" type="button" aria-label="Selected repository">
          <span className="repo-avatar">N</span>
          <span className="repo-name"><strong>northstar</strong><span>storefront</span></span>
          <span className="chevron" aria-hidden="true">⌄</span>
        </button>
        <div className="topbar-spacer" />
        <span className="sync-label"><span className="sync-dot" /> Synced 4 min ago</span>
        <button className="icon-button help-button" type="button" aria-label="Help">?</button>
        <button className="user-avatar" type="button" aria-label="Account menu">LP</button>
      </header>

      <div className="workspace">
        <aside className="branch-sidebar">
          <div className="sidebar-heading">
            <div>
              <p className="eyebrow">REPOSITORY</p>
              <h1>Branches <span>24</span></h1>
            </div>
            <button className="icon-button add-button" type="button" aria-label="Add tracked branch">+</button>
          </div>
          <label className="search-box">
            <svg viewBox="0 0 20 20" aria-hidden="true"><circle cx="8.8" cy="8.8" r="5.8" /><path d="m13.2 13.2 4 4" /></svg>
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Find a branch" />
            <kbd>/</kbd>
          </label>
          <div className="branch-list-label"><span>TRACKED BRANCHES</span><button type="button">Recent <span aria-hidden="true">⌄</span></button></div>
          <nav className="branch-list" aria-label="Tracked branches">
            {visibleBranches.map((branch) => (
              <button
                className={`branch-item ${selectedBranch === branch.name ? 'is-selected' : ''}`}
                key={branch.name}
                onClick={() => setSelectedBranch(branch.name)}
                type="button"
              >
                <span className={`branch-glyph ${branch.kind}`} aria-hidden="true">{branch.kind === 'main' ? '●' : '⑂'}</span>
                <span className="branch-copy"><span className="branch-name">{branch.name}</span><span className="branch-updated">{branch.updated}</span></span>
                <span className={`branch-state ${branch.status === 'Released' ? 'released' : branch.status === 'In review' ? 'review' : 'pending'}`} title={branch.status} />
              </button>
            ))}
            {visibleBranches.length === 0 && <p className="empty-search">No matching branches</p>}
          </nav>
          <button className="all-branches" type="button"><span>＋</span> Track a branch</button>
          <div className="sidebar-footer"><span className="private-icon" aria-hidden="true">◈</span><span>Private repository</span><span className="footer-lock" aria-hidden="true">⌑</span></div>
        </aside>

        <main className="main-content">
          <div className="page-heading">
            <div>
              <div className="breadcrumb"><span>storefront</span><span aria-hidden="true">/</span><span>Branches</span></div>
              <h2>{selectedBranch}</h2>
              <p className="branch-subtitle">Updated 2 hours ago by Mina Park <span>·</span> 4 commits</p>
            </div>
            <div className="heading-actions">
              <button className="outline-button" type="button"><span aria-hidden="true">↗</span> View on GitHub</button>
              <button className="more-button" type="button" aria-label="More branch actions">···</button>
            </div>
          </div>

          <section className="status-strip" aria-label="Branch release status">
            <StatusCell label="MERGED" state="Confirmed" tone="green" detail="into main" />
            <StatusCell label="RELEASED" state="Not yet" tone="amber" detail="No release includes this commit" />
            <StatusCell label="DEPLOYED" state="Unknown" tone="gray" detail="No production environment linked" />
          </section>

          <div className="graph-toolbar">
            <div className="graph-title"><span className="graph-title-mark" aria-hidden="true">⑂</span><div><h3>Focus graph</h3><p>Branch history with merge points</p></div></div>
            <div className="graph-controls"><span className="commit-count">4 commits</span><button type="button" aria-label="Zoom out">−</button><button type="button" aria-label="Zoom in">+</button><button className="fit-control" type="button">Fit</button></div>
          </div>

          <div className="graph-layout">
            <section className="graph-panel" aria-label="Commit graph">
              <div className="graph-legend"><span><i className="legend-dot main-dot" /> main</span><span><i className="legend-dot feature-dot" /> {selectedBranch}</span></div>
              <div className="graph-canvas">
                <div className="graph-branch-label main-label"><span className="branch-glyph main">●</span> main</div>
                <div className="graph-branch-label feature-label"><span className="branch-glyph feature">⑂</span> {selectedBranch}</div>
                <svg className="graph-lines" viewBox="0 0 680 500" preserveAspectRatio="none" aria-hidden="true">
                  <path className="main-line" d="M126 38 L126 425" />
                  <path className="feature-line" d="M388 38 L388 300 Q388 344 344 344 L126 344 L126 425" />
                  <path className="merge-line" d="M388 300 Q388 344 344 344 L126 344" />
                </svg>
                <div className="commit-stack">
                  {commits.map((commit, index) => (
                    <button className={`commit-row ${commit.kind}`} key={commit.hash} type="button">
                      <span className={`commit-node ${commit.kind}`}><span /></span>
                      <span className="commit-card"><span className="commit-card-top"><strong>{commit.title}</strong><code>{commit.hash}</code></span><span className="commit-meta">{commit.detail}{commit.kind === 'merge' && <em>MERGE COMMIT</em>}</span></span>
                      {index === 0 && <span className="head-label">HEAD</span>}
                      {commit.kind === 'merge' && <span className="merge-label">Merged into main</span>}
                    </button>
                  ))}
                </div>
              </div>
              <div className="graph-footnote"><span className="info-mark">i</span> Showing the 4 most recent commits on this branch.</div>
            </section>

            <aside className="detail-panel">
              <div className="detail-header"><div><p className="eyebrow">BRANCH DETAILS</p><h3>Release tracking</h3></div><button type="button" aria-label="Branch detail options">···</button></div>
              <div className="detail-section"><div className="detail-section-heading"><span className="status-symbol confirmed">✓</span><h4>Pull request</h4><span className="detail-tag merged-tag">Merged</span></div><a className="evidence-link" href="#pull-request">#184 · Add new checkout flow <span>↗</span></a><p className="evidence-meta">Merged into main · Oct 10, 2026</p></div>
              <div className="detail-section"><div className="detail-section-heading"><span className="status-symbol waiting">◷</span><h4>Release</h4><span className="detail-tag waiting-tag">Not yet</span></div><p className="detail-copy">No release tag contains the merge commit yet.</p><button className="text-link" type="button">View releases <span>↗</span></button></div>
              <div className="detail-section"><div className="detail-section-heading"><span className="status-symbol unknown">?</span><h4>Deployment</h4><span className="detail-tag unknown-tag">Unknown</span></div><p className="detail-copy">Connect a production environment to check deployment status.</p><button className="text-link" type="button">Configure environment <span>→</span></button></div>
              <div className="tracking-note"><span aria-hidden="true">i</span><p>Status is based on available GitHub evidence. Missing data is shown as unknown.</p></div>
            </aside>
          </div>
          <footer className="page-footer"><span>BranchFlow preview</span><span>Data shown for layout preview · Not connected to GitHub</span></footer>
        </main>
      </div>
    </div>
  )
}

function StatusCell({ label, state, tone, detail }: { label: string; state: string; tone: 'green' | 'amber' | 'gray'; detail: string }) {
  return <div className="status-cell"><div className="status-cell-top"><span>{label}</span><strong className={`status-value ${tone}`}><i />{state}</strong></div><p>{detail}</p></div>
}

export default App
