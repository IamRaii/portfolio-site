// ─────────────────────────────────────────────────────────────────────────────
// PROJECT IMAGES
// ─────────────────────────────────────────────────────────────────────────────
// All screenshots live in: /public/images/projects/
//
// HOW TO ADD / REPLACE IMAGES:
//   1. Drop your .png / .jpg / .webp files into /public/images/projects/
//   2. Update the `src` field below to match the filename
//   3. The gallery (arrows, thumbnails, modal) updates automatically
//
// ADD MORE IMAGES: just append objects to the images[] array —
//   the gallery handles any number of slides.
// ─────────────────────────────────────────────────────────────────────────────

export const projects = [
  // ── PROJECT 1 ──────────────────────────────────────────────────────────────
  {
    id: "01",
    title: "SwiftRent",
    subtitle: "Peer-to-Peer Car Rental Platform",
    category: "Mobile + Web Application",

    // ── IMAGES ────────────────────────────────────────────────────────────
    // Replace src values with your actual screenshot filenames.
    // Suggested naming: swiftrent-feed.png, swiftrent-listing.png, etc.
    // ──────────────────────────────────────────────────────────────────────
    images: [
      {
        src: "/images/projects/project1-home.png",
        alt: "SwiftRent rental feed showing available vehicles with search and filter",
        caption: "Rental Feed",
      },
      {
        src: "/images/projects/project1-inquiry.png",
        alt: "SwiftRent vehicle listing detail with booking and signed contract flow",
        caption: "Listing Detail & Contract",
      },
      {
        src: "/images/projects/project1-find.png",
        alt: "SwiftRent in-app messaging between renter and vehicle owner",
        caption: "In-App Messaging",
      },
    ],

    problem:
      "Car owners had idle vehicles with no reliable way to monetize them, while renters lacked a trustworthy platform for short-term rentals outside of expensive agencies. Existing solutions had no contract enforcement, no identity verification, and no real-time coordination between parties.",
    solution:
      "Built SwiftRent as a Flutter mobile app backed by Firebase, paired with a PHP/REST API admin web panel. The platform supports dual-role users (owners and renters), a full verification pipeline, digitally signed rental contracts, real-time transaction tracking, and location-based browsing.",

    stack: ["Flutter", "Firebase", "PHP", "REST API", "Firestore", "Firebase Auth"],

    features: [
      "Dual-role system: users can list vehicles as owners and rent as tenants within the same account",
      "User verification gate: identity must be verified before renting or listing",
      "Feed-style browsing with search, filters, and save-to-assets (draft/wishlist)",
      "In-app messaging between renters and owners",
      "Digitally signed rental contracts with exportable hardcopy PDF",
      "Real-time transaction status tracking and personal KPI dashboard",
      "Location services integration for proximity-based listing discovery",
      "Mutual rating and review system post-transaction",
      "Customer support channel within the app",
      "Admin web panel: user approval, listing moderation, transaction management",
    ],

    highlights: [
      "Firebase Auth with custom claims enforcing role and verification status at the data layer",
      "Firestore security rules prevent unverified users from initiating transactions server-side, not just UI-gated",
      "Contract generation uses a structured data model; PDF export is deterministic and tamper-evident",
      "Real-time listeners on transaction documents; status updates propagate to both parties instantly",
      "Admin panel built on PHP REST API with JWT auth; completely decoupled from the mobile client",
      "Clean architecture on the Flutter side using a feature-first structure, with each domain isolated into its own data, domain, and presentation layers",
    ],
  },

  // ── PROJECT 2 ──────────────────────────────────────────────────────────────
  {
    id: "02",
    title: "Mieruka Board",
    subtitle: "Centralized KPI & Analytics Dashboard",
    category: "Web Application",

    images: [
      {
        src: "/images/projects/project2-departments.png",
        alt: "Mieruka Board department-level KPI dashboard with production metrics and charts",
        caption: "Department KPI Dashboard",
      },
      {
        src: "/images/projects/project2-ontime.png",
        alt: "Mieruka Board on-time vs delayed performance tracking chart",
        caption: "On-Time vs Delayed Performance",
      },
      {
        src: "/images/projects/project2-attendance.png",
        alt: "Mieruka Board perfect attendance KPI and HR metrics panel",
        caption: "Attendance & HR KPIs",
      },
    ],

    problem:
      "A manufacturing company was tracking department KPIs across disconnected spreadsheets and manual reports. There was no single view of performance across departments, making it difficult for management to identify bottlenecks or compare metrics in real time.",
    solution:
      "Built Mieruka Board as a centralized PHP/SQL web application that gives each department its own live dashboard. Production metrics, attendance, on-time delivery performance, and other KPIs are visualized using AmCharts and updated from a shared SQL backend.",

    stack: ["PHP", "MySQL", "AmCharts", "JavaScript", "SQL"],

    features: [
      "Dedicated dashboard per department, each team sees only their relevant KPIs",
      "Production performance metrics with trend visualization",
      "On-time vs delayed delivery tracking",
      "Perfect attendance KPI with period-based filtering",
      "Cross-department comparison views for management",
      "Chart-based data visualization using AmCharts (bar, line, pie, gauge)",
      "Period selectors for daily, weekly, monthly, and custom date ranges",
    ],

    highlights: [
      "SQL views and stored procedures isolate KPI calculations from the presentation layer",
      "AmCharts configured with dynamic data binding; charts re-render on filter change without a page reload",
      "Role-based access: department heads see only their scope; management sees aggregate views",
      "Indexed queries on time-series data ensure consistent load times across large historical datasets",
      "Schema designed for extensibility; adding a new KPI type requires only a new view with no structural changes",
    ],
  },

  // ── PROJECT 3 ──────────────────────────────────────────────────────────────
  {
    id: "03",
    title: "Order & Inventory Management System",
    subtitle: "POS and Stock Control for Retail",
    category: "Web Application",

    images: [
      {
        src: "/images/projects/project3-orders.png",
        alt: "Order and Inventory Management System POS interface for cashier with product search and cart",
        caption: "Point of Sale",
      },
      {
        src: "/images/projects/project3-stocks.png",
        alt: "Order and Inventory Management System inventory stocks view with low-stock indicators",
        caption: "Inventory & Stocks",
      },
      {
        src: "/images/projects/project3-dashboard.png",
        alt: "Order and Inventory Management System admin dashboard with sales history and analytics",
        caption: "Admin Dashboard",
      },
    ],

    problem:
      "A perfume retail business was processing orders manually with no reliable inventory tracking. Cashiers had no dedicated interface, stock levels were unknown until physically checked, and there was no transaction history for reconciliation.",
    solution:
      "Built a web-based Order & Inventory Management System with a POS interface for cashiers, real-time stock tracking, and a full admin dashboard. The system uses a PHP/REST API backend with an XML-based database and enforces role separation between admin and cashier.",

    stack: ["PHP", "REST API", "XML Database", "JavaScript"],

    features: [
      "Point-of-sale interface optimized for cashier workflow with product search, cart, and checkout",
      "Real-time inventory tracking with automatic stock deduction on sale",
      "Low-stock alerts and stock history log",
      "Order history with per-transaction detail and receipt generation",
      "Role-based access with two roles: Admin for full control and Cashier for POS only",
      "Admin dashboard with sales summary, top products, and date-range filtering",
      "Product management with the ability to add, edit, categorize, and archive items",
    ],

    highlights: [
      "XML serves as the persistence layer, structured with XPath queries and schema validation to enforce data integrity",
      "REST API design separates the data layer from the UI; cashier and admin interfaces consume the same endpoints",
      "Role enforcement at the API level ensures cashier tokens cannot access admin routes regardless of UI state",
      "Inventory deduction and order creation handled in a single atomic operation to prevent stock inconsistency",
      "Input validation and sanitization on all endpoints eliminates any direct XML injection surface",
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// SERVICES
// ─────────────────────────────────────────────────────────────────────────────
export const services = [
  {
    id: "01",
    title: "Web Application Development",
    description:
      "Backend-focused web systems built for reliability and growth. Whether it is an internal business tool, a client-facing platform, or an API layer, the architecture is designed to scale without accumulating technical debt.",
    items: [
      "Custom PHP web applications",
      "MySQL schema design and optimization",
      "Admin dashboards and reporting systems",
      "REST API development",
      "Role-based access control systems",
    ],
  },
  {
    id: "02",
    title: "Mobile App Development",
    description:
      "Cross-platform mobile applications built with Flutter and Firebase. Clean architecture from day one, not bolted on later. Apps are built to work offline, sync reliably, and handle real-world conditions.",
    items: [
      "Flutter iOS & Android applications",
      "Firebase backend integration",
      "Offline-first data architecture",
      "Real-time sync and push notifications",
      "Authentication and authorization flows",
    ],
  },
  {
    id: "03",
    title: "Backend & Database Architecture",
    description:
      "Structured, normalized database design paired with secure backend logic. The difference between a system that holds up under pressure and one that doesn't often comes down to the decisions made here.",
    items: [
      "Database schema design and normalization",
      "Query optimization and indexing strategy",
      "Authentication system implementation",
      "Security audit and input validation",
      "API design and documentation",
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// TECH STACK
// ─────────────────────────────────────────────────────────────────────────────
export const techStack = {
  Backend:  ["PHP", "MySQL", "REST API", "XML"],
  Frontend: ["HTML/CSS", "JavaScript", "Bootstrap", "AmCharts", "DataTables"],
  Mobile:   ["Flutter", "Dart", "Firebase Auth", "Firestore", "Firebase Storage"],
  Tools:    ["VS Code", "Git", "GitHub", "Figma", "Canva"],
};

// ─────────────────────────────────────────────────────────────────────────────
// DEVELOPMENT PROCESS
// ─────────────────────────────────────────────────────────────────────────────
export const process = [
  {
    step: "01",
    title: "Requirement Analysis",
    description:
      "Define the problem scope clearly. Identify user roles, core workflows, and success criteria before writing a single line of code.",
  },
  {
    step: "02",
    title: "System & Database Design",
    description:
      "Design the data model, entity relationships, and system architecture. Schema decisions made here prevent costly rewrites later.",
  },
  {
    step: "03",
    title: "UI Planning",
    description:
      "Map out user flows and interface structure. Focus on clarity and task efficiency so that screens match how users actually think.",
  },
  {
    step: "04",
    title: "Development",
    description:
      "Build features iteratively with clean, readable code. Security practices including validation, parameterized queries, and auth checks are applied from the start.",
  },
  {
    step: "05",
    title: "Testing",
    description:
      "Test against edge cases, not just happy paths. Validate inputs, stress-test queries, verify auth boundaries, and check for data integrity across flows.",
  },
  {
    step: "06",
    title: "Deployment",
    description:
      "Package for production with proper environment configuration, documentation, and a clear handoff. The system should be maintainable by someone other than me.",
  },
];
