// ─────────────────────────────────────────────────────────────────────────────
// PROJECT IMAGES
// ─────────────────────────────────────────────────────────────────────────────
// All project screenshots live in: /public/images/projects/
//
// HOW TO REPLACE A PLACEHOLDER:
//   1. Drop your screenshot into /public/images/projects/
//   2. Update the `src` filename in the images[] array below
//   3. The layout updates automatically — no other changes needed.
//
// NAMING CONVENTION (recommended):
//   project1-main.png      ← Featured image (shown large, shown first)
//   project1-dashboard.png ← Secondary thumbnail
//
// SUPPORTED FORMATS: .png  .jpg  .webp  .svg
// RECOMMENDED SIZE:  1200×700px (16:9) for main; 800×500px for thumbnails
// ─────────────────────────────────────────────────────────────────────────────

export const projects = [
  {
    id: "01",
    title: "SwiftRent: A Peer-to-Peer Car Rental Platform",
    category: "Mobile Application",

    // ── IMAGES ──────────────────────────────────────────────────────────────
    // For mobile apps, portrait screenshots (9:16) work best.
    // You can use a device frame mockup as your screenshot.
    images: [
      {
        src: "/images/projects/project1-main.png",
        alt: "SwiftRent app — main interface showing available cars for rent",
        caption: "Main Interface",
      },
      {
        src: "/images/projects/project1-login.png",
        alt: "SwiftRent app — login screen",
        caption: "Login",
      },
      {
        src: "/images/projects/project1-home.png",
        alt: "SwiftRent app — home screen with side bars and car listings",
        caption: "Home",
      },
      {
        src: "/images/projects/project1-assets.png",
        alt: "SwiftRent app — admin dashboard showing inventory and sales overview",
        caption: "Assets",
      },
      {
        src: "/images/projects/project1-listing.png",
        alt: "SwiftRent app — user management screen",
        caption: "Listing",
      },
      {
        src: "/images/projects/project1-find.png",
        alt: "SwiftRent app — branch management screen",
        caption: "Find",
      },
      {
        src: "/images/projects/project1-inquiry.png",
        alt: "SwiftRent app — user management screen",
        caption: "Inquiry",
      },
      {
        src: "/images/projects/project1-contract.png",
        alt: "SwiftRent app — branch management screen",
        caption: "Contract",
      },
    ],
    // ── END IMAGES ──────────────────────────────────────────────────────────

    problem:
      "A service company's field technicians had no reliable way to log job completions, capture client signatures, or access job details without a network connection.",
    solution:
      "Developed a Flutter mobile application backed by Firebase, with full offline capability. Job data syncs automatically when connectivity is restored.",
    stack: ["Flutter", "Firebase Firestore", "Firebase Auth", "Firebase Storage"],
    features: [
      "Offline-first architecture with local data persistence",
      "Real-time job assignment updates from dispatch",
      "Digital client signature capture with timestamp",
      "Photo documentation with cloud storage sync",
      "Push notifications for new assignments",
    ],
    highlights: [
      "Firestore offline persistence with manual conflict resolution",
      "Firebase Auth with custom claims for role enforcement",
      "Modular clean architecture (feature-first folder structure)",
      "Image compression before upload — 60% storage cost reduction",
    ],
  },
  {
    id: "02",
    title: "Order & Inventory Management System",
    category: "Web Application",

    // ── IMAGES ──────────────────────────────────────────────────────────────
    // The first image is the featured/hero image (shown largest).
    // Add or remove objects to control how many thumbnails appear.
    images: [
      {
        // Recommended: full dashboard view — the main admin panel
        src: "/images/projects/project2-main.png",
        alt: "Business Operations Dashboard — main admin panel showing inventory and sales overview",
        caption: "Admin Dashboard",
      },
      {
        // Replace this image with your actual project screenshot
        // Recommended: a report or chart-heavy screen
        src: "/images/projects/project2-dashboard.png",
        alt: "Business Operations Dashboard — sales report screen with data visualization",
        caption: "Sales Report",
      },
      {
        src: "/images/projects/project2-orders.png",
        alt: "Business Operations Dashboard — orders screen with data visualization",
        caption: "Orders",
      },
      {
        // Replace this image with your actual project screenshot
        // Recommended: full dashboard view — the main admin panel
        src: "/images/projects/project2-stocks.png",
        alt: "Business Operations Dashboard — main admin panel showing inventory and sales overview",
        caption: "Admin Dashboard",
      },
      {
        // Replace this image with your actual project screenshot
        // Recommended: a report or chart-heavy screen
        src: "/images/projects/project2-users.png",
        alt: "Business Operations Dashboard — user management screen",
        caption: "User Management",
      },
      {
        src: "/images/projects/project2-branch.png",
        alt: "Business Operations Dashboard — branch management screen",
        caption: "Branch Management",
      },
    ],
    // ── END IMAGES ──────────────────────────────────────────────────────────

    problem:
      "A mid-sized retail business was managing inventory, sales tracking, and staff scheduling across disconnected spreadsheets. Data inconsistencies were causing stockouts and payroll errors.",
    solution:
      "Built a centralized web-based operations dashboard with role-based access control, real-time inventory tracking, and automated report generation.",
    stack: ["PHP", "MySQL", "JavaScript", "Bootstrap"],
    features: [
      "Role-based access control (Admin, Manager, Staff)",
      "Inventory tracking with low-stock alerts",
      "Sales reporting with exportable CSV/PDF",
      "Staff scheduling and shift management",
      "Audit log for all data modifications",
    ],
    highlights: [
      "Normalized relational schema across 12 tables",
      "Parameterized queries throughout — zero SQL injection surface",
      "Session-based auth with CSRF token validation",
      "Sub-200ms page load with indexed query optimization",
    ],
  },
  {
    id: "03",
    title: "Multi-Tenant Appointment System",
    category: "Web Application",

    // ── IMAGES ──────────────────────────────────────────────────────────────
    images: [
      {
        // Replace this image with your actual project screenshot
        // Recommended: the patient-facing booking portal
        src: "/images/projects/project3-main.svg",
        alt: "Multi-Tenant Appointment System — patient self-booking portal showing available appointment slots",
        caption: "Patient Booking Portal",
      },
      {
        // Replace this image with your actual project screenshot
        // Recommended: branch admin panel or analytics dashboard
        src: "/images/projects/project3-admin.svg",
        alt: "Multi-Tenant Appointment System — branch admin panel with scheduling and analytics",
        caption: "Branch Admin Panel",
      },
    ],
    // ── END IMAGES ──────────────────────────────────────────────────────────

    problem:
      "A clinic network needed a single platform where multiple branches could manage patient appointments independently, without access to each other's data.",
    solution:
      "Architected a multi-tenant appointment system with branch-level data isolation, patient self-booking, and an admin panel for scheduling management.",
    stack: ["PHP", "MySQL", "REST API", "JavaScript"],
    features: [
      "Branch-scoped data isolation at the database level",
      "Patient self-registration and appointment booking",
      "SMS/email appointment reminders",
      "Admin dashboard per branch with analytics",
      "Exportable patient and appointment records",
    ],
    highlights: [
      "Tenant ID enforced at every query — no cross-tenant data leak possible",
      "RESTful API with JWT authentication",
      "Indexed scheduling queries — handles 10,000+ records without degradation",
      "Input sanitization and server-side validation on all endpoints",
    ],
  },
];

export const services = [
  {
    id: "01",
    title: "Web Application Development",
    description:
      "Backend-focused web systems built for reliability and growth. Whether it's an internal business tool, a client-facing platform, or an API layer — the architecture is designed to scale without accumulating technical debt.",
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
      "Cross-platform mobile applications built with Flutter and Firebase. Clean architecture from day one — not bolted on later. Apps are built to work offline, sync reliably, and handle real-world conditions.",
    items: [
      "Flutter mobile applications",
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

export const techStack = {
  Backend: ["PHP", "MySQL", "REST API"],
  Frontend: ["HTML/CSS", "JavaScript", "Bootstrap"],
  Mobile: ["Flutter", "Dart", "Firebase Auth", "Firestore", "Firebase Storage"],
  Tools: ["VS Code", "Git", "GitHub", "Figma", "Canva"],
};

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
      "Map out user flows and interface structure. Focus on clarity and task efficiency — screens should match how users actually think.",
  },
  {
    step: "04",
    title: "Development",
    description:
      "Build features iteratively with clean, readable code. Security practices — validation, parameterized queries, auth checks — are applied from the start.",
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
