export interface Project {
  id: string
  name: string
  location: string
  type: string
  status: "active" | "waiting" | "archived"
  progress: number
  lastUpdated: string
  image: string
  startDate: string
  expectedCompletion: string
}

export interface Step {
  id: string
  name: string
  phase: "design" | "production" | "construction"
  status: "waiting" | "in-progress" | "completed"
  hasPhotos: boolean
  completedDate?: string
}

export interface Photo {
  id: string
  url: string
  description: string
  uploadedBy: string
  uploadedDate: string
}

export interface Invoice {
  id: string
  number: string
  amount: number
  status: "paid" | "due" | "overdue"
  dueDate: string
  paidDate?: string
  phase: string
  pdfUrl: string
}

export interface FAQ {
  id: string
  question: string
  answer: string
  category: string
}

export interface Ticket {
  id: string
  subject: string
  description: string
  status: "open" | "in-progress" | "closed"
  createdAt: string
  updatedAt: string
}

export interface Document {
  id: string
  name: string
  category: "permits" | "plans" | "manuals" | "certificates"
  uploadedDate: string
  fileUrl: string
}

export interface ServiceProvider {
  id: string
  name: string
  category: string
  phone: string
  email: string
  website?: string
  region: string
  note?: string
}

// Fake data
export const projects: Project[] = [
  {
    id: "PROJ001",
    name: "MX2",
    location: "Celje",
    type: "Moderna hiša",
    status: "active",
    progress: 68,
    lastUpdated: "2026-01-28",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop",
    startDate: "2025-06-15",
    expectedCompletion: "2026-08-30",
  },
  {
    id: "PROJ002",
    name: "Garaža G1",
    location: "Celje",
    type: "Garaža",
    status: "waiting",
    progress: 0,
    lastUpdated: "2026-01-15",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
    startDate: "2026-04-01",
    expectedCompletion: "2026-06-15",
  },
]

export const steps: Record<string, Step[]> = {
  PROJ001: [
    // Design phase (15 steps)
    { id: "d1", name: "Geodetska podlaga", phase: "design", status: "completed", hasPhotos: true, completedDate: "2025-06-20" },
    { id: "d2", name: "Arhitekturni načrt", phase: "design", status: "completed", hasPhotos: true, completedDate: "2025-07-10" },
    { id: "d3", name: "Statični izračun", phase: "design", status: "completed", hasPhotos: false, completedDate: "2025-07-25" },
    { id: "d4", name: "Gradbeno dovoljenje", phase: "design", status: "completed", hasPhotos: true, completedDate: "2025-08-15" },
    { id: "d5", name: "PZI elaborat", phase: "design", status: "completed", hasPhotos: false, completedDate: "2025-08-30" },
    { id: "d6", name: "Strojne instalacije", phase: "design", status: "completed", hasPhotos: false, completedDate: "2025-09-05" },
    { id: "d7", name: "Električne instalacije", phase: "design", status: "completed", hasPhotos: false, completedDate: "2025-09-10" },
    { id: "d8", name: "Požarna varnost", phase: "design", status: "completed", hasPhotos: false, completedDate: "2025-09-15" },
    { id: "d9", name: "Energetska izkaznica", phase: "design", status: "completed", hasPhotos: false, completedDate: "2025-09-20" },
    { id: "d10", name: "Vodovod in kanalizacija", phase: "design", status: "completed", hasPhotos: false, completedDate: "2025-09-25" },
    { id: "d11", name: "Ogrevanje načrt", phase: "design", status: "completed", hasPhotos: false, completedDate: "2025-09-28" },
    { id: "d12", name: "Prezračevanje", phase: "design", status: "completed", hasPhotos: false, completedDate: "2025-10-01" },
    { id: "d13", name: "Krajinska ureditev", phase: "design", status: "completed", hasPhotos: true, completedDate: "2025-10-05" },
    { id: "d14", name: "Notranja oprema", phase: "design", status: "completed", hasPhotos: true, completedDate: "2025-10-10" },
    { id: "d15", name: "Končna dokumentacija", phase: "design", status: "completed", hasPhotos: false, completedDate: "2025-10-15" },
    // Production phase (8 steps)
    { id: "p1", name: "Predizdelava elementov", phase: "production", status: "completed", hasPhotos: true, completedDate: "2025-11-01" },
    { id: "p2", name: "Toplotna črpalka", phase: "production", status: "completed", hasPhotos: true, completedDate: "2025-11-15" },
    { id: "p3", name: "Okna in vrata", phase: "production", status: "completed", hasPhotos: true, completedDate: "2025-11-25" },
    { id: "p4", name: "Fasadni elementi", phase: "production", status: "completed", hasPhotos: true, completedDate: "2025-12-05" },
    { id: "p5", name: "Strešna kritina", phase: "production", status: "completed", hasPhotos: false, completedDate: "2025-12-10" },
    { id: "p6", name: "Notranja vrata", phase: "production", status: "completed", hasPhotos: false, completedDate: "2025-12-15" },
    { id: "p7", name: "Sanitarna oprema", phase: "production", status: "completed", hasPhotos: false, completedDate: "2025-12-20" },
    { id: "p8", name: "Kuhinjski elementi", phase: "production", status: "completed", hasPhotos: true, completedDate: "2025-12-28" },
    // Construction phase (22 steps)
    { id: "c1", name: "Priprava terena", phase: "construction", status: "completed", hasPhotos: true, completedDate: "2025-10-20" },
    { id: "c2", name: "Izkop", phase: "construction", status: "completed", hasPhotos: true, completedDate: "2025-10-25" },
    { id: "c3", name: "Fundament", phase: "construction", status: "completed", hasPhotos: true, completedDate: "2025-11-05" },
    { id: "c4", name: "Kletni zidovi", phase: "construction", status: "completed", hasPhotos: true, completedDate: "2025-11-20" },
    { id: "c5", name: "Hidroizolacija", phase: "construction", status: "completed", hasPhotos: true, completedDate: "2025-11-25" },
    { id: "c6", name: "Betonska plošča", phase: "construction", status: "completed", hasPhotos: true, completedDate: "2025-12-01" },
    { id: "c7", name: "Montaža zidov", phase: "construction", status: "completed", hasPhotos: true, completedDate: "2025-12-10" },
    { id: "c8", name: "Streha", phase: "construction", status: "completed", hasPhotos: true, completedDate: "2025-12-20" },
    { id: "c9", name: "Okna montaža", phase: "construction", status: "completed", hasPhotos: true, completedDate: "2026-01-05" },
    { id: "c10", name: "Električne instalacije", phase: "construction", status: "completed", hasPhotos: true, completedDate: "2026-01-15" },
    { id: "c11", name: "Vodovodne instalacije", phase: "construction", status: "completed", hasPhotos: true, completedDate: "2026-01-20" },
    { id: "c12", name: "Ogrevanje montaža", phase: "construction", status: "in-progress", hasPhotos: true },
    { id: "c13", name: "Estrih", phase: "construction", status: "in-progress", hasPhotos: false },
    { id: "c14", name: "Fasada", phase: "construction", status: "waiting", hasPhotos: false },
    { id: "c15", name: "Notranje ometi", phase: "construction", status: "waiting", hasPhotos: false },
    { id: "c16", name: "Keramika", phase: "construction", status: "waiting", hasPhotos: false },
    { id: "c17", name: "Parket", phase: "construction", status: "waiting", hasPhotos: false },
    { id: "c18", name: "Notranja vrata montaža", phase: "construction", status: "waiting", hasPhotos: false },
    { id: "c19", name: "Sanitarna oprema montaža", phase: "construction", status: "waiting", hasPhotos: false },
    { id: "c20", name: "Kuhinja montaža", phase: "construction", status: "waiting", hasPhotos: false },
    { id: "c21", name: "Finalna čistitev", phase: "construction", status: "waiting", hasPhotos: false },
    { id: "c22", name: "Primopredaja", phase: "construction", status: "waiting", hasPhotos: false },
  ],
}

export const photos: Record<string, Photo[]> = {
  d1: [
    { id: "ph1", url: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&h=600&fit=crop", description: "Geodetska izmera parcele", uploadedBy: "Marko Novak", uploadedDate: "2025-06-20" },
    { id: "ph2", url: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&h=600&fit=crop", description: "Oznake za gradnjo", uploadedBy: "Marko Novak", uploadedDate: "2025-06-20" },
  ],
  d2: [
    { id: "ph3", url: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&h=600&fit=crop", description: "Tloris pritličja", uploadedBy: "Ana Kovač", uploadedDate: "2025-07-10" },
  ],
  c1: [
    { id: "ph4", url: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=600&fit=crop", description: "Priprava terena - začetek", uploadedBy: "Peter Horvat", uploadedDate: "2025-10-20" },
    { id: "ph5", url: "https://images.unsplash.com/photo-1590274853856-f22d5ee3d228?w=800&h=600&fit=crop", description: "Priprava terena - niveliranje", uploadedBy: "Peter Horvat", uploadedDate: "2025-10-20" },
  ],
  c2: [
    { id: "ph6", url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop", description: "Izkop za temelje", uploadedBy: "Peter Horvat", uploadedDate: "2025-10-25" },
  ],
  c3: [
    { id: "ph7", url: "https://images.unsplash.com/photo-1590274853856-f22d5ee3d228?w=800&h=600&fit=crop", description: "Armatura temeljev", uploadedBy: "Peter Horvat", uploadedDate: "2025-11-01" },
    { id: "ph8", url: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=600&fit=crop", description: "Betoniranje temeljev", uploadedBy: "Peter Horvat", uploadedDate: "2025-11-05" },
  ],
  c7: [
    { id: "ph9", url: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&h=600&fit=crop", description: "Montaža zunanjih zidov", uploadedBy: "Peter Horvat", uploadedDate: "2025-12-10" },
  ],
  c8: [
    { id: "ph10", url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop", description: "Strešna konstrukcija", uploadedBy: "Peter Horvat", uploadedDate: "2025-12-20" },
  ],
  c12: [
    { id: "ph11", url: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800&h=600&fit=crop", description: "Montaža toplotne črpalke", uploadedBy: "Janez Kranjc", uploadedDate: "2026-01-28" },
  ],
}

export const invoices: Invoice[] = [
  { id: "inv1", number: "LH-2025-001", amount: 15000, status: "paid", dueDate: "2025-06-30", paidDate: "2025-06-25", phase: "Projektiranje", pdfUrl: "#" },
  { id: "inv2", number: "LH-2025-002", amount: 25000, status: "paid", dueDate: "2025-08-31", paidDate: "2025-08-28", phase: "Projektiranje", pdfUrl: "#" },
  { id: "inv3", number: "LH-2025-003", amount: 45000, status: "paid", dueDate: "2025-10-31", paidDate: "2025-10-30", phase: "Produkcija", pdfUrl: "#" },
  { id: "inv4", number: "LH-2025-004", amount: 60000, status: "paid", dueDate: "2025-12-15", paidDate: "2025-12-12", phase: "Gradnja", pdfUrl: "#" },
  { id: "inv5", number: "LH-2026-001", amount: 35000, status: "due", dueDate: "2026-02-15", phase: "Gradnja", pdfUrl: "#" },
  { id: "inv6", number: "LH-2026-002", amount: 40000, status: "due", dueDate: "2026-04-30", phase: "Gradnja", pdfUrl: "#" },
]

export const faqs: FAQ[] = [
  { id: "faq1", question: "Kdaj je pričakovan zaključek gradnje?", answer: "Glede na trenutni napredek in načrtovane korake, je pričakovan zaključek gradnje v avgustu 2026. Točen datum bo potrjen, ko bodo zaključene vse notranje instalacije.", category: "Časovnica" },
  { id: "faq2", question: "Kako poteka montaža toplotne črpalke?", answer: "Toplotna črpalka sistema zrak-voda bo nameščena na zunanji strani hiše. Vključuje notranjo enoto za ogrevanje in hlajenje ter bojler za sanitarno toplo vodo.", category: "Oprema" },
  { id: "faq3", question: "Kakšna je garancija za streho?", answer: "Streha ima 30-letno garancijo na vodotesnost in 50-letno garancijo na strukturo. Redni pregledi so priporočeni vsaki 2 leti.", category: "Garancije" },
  { id: "faq4", question: "Ali je možno spreminjati notranje stene?", answer: "Notranje nenosne stene je možno prilagoditi do začetka faze notranje obdelave. Za spremembe kontaktirajte projektnega vodjo.", category: "Spremembe" },
  { id: "faq5", question: "Kako poteka plačilo po fazah?", answer: "Plačilo poteka po fazah: 10% ob podpisu pogodbe, 30% ob začetku produkcije, 40% med gradnjo, 20% ob primopredaji.", category: "Finance" },
]

export const documents: Document[] = [
  { id: "doc1", name: "Gradbeno dovoljenje", category: "permits", uploadedDate: "2025-08-15", fileUrl: "#" },
  { id: "doc2", name: "Arhitekturni načrt - tlorisi", category: "plans", uploadedDate: "2025-07-10", fileUrl: "#" },
  { id: "doc3", name: "Statični izračun", category: "plans", uploadedDate: "2025-07-25", fileUrl: "#" },
  { id: "doc4", name: "Energetska izkaznica", category: "certificates", uploadedDate: "2025-09-20", fileUrl: "#" },
  { id: "doc5", name: "Navodila - Toplotna črpalka", category: "manuals", uploadedDate: "2025-11-15", fileUrl: "#" },
  { id: "doc6", name: "Navodila - Okna Internorm", category: "manuals", uploadedDate: "2025-11-25", fileUrl: "#" },
]

export const serviceProviders: ServiceProvider[] = [
  { id: "sp1", name: "Instalacije Kranjc", category: "Vodovod", phone: "+386 41 123 456", email: "info@kranjc.si", website: "https://kranjc.si", region: "Celje", note: "24-urni servis" },
  { id: "sp2", name: "ElektroServis Štajerska", category: "Električar", phone: "+386 41 234 567", email: "servis@elektro-st.si", website: "https://elektro-st.si", region: "Celje, Maribor" },
  { id: "sp3", name: "Klima Plus", category: "HVAC / Klima", phone: "+386 41 345 678", email: "info@klimaplus.si", region: "Celje", note: "Servis toplotnih črpalk" },
  { id: "sp4", name: "Servis Bele Tehnike", category: "Gospodinjski aparati", phone: "+386 41 456 789", email: "servis@bela-tehnika.si", region: "Celje, Ljubljana" },
  { id: "sp5", name: "Internorm Servis", category: "Okna in vrata", phone: "+386 1 500 1234", email: "servis@internorm.si", website: "https://internorm.si", region: "Slovenija" },
  { id: "sp6", name: "Telekom Slovenije", category: "Internet / TV", phone: "080 1234", email: "podpora@telekom.si", website: "https://telekom.si", region: "Slovenija" },
  { id: "sp7", name: "SolarTech", category: "Sončne elektrarne", phone: "+386 41 567 890", email: "info@solartech.si", website: "https://solartech.si", region: "Celje, Maribor", note: "Čiščenje in servis" },
  { id: "sp8", name: "Dimnikarstvo Novak", category: "Dimnikar", phone: "+386 41 678 901", email: "info@dimnikar-novak.si", region: "Celje" },
]

export const currentUser = {
  name: "Janez Novak",
  email: "janez.novak@email.si",
  projectIds: ["PROJ001", "PROJ002"],
}
