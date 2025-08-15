import { useRef, useState, useEffect, useId } from "react";
import { createPortal } from "react-dom";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
  useMotionTemplate,
  useTime,
} from "framer-motion";
import {
  Mail, Phone, MapPin, Github, Linkedin, Sparkles, Briefcase, GraduationCap,
  Languages as LanguagesIcon, Wrench, Atom, Braces, FileCode, Coffee, Triangle,
  Leaf, CircleDot, Boxes, Database, GitBranch, TestTube, Layers, Workflow,
  Network, BookOpenCheck, Gauge, Waves, ArrowDown, ExternalLink, Shield, Server,
  Globe, Terminal as TerminalIcon,
} from "lucide-react";

/*
  KBJ Resume — Polished & Dynamic Edition
  - FIX: Replaced horizontal timeline with a clean, vertical list for the Experience section to fix layout issues.
  - Retains: Animated nav buttons, Matrix transition, CLI mode, Bento skills grid, parallax background.
*/

// ================== ASSETS ==================
import Myavatar from './assets/profile.jpg';

const avatarSrc = Myavatar; 
// ================== BILINGUAL DATA ==================
const data = {
  fr: {
    navLinks: [ { href: "#about", label: "À propos" }, { href: "#experience", label: "Expérience" }, { href: "#freelance", label: "Freelance" }, { href: "#skills", label: "Compétences" }, { href: "#education", label: "Éducation" }, { href: "#contact", label: "Contact" } ],
    profile: { name: "Khalil Ben Jammaa", title: "Ingénieur Logiciel Full-Stack", availability: "Disponible pour de nouvelles opportunités", location: "Tunis, Tunisie", phone: "+216 29 057 549", email: "khalil.ben.jammaa@gmail.com", linkedin: "https://www.linkedin.com/in/ben-jammaa-khalil", github: "https://github.com/khalilbenjammaa", summary: "Collaboratif et orienté produit, je conçois des systèmes fiables de bout en bout (Spring Boot/CQRS/Camunda) avec des interfaces performantes (Angular/React/Next).", about: "Je construis des produits robustes et élégants, du backend (Spring Boot, CQRS, Camunda) jusqu’au frontend (Angular/React/Next). J’optimise la qualité (tests/sonar), les performances et la DX UI (RxJS, composants réutilisables, micro‑frontends).", highlights: ["Java 17", "Spring Boot", "Angular 15", "React / Next.js", "TypeScript", "MongoDB / PostgreSQL", "Docker", "Camunda 8", "Axon / CQRS", "RxJS", "JUnit / Mockito", "SonarQube"] },
    experience: [ { company: "Be‑softilys", role: "Ingénieur en développement Full‑stack", location: "Tunis, Tunisie", period: "Juin 2023 – Présent", work: ["Plateforme ‘Décès’ pour AG2R La Mondiale (gestion sinistres, prestations, indemnisation).", "Microservices Spring Boot, Axon (CQRS/Event Sourcing), Camunda pour l’orchestration, APIs REST.", "Architecture événementielle; tracing, corrélation, résilience.", "SPA micro‑frontend avec Angular + RxJS; qualité: JUnit/Sonar, CI.", "Automatisation des tests et couverture sur les flux critiques."], architecture: ["Domain‑Driven Design avec contextes délimités (Bounded Contexts).", "Axon: Command/Query Bus, Sagas pour coordination inter‑services.", "Event Sourcing: relecture des agrégats, projections pour vues requêtables.", "BPMN Camunda: orchestration longue durée, compensation, timers.", "Observabilité: logs corrélés, métriques, tableaux de bord Grafana.", "Sécurité: tokens JWT, rôles/permissions, validation input (Bean Validation).", "CI/CD: qualité SonarQube, tests JUnit/Mockito, revues PR."], stack: ["Java", "Spring Boot", "Angular", "Camunda", "Axon", "MongoDB", "Docker", "SonarQube"] }, { company: "Be‑softilys", role: "Ingénieur en développement Front‑End", location: "Tunis, Tunisie", period: "Jan. 2021 – Juin 2023", work: ["Application de location d’immeubles sociaux (ALS, France).", "Migration Angular 6 → 15 (standalone), lazy‑loading, AuthGuard, libs réutilisables.", "UI responsive iPad/Mobile/Web (SCSS, Flexbox) et accessibilité de base."], architecture: ["Micro‑frontends modulaires, librairies partagées et design system.", "Gestion d’état réactive (RxJS) et communication inter‑modules.", "Sécurité: guards, interceptors, gestion des tokens.", "Optimisation: budgets, preloading stratégies, split par routes."], stack: ["Angular", "SCSS", "Azure DevOps"] }, { company: "TUNISAIR", role: "Stage fin d’études — Full‑stack B2B", location: "Tunis, Tunisie", period: "Fév. 2021 – Juil. 2021", work: ["Plateforme B2B: contrats, billets, devis, factures, promotions.", "Back Symfony + MySQL; Front Angular (formulaires métiers, dashboard)."], architecture: ["Architecture n‑tiers: API REST Symfony, front Angular typé.", "Sécurité utilisateurs/partenaires, rôles et audit.", "Intégrations: paiement et génération de documents."], stack: ["Symfony", "Angular", "MySQL"] } ],
    freelance: [ { company: "Certicar", role: "Ingénieur Full‑stack (Freelance)", period: "Déc. 2023 – Fév. 2024", details: ["App de gestion pour garages: ouvriers, managers, clients, véhicules, factures.", "Next.js (SSR) from scratch, RxJS pour l’état, Tailwind UI, auth sécurisée.", "Optimisations SEO & performances (Lighthouse >90)."], architecture: ["Next.js SSR/ISR, séparation public/admin, routing sécurisé.", "RBAC: rôles/permissions multi‑profils (ouvrier, manager, admin).", "Validation stricte des schémas (DTO) et rate‑limiting basique."], stack: ["Next.js", "TypeScript", "MongoDB", "REST", "RxJS", "Tailwind"] }, { company: "TakiJob", role: "Ingénieur Front‑End (Freelance)", period: "Juin 2023 – Sept. 2023", details: ["Refonte prise de rendez‑vous (WordPress → Symfony + React).", "Rôles & permissions, formulaires réactifs, back‑office UX."], architecture: ["SPA React modulaire, formulaires typés, validations.", "Back Symfony exposant des APIs sécurisées."], stack: ["React", "MongoDB", "SCSS"] } ],
    skills: [ { group: "Langages", area: "col-span-2 row-span-1", items: [{name: "Java", description: "Langage robuste et orienté objet pour les systèmes backend à grande échelle."}, {name: "TypeScript", description: "Sur-ensemble typé de JavaScript pour des applications front-end et back-end fiables."}, {name: "JavaScript", description: "Langage dynamique pour des interfaces utilisateur interactives et des applications web modernes."}, {name: "PHP", description: "Langage de script côté serveur pour le développement web, notamment avec des frameworks comme Symfony."}, {name: "C++", description: "Langage performant pour les applications système et les logiciels critiques."}, {name: "PL/SQL", description: "Langage procédural d'Oracle pour la gestion de bases de données complexes."}] }, { group: "Frameworks & Tech", area: "col-span-3 row-span-2", items: [{name: "Spring Boot", description: "Framework pour créer rapidement des microservices Java autonomes et prêts pour la production."}, {name: "Angular", description: "Plateforme complète pour construire des applications web single-page (SPA) complexes."}, {name: "React", description: "Bibliothèque JavaScript pour construire des interfaces utilisateur déclaratives et basées sur des composants."}, {name: "Next.js", description: "Framework React pour la production, offrant rendu côté serveur (SSR) et génération de sites statiques (SSG)."}, {name: "Hibernate", description: "Framework ORM pour la persistance des données en Java, simplifiant l'accès aux bases de données."}, {name: "JUnit", description: "Framework de test unitaire standard pour les applications Java."}, {name: "Docker", description: "Plateforme de conteneurisation pour packager et déployer des applications de manière cohérente."}, {name: "Camunda", description: "Moteur de workflow et de décision pour l'orchestration de processus métier (BPMN)."}, {name: "Axon", description: "Framework pour implémenter les architectures CQRS, Event Sourcing et DDD en Java."}, {name: "RxJS", description: "Bibliothèque de programmation réactive pour gérer les flux de données asynchrones."}] }, { group: "Bases de données", area: "col-span-2 row-span-1", items: [{name: "Oracle", description: "Système de gestion de base de données relationnelle d'entreprise."}, {name: "PostgreSQL", description: "SGBDR open-source puissant et extensible."}, {name: "MySQL", description: "SGBDR open-source populaire, souvent utilisé pour les applications web."}, {name: "Redis", description: "Base de données en mémoire, utilisée comme cache et courtier de messages."}, {name: "MongoDB", description: "Base de données NoSQL orientée document, flexible et scalable."}] }, { group: "Architecture & Patterns", area: "col-span-2 row-span-1", items: [{name: "CQRS", description: "Pattern de ségrégation des responsabilités de commande et de requête pour des systèmes complexes."}, {name: "Event-Driven", description: "Architecture basée sur la production, la détection et la consommation d'événements."}, {name: "MVVM", description: "Pattern d'architecture UI séparant la logique métier de l'interface utilisateur."}, {name: "MVC", description: "Pattern d'architecture classique séparant le modèle, la vue et le contrôleur."}, {name: "SOLID", description: "Principes de conception pour un code maintenable et extensible."}, {name: "TDD", description: "Développement piloté par les tests pour un code de haute qualité."}] }, { group: "Outils", area: "col-span-3 row-span-1", items: [{name: "Git", description: "Système de contrôle de version distribué pour le suivi des modifications de code."}, {name: "GitLab", description: "Plateforme DevOps complète pour l'ensemble du cycle de vie logiciel."}, {name: "Bitbucket", description: "Gestion de code source basée sur Git, avec intégration CI/CD."}, {name: "VS Code", description: "Éditeur de code léger et puissant avec un vaste écosystème d'extensions."}, {name: "IntelliJ", description: "IDE Java avancé pour le développement d'applications d'entreprise."}, {name: "Postman", description: "Plateforme de collaboration pour le développement et le test d'API."}] } ],
    education: [ { school: "ESPRIT — École Supérieure Privée d’Ingénierie et de Technologie", degree: "Diplôme d’ingénieur en informatique (Génie logiciel)", period: "Sept. 2021 – Mai 2025", location: "Tunis, Tunisie" }, { school: "Institut Supérieur de Gestion", degree: "Licence fondamentale en informatique de gestion", period: "Sept. 2018 – Juin 2021", location: "Tunis, Tunisie" } ],
    extras: { leadership: [ { title: "Chef de Projet", org: "ENACTUS ISG Tunis", period: "Jan. 2019 – Mai 2021" }, { title: "Membre", org: "Croissant Rouge Omrane Supérieur", period: "Sept. 2018 – Déc. 2022" } ], languages: [{ name: "Français", level: "Courant" }, { name: "Anglais", level: "Courant" }] },
    sectionTitles: { about: "À propos", experience: "Expérience", freelance: "Freelance & Missions", skills: "Compétences — Outils & Langages", education: "Éducation & Langues", contact: "Contact", keyAchievements: "Réalisations clés", architecture: "Architecture & Design", stack: "Stack", details: "Détails", coursework: "Parcours", courseworkDetail: "Parcours détaillé", languagesAndNetworks: "Langues & Réseaux", contactPrompt: "Discutons de vos besoins produit 💬" },
    terminal: { welcome: "CV-CLI v14.1.5 . Tapez 'help' pour la liste des commandes.", help: "Commandes disponibles:\n- 'show [section]' (ex: 'show skills')\n- 'show experience [numéro]' (ex: 'show experience 1')\n- 'contact --[methode]' (ex: 'contact --email')\n- 'lang [fr|en]'\n- 'clear'\n- 'exit'", unknown: "Commande non reconnue. Tapez 'help'.", sections: {about: "À propos", experience: "Expérience", freelance: "Freelance", skills: "Compétences", education: "Éducation", contact: "Contact"} }
  },
  en: {
    navLinks: [ { href: "#about", label: "About" }, { href: "#experience", label: "Experience" }, { href: "#freelance", label: "Freelance" }, { href: "#skills", label: "Skills" }, { href: "#education", label: "Education" }, { href: "#contact", label: "Contact" } ],
    profile: { name: "Khalil Ben Jammaa", title: "Full-Stack Software Engineer", availability: "Available for new opportunities", location: "Tunis, Tunisia", phone: "+216 29 057 549", email: "khalil.ben.jammaa@gmail.com", linkedin: "https://www.linkedin.com/in/ben-jammaa-khalil", github: "https://github.com/khalilbenjammaa", summary: "A collaborative, product-oriented engineer, I design reliable end-to-end systems (Spring Boot/CQRS/Camunda) with high-performance interfaces (Angular/React/Next).", about: "I build robust and elegant products, from the backend (Spring Boot, CQRS, Camunda) to the frontend (Angular/React/Next). I optimize for quality (tests/Sonar), performance, and UI/DX (RxJS, reusable components, micro-frontends).", highlights: ["Java 17", "Spring Boot", "Angular 15", "React / Next.js", "TypeScript", "MongoDB / PostgreSQL", "Docker", "Camunda 8", "Axon / CQRS", "RxJS", "JUnit / Mockito", "SonarQube"] },
    experience: [ { company: "Be‑softilys", role: "Full-Stack Development Engineer", location: "Tunis, Tunisia", period: "June 2023 – Present", work: ["'Claims' platform for AG2R La Mondiale (claims management, benefits, compensation).", "Spring Boot microservices, Axon (CQRS/Event Sourcing), Camunda for orchestration, REST APIs.", "Event-driven architecture; tracing, correlation, resilience.", "Micro-frontend SPA with Angular + RxJS; quality: JUnit/Sonar, CI.", "Test automation and coverage on critical flows."], architecture: ["Domain-Driven Design with Bounded Contexts.", "Axon: Command/Query Bus, Sagas for inter-service coordination.", "Event Sourcing: aggregate replay, projections for queryable views.", "BPMN Camunda: long-running orchestration, compensation, timers.", "Observability: correlated logs, metrics, Grafana dashboards.", "Security: JWT tokens, roles/permissions, input validation (Bean Validation).", "CI/CD: SonarQube quality gates, JUnit/Mockito tests, PR reviews."], stack: ["Java", "Spring Boot", "Angular", "Camunda", "Axon", "MongoDB", "Docker", "SonarQube"] }, { company: "Be‑softilys", role: "Front-End Development Engineer", location: "Tunis, Tunisia", period: "Jan 2021 – June 2023", work: ["Social housing rental application (ALS, France).", "Migrated Angular 6 → 15 (standalone), lazy-loading, AuthGuard, reusable libraries.", "Responsive UI for iPad/Mobile/Web (SCSS, Flexbox) and basic accessibility."], architecture: ["Modular micro-frontends, shared libraries, and design system.", "Reactive state management (RxJS) and inter-module communication.", "Security: guards, interceptors, token management.", "Optimization: budgets, preloading strategies, route-splitting."], stack: ["Angular", "SCSS", "Azure DevOps"] }, { company: "TUNISAIR", role: "End-of-studies Internship — B2B Full-stack", location: "Tunis, Tunisia", period: "Feb 2021 – July 2021", work: ["B2B platform: contracts, tickets, quotes, invoices, promotions.", "Symfony backend + MySQL; Angular frontend (business forms, dashboard)."], architecture: ["N-tier architecture: Symfony REST API, typed Angular frontend.", "User/partner security, roles, and auditing.", "Integrations: payment and document generation."], stack: ["Symfony", "Angular", "MySQL"] } ],
    freelance: [ { company: "Certicar", role: "Full-Stack Engineer (Freelance)", period: "Dec 2023 – Feb 2024", details: ["Management app for garages: workers, managers, clients, vehicles, invoices.", "Next.js (SSR) from scratch, RxJS for state, Tailwind UI, secure auth.", "SEO & performance optimizations (Lighthouse >90)."], architecture: ["Next.js SSR/ISR, public/admin separation, secure routing.", "RBAC: multi-profile roles/permissions (worker, manager, admin).", "Strict schema validation (DTO) and basic rate-limiting."], stack: ["Next.js", "TypeScript", "MongoDB", "REST", "RxJS", "Tailwind"] }, { company: "TakiJob", role: "Front-End Engineer (Freelance)", period: "June 2023 – Sept 2023", details: ["Appointment booking redesign (WordPress → Symfony + React).", "Roles & permissions, reactive forms, UX-focused back-office."], architecture: ["Modular React SPA, typed forms, validations.", "Symfony backend exposing secure APIs."], stack: ["React", "MongoDB", "SCSS"] } ],
    skills: [ { group: "Languages", area: "col-span-2 row-span-1", items: [{name: "Java", description: "Robust, object-oriented language for large-scale backend systems."}, {name: "TypeScript", description: "Typed superset of JavaScript for reliable front-end and back-end applications."}, {name: "JavaScript", description: "Dynamic language for interactive user interfaces and modern web applications."}, {name: "PHP", description: "Server-side scripting language for web development, especially with frameworks like Symfony."}, {name: "C++", description: "High-performance language for system applications and critical software."}, {name: "PL/SQL", description: "Oracle's procedural language for managing complex databases."}] }, { group: "Frameworks & Tech", area: "col-span-3 row-span-2", items: [{name: "Spring Boot", description: "Framework for rapidly creating stand-alone, production-grade Java microservices."}, {name: "Angular", description: "Comprehensive platform for building complex single-page web applications (SPAs)."}, {name: "React", description: "JavaScript library for building declarative, component-based user interfaces."}, {name: "Next.js", description: "Production-ready React framework offering Server-Side Rendering (SSR) and Static Site Generation (SSG)."}, {name: "Hibernate", description: "ORM framework for Java data persistence, simplifying database access."}, {name: "JUnit", description: "Standard unit testing framework for Java applications."}, {name: "Docker", description: "Containerization platform for packaging and deploying applications consistently."}, {name: "Camunda", description: "Workflow and decision engine for orchestrating business processes (BPMN)."}, {name: "Axon", description: "Framework for implementing CQRS, Event Sourcing, and DDD architectures in Java."}, {name: "RxJS", description: "Reactive programming library for managing asynchronous data streams."}] }, { group: "Databases", area: "col-span-2 row-span-1", items: [{name: "Oracle", description: "Enterprise-grade relational database management system."}, {name: "PostgreSQL", description: "Powerful, open-source, and extensible RDBMS."}, {name: "MySQL", description: "Popular open-source RDBMS, often used for web applications."}, {name: "Redis", description: "In-memory data store, used as a cache and message broker."}, {name: "MongoDB", description: "Flexible and scalable document-oriented NoSQL database."}] }, { group: "Architecture & Patterns", area: "col-span-2 row-span-1", items: [{name: "CQRS", description: "Pattern for segregating command and query responsibilities in complex systems."}, {name: "Event-Driven", description: "Architecture based on the production, detection, and consumption of events."}, {name: "MVVM", description: "UI architecture pattern separating business logic from the user interface."}, {name: "MVC", description: "Classic architecture pattern separating the model, view, and controller."}, {name: "SOLID", description: "Design principles for maintainable and extensible code."}, {name: "TDD", description: "Test-Driven Development for high-quality code."}] }, { group: "Tools", area: "col-span-3 row-span-1", items: [{name: "Git", description: "Distributed version control system for tracking code changes."}, {name: "GitLab", description: "Complete DevOps platform for the entire software lifecycle."}, {name: "Bitbucket", description: "Git-based source code management with CI/CD integration."}, {name: "VS Code", description: "Lightweight and powerful code editor with a vast extension ecosystem."}, {name: "IntelliJ", description: "Advanced Java IDE for enterprise application development."}, {name: "Postman", description: "Collaboration platform for API development and testing."}] } ],
    education: [ { school: "ESPRIT — Higher Private School of Engineering and Technology", degree: "Computer Science Engineering Degree (Software Engineering)", period: "Sept 2021 – May 2025", location: "Tunis, Tunisia" }, { school: "Higher Institute of Management", degree: "Bachelor's Degree in Management Computing", period: "Sept 2018 – June 2021", location: "Tunis, Tunisia" } ],
    extras: { leadership: [ { title: "Project Manager", org: "ENACTUS ISG Tunis", period: "Jan 2019 – May 2021" }, { title: "Member", org: "Red Crescent Omrane Supérieur", period: "Sept 2018 – Dec 2022" } ], languages: [{ name: "French", level: "Fluent" }, { name: "English", level: "Fluent" }] },
    sectionTitles: { about: "About", experience: "Experience", freelance: "Freelance & Projects", skills: "Skills — Tools & Languages", education: "Education & Languages", contact: "Contact", keyAchievements: "Key Achievements", architecture: "Architecture & Design", stack: "Stack", details: "Details", coursework: "Education", courseworkDetail: "Detailed Education", languagesAndNetworks: "Languages & Networks", contactPrompt: "Let's discuss your product needs 💬" },
    terminal: { welcome: "Welcome : CV-CLI v14.1.5 Type 'help' for a list of commands.", help: "Available commands:\n- 'show [section]' (e.g., 'show skills')\n- 'show experience [number]' (e.g., 'show experience 1')\n- 'contact --[method]' (e.g., 'contact --email')\n- 'lang [fr|en]'\n- 'clear'\n- 'exit'", unknown: "Command not recognized. Type 'help'.", sections: {about: "About", experience: "Experience", freelance: "Freelance", skills: "Skills", education: "Education", contact: "Contact"} }
  }
};

// ================== ICON MAP ==================
const ICONS = { Java: Coffee, TypeScript: FileCode, JavaScript: Braces, React: Atom, "Next.js": CircleDot, Angular: Triangle, "Spring Boot": Leaf, Docker: Boxes, MongoDB: Leaf, PostgreSQL: Database, MySQL: Database, Redis: Database, Oracle: Database, Git: GitBranch, GitLab: GitBranch, Bitbucket: GitBranch, RxJS: Waves, JUnit: TestTube, Hibernate: Layers, Camunda: Workflow, Axon: Network, Swagger: BookOpenCheck, Grafana: Gauge, SonarQube: Waves, CQRS: Network, "Event-Driven": Network, MVVM: Layers, MVC: Layers, SOLID: Layers, TDD: TestTube, "VS Code": FileCode, IntelliJ: FileCode, Postman: Mail, SoapUI: Mail };

const cn = (...c) => c.filter(Boolean).join(" ");

// ================== ANIMATION VARIANTS ==================
const containerVariants = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const itemVariants = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } } };

// ================== EFFECTS & COMPONENTS ==================
function useParallax(mult = 0.25) {
  const { scrollY } = useScroll();
  return useTransform(scrollY, [0, 1200], [0, 1200 * mult]);
}

function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 20, mass: 0.4 });
  return <motion.div style={{ scaleX }} className="fixed left-0 top-0 z-[60] h-1 w-full origin-left bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-amber-300" />;
}

function ParallaxBackground() {
  const { scrollY } = useScroll();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e) => { mouseX.set(e.clientX); mouseY.set(e.clientY); };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const parallaxX = useSpring(useTransform(mouseX, [0, typeof window !== 'undefined' ? window.innerWidth : 0], [-50, 50]), { stiffness: 80, damping: 20 });
  const parallaxY = useSpring(useTransform(mouseY, [0, typeof window !== 'undefined' ? window.innerHeight : 0], [-50, 50]), { stiffness: 80, damping: 20 });
  const y1 = useTransform(scrollY, [0, 1200], [0, 300]);
  const y2 = useTransform(scrollY, [0, 1200], [0, 600]);
  const y3 = useTransform(scrollY, [0, 1200], [0, 900]);

  return (
    <div className="pointer-events-none fixed inset-0 -z-20 overflow-hidden">
      <div className="absolute inset-0 bg-[#070810]" />
      <motion.div style={{ y: y1, x: parallaxX, translateY: "-50%" }} className="absolute top-1/4 -left-24 h-[34rem] w-[34rem] rounded-full blur-3xl bg-cyan-500/30" />
      <motion.div style={{ y: y2, x: parallaxX, translateY: parallaxY }} className="absolute top-1/2 -right-24 h-[34rem] w-[34rem] rounded-full blur-3xl bg-fuchsia-500/25" />
      <motion.div style={{ y: y3, x: parallaxY }} className="absolute bottom-[-8rem] left-1/3 h-[28rem] w-[28rem] rounded-full blur-3xl bg-amber-400/20" />
    </div>
  );
}

// ================== PRIMITIVES ==================
const fadeIn = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } };

function Section({ id, title, icon: Icon, children, className }) {
  return (
    <section id={id} className={cn("relative mx-auto max-w-6xl px-6 py-16", className)}>
      <motion.h2 initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={fadeIn} className="mb-8 flex items-center gap-3 text-2xl font-semibold tracking-tight text-white">
        {Icon ? <Icon className="h-6 w-6 text-cyan-300" /> : null}
        <span className="bg-gradient-to-r from-cyan-300 via-fuchsia-300 to-amber-200 bg-clip-text text-transparent">{title}</span>
      </motion.h2>
      {children}
    </section>
  );
}

function Badge({ children, className }) {
  return <span className={cn("rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/80 shadow-[0_0_12px_rgba(34,211,238,0.35)]", className)}>{children}</span>;
}

// ================== MotionGlowCard (summary + detail) ==================
function MotionGlowCard({ summary, detail, className, variants }) {
  const ref = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useState(false);
  const layoutId = useId();

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-100, 100], [8, -8]), { stiffness: 200, damping: 20 });
  const ry = useSpring(useTransform(mx, [-100, 100], [-8, 8]), { stiffness: 200, damping: 20 });
  const px = useTransform(mx, [-150, 150], [0, 100]);
  const py = useTransform(my, [-150, 150], [0, 100]);
  const spotlight = useMotionTemplate`radial-gradient(360px circle at ${px}% ${py}%, rgba(34,211,238,0.18), transparent 42%)`;

  function onMouseMove(e) {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set(e.clientX - r.left - r.width / 2);
    my.set(e.clientY - r.top - r.height / 2);
  }

  function onRootClick(e) {
    if (e.target.closest("a, button, input, textarea, select, [data-no-focus]")) return;
    setActive(true);
  }

  useEffect(() => {
    if (!active) return;
    const onKey = (ev) => ev.key === "Escape" && setActive(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [active]);

  const baseCard = cn("relative rounded-2xl border border-white/10 bg-white/[0.035] p-6 backdrop-blur-sm transition-colors", "hover:bg-white/[0.055]", "shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_20px_60px_rgba(0,0,0,0.45),inset_0_0_24px_rgba(34,211,238,0.04)]", className);

  return (
    <>
      <motion.div ref={ref} layoutId={layoutId} onMouseMove={onMouseMove} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onClick={onRootClick} style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d", cursor: "zoom-in" }} className={baseCard} variants={variants}>
        <motion.div aria-hidden style={{ opacity: hovered ? 1 : 0, background: spotlight }} className="pointer-events-none absolute inset-0 rounded-2xl" />
        <motion.div aria-hidden animate={{ opacity: hovered ? 1 : 0 }} transition={{ duration: 0.25 }} className="pointer-events-none absolute -inset-px rounded-2xl blur-[2px] bg-[conic-gradient(from_0deg,rgba(34,211,238,0.45),rgba(99,102,241,0.35),rgba(251,191,36,0.35),rgba(34,211,238,0.45))]" style={{ boxShadow: hovered ? "0 0 18px rgba(168,85,247,0.22), 0 0 36px rgba(34,211,238,0.18)" : "none" }} />
        <motion.div aria-hidden animate={{ boxShadow: hovered ? "0 0 32px 5px rgba(168,85,247,0.18)" : "0 0 0 0 rgba(0,0,0,0)" }} transition={{ type: "spring", stiffness: 100, damping: 20 }} className="pointer-events-none absolute inset-0 -z-10 rounded-2xl" />
        <div style={{ transform: "translateZ(24px)" }}>{summary}</div>
      </motion.div>

      {createPortal(
        <AnimatePresence>
          {active && (
            <motion.div key="focus" className="fixed inset-0 z-[80] flex items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="absolute inset-0 bg-black/50 backdrop-blur-md" onClick={() => setActive(false)} />
              <motion.div layoutId={layoutId} onClick={() => setActive(false)} transition={{ type: "spring", stiffness: 260, damping: 26 }} className={cn(baseCard, "pointer-events-auto w-full max-w-4xl max-h-[90vh] overflow-hidden cursor-zoom-out")} style={{ transformStyle: "preserve-3d" }}>
                <div aria-hidden className="pointer-events-none absolute -inset-px rounded-2xl opacity-65 blur-[2px] bg-[conic-gradient(from_0deg,rgba(34,211,238,0.55),rgba(99,102,241,0.45),rgba(251,191,36,0.4),rgba(34,211,238,0.55))]" />
                <div className="relative z-10 h-full overflow-y-auto p-2 no-scrollbar">{detail}</div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}

function IconBadge({ label }) {
  const Icon = ICONS[label] || Sparkles;
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/25 bg-cyan-400/10 px-3 py-1 text-xs text-cyan-100">
      <Icon className="h-3.5 w-3.5" />
      <span>{label}</span>
    </span>
  );
}

// ================== NAV ==================
function Nav({ language, setLanguage, navLinks, onTerminalToggle }) {
  const toggleLanguage = () => setLanguage(lang => lang === 'fr' ? 'en' : 'fr');
  
  return (
    <div className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/40 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <div className="flex items-center gap-2">
            <motion.button whileHover={{ scale: 1.1, rotate: 5, transition: { type: 'spring', stiffness: 300 } }} whileTap={{ scale: 0.9 }} onClick={toggleLanguage} className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm font-semibold text-white transition-colors hover:bg-white/20">
                <Globe className="h-4 w-4" />
                {language === 'fr' ? 'EN' : 'FR'}
            </motion.button>
            <motion.button whileHover={{ scale: 1.1, rotate: -5, transition: { type: 'spring', stiffness: 300 } }} whileTap={{ scale: 0.9 }} onClick={onTerminalToggle} className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 p-2 text-sm font-semibold text-white transition-colors hover:bg-white/20">
                <TerminalIcon className="h-4 w-4" />
            </motion.button>
        </div>
        <nav className="flex flex-wrap items-center gap-x-1 gap-y-2 justify-end">
          {navLinks.map((l) => (
            <motion.a 
              key={l.href} 
              href={l.href} 
              className="relative rounded-full px-3 py-1 text-sm text-white/70 transition-colors hover:text-white"
              whileHover="hover"
              initial="rest"
              animate="rest"
            >
              {l.label}
              <motion.div 
                className="absolute bottom-0 left-0 w-full h-0.5 bg-cyan-300"
                variants={{
                  rest: { scaleX: 0, originX: 0.5 },
                  hover: { scaleX: 1, originX: 0.5, transition: { duration: 0.3, ease: "easeOut" } }
                }}
              />
            </motion.a>
          ))}
        </nav>
      </div>
    </div>
  );
}

// ================== TERMINAL MODE ==================
function Terminal({ currentData, setLanguage, exitTerminal }) {
    const [history, setHistory] = useState([ { type: 'output', content: currentData.terminal.welcome } ]);
    const [input, setInput] = useState('');
    const inputRef = useRef(null);
    const time = useTime();
    const scanline = useTransform(time, [0, 2000], [0, 100], { clamp: false });

    const handleCommand = (command) => {
        const parts = command.toLowerCase().split(' ');
        const cmd = parts[0];
        const arg = parts[1];
        let output = { type: 'output', content: currentData.terminal.unknown };

        if (cmd === 'help') output.content = currentData.terminal.help;
        if (cmd === 'clear') return setHistory([{ type: 'output', content: currentData.terminal.welcome }]);
        if (cmd === 'exit') return exitTerminal();
        if (cmd === 'contact') {
            if (arg === '--email') output.content = `Email: ${currentData.profile.email}`;
            else if (arg === '--phone') output.content = `Phone: ${currentData.profile.phone}`;
            else output.content = `Email: ${currentData.profile.email}\nPhone: ${currentData.profile.phone}\nLinkedIn: ${currentData.profile.linkedin}`;
        }
        if (cmd === 'show') {
            const sectionKey = Object.keys(currentData.terminal.sections).find(key => key.startsWith(arg));
            if (sectionKey === 'experience' && parts[2]) {
                const index = parseInt(parts[2], 10) - 1;
                if (index >= 0 && index < currentData.experience.length) {
                    output.content = JSON.stringify(currentData.experience[index], null, 2);
                } else {
                    output.content = `Error: Experience item ${parts[2]} not found.`;
                }
            } else if (sectionKey) {
                const sectionData = currentData[sectionKey];
                output.content = JSON.stringify(sectionData, null, 2);
            }
        }
        if (cmd === 'lang') {
            if (['fr', 'en'].includes(arg)) {
                setLanguage(arg);
                output.content = `Language set to ${arg}`;
            } else {
                output.content = "Unknown language. Use 'fr' or 'en'.";
            }
        }

        setHistory(h => [...h, { type: 'input', content: command }, output]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!input.trim()) return;
        handleCommand(input.trim());
        setInput('');
    };

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    return (
        <div className="fixed inset-0 z-[100] bg-black font-mono text-green-400 p-4" onClick={() => inputRef.current?.focus()}>
            <div className="absolute inset-0 pointer-events-none opacity-10 bg-repeat" style={{backgroundImage: 'linear-gradient(rgba(0,255,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,0,0.1)_1px,transparent_1px)', backgroundSize: '20px 20px'}} />
            <motion.div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-green-400/30 to-transparent" style={{ y: `${scanline.get()}%` }} />
            <div className="h-full overflow-y-auto no-scrollbar">
                {history.map((line, i) => (
                    <div key={i}>
                        {line.type === 'input' && <p><span className="text-green-200">root@khalil.dev:~$</span> <span className="text-cyan-400">{line.content.split(' ')[0]}</span> {line.content.split(' ').slice(1).join(' ')}</p>}
                        {line.type === 'output' && <pre className="whitespace-pre-wrap">{line.content}</pre>}
                    </div>
                ))}
                <form onSubmit={handleSubmit} className="flex items-center">
                    <label htmlFor="terminal-input" className="text-green-200">root@khalil.dev:~$</label>
                    <input ref={inputRef} id="terminal-input" type="text" value={input} onChange={e => setInput(e.target.value)} className="flex-1 bg-transparent border-none text-green-400 focus:ring-0 outline-none pl-2" autoComplete="off" />
                </form>
            </div>
        </div>
    );
}

// ================== MATRIX TRANSITION ==================
const MatrixTransition = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
        const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const nums = '0123456789';
        const alphabet = katakana + latin + nums;

        const fontSize = 16;
        const columns = canvas.width / fontSize;
        const rainDrops = [];

        for (let x = 0; x < columns; x++) {
            rainDrops[x] = 1;
        }

        const draw = () => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#0F0';
            ctx.font = fontSize + 'px monospace';

            for (let i = 0; i < rainDrops.length; i++) {
                const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
                ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);

                if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    rainDrops[i] = 0;
                }
                rainDrops[i]++;
            }
        };
        
        const interval = setInterval(draw, 30);
        return () => clearInterval(interval);
    }, []);

    return <canvas ref={canvasRef} className="fixed inset-0 z-[90]"></canvas>;
};


// ================== PAGE ==================
export default function KBJNeonParallaxResume() {
  const [language, setLanguage] = useState('fr');
  const [isTerminalVisible, setTerminalVisible] = useState(false);
  const [showTransition, setShowTransition] = useState(false);
  
  const currentData = data[language];
  const yHero = useParallax(0.18);

  const handleTerminalToggle = () => {
      setShowTransition(true);
      setTimeout(() => {
          setTerminalVisible(v => !v);
          setShowTransition(false);
      }, 1000); // Duration of the transition
  };
  
  return (
    <>
      <style>{`.no-scrollbar::-webkit-scrollbar { display: none; } .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }`}</style>
      
      <AnimatePresence>
        {showTransition && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
                <MatrixTransition />
            </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isTerminalVisible ? (
            <motion.div key="terminal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Terminal currentData={currentData} setLanguage={setLanguage} exitTerminal={handleTerminalToggle} />
            </motion.div>
        ) : (
            <motion.div key="portfolio" exit={{ opacity: 0, transition: { duration: 0.5 } }}>
              <div id="top" className="min-h-screen text-white bg-[#0b0d12]">
                <ScrollProgressBar />
                <ParallaxBackground />
                <Nav language={language} setLanguage={setLanguage} navLinks={currentData.navLinks} onTerminalToggle={handleTerminalToggle} />

                <header className="relative mx-auto max-w-6xl px-6 pb-12 pt-20">
                  <motion.div style={{ y: yHero }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: "easeOut" }} className="relative overflow-hidden rounded-3xl border border-white/10 bg-black/50 p-8 backdrop-blur-xl">
                    <div className="relative z-10 grid items-center gap-8 md:grid-cols-[auto,1fr,auto]">
                      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="order-1 mx-auto md:mx-0">
                        <div className="relative group" data-cursor-hover>
                          <img src={avatarSrc} alt={currentData.profile.name} className="h-40 w-40 rounded-3xl object-cover ring-2 ring-white/10" />
                          <div className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ boxShadow: '0 0 12px 2px #22d3ee, inset 0 0 4px 0px #22d3ee' }}></div>
                        </div>
                      </motion.div>
                      <div className="order-2 text-center md:text-left">
                        <motion.div animate={{ scale: [1, 1.05, 1], boxShadow: ["0 0 0px 0px rgba(34, 211, 238, 0.3)", "0 0 10px 2px rgba(34, 211, 238, 0.3)", "0 0 0px 0px rgba(34, 211, 238, 0.3)"] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} className="mb-2 inline-flex items-center gap-2 rounded-full border border-cyan-400/25 bg-cyan-400/10 px-3 py-1 text-xs text-cyan-200">
                          <Sparkles className="h-3.5 w-3.5" /> {currentData.profile.availability}
                        </motion.div>
                        <h1 className="text-3xl font-bold tracking-tight md:text-5xl">{currentData.profile.name}</h1>
                        <p className="mt-2 text-lg text-white/85">{currentData.profile.title}</p>
                        <p className="mt-4 max-w-2xl text-white/75 mx-auto md:mx-0">{currentData.profile.summary}</p>
                        <div className="mt-5 flex flex-wrap gap-2 justify-center md:justify-start">
                          {currentData.profile.highlights.slice(0, 7).map((h) => (<IconBadge key={h} label={h} />))}
                          <span className="text-sm text-white/60">…</span>
                        </div>
                      </div>
                      <div className="order-3 w-full max-w-sm md:w-auto mx-auto">
                        <div className="grid grid-cols-1 gap-3">
                          <a href={`mailto:${currentData.profile.email}`} className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-3 transition hover:translate-y-[-1px] hover:bg-white/[0.06]"><Mail className="h-5 w-5 text-cyan-200" /><span className="text-sm">{currentData.profile.email}</span></a>
                          <a href={`tel:${currentData.profile.phone.replace(/\s/g, "")}`} className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-3 transition hover:translate-y-[-1px] hover:bg-white/[0.06]"><Phone className="h-5 w-5 text-fuchsia-200" /><span className="text-sm">{currentData.profile.phone}</span></a>
                          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-3"><MapPin className="h-5 w-5 text-amber-200" /><span className="text-sm">{currentData.profile.location}</span></div>
                          <div className="flex gap-2">
                            <a target="_blank" rel="noreferrer" href={currentData.profile.linkedin} className="flex-1 rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-3 text-center text-sm transition hover:translate-y-[-1px] hover:bg-white/[0.06]"><span className="inline-flex items-center justify-center gap-2"><Linkedin className="h-4 w-4" /> LinkedIn</span></a>
                            <a target="_blank" rel="noreferrer" href={currentData.profile.github} className="flex-1 rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-3 text-center text-sm transition hover:translate-y-[-1px] hover:bg-white/[0.06]"><span className="inline-flex items-center justify-center gap-2"><Github className="h-4 w-4" /> GitHub</span></a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 flex items-center justify-center"><ArrowDown className="h-5 w-5 animate-bounce text-white/60" /></div>
                  </motion.div>
                </header>

                <Section id="about" title={currentData.sectionTitles.about} icon={Sparkles}>
                    <motion.p initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={fadeIn} className="mx-auto max-w-3xl text-center text-white/80">{currentData.profile.about}</motion.p>
                </Section>

                <Section id="experience" title={currentData.sectionTitles.experience} icon={Briefcase}>
                    <motion.ol className="relative space-y-6 border-l border-white/10 pl-6" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }} variants={containerVariants}>
                    {currentData.experience.map((e, i) => (
                        <motion.li key={i} className="relative pl-8" variants={itemVariants}>
                        <span className="absolute left-[-6.5px] top-1.5 h-3 w-3 rounded-full bg-gradient-to-br from-cyan-400 to-fuchsia-400 shadow-[0_0_12px_rgba(168,85,247,0.6)]" />
                        <MotionGlowCard
                            summary={<div><div className="flex flex-wrap items-center justify-between gap-2"><h3 className="text-base font-semibold text-white">{e.role}</h3><span className="text-xs text-white/60">{e.period}</span></div><p className="mt-1 text-sm text-white/70">{e.company}{e.location ? ` — ${e.location}` : ""}</p><ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-white/80">{e.work.slice(0, 2).map((w, j) => (<li key={j}>{w}</li>))}</ul><div className="mt-3 flex flex-wrap gap-2">{e.stack.slice(0, 5).map((t) => (<IconBadge key={t} label={t} />))}{e.stack.length > 5 && (<span className="text-xs text-white/60">+{e.stack.length - 5}</span>)}</div></div>}
                            detail={<div><div className="flex flex-wrap items-center justify-between gap-3"><div><h3 className="text-lg font-semibold text-white">{e.role}</h3><p className="text-sm text-white/70">{e.company}{e.location ? ` — ${e.location}` : ""}</p></div><span className="text-xs text-white/60">{e.period}</span></div><h4 className="mt-4 text-sm font-semibold text-cyan-200">{currentData.sectionTitles.keyAchievements}</h4><ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-white/80">{e.work.map((w, j) => (<li key={j}>{w}</li>))}</ul><h4 className="mt-4 flex items-center gap-2 text-sm font-semibold text-cyan-200"><Server className="h-4 w-4" /> {currentData.sectionTitles.architecture}</h4><ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-white/80">{e.architecture?.map((w, j) => (<li key={j}>{w}</li>))}</ul><h4 className="mt-4 text-sm font-semibold text-cyan-200">{currentData.sectionTitles.stack}</h4><div className="mt-2 flex flex-wrap gap-2">{e.stack.map((t) => (<IconBadge key={t} label={t} />))}</div></div>}
                        />
                        </motion.li>
                    ))}
                    </motion.ol>
                </Section>

                <Section id="freelance" title={currentData.sectionTitles.freelance} icon={Wrench}>
                    <motion.div className="grid gap-6 md:grid-cols-2" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }} variants={containerVariants}>
                    {currentData.freelance.map((m, i) => (<MotionGlowCard key={i} variants={itemVariants} summary={<div><div className="flex items-start justify-between gap-3"><div><h3 className="text-base font-semibold text-white">{m.role}</h3><p className="text-sm text-white/70">{m.company}</p></div><span className="text-xs text-white/60">{m.period}</span></div><ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-white/80">{m.details.slice(0, 2).map((d, j) => (<li key={j}>{d}</li>))}</ul><div className="mt-3 flex flex-wrap gap-2">{m.stack.slice(0, 5).map((t) => (<IconBadge key={t} label={t} />))}{m.stack.length > 5 && (<span className="text-xs text-white/60">+{m.stack.length - 5}</span>)}</div></div>} detail={<div><div className="flex items-start justify-between gap-3"><div><h3 className="text-lg font-semibold text-white">{m.role}</h3><p className="text-sm text-white/70">{m.company}</p></div><span className="text-xs text-white/60">{m.period}</span></div><h4 className="mt-4 text-sm font-semibold text-cyan-200">{currentData.sectionTitles.details}</h4><ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-white/80">{m.details.map((d, j) => (<li key={j}>{d}</li>))}</ul><h4 className="mt-4 flex items-center gap-2 text-sm font-semibold text-cyan-200"><Shield className="h-4 w-4" /> {currentData.sectionTitles.architecture}</h4><ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-white/80">{m.architecture?.map((d, j) => (<li key={j}>{d}</li>))}</ul><h4 className="mt-4 text-sm font-semibold text-cyan-200">{currentData.sectionTitles.stack}</h4><div className="mt-2 flex flex-wrap gap-2">{m.stack.map((t) => (<IconBadge key={t} label={t} />))}</div></div>} />))}
                    </motion.div>
                </Section>

                <Section id="skills" title={currentData.sectionTitles.skills} icon={Wrench}>
                    <motion.div className="grid grid-cols-5 grid-rows-3 gap-4" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }} variants={containerVariants}>
                    {currentData.skills.map((s) => (<MotionGlowCard key={s.group} className={cn("h-full", s.area)} variants={itemVariants} summary={<div><h3 className="mb-3 text-sm font-semibold tracking-wide text-white/80">{s.group}</h3><div className="flex flex-wrap gap-2">{s.items.slice(0, 10).map((it) => (<IconBadge key={it.name} label={it.name} />))}{s.items.length > 10 && (<span className="text-xs text-white/60">+{s.items.length - 10}</span>)}</div></div>} detail={<div className="space-y-4"><h3 className="mb-3 text-base font-semibold tracking-wide text-white/90">{s.group}</h3><ul className="space-y-3">{s.items.map(it => (<li key={it.name}><div className="font-semibold text-white">{it.name}</div><p className="text-sm text-white/70">{it.description}</p></li>))}</ul></div>} />))}
                    </motion.div>
                </Section>

                <Section id="education" title={currentData.sectionTitles.education} icon={GraduationCap}>
                    <div className="grid gap-6 md:grid-cols-2">
                        <MotionGlowCard summary={<div><h3 className="mb-3 flex items-center gap-2 text-sm font-semibold tracking-wide text-white/80"><GraduationCap className="h-4 w-4 text-cyan-300" /> {currentData.sectionTitles.coursework}</h3><ul className="space-y-3 text-sm text-white/80">{currentData.education.map((ed) => (<li key={ed.school} className="rounded-xl border border-white/10 bg-white/[0.03] p-3"><div className="flex items-start justify-between gap-3"><div><p className="font-medium text-white">{ed.degree}</p><p className="text-white/70">{ed.school}</p></div><span className="text-xs text-white/60">{ed.period}</span></div><p className="mt-1 text-xs text-white/60">{ed.location}</p></li>))}</ul></div>} detail={<div><h3 className="mb-3 flex items-center gap-2 text-sm font-semibold tracking-wide text-white/80"><GraduationCap className="h-4 w-4 text-cyan-300" /> {currentData.sectionTitles.courseworkDetail}</h3><ul className="space-y-3 text-sm text-white/80">{currentData.education.map((ed) => (<li key={ed.school} className="rounded-xl border border-white/10 bg-white/[0.03] p-3"><div className="flex items-start justify-between gap-3"><div><p className="font-medium text-white">{ed.degree}</p><p className="text-white/70">{ed.school}</p></div><span className="text-xs text-white/60">{ed.period}</span></div><p className="mt-1 text-xs text-white/60">{ed.location}</p></li>))}</ul><h4 className="mt-4 mb-2 text-sm font-semibold text-cyan-200">Languages & Leadership</h4><div className="mb-3 flex flex-wrap gap-2">{currentData.extras.languages.map((l) => (<Badge key={l.name}>{l.name} — {l.level}</Badge>))}</div><ul className="space-y-3 text-sm text-white/80">{currentData.extras.leadership.map((x, i) => (<li key={i} className="rounded-xl border border-white/10 bg-white/[0.03] p-3"><div className="flex items-start justify-between gap-3"><div><p className="font-medium text-white">{x.title}</p><p className="text-white/70">{x.org}</p></div><span className="text-xs text-white/60">{x.period}</span></div></li>))}</ul></div>} />
                        <MotionGlowCard summary={<div><h3 className="mb-3 flex items-center gap-2 text-sm font-semibold tracking-wide text-white/80"><LanguagesIcon className="h-4 w-4 text-fuchsia-300" /> {currentData.sectionTitles.languagesAndNetworks}</h3><div className="mb-4 flex flex-wrap gap-2">{currentData.extras.languages.map((l) => (<Badge key={l.name}>{l.name} — {l.level}</Badge>))}</div><div className="flex gap-2 text-xs"><a target="_blank" rel="noreferrer" href={currentData.profile.linkedin} className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-white/85 hover:bg-white/20">LinkedIn <ExternalLink className="h-3 w-3" /></a><a target="_blank" rel="noreferrer" href={currentData.profile.github} className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-white/85 hover:bg-white/20">GitHub <ExternalLink className="h-3 w-3" /></a></div></div>} detail={<div><h3 className="mb-3 flex items-center gap-2 text-sm font-semibold tracking-wide text-white/80"><LanguagesIcon className="h-4 w-4 text-fuchsia-300" /> Languages, Networks & Interests</h3><div className="mb-4 flex flex-wrap gap-2">{currentData.extras.languages.map((l) => (<Badge key={l.name}>{l.name} — {l.level}</Badge>))}</div><p className="text-sm text-white/75">Interests: Animated UI, event-driven architectures, DX, and web performance.</p><div className="mt-3 flex gap-2 text-xs"><a target="_blank" rel="noreferrer" href={currentData.profile.linkedin} className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-white/85 hover:bg-white/20">LinkedIn <ExternalLink className="h-3 w-3" /></a><a target="_blank" rel="noreferrer" href={currentData.profile.github} className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-white/85 hover:bg-white/20">GitHub <ExternalLink className="h-3 w-3" /></a></div></div>} />
                    </div>
                </Section>

                <Section id="contact" title={currentData.sectionTitles.contact} icon={Mail}>
                    <MotionGlowCard className="mx-auto max-w-3xl" summary={<div className="text-center"><p className="text-lg text-white/90">{currentData.sectionTitles.contactPrompt}</p><div className="mt-5 flex flex-wrap items-center justify-center gap-3"><a href={`mailto:${currentData.profile.email}`} className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-white/90 transition hover:bg-white/20">{currentData.profile.email}</a><a href={`tel:${currentData.profile.phone.replace(/\s/g, "")}`} className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-white/90 transition hover:bg-white/20">{currentData.profile.phone}</a><a target="_blank" rel="noreferrer" href={currentData.profile.linkedin} className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-white/90 transition hover:bg-white/20">LinkedIn</a><a target="_blank" rel="noreferrer" href={currentData.profile.github} className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-white/90 transition hover:bg-white/20">GitHub</a></div></div>} detail={<div className="text-center"><p className="text-lg text-white/90">{currentData.sectionTitles.contactPrompt}</p><p className="mt-2 text-sm text-white/70">Quick response via email or WhatsApp.</p><div className="mt-5 grid gap-3 sm:grid-cols-2"><motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href={`mailto:${currentData.profile.email}`} className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white/90 transition hover:bg-white/20 inline-flex items-center justify-center gap-2"><Mail className="h-4 w-4" />{currentData.profile.email}</motion.a><motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href={`tel:${currentData.profile.phone.replace(/\s/g, "")}`} className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white/90 transition hover:bg-white/20 inline-flex items-center justify-center gap-2"><Phone className="h-4 w-4" />{currentData.profile.phone}</motion.a><motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} target="_blank" rel="noreferrer" href={currentData.profile.linkedin} className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white/90 transition hover:bg-white/20 inline-flex items-center justify-center gap-2"><Linkedin className="h-4 w-4" />LinkedIn</motion.a><motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} target="_blank" rel="noreferrer" href={currentData.profile.github} className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white/90 transition hover:bg-white/20 inline-flex items-center justify-center gap-2"><Github className="h-4 w-4" />GitHub</motion.a></div></div>} />
                </Section>

                <footer className="mx-auto max-w-6xl px-6 py-10 text-center text-xs text-white/50">© {new Date().getFullYear()} {currentData.profile.name}</footer>
              </div>
            </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
