import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import {
  LayoutDashboard, Zap, Map, ShieldCheck, FileText, Settings,
  ChevronDown, ChevronsLeft, ChevronsRight, Bell, RotateCcw, Check, Loader2,
  ChevronRight, X, Download, FileBarChart2,
  Search, Smartphone, Tablet, Monitor,
  TrendingUp, TrendingDown, MessageSquare, Plus,
  Eye, Terminal, Sparkles,
} from 'lucide-react'
import './KinetixPage.css'

/** Shared easing for Kinetix load choreography */
const KX_EASE = [0.32, 0.72, 0, 1]

function kxSlideFadeVariants(reduce, { x = 0, y = 8 } = {}) {
  return {
    hidden: { opacity: reduce ? 1 : 0, x: reduce ? 0 : x, y: reduce ? 0 : y },
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: reduce ? 0 : 0.32, ease: KX_EASE },
    },
  }
}

function kxStaggerContainer(reduce, { stagger = 0.04, delayChildren = 0 } = {}) {
  return {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduce ? 0 : stagger,
        delayChildren: reduce ? 0 : delayChildren,
      },
    },
  }
}

// ─── Assets ───────────────────────────────────────────────────────────────────

const PRODUCT_IMG = 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=120&h=120&fit=crop&q=80'

const AVATARS = {
  maya:   'https://i.pravatar.cc/80?img=47',
  tomas:  'https://i.pravatar.cc/80?img=33',
  lena:   'https://i.pravatar.cc/80?img=49',
  sarah:  'https://i.pravatar.cc/80?img=68',
  diego:  'https://i.pravatar.cc/80?img=12',
  team:   'https://i.pravatar.cc/80?img=15',
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const ISSUES = [
  {
    id: 1, title: 'CTA visibility drop-off', severity: 'high', conf: '97%',
    desc: 'Primary action falls below the natural thumb zone on 87% of device sizes tested.',
    color: '#DC2626', assignee: AVATARS.maya, comments: 4,
  },
  {
    id: 2, title: 'Payment field hesitation', severity: 'med', conf: '89%',
    desc: 'Users stall at card number entry — form lacks trust signals and inline validation.',
    color: '#D97706', assignee: AVATARS.tomas, comments: 2,
  },
  {
    id: 3, title: 'Weak contrast on secondary action', severity: 'med', conf: '94%',
    desc: '"Save for later" link does not meet WCAG AA contrast ratio against the background.',
    color: '#D97706', assignee: AVATARS.lena, comments: 1,
  },
  {
    id: 4, title: 'Confirmation uncertainty', severity: 'low', conf: '76%',
    desc: 'No visible order summary at point of confirmation — users second-guess their selection.',
    color: '#16A34A', assignee: AVATARS.diego, comments: 0,
  },
]

const RECS = [
  {
    id: 'r1', severity: 'high', title: 'Move primary CTA above thumb zone',
    detail: 'Reposition the "Place Order" button to sit within the natural thumb reach area (top 65% of screen). This single change is projected to recover 12–18% of drop-off at the final step.',
    impact: '+14% conv', impactType: 'pos',
    assignee: AVATARS.maya, assigneeName: 'Maya R.',
  },
  {
    id: 'r2', severity: 'med', title: 'Reduce payment form complexity',
    detail: 'Collapse CVV and expiry into a single inline field group. Add a lock icon and "256-bit encrypted" micro-copy beneath the card input to reduce hesitation signals.',
    impact: '−9% abandon', impactType: 'pos',
    assignee: AVATARS.tomas, assigneeName: 'Tomás K.',
  },
  {
    id: 'r3', severity: 'med', title: 'Increase contrast on secondary action',
    detail: 'Change "Save for later" text from #9CA3AF to #4B5563 (or darker). This brings the contrast ratio from 2.8:1 to 5.1:1, meeting WCAG AA for normal text.',
    impact: 'WCAG AA', impactType: 'neutral',
    assignee: AVATARS.lena, assigneeName: 'Lena P.',
  },
]

const NAV_ITEMS = [
  { id: 'overview',       label: 'Overview',      Icon: LayoutDashboard, badge: null },
  { id: 'simulations',    label: 'Simulations',   Icon: Zap,             badge: null },
  { id: 'heatmaps',       label: 'Heatmaps',      Icon: Map,             badge: null },
  { id: 'accessibility',  label: 'Accessibility', Icon: ShieldCheck,     badge: 3 },
  { id: 'reports',        label: 'Reports',       Icon: FileText,        badge: null },
]

const METRICS = [
  {
    label: 'Friction Score', value: '82', sub: '/ 100',
    trend: 'warn', trendLabel: '-4.2%', trendSuffix: 'in friction', trendIcon: TrendingDown,
    spark: [0.52, 0.56, 0.51, 0.62, 0.58, 0.68, 0.64, 0.72, 0.69, 0.76, 0.74, 0.8], color: '#D97706',
  },
  {
    label: 'Confidence', value: '98%', sub: 'model accuracy',
    trend: 'good', trendLabel: '2.1%', trendIcon: null,
    spark: [0.82, 0.84, 0.83, 0.87, 0.86, 0.89, 0.88, 0.91, 0.93, 0.92, 0.95, 0.98], color: '#16A34A',
  },
  {
    label: 'Conversion Risk', value: 'Med', sub: 'funnel · step 3',
    trend: 'warn', trendLabel: 'Flagged', trendIcon: null,
    spark: [0.5, 0.48, 0.52, 0.5, 0.54, 0.53, 0.56, 0.55, 0.58, 0.59, 0.62], color: '#D97706',
  },
  {
    label: 'Sessions Simulated', value: '10K', sub: 'synthetic users',
    trend: 'mute', trendLabel: 'Apr 28', trendIcon: null,
    spark: [0.18, 0.23, 0.26, 0.34, 0.38, 0.45, 0.5, 0.57, 0.64, 0.74, 0.86, 1.0], color: '#2563EB',
  },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────

const SEVERITY_CLASS = { high: 'kx-severity-high', med: 'kx-severity-med', low: 'kx-severity-low' }
const SEVERITY_LABEL = { high: 'High',              med: 'Medium',          low: 'Low'             }

function SeverityPill({ s }) {
  return (
    <span className={`kx-pill ${SEVERITY_CLASS[s]}`} style={{ fontSize: 10, padding: '2px 7px' }}>
      {SEVERITY_LABEL[s]}
    </span>
  )
}

/** Smooth cubic path through spark points (Catmull-Rom → Bézier). */
function sparkPointsToSmoothPath(points, w, h) {
  const n = points.length
  if (n < 2) return ''
  const stepX = w / (n - 1)
  const yAt = (p) => h - p * (h - 2) - 1
  const xy = (i) => ({ x: i * stepX, y: yAt(points[i]) })

  let d = `M ${xy(0).x.toFixed(2)} ${xy(0).y.toFixed(2)}`
  for (let i = 0; i < n - 1; i++) {
    const p0 = xy(Math.max(0, i - 1))
    const p1 = xy(i)
    const p2 = xy(i + 1)
    const p3 = xy(Math.min(n - 1, i + 2))
    const cp1x = p1.x + (p2.x - p0.x) / 6
    const cp1y = p1.y + (p2.y - p0.y) / 6
    const cp2x = p2.x - (p3.x - p1.x) / 6
    const cp2y = p2.y - (p3.y - p1.y) / 6
    d += ` C ${cp1x.toFixed(2)} ${cp1y.toFixed(2)}, ${cp2x.toFixed(2)} ${cp2y.toFixed(2)}, ${p2.x.toFixed(2)} ${p2.y.toFixed(2)}`
  }
  return d
}

function Sparkline({ points, color, idSuffix, width = 64, height = 22, className = '' }) {
  const w = width, h = height
  const linePath = sparkPointsToSmoothPath(points, w, h)
  const areaPath = `${linePath} L ${w} ${h} L 0 ${h} Z`
  const last = points[points.length - 1]
  const lastX = w
  const lastY = h - last * (h - 2) - 1
  const gid = `kxg-${idSuffix}`.replace(/[^a-zA-Z0-9_-]/g, '')

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="none"
      width="100%"
      height="100%"
      className={`kx-spark${className ? ` ${className}` : ''}`}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor={color} stopOpacity="0.22" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaPath} fill={`url(#${gid})`} />
      <path d={linePath} stroke={color} strokeWidth={1.4} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={lastX} cy={lastY} r="2" fill={color} />
      <circle cx={lastX} cy={lastY} r="3.5" fill={color} fillOpacity="0.18" />
    </svg>
  )
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────

function Sidebar({ active, setActive, expanded, onToggle }) {
  const reduce = useReducedMotion()
  const navItem = kxSlideFadeVariants(reduce, { x: -8, y: 0 })
  const navStagger = kxStaggerContainer(reduce, { stagger: 0.034, delayChildren: reduce ? 0 : 0.06 })

  return (
    <aside
      id="kx-sidebar"
      className="kx-sidebar"
      aria-label="Workspace navigation"
    >
      <motion.div
        className="kx-logo"
        variants={kxSlideFadeVariants(reduce, { x: -10, y: 0 })}
        initial="hidden"
        animate="show"
      >
        <div className="kx-logo-mark" aria-hidden="true">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 7L6 3L10 7L6 11L2 7Z" fill="white" opacity="0.95" />
            <path d="M7 2L11 6L8.5 8.5" stroke="white" strokeWidth="1.4" strokeLinecap="round" opacity="0.55" />
          </svg>
        </div>
        <span className="kx-logo-text">Kinetix</span>
        <span className="kx-logo-version">Beta</span>
        <button
          type="button"
          className="kx-sidebar-collapse-btn"
          onClick={onToggle}
          aria-label={expanded ? 'Show icon bar only' : 'Expand sidebar'}
          title={expanded ? 'Show icon bar only' : 'Expand sidebar'}
        >
          {expanded ? (
            <ChevronsLeft size={15} strokeWidth={2.2} aria-hidden />
          ) : (
            <ChevronsRight size={15} strokeWidth={2.2} aria-hidden />
          )}
        </button>
      </motion.div>

      <motion.div
        className="kx-search"
        variants={kxSlideFadeVariants(reduce, { x: -10, y: 0 })}
        initial="hidden"
        animate="show"
        transition={{ delay: reduce ? 0 : 0.05 }}
      >
        <Search size={13} />
        <input placeholder="Search projects…" />
        <kbd>⌘K</kbd>
      </motion.div>

      <motion.nav
        className="kx-nav"
        aria-label="Main navigation"
        variants={navStagger}
        initial="hidden"
        animate="show"
      >
        <motion.div className="kx-nav-section" variants={navItem}>
          Workspace
        </motion.div>
        {NAV_ITEMS.map(({ id, label, Icon, badge }) => (
          <motion.button
            key={id}
            type="button"
            className={`kx-nav-item${active === id ? ' kx-active' : ''}`}
            variants={navItem}
            onClick={() => setActive(id)}
            aria-current={active === id ? 'page' : undefined}
            title={badge != null ? `${label} · ${badge} notifications` : label}
          >
            <Icon size={15} />
            <span>{label}</span>
            {badge != null && <span className="kx-nav-badge">{badge}</span>}
          </motion.button>
        ))}

        <motion.div className="kx-nav-section" style={{ marginTop: 8 }} variants={navItem}>
          General
        </motion.div>
        <motion.button type="button" className="kx-nav-item" title="Settings" variants={navItem}>
          <Settings size={15} />
          <span>Settings</span>
        </motion.button>
      </motion.nav>

      <motion.div
        className="kx-sidebar-footer"
        variants={kxSlideFadeVariants(reduce, { x: -8, y: 0 })}
        initial="hidden"
        animate="show"
        transition={{ delay: reduce ? 0 : 0.34 }}
      >
        <button type="button" className="kx-team-card" title="Acme Studio · Pro · 12 seats">
          <img className="kx-avatar kx-avatar-md" src={AVATARS.team} alt="" />
          <div className="kx-team-card-text">
            <div className="kx-team-card-name">Acme Studio</div>
            <div className="kx-team-card-meta">Pro · 12 seats</div>
          </div>
          <ChevronDown size={12} />
        </button>
      </motion.div>
    </aside>
  )
}

// ─── Top bar ──────────────────────────────────────────────────────────────────

function TopBar({ simState, onRunSim, onViewReport }) {
  const reduce = useReducedMotion()
  const barItem = kxSlideFadeVariants(reduce, { x: 0, y: -6 })
  const barStagger = kxStaggerContainer(reduce, { stagger: 0.04, delayChildren: reduce ? 0 : 0.03 })

  const btnClass =
    simState === 'idle'     ? 'kx-run-btn kx-run-btn-idle' :
    simState === 'loading'  ? 'kx-run-btn kx-run-btn-loading' :
                              'kx-run-btn kx-run-btn-complete'

  return (
    <motion.header
      className="kx-topbar"
      variants={barStagger}
      initial="hidden"
      animate="show"
    >
      <motion.span className="kx-breadcrumb" variants={barItem}>
        <span>Kinetix</span>
      </motion.span>

      <motion.button className="kx-project-selector" variants={barItem} type="button">
        <FileBarChart2 size={13} style={{ color: 'var(--kx-blue)', opacity: 0.85 }} />
        Checkout Redesign
        <span className="kx-version-tag">v4.2.1</span>
        <ChevronDown size={12} style={{ opacity: 0.45 }} />
      </motion.button>

      <motion.span className="kx-topbar-status" variants={barItem} aria-label="Complete, 2 minutes ago">
        <span className="kx-pill kx-pill-success" style={{ fontSize: 11 }}>
          <span className="kx-pill-dot" />
          Complete
        </span>
        <span className="kx-topbar-status-time">2 min ago</span>
      </motion.span>

      <motion.div className="kx-topbar-gap" variants={barItem} aria-hidden="true" />

      <motion.div className="kx-topbar-actions" variants={barItem}>
        <div className="kx-team-avatars" aria-label="Team">
          <img className="kx-avatar kx-avatar-sm" src={AVATARS.maya}  alt="" />
          <img className="kx-avatar kx-avatar-sm" src={AVATARS.tomas} alt="" />
          <img className="kx-avatar kx-avatar-sm" src={AVATARS.lena}  alt="" />
          <span className="kx-avatar-extra">+4</span>
        </div>

        <div className="kx-divider-v" />

        <button className="kx-view-report-btn" onClick={onViewReport}>
          <FileText size={13} />
          <span>View Report</span>
        </button>

        <button className="kx-icon-btn" aria-label="Notifications">
          <Bell size={14} />
          <span className="kx-notif-badge" aria-hidden="true" />
        </button>

        <button
          className={btnClass}
          onClick={onRunSim}
          disabled={simState === 'loading'}
        >
          {simState === 'idle'     && <><RotateCcw size={13} /> Run Simulation</>}
          {simState === 'loading'  && <><Loader2 size={13} className="kx-spin" /> Simulating…</>}
          {simState === 'complete' && <><Check size={13} /> Simulation Complete</>}
        </button>
      </motion.div>
    </motion.header>
  )
}

// ─── Metric cards ─────────────────────────────────────────────────────────────

function MetricCards() {
  const reduce = useReducedMotion()
  const rowStagger = kxStaggerContainer(reduce, { stagger: 0.055, delayChildren: reduce ? 0 : 0.09 })
  const cardItem = kxSlideFadeVariants(reduce, { y: 10 })

  return (
    <motion.div
      className="kx-metrics-row"
      role="list"
      aria-label="Simulation metrics"
      variants={rowStagger}
      initial="hidden"
      animate="show"
    >
      {METRICS.map((metric) => {
        const { label, value, sub, trend, trendLabel, trendSuffix, trendIcon: Icon, spark, color } = metric
        const trendPill = trend ? (
          <span className={`kx-metric-trend kx-trend-${trend}`}>
            {Icon && <Icon size={10} strokeWidth={2.4} />}
            <span>{trendLabel}</span>
            {trendSuffix && <span className="kx-metric-trend-suffix">{trendSuffix}</span>}
          </span>
        ) : null
        const slug = label.replace(/\s+/g, '-').toLowerCase()

        return (
          <motion.div
            key={label}
            className="kx-metric-card kx-metric-card-large-spark"
            role="listitem"
            variants={cardItem}
          >
            <div className="kx-metric-body">
              <div className="kx-metric-top">
                <span className="kx-metric-label">{label}</span>
              </div>
              <div className="kx-metric-value">
                <span>{value}</span>
                <span className="kx-metric-sub kx-metric-sub-inline">{sub}</span>
              </div>
              <div className="kx-metric-bottom">{trendPill}</div>
            </div>
            <div className="kx-metric-spark-large" aria-hidden="true">
              <Sparkline
                points={spark}
                color={color}
                idSuffix={`${slug}-large`}
                width={200}
                height={72}
              />
            </div>
          </motion.div>
        )
      })}
    </motion.div>
  )
}

// ─── Checkout phone mockup ─────────────────────────────────────────────────────

function CheckoutPhone() {
  return (
    <div className="kx-phone" role="img" aria-label="Checkout prototype with analysis overlay">
      <div className="kx-phone-screen">
        <div className="kx-phone-notch" aria-hidden="true" />

        <div className="kx-phone-status">
          <span className="kx-phone-time">9:41</span>
          <span className="kx-phone-status-spacer" aria-hidden="true" />
          <div className="kx-phone-status-icons">
            <span className="kx-phone-bars" aria-hidden="true">
              <i /><i /><i /><i />
            </span>
            <span className="kx-phone-network-badge">5G</span>
            <span className="kx-phone-battery" aria-hidden="true" />
          </div>
        </div>

        <div className="kx-checkout-ui">
          <div className="kx-co-header">
            <div className="kx-co-back" aria-hidden="true">‹</div>
            <span className="kx-co-title">Checkout</span>
            <div className="kx-co-x" aria-hidden="true">×</div>
          </div>

          <div className="kx-co-progress" aria-hidden="true">
            <div className="kx-co-step-pill kx-co-step-pill-done" />
            <div className="kx-co-step-pill kx-co-step-pill-active" />
            <div className="kx-co-step-pill" />
          </div>

          <div className="kx-co-body">
            <div className="kx-co-section">Order</div>
            <div className="kx-co-order">
              <img className="kx-co-product-img" src={PRODUCT_IMG} alt="" />
              <div className="kx-co-order-info">
                <div className="kx-co-product-name">Air Max 270</div>
                <div className="kx-co-product-meta">Black · Size 10</div>
              </div>
              <div className="kx-co-product-price">$84</div>
            </div>

            <div className="kx-co-divider" />

            <div className="kx-co-section">Delivery</div>
            <div className="kx-co-input">Sarah Chen</div>
            <div className="kx-co-input">sarah.chen@kinetix.io</div>
            <div className="kx-co-input">482 Oak St · Brooklyn</div>

            <div className="kx-co-divider" />

            <div className="kx-co-section">Payment</div>
            <div className="kx-co-input kx-co-input-card">
              <span className="kx-co-card-brand" aria-hidden="true" />
              <span>•••• 4242</span>
            </div>
            <div className="kx-co-field-row">
              <div className="kx-co-input-half">09 / 27</div>
              <div className="kx-co-input-half">•••</div>
            </div>

            <div className="kx-co-secondary">Save for later</div>
          </div>
        </div>

        {/* Heatmap */}
        <div className="kx-heatmap" aria-hidden="true">
          <div className="kx-blob" style={{
            width: 100, height: 100, top: 70, left: 18,
            background: 'radial-gradient(circle, rgba(217,119,6,0.32) 0%, transparent 70%)',
          }} />
          <div className="kx-blob" style={{
            width: 90, height: 90, top: 220, left: 26,
            background: 'radial-gradient(circle, rgba(220,38,38,0.24) 0%, transparent 70%)',
          }} />
          <div className="kx-blob" style={{
            width: 80, height: 80, top: 310, left: 40,
            background: 'radial-gradient(circle, rgba(220,38,38,0.32) 0%, transparent 70%)',
          }} />
        </div>

        {/* Thumb zone line (inside screen, relative) */}
        <div className="kx-thumb-line" style={{ top: '70%' }}>
          <span className="kx-thumb-label">Thumb zone</span>
        </div>

        {/* Scan line */}
        <div className="kx-scan-line" aria-hidden="true" />

        {/* CTA */}
        <div className="kx-co-cta" aria-hidden="true">
          <span className="kx-co-cta-label">Place Order · $84</span>
        </div>

        {/* Issue markers */}
        <div className="kx-issue-marker" style={{ background: '#DC2626', bottom: 56, right: 12 }} aria-hidden="true">1</div>
        <div className="kx-issue-marker" style={{ background: '#D97706', top: 222, right: 12 }} aria-hidden="true">2</div>
        <div className="kx-issue-marker" style={{ background: '#D97706', top: 312, left: 12 }} aria-hidden="true">3</div>
      </div>
    </div>
  )
}

// ─── Prototype preview panel ───────────────────────────────────────────────────

function PrototypePreview() {
  const reduce = useReducedMotion()
  const [tab, setTab] = useState('heatmap')
  const [device, setDevice] = useState('mobile')

  const headStagger = kxStaggerContainer(reduce, { stagger: 0.042, delayChildren: 0 })
  const headPiece = kxSlideFadeVariants(reduce, { y: -6 })
  const bodyStagger = kxStaggerContainer(reduce, { stagger: 0.08, delayChildren: reduce ? 0 : 0.03 })
  const bodyPiece = kxSlideFadeVariants(reduce, { y: 14 })

  return (
    <motion.div
      className="kx-card kx-preview-card"
      initial={reduce ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduce ? 0 : 0.4, ease: KX_EASE, delay: reduce ? 0 : 0.1 }}
    >
      <motion.div className="kx-card-head" variants={headStagger} initial="hidden" animate="show">
        <motion.div className="kx-preview-tabs" variants={headPiece}>
          <button
            type="button"
            className={`kx-tab${tab === 'heatmap' ? ' kx-active' : ''}`}
            onClick={() => setTab('heatmap')}
          >
            <Eye size={11} /> Heatmap
          </button>
          <button
            type="button"
            className={`kx-tab${tab === 'recordings' ? ' kx-active' : ''}`}
            onClick={() => setTab('recordings')}
          >
            Recordings <span className="kx-tab-count">12</span>
          </button>
          <button
            type="button"
            className={`kx-tab${tab === 'annotations' ? ' kx-active' : ''}`}
            onClick={() => setTab('annotations')}
          >
            Annotations <span className="kx-tab-count">4</span>
          </button>
          <button
            type="button"
            className={`kx-tab${tab === 'console' ? ' kx-active' : ''}`}
            onClick={() => setTab('console')}
          >
            <Terminal size={11} /> Console
          </button>
        </motion.div>

        <motion.div className="kx-device-toggle" role="group" aria-label="Device size" variants={headPiece}>
          <button
            type="button"
            className={`kx-device-btn${device === 'mobile' ? ' kx-active' : ''}`}
            onClick={() => setDevice('mobile')}
            aria-label="Mobile"
          >
            <Smartphone size={12} strokeWidth={2.2} />
          </button>
          <button
            type="button"
            className={`kx-device-btn${device === 'tablet' ? ' kx-active' : ''}`}
            onClick={() => setDevice('tablet')}
            aria-label="Tablet"
          >
            <Tablet size={12} strokeWidth={2.2} />
          </button>
          <button
            type="button"
            className={`kx-device-btn${device === 'desktop' ? ' kx-active' : ''}`}
            onClick={() => setDevice('desktop')}
            aria-label="Desktop"
          >
            <Monitor size={12} strokeWidth={2.2} />
          </button>
        </motion.div>
      </motion.div>

      <motion.div className="kx-preview-body" variants={bodyStagger} initial="hidden" animate="show">
        <motion.div variants={bodyPiece} style={{ flexShrink: 0 }}>
          <CheckoutPhone />
        </motion.div>

        <motion.div className="kx-phone-annotations" aria-label="Issue annotations" variants={bodyPiece}>
          {[
            { num: 1, color: '#DC2626', label: 'CTA drop-off',     sub: 'Below thumb zone' },
            { num: 2, color: '#D97706', label: 'Form hesitation',  sub: 'Payment section' },
            { num: 3, color: '#D97706', label: 'Contrast risk',    sub: 'Secondary action' },
          ].map(({ num, color, label, sub }) => (
            <button key={num} type="button" className="kx-annotation">
              <div className="kx-annotation-num" style={{ background: color }}>{num}</div>
              <div className="kx-annotation-body">
                <div className="kx-annotation-label">{label}</div>
                <div className="kx-annotation-sub">{sub}</div>
              </div>
              <ChevronRight size={11} className="kx-annotation-arrow" />
            </button>
          ))}

          <button type="button" className="kx-add-annotation">
            <Plus size={11} strokeWidth={2.5} /> Add annotation
          </button>
        </motion.div>

        <motion.div className="kx-analysis-bar" aria-live="polite" variants={bodyPiece}>
          <div className="kx-analysis-bar-main">
            <div className="kx-analysis-dot" aria-hidden="true" />
            <span className="kx-analysis-text">10,000 sessions analyzed</span>
          </div>
          <div className="kx-analysis-bar-date">
            <span className="kx-analysis-date">Apr 28, 2026</span>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

// ─── Insights panel ────────────────────────────────────────────────────────────

function InsightsPanel() {
  const reduce = useReducedMotion()
  const [filter, setFilter] = useState('all')
  const counts = {
    high: ISSUES.filter(i => i.severity === 'high').length,
    med:  ISSUES.filter(i => i.severity === 'med').length,
    low:  ISSUES.filter(i => i.severity === 'low').length,
  }
  const visible = filter === 'all' ? ISSUES : ISSUES.filter(i => i.severity === filter)

  const tabStagger = kxStaggerContainer(reduce, { stagger: 0.032, delayChildren: reduce ? 0 : 0.05 })
  const tabItem = kxSlideFadeVariants(reduce, { y: 6 })
  const listStagger = kxStaggerContainer(reduce, { stagger: 0.055, delayChildren: reduce ? 0 : 0.02 })
  const listItem = kxSlideFadeVariants(reduce, { x: 8, y: 0 })

  return (
    <motion.div
      className="kx-card kx-insights-card"
      initial={reduce ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduce ? 0 : 0.4, ease: KX_EASE, delay: reduce ? 0 : 0.18 }}
    >
      <motion.div
        className="kx-card-head kx-insights-head"
        variants={kxSlideFadeVariants(reduce, { y: -6 })}
        initial="hidden"
        animate="show"
        transition={{ delay: reduce ? 0 : 0.04 }}
      >
        <div>
          <span className="kx-card-title">Friction Insights</span>
          <span className="kx-insights-summary">Sorted by checkout risk</span>
        </div>
        <span className="kx-insights-total" aria-label={`${ISSUES.length} issues`}>
          {ISSUES.length}
        </span>
      </motion.div>

      <motion.div
        className="kx-insights-tabs"
        role="tablist"
        variants={tabStagger}
        initial="hidden"
        animate="show"
      >
        <motion.button
          type="button"
          className={`kx-mini-tab${filter === 'all' ? ' kx-active' : ''}`}
          variants={tabItem}
          onClick={() => setFilter('all')}
          role="tab"
          aria-selected={filter === 'all'}
        >
          All <span>{ISSUES.length}</span>
        </motion.button>
        <motion.button
          type="button"
          className={`kx-mini-tab${filter === 'high' ? ' kx-active' : ''}`}
          variants={tabItem}
          onClick={() => setFilter('high')}
          role="tab"
          aria-selected={filter === 'high'}
        >
          High <span>{counts.high}</span>
        </motion.button>
        <motion.button
          type="button"
          className={`kx-mini-tab${filter === 'med' ? ' kx-active' : ''}`}
          variants={tabItem}
          onClick={() => setFilter('med')}
          role="tab"
          aria-selected={filter === 'med'}
        >
          Med <span>{counts.med}</span>
        </motion.button>
        <motion.button
          type="button"
          className={`kx-mini-tab${filter === 'low' ? ' kx-active' : ''}`}
          variants={tabItem}
          onClick={() => setFilter('low')}
          role="tab"
          aria-selected={filter === 'low'}
        >
          Low <span>{counts.low}</span>
        </motion.button>
      </motion.div>

      <motion.div className="kx-insights-list" role="list" variants={listStagger} initial="hidden" animate="show">
        {visible.map((issue, i) => (
          <div key={issue.id}>
            <motion.div className="kx-insight-row" role="listitem" variants={listItem}>
              <div className="kx-insight-rail" style={{ background: issue.color }} aria-hidden="true" />
              <div className="kx-insight-body">
                <div className="kx-insight-top">
                  <span className="kx-insight-title">{issue.title}</span>
                  <span className="kx-insight-severity">{SEVERITY_LABEL[issue.severity]}</span>
                </div>
                <div className="kx-insight-desc">{issue.desc}</div>
                <div className="kx-insight-meta">
                  <span>{issue.conf} confidence</span>
                  {issue.comments > 0 && (
                    <span className="kx-insight-comments">
                      <MessageSquare size={10} strokeWidth={2.2} /> {issue.comments} comments
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
            {i < visible.length - 1 && <div className="kx-insight-divider" />}
          </div>
        ))}
      </motion.div>
    </motion.div>
  )
}

// ─── Recommendation cards ──────────────────────────────────────────────────────

function RecCard({ rec, expanded, onToggle, variants }) {
  const isOpen = expanded === rec.id

  return (
    <motion.div className="kx-rec-card" variants={variants}>
      <button
        className="kx-rec-header"
        onClick={() => onToggle(rec.id)}
        aria-expanded={isOpen}
      >
        <div className="kx-rec-header-top">
          <SeverityPill s={rec.severity} />
          <span className={`kx-rec-impact kx-rec-impact-${rec.impactType}`}>
            {rec.impactType === 'pos' && <TrendingUp size={10} strokeWidth={2.4} />}
            {rec.impactType === 'neutral' && <ShieldCheck size={10} strokeWidth={2.4} />}
            {rec.impact}
          </span>
        </div>
        <div className="kx-rec-title">{rec.title}</div>
        <div className="kx-rec-foot">
          <span className="kx-rec-assignee">
            <img className="kx-avatar kx-avatar-xs" src={rec.assignee} alt="" />
            {rec.assigneeName}
          </span>
          <ChevronRight size={13} className={`kx-rec-arrow${isOpen ? ' kx-rec-arrow-open' : ''}`} />
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.26, ease: [0.32, 0.72, 0, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div className="kx-rec-detail">
              <p className="kx-rec-detail-text">{rec.detail}</p>
              <button className="kx-rec-action-btn">
                <ChevronRight size={12} /> Apply Fix
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function RecsRow({ expanded, onToggle }) {
  const reduce = useReducedMotion()
  const recItem = kxSlideFadeVariants(reduce, { y: 14 })
  const labelVars = kxSlideFadeVariants(reduce, { y: 8 })
  const rowStagger = kxStaggerContainer(reduce, { stagger: 0.075, delayChildren: reduce ? 0 : 0.04 })

  return (
    <div className="kx-recs-wrap">
      <motion.div
        className="kx-section-label"
        style={{ marginBottom: 9 }}
        variants={labelVars}
        initial="hidden"
        animate="show"
        transition={{ delay: reduce ? 0 : 0.05 }}
      >
        Recommendations
      </motion.div>
      <motion.div
        className="kx-recs-row"
        role="list"
        aria-label="Recommendations"
        variants={rowStagger}
        initial="hidden"
        animate="show"
      >
        {RECS.map((rec) => (
          <RecCard key={rec.id} rec={rec} expanded={expanded} onToggle={onToggle} variants={recItem} />
        ))}
      </motion.div>
    </div>
  )
}

// ─── Report modal ──────────────────────────────────────────────────────────────

function ReportModal({ onClose }) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className="kx-modal-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduce ? 0 : 0.18, ease: KX_EASE }}
      onClick={onClose}
    >
      <motion.div
        className="kx-modal"
        initial={{ scale: 0.96, y: 10, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.97, y: 6, opacity: 0 }}
        transition={
          reduce
            ? { duration: 0 }
            : { type: 'spring', stiffness: 360, damping: 30 }
        }
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Simulation report"
      >
        <div className="kx-modal-head">
          <div>
            <div className="kx-modal-title">Simulation Report</div>
            <div className="kx-modal-subtitle">Checkout Redesign · 10,000 sessions · Apr 28, 2026</div>
          </div>
          <button className="kx-modal-close" onClick={onClose} aria-label="Close report">
            <X size={13} />
          </button>
        </div>

        <div className="kx-modal-body">
          <div className="kx-modal-score-block">
            <div className="kx-modal-score-num">82</div>
            <div>
              <div className="kx-modal-score-label">Friction Score</div>
              <div className="kx-modal-score-sub">
                Medium-high friction detected across checkout funnel. 3 of 4 issues are actionable within one sprint.
              </div>
            </div>
          </div>

          <div>
            <div className="kx-modal-section-title">Top Issues</div>
            {ISSUES.slice(0, 3).map((issue) => (
              <div key={issue.id} className="kx-modal-issue-row">
                <div style={{
                  width: 8, height: 8, borderRadius: '50%',
                  background: issue.color, flexShrink: 0,
                }} />
                <span className="kx-modal-issue-label">{issue.title}</span>
                <SeverityPill s={issue.severity} />
                <span style={{ fontSize: 11, color: 'var(--kx-text-faint)' }}>{issue.conf}</span>
              </div>
            ))}
          </div>

          <div className="kx-sprint-block">
            <div className="kx-sprint-title">
              <Sparkles size={12} strokeWidth={2.4} />
              Recommended Sprint Focus
            </div>
            <div className="kx-sprint-text">
              Prioritize CTA repositioning and payment field consolidation. Together these two changes address the highest-friction moments and are estimated to improve checkout completion by 14–22%.
            </div>
          </div>
        </div>

        <div className="kx-modal-foot">
          <button className="kx-export-btn">
            <Download size={13} /> Export Report
          </button>
          <button className="kx-modal-done-btn" onClick={onClose}>
            Done
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ─── KinetixPage ──────────────────────────────────────────────────────────────

export default function KinetixPage() {
  const reduce = useReducedMotion()
  const [activeNav,  setActiveNav]  = useState('overview')
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [simState,   setSimState]   = useState('complete')
  const [showReport, setShowReport] = useState(false)
  const [expandedRec, setExpandedRec] = useState(null)

  const handleRunSim = () => {
    if (simState === 'loading') return
    setSimState('loading')
    setTimeout(() => setSimState('complete'), 2600)
  }

  const handleToggleRec = (id) => {
    setExpandedRec((prev) => (prev === id ? null : id))
  }

  return (
    <div className={`kx-root${sidebarOpen ? '' : ' kx-root--sidebar-collapsed'}`}>
      <Sidebar
        active={activeNav}
        setActive={setActiveNav}
        expanded={sidebarOpen}
        onToggle={() => setSidebarOpen((o) => !o)}
      />

      <div className="kx-main">
        <TopBar
          simState={simState}
          onRunSim={handleRunSim}
          onViewReport={() => setShowReport(true)}
        />

        <motion.main
          className="kx-content"
          id="kx-main-content"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: reduce ? 0 : 0.22, ease: KX_EASE, delay: reduce ? 0 : 0.02 }}
        >
          <MetricCards />

          <div className="kx-center-grid">
            <PrototypePreview />
            <InsightsPanel />
          </div>

          <RecsRow expanded={expandedRec} onToggle={handleToggleRec} />
        </motion.main>
      </div>

      <AnimatePresence>
        {showReport && <ReportModal onClose={() => setShowReport(false)} />}
      </AnimatePresence>
    </div>
  )
}
