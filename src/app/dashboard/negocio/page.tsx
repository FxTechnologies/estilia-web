"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import {
  LayoutPanelLeft, Scissors, Megaphone, Users, Calendar, Star,
  ChevronsUpDown, Sparkles, Search, Bell, Plus, PencilRuler, ExternalLink,
  Image as ImageIcon, Pencil, MapPin, Phone, AtSign, Check, Clock,
  Trash2, CalendarCheck, UserPlus, MessageCircle, Store, Palette,
  Brush, X, Menu, BarChart3, Users2, ArrowLeft, Smartphone, BadgeCheck,
} from "lucide-react";
import { createClient } from "@/lib/supabase-browser";

// ─── Types ────────────────────────────────────────────────────────────────────

interface ServiceRow {
  id: string;
  pro_id: string;
  name: string;
  description: string | null;
  duration_min: number;
  price: number;
  created_at: string;
  active: boolean;
  cat: string;
}

interface Promo {
  id: string;
  title: string;
  description: string | null;
  discount_type: "percentage" | "fixed" | null;
  discount_value: number | null;
  valid_until: string | null;
  active: boolean;
}

interface TeamMember {
  id: string;
  name: string;
  role: string;
  image_url: string | null;
  bio: string | null;
  service_ids: string[];
}

type StaffRow = {
  id: string; name: string; role: string;
  image_url: string | null; bio: string | null;
  service_staff?: { service_id: string }[];
};

type BizRow = {
  id: string;
  name: string | null; category: string | null; bio: string | null;
  whatsapp: string | null; instagram: string | null; address: string | null;
  image_url: string | null; rating: number | null; review_count: number | null;
  specialties: string[] | null;
};

interface FormState {
  svcTitle?: string;
  svcCat?: string;
  svcDur?: string;
  svcPrice?: string;
  svcDesc?: string;
  svcActive?: boolean;
  promoTitle?: string;
  promoDesc?: string;
  promoType?: "percentage" | "fixed";
  promoValue?: string;
  promoUntil?: string;
  promoActive?: boolean;
  tmName?: string;
  tmRole?: string;
  tmServiceIds?: string[];
  tmImageUrl?: string;
}

type ModalType = "service" | "promo" | "team" | null;
type View = "perfil" | "servicios" | "anuncios" | "equipo" | "agenda" | "clientes" | "reportes";
type Layout = "A" | "B";

// ─── Seed data ────────────────────────────────────────────────────────────────

const CATS = ["Barbería", "Color", "Barba & afeitado", "Spa & facial"];

const CAT_ICON: Record<string, React.ReactNode> = {
  "Barbería": <Scissors size={17} />,
  "Color": <Palette size={17} />,
  "Barba & afeitado": <Brush size={17} />,
  "Spa & facial": <Sparkles size={17} />,
};

const STATUS_PAL: Record<string, [string, string]> = {
  "Activa": ["var(--success-100)", "var(--success-500)"],
  "Vencida": ["#fde8e8", "var(--danger-500)"],
  "Pausada": ["var(--ink-100)", "var(--ink-500)"],
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getInitials(name: string) {
  return name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();
}

function bannerOf(type: Promo["discount_type"]) {
  return type === "fixed" ? "linear-gradient(120deg,#9a6910,var(--gold-500))" : "linear-gradient(120deg,var(--plum-700),var(--plum-500))";
}

function discountLabel(p: Promo) {
  if (p.discount_value == null) return "Promo";
  return p.discount_type === "fixed" ? `L ${p.discount_value.toLocaleString("es-HN")}` : `${p.discount_value}%`;
}

function fmtDate(d: string | null) {
  if (!d) return "Sin vencimiento";
  return new Date(d).toLocaleDateString("es-HN", { day: "numeric", month: "short", year: "numeric" });
}

function promoStatus(p: Promo) {
  if (!p.active) return "Pausada";
  if (p.valid_until && new Date(p.valid_until) < new Date()) return "Vencida";
  return "Activa";
}

// ─── Switch ───────────────────────────────────────────────────────────────────

function Switch({ checked, onChange, size = "sm" }: { checked: boolean; onChange: (v: boolean) => void; size?: "sm" | "md" }) {
  const w = size === "md" ? 46 : 38;
  const h = size === "md" ? 26 : 22;
  const d = h - 4;
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      style={{ width: w, height: h, borderRadius: 999, border: "none", cursor: "pointer", background: checked ? "var(--brand)" : "var(--ink-200,#e2dce9)", position: "relative", transition: "background .2s", flexShrink: 0, padding: 0 }}
    >
      <span style={{ position: "absolute", top: 2, left: checked ? w - d - 2 : 2, width: d, height: d, borderRadius: 999, background: "#fff", transition: "left .2s", display: "block" }} />
    </button>
  );
}

// ─── Toast ────────────────────────────────────────────────────────────────────

function Toast({ msg, show }: { msg: string; show: boolean }) {
  return (
    <div style={{
      position: "fixed", left: "50%", top: 22,
      transform: `translateX(-50%) translateY(${show ? "0" : "-16px"})`,
      opacity: show ? 1 : 0,
      background: "var(--ink-900)", color: "var(--ink-50)",
      padding: "13px 20px", borderRadius: 999, fontSize: 14, fontWeight: 600,
      boxShadow: "var(--shadow-xl)", display: "flex", alignItems: "center", gap: 9,
      zIndex: 95, transition: "opacity .3s, transform .3s", pointerEvents: "none", whiteSpace: "nowrap",
    }}>
      <Check size={18} style={{ color: "var(--gold-300)" }} />{msg}
    </div>
  );
}

// ─── Shared style objects ─────────────────────────────────────────────────────

const CARD: React.CSSProperties = {
  background: "var(--surface-card)", border: "1px solid var(--border-subtle)", borderRadius: 16, boxShadow: "var(--shadow-sm)", padding: 24,
};

const FIELD_LABEL: React.CSSProperties = {
  display: "block", fontSize: 11, fontWeight: 700, letterSpacing: ".08em",
  textTransform: "uppercase", color: "var(--ink-500)", marginBottom: 7,
};

const FIELD_INPUT: React.CSSProperties = {
  width: "100%", height: 46, padding: "0 14px",
  border: "1px solid var(--border-default)", borderRadius: 10,
  background: "#fff", fontSize: 14, color: "var(--ink-900)", outline: "none",
  fontFamily: "var(--font-sans)", boxSizing: "border-box",
};

const FIELD_TEXTAREA: React.CSSProperties = {
  ...FIELD_INPUT, height: "auto", minHeight: 90, padding: "12px 14px",
  resize: "vertical" as const, lineHeight: 1.5,
};

const FIELD_SELECT: React.CSSProperties = { ...FIELD_INPUT, cursor: "pointer" };

// ─── Dashboard ────────────────────────────────────────────────────────────────

export default function NegocioDashboard() {
  const supabase = createClient();
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [view, setViewState] = useState<View>("perfil");
  const [layout, setLayout] = useState<Layout>("A");
  const [svcFilter, setSvcFilter] = useState("Todos");
  const [services, setServices] = useState<ServiceRow[]>([]);
  const [promos, setPromos] = useState<Promo[]>([]);
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [proId, setProId] = useState<string | null>(null);
  const [bizRow, setBizRow] = useState<BizRow | null>(null);
  // Profesional individual (sin equipo) vs negocio. Solo el negocio ve "Equipo".
  const [isBusiness, setIsBusiness] = useState(true);
  // Drawer del sidebar en móvil
  const [navOpen, setNavOpen] = useState(false);
  // Subida de foto de miembro del equipo
  const [tmUploading, setTmUploading] = useState(false);
  const [coverUploading, setCoverUploading] = useState(false);
  const [galleryUploading, setGalleryUploading] = useState(false);
  const [gallery, setGallery] = useState<{ id: string; url: string; caption: string | null }[]>([]);
  const [profileForm, setProfileForm] = useState<{ name: string; category: string; bio: string; whatsapp: string; instagram: string; address: string; specialties: string[] }>({ name: "", category: "", bio: "", whatsapp: "", instagram: "", address: "", specialties: [] });
  const [savingProfile, setSavingProfile] = useState(false);
  const [newSpec, setNewSpec] = useState("");

  const [modalType, setModalType] = useState<ModalType>(null);
  const [editingId, setEditingId] = useState<string | number | null>(null);
  const [form, setForm] = useState<FormState>({});

  const [toastMsg, setToastMsg] = useState("");
  const [toastShow, setToastShow] = useState(false);

  // ── helpers ─────────────────────────────────────────────────────────────────
  const toast = useCallback((m: string) => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToastMsg(m); setToastShow(true);
    toastTimer.current = setTimeout(() => setToastShow(false), 2600);
  }, []);

  const setView = (v: View) => { setViewState(v); setNavOpen(false); if (typeof window !== "undefined") window.scrollTo({ top: 0 }); };
  const upd = (k: keyof FormState, v: unknown) => setForm((f) => ({ ...f, [k]: v }));

  // ── data load ────────────────────────────────────────────────────────────────
  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data: prof } = await supabase.from("profiles").select("role").eq("id", user.id).maybeSingle();
      setIsBusiness(prof?.role !== "pro");
      let pro = (await supabase.from("pros").select("*").eq("user_id", user.id).maybeSingle()).data;
      if (!pro) {
        // Sin ficha aún (registro por web) — se crea automáticamente, igual que en la app
        const fullName = (user.user_metadata?.full_name as string) || user.email?.split("@")[0] || "Mi negocio";
        pro = (await supabase.from("pros").insert({ user_id: user.id, name: fullName, category: "", city: "", from_price: 0 }).select().single()).data;
      }
      if (!pro) return;
      setProId(pro.id);
      setBizRow(pro);
      setProfileForm({
        name: pro.name || "", category: pro.category || "", bio: pro.bio || "",
        whatsapp: pro.whatsapp || "", instagram: pro.instagram || "", address: pro.address || "",
        specialties: pro.specialties ?? [],
      });
      const { data: svcs } = await supabase.from("services").select("*").eq("pro_id", pro.id);
      if (svcs) setServices(svcs.map((s) => ({ ...s, active: true, cat: "Barbería" })));
      const { data: staffRows } = await supabase
        .from("staff")
        .select("*, service_staff(service_id)")
        .eq("pro_id", pro.id)
        .order("created_at");
      if (staffRows) setTeam((staffRows as StaffRow[]).map((m) => ({
        id: m.id, name: m.name, role: m.role, image_url: m.image_url, bio: m.bio,
        service_ids: (m.service_staff ?? []).map((r) => r.service_id),
      })));
      const { data: proms } = await supabase.from("promotions").select("*").eq("pro_id", pro.id).order("created_at", { ascending: false });
      if (proms) setPromos(proms as Promo[]);
      const { data: gal } = await supabase.from("portfolio_photos").select("id, url, caption").eq("pro_id", pro.id).order("created_at");
      if (gal) setGallery(gal as { id: string; url: string; caption: string | null }[]);
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── CRUD services ────────────────────────────────────────────────────────────
  const saveService = async () => {
    if (!form.svcTitle?.trim()) { toast("Ponle un nombre al servicio"); return; }
    const payload = { pro_id: proId, name: form.svcTitle.trim(), description: form.svcDesc || "", duration_min: parseInt(form.svcDur || "30", 10), price: parseInt(form.svcPrice || "0", 10) };
    if (editingId) {
      const { data } = await supabase.from("services").update(payload).eq("id", editingId).select().single();
      if (data) setServices((prev) => prev.map((x) => x.id === editingId ? { ...data, active: x.active, cat: form.svcCat || "Barbería" } : x));
      toast("Servicio actualizado");
    } else {
      const { data } = await supabase.from("services").insert(payload).select().single();
      if (data) setServices((prev) => [...prev, { ...data, active: true, cat: form.svcCat || "Barbería" }]);
      toast("Servicio agregado");
    }
    setModalType(null); setEditingId(null);
  };

  const deleteService = async (id: string) => {
    await supabase.from("services").delete().eq("id", id);
    setServices((prev) => prev.filter((x) => x.id !== id));
    toast("Servicio eliminado");
  };

  const toggleService = (id: string) => setServices((prev) => prev.map((x) => x.id === id ? { ...x, active: !x.active } : x));

  // ── perfil del negocio (pros) ──────────────────────────────────────────────────
  const saveProfile = async () => {
    if (!proId) { toast("No se encontró tu negocio"); return; }
    if (!profileForm.name.trim()) { toast("Ponle nombre a tu negocio"); return; }
    setSavingProfile(true);
    const payload = {
      name: profileForm.name.trim(), category: profileForm.category.trim(),
      bio: profileForm.bio.trim(), whatsapp: profileForm.whatsapp.trim(),
      instagram: profileForm.instagram.trim(), address: profileForm.address.trim(),
    };
    const { error } = await supabase.from("pros").update(payload).eq("id", proId);
    if (error) { setSavingProfile(false); toast("No se pudo guardar"); return; }
    // Especialidades en update aparte: si la columna aún no existe, no rompe el guardado del resto.
    const { error: specErr } = await supabase.from("pros").update({ specialties: profileForm.specialties }).eq("id", proId);
    setSavingProfile(false);
    setBizRow((r) => (r ? { ...r, ...payload, specialties: specErr ? r.specialties : profileForm.specialties } : r));
    toast(specErr ? "Perfil guardado (falta la columna 'specialties' para guardar especialidades)" : "Perfil actualizado");
  };

  const addSpec = () => {
    const v = newSpec.trim();
    if (!v) return;
    if (!profileForm.specialties.includes(v)) setProfileForm((f) => ({ ...f, specialties: [...f.specialties, v] }));
    setNewSpec("");
  };
  const removeSpec = (sp: string) => setProfileForm((f) => ({ ...f, specialties: f.specialties.filter((x) => x !== sp) }));

  // ── modal open/close ─────────────────────────────────────────────────────────
  const openModal = (type: ModalType, item?: ServiceRow | Promo | TeamMember) => {
    let f: FormState = {};
    if (type === "service") {
      const s = item as ServiceRow | undefined;
      f = s ? { svcTitle: s.name, svcCat: s.cat, svcDur: String(s.duration_min), svcPrice: String(s.price), svcDesc: s.description || "", svcActive: s.active }
             : { svcTitle: "", svcCat: "Barbería", svcDur: "30", svcPrice: "", svcDesc: "", svcActive: true };
    } else if (type === "promo") {
      const p = item as Promo | undefined;
      f = p ? { promoTitle: p.title, promoDesc: p.description ?? "", promoType: p.discount_type ?? "percentage", promoValue: p.discount_value != null ? String(p.discount_value) : "", promoUntil: p.valid_until ?? "", promoActive: p.active }
             : { promoTitle: "", promoDesc: "", promoType: "percentage", promoValue: "", promoUntil: "", promoActive: true };
    } else if (type === "team") {
      const m = item as TeamMember | undefined;
      f = m ? { tmName: m.name, tmRole: m.role, tmServiceIds: [...m.service_ids], tmImageUrl: m.image_url ?? "" }
             : { tmName: "", tmRole: "", tmServiceIds: [], tmImageUrl: "" };
    }
    setForm(f);
    setEditingId(item ? (item as { id: string | number }).id : null);
    setModalType(type);
  };

  const closeModal = () => { setModalType(null); setEditingId(null); };

  const savePromo = async () => {
    if (!form.promoTitle?.trim()) { toast("Ponle un título al anuncio"); return; }
    if (!proId) { toast("No se encontró tu negocio"); return; }
    const val = form.promoValue ? parseFloat(form.promoValue) : null;
    const payload = {
      title: form.promoTitle.trim(),
      description: form.promoDesc?.trim() || null,
      discount_type: val != null ? (form.promoType || "percentage") : null,
      discount_value: val,
      valid_until: form.promoUntil || null,
      active: !!form.promoActive,
    };
    if (editingId) {
      const id = editingId as string;
      const { data } = await supabase.from("promotions").update(payload).eq("id", id).select().single();
      if (data) setPromos((p) => p.map((x) => x.id === id ? (data as Promo) : x));
      toast("Anuncio actualizado");
    } else {
      const { data, error } = await supabase.from("promotions").insert({ ...payload, pro_id: proId }).select().single();
      if (error || !data) { toast("No se pudo guardar"); return; }
      setPromos((p) => [data as Promo, ...p]);
      toast("Anuncio publicado");
    }
    setModalType(null); setEditingId(null);
  };

  const togglePromo = async (p: Promo) => {
    const { data } = await supabase.from("promotions").update({ active: !p.active }).eq("id", p.id).select().single();
    if (data) setPromos((prev) => prev.map((x) => x.id === p.id ? (data as Promo) : x));
  };

  const deletePromo = async (id: string) => {
    await supabase.from("promotions").delete().eq("id", id);
    setPromos((prev) => prev.filter((x) => x.id !== id));
    toast("Anuncio eliminado");
  };

  const uploadTeamPhoto = async (file: File) => {
    if (!file || !proId) return;
    setTmUploading(true);
    const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
    const path = `staff/${proId}-${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from("avatars").upload(path, file, { upsert: true, contentType: file.type });
    setTmUploading(false);
    if (error) { toast("No se pudo subir la foto"); return; }
    const { data } = supabase.storage.from("avatars").getPublicUrl(path);
    upd("tmImageUrl", data.publicUrl);
    toast("Foto lista");
  };

  // Portada del negocio (pros.image_url) — sube y guarda al instante
  const uploadCover = async (file: File) => {
    if (!file || !proId) return;
    setCoverUploading(true);
    const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
    const path = `pros/${proId}-cover-${Date.now()}.${ext}`;
    const up = await supabase.storage.from("avatars").upload(path, file, { upsert: true, contentType: file.type });
    if (up.error) { setCoverUploading(false); toast("No se pudo subir la portada"); return; }
    const url = supabase.storage.from("avatars").getPublicUrl(path).data.publicUrl;
    const { error } = await supabase.from("pros").update({ image_url: url }).eq("id", proId);
    setCoverUploading(false);
    if (error) { toast("No se pudo guardar"); return; }
    setBizRow((r) => (r ? { ...r, image_url: url } : r));
    toast("Portada actualizada");
  };

  // Galería (portfolio_photos) — sube, guarda y permite eliminar
  const uploadGalleryPhoto = async (file: File) => {
    if (!file || !proId) return;
    setGalleryUploading(true);
    const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
    const path = `portfolio/${proId}-${Date.now()}.${ext}`;
    const up = await supabase.storage.from("avatars").upload(path, file, { upsert: true, contentType: file.type });
    if (up.error) { setGalleryUploading(false); toast("No se pudo subir la foto"); return; }
    const url = supabase.storage.from("avatars").getPublicUrl(path).data.publicUrl;
    const { data, error } = await supabase.from("portfolio_photos").insert({ pro_id: proId, url, caption: null }).select("id, url, caption").single();
    setGalleryUploading(false);
    if (error || !data) { toast("No se pudo guardar"); return; }
    setGallery((g) => [...g, data as { id: string; url: string; caption: string | null }]);
    toast("Foto agregada a la galería");
  };

  const deleteGalleryPhoto = async (id: string) => {
    await supabase.from("portfolio_photos").delete().eq("id", id);
    setGallery((g) => g.filter((x) => x.id !== id));
    toast("Foto eliminada");
  };

  const saveTeam = async () => {
    if (!form.tmName?.trim()) { toast("Escribe el nombre del miembro"); return; }
    if (!proId) { toast("No se encontró tu negocio"); return; }
    const wantIds = form.tmServiceIds || [];
    const fields = { name: form.tmName.trim(), role: form.tmRole?.trim() || "Especialista", image_url: form.tmImageUrl?.trim() || null };

    if (editingId) {
      const id = editingId as string;
      await supabase.from("staff").update(fields).eq("id", id);
      const prevIds = team.find((x) => x.id === id)?.service_ids || [];
      const toAdd = wantIds.filter((s) => !prevIds.includes(s));
      const toRemove = prevIds.filter((s) => !wantIds.includes(s));
      if (toAdd.length) await supabase.from("service_staff").insert(toAdd.map((service_id) => ({ staff_id: id, service_id })));
      for (const service_id of toRemove) await supabase.from("service_staff").delete().eq("staff_id", id).eq("service_id", service_id);
      setTeam((t) => t.map((x) => x.id === id ? { ...x, ...fields, service_ids: wantIds } : x));
      toast("Miembro actualizado");
    } else {
      const { data, error } = await supabase.from("staff").insert({ ...fields, pro_id: proId }).select().single();
      if (error || !data) { toast("No se pudo guardar"); return; }
      if (wantIds.length) await supabase.from("service_staff").insert(wantIds.map((service_id) => ({ staff_id: data.id, service_id })));
      setTeam((t) => [...t, { id: data.id, name: data.name, role: data.role, image_url: data.image_url, bio: data.bio, service_ids: wantIds }]);
      toast("Miembro agregado al equipo");
    }
    setModalType(null); setEditingId(null);
  };

  const deleteTeam = async (id: string) => {
    await supabase.from("staff").delete().eq("id", id);
    setTeam((prev) => prev.filter((x) => x.id !== id));
    toast("Miembro eliminado");
  };

  const onSave = () => {
    if (modalType === "service") { saveService(); }
    else if (modalType === "promo") savePromo();
    else if (modalType === "team") saveTeam();
  };

  const toggleTmService = (id: string) => {
    const cur = form.tmServiceIds || [];
    upd("tmServiceIds", cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]);
  };
  const serviceName = (id: string) => services.find((s) => s.id === id)?.name || "Servicio";

  // ── derived ──────────────────────────────────────────────────────────────────
  const titleMap: Record<string, [string, string]> = {
    perfil: [isBusiness ? "Perfil del negocio" : "Mi perfil", "Tu vitrina pública en Estilia"],
    servicios: ["Servicios", "Catálogo, precios y duración"],
    anuncios: ["Anuncios", "Crea ofertas y campañas para tu perfil"],
    equipo: ["Equipo", "Barberos y estilistas por especialidad"],
    agenda: ["Agenda", "Citas del equipo"],
    clientes: ["Clientes", "Tu base de clientes"],
    reportes: ["Reportes", "Ventas y desempeño"],
  };
  const [pageTitle, pageSubtitle] = titleMap[view] || ["Estilia", ""];

  const primaryActionMeta: Record<string, [string, React.ReactNode]> = {
    perfil: ["Ver perfil público", <ExternalLink key="ep" size={18} />],
    servicios: ["Agregar servicio", <Plus key="pl" size={18} />],
    anuncios: ["Crear anuncio", <Plus key="pl" size={18} />],
    equipo: ["Agregar miembro", <UserPlus key="up" size={18} />],
  };
  const [paLabel, paIcon] = primaryActionMeta[view] || ["Nuevo", <Plus key="pl" size={18} />];
  const runPrimaryAction = () => {
    if (view === "perfil") toast("Abriendo tu perfil público…");
    else if (view === "servicios") openModal("service");
    else if (view === "anuncios") openModal("promo");
    else if (view === "equipo") openModal("team");
  };

  const visibleCats = svcFilter === "Todos" ? CATS : [svcFilter];
  const serviceGroups = visibleCats.map((c) => ({ cat: c, icon: CAT_ICON[c] || <Scissors size={17} />, items: services.filter((x) => x.cat === c) })).filter((g) => g.items.length > 0);

  const activos = promos.filter((p) => p.active).length;

  const checks = [
    { label: "Foto de portada", done: !!bizRow?.image_url }, { label: "Descripción del negocio", done: !!bizRow?.bio },
    { label: "Servicios publicados", done: services.length > 0 }, { label: "Equipo asignado", done: team.length > 0 },
    { label: "Redes y contacto", done: true }, { label: "Métodos de pago", done: false },
  ];
  const profilePct = Math.round((checks.filter((c) => c.done).length / checks.length) * 100);

  const activePrices = services.filter((x) => x.active).map((x) => x.price);
  const fromPrice = activePrices.length ? Math.min(...activePrices).toLocaleString("es-HN") : "0";

  const business = {
    name: bizRow?.name || "Tu negocio",
    initials: getInitials(bizRow?.name || "Mi Negocio"),
    plan: isBusiness ? "Negocio" : "Profesional",
    category: bizRow?.category || "Sin categoría",
    rating: bizRow?.rating ? String(bizRow.rating) : "Nuevo",
    reviews: bizRow?.review_count ?? 0,
    cover: bizRow?.image_url || "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=1100&q=80&auto=format&fit=crop",
    about: bizRow?.bio || "Aún no has agregado una descripción de tu negocio.",
    specialties: bizRow?.specialties ?? [],
    phone: bizRow?.whatsapp || "—",
    instagram: bizRow?.instagram || "—",
    address: bizRow?.address || "—",
  };

  const hours = [
    { d: "Lunes", h: "9:00 – 19:00" }, { d: "Martes", h: "9:00 – 19:00" }, { d: "Miércoles", h: "9:00 – 19:00" },
    { d: "Jueves", h: "9:00 – 20:00" }, { d: "Viernes", h: "9:00 – 20:00" }, { d: "Sábado", h: "8:00 – 18:00" },
    { d: "Domingo", h: "Cerrado" },
  ];

  const modalTitleMap: Record<string, string> = {
    service: editingId ? "Editar servicio" : "Nuevo servicio",
    promo: editingId ? "Editar anuncio" : "Nuevo anuncio",
    team: editingId ? "Editar miembro" : "Nuevo miembro",
  };
  const saveLabelMap: Record<string, string> = {
    service: editingId ? "Guardar cambios" : "Agregar servicio",
    promo: editingId ? "Guardar cambios" : "Publicar anuncio",
    team: editingId ? "Guardar cambios" : "Agregar al equipo",
  };

  const navBtnStyle = (active: boolean): React.CSSProperties => ({
    display: "flex", alignItems: "center", gap: 12, padding: "10px 12px",
    borderRadius: 10, border: "none", cursor: "pointer",
    background: active ? "rgba(135,90,160,0.20)" : "transparent",
    color: active ? "var(--plum-200)" : "rgba(245,239,227,0.72)",
    fontSize: 14, fontWeight: active ? 700 : 500, textAlign: "left", width: "100%",
  });

  const navIconColor = (active: boolean) => active ? "var(--plum-300)" : "rgba(245,239,227,0.6)";

  // ─── render ──────────────────────────────────────────────────────────────────
  return (
    <div style={{ fontFamily: "var(--font-sans)", color: "var(--ink-900)", background: "var(--bg-page,#faf7fc)", minHeight: "100vh", display: "flex" }}>

      {/* Backdrop del drawer (solo móvil cuando está abierto) */}
      {navOpen && <div className="dash-backdrop" onClick={() => setNavOpen(false)} />}

      {/* ═══ SIDEBAR ═══════════════════════════════════════════════════════════ */}
      <aside className={"dash-sidebar" + (navOpen ? " open" : "")} style={{ width: 252, flexShrink: 0, background: "var(--ink-900)", display: "flex", flexDirection: "column", padding: "22px 16px", position: "sticky", top: 0, height: "100vh", overflowY: "auto" }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 11, padding: "4px 8px 18px" }}>
          <div style={{ width: 34, height: 34, borderRadius: 10, background: "var(--brand)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 700, color: "#fff" }}>E</span>
          </div>
          <span style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 600, color: "var(--ink-50)" }}>Estilia</span>
          <span style={{ marginLeft: "auto", fontSize: 10, fontWeight: 700, letterSpacing: ".06em", color: "var(--gold-400)", border: "1px solid rgba(221,197,155,0.35)", padding: "3px 7px", borderRadius: 999 }}>{isBusiness ? "BIZ" : "PRO"}</span>
        </div>

        {/* Business switcher */}
        <button onClick={() => toast("Cambiar de negocio")} style={{ display: "flex", alignItems: "center", gap: 11, padding: "11px 12px", borderRadius: 10, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", cursor: "pointer", marginBottom: 18 }}>
          <span style={{ width: 34, height: 34, borderRadius: 8, background: "var(--brand)", color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 13, flexShrink: 0 }}>{business.initials}</span>
          <span style={{ flex: 1, minWidth: 0, textAlign: "left" }}>
            <span style={{ display: "block", fontSize: 13, fontWeight: 700, color: "var(--ink-50)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{business.name}</span>
            <span style={{ display: "block", fontSize: 11, color: "rgba(245,239,227,0.5)" }}>Plan {business.plan}</span>
          </span>
          <ChevronsUpDown size={16} style={{ color: "rgba(245,239,227,0.5)", flexShrink: 0 }} />
        </button>

        {/* Tu vitrina */}
        <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "rgba(245,239,227,0.36)", padding: "0 12px 8px" }}>Tu vitrina</div>
        <nav style={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {([
            { id: "perfil" as View, icon: <Store size={19} />, label: isBusiness ? "Perfil del negocio" : "Mi perfil" },
            { id: "servicios" as View, icon: <Scissors size={19} />, label: "Servicios" },
            { id: "anuncios" as View, icon: <Megaphone size={19} />, label: "Anuncios" },
            { id: "equipo" as View, icon: <Users size={19} />, label: "Equipo" },
          ] as { id: View; icon: React.ReactNode; label: string }[])
            .filter((n) => isBusiness || n.id !== "equipo")
            .map((n) => (
            <button key={n.id} onClick={() => setView(n.id)} style={navBtnStyle(view === n.id)}>
              <span style={{ color: navIconColor(view === n.id), display: "flex", alignItems: "center" }}>{n.icon}</span>{n.label}
            </button>
          ))}
        </nav>

        {/* Operación */}
        <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "rgba(245,239,227,0.36)", padding: "18px 12px 8px" }}>Operación</div>
        <nav style={{ display: "flex", flexDirection: "column", gap: 3, flex: 1 }}>
          {([
            { id: "agenda" as View, icon: <Calendar size={19} />, label: "Agenda" },
            { id: "clientes" as View, icon: <Users2 size={19} />, label: "Clientes" },
            { id: "reportes" as View, icon: <BarChart3 size={19} />, label: "Reportes" },
          ] as { id: View; icon: React.ReactNode; label: string }[]).map((n) => (
            <button key={n.id} onClick={() => setView(n.id)} style={navBtnStyle(view === n.id)}>
              <span style={{ color: navIconColor(view === n.id), display: "flex", alignItems: "center" }}>{n.icon}</span>{n.label}
            </button>
          ))}
        </nav>

        {/* Premium */}
        <div style={{ background: "linear-gradient(135deg,var(--gold-500),var(--gold-400))", borderRadius: 14, padding: 16, marginTop: 12 }}>
          <Sparkles size={20} style={{ color: "#2b1e0a" }} />
          <h4 style={{ fontSize: 14, fontWeight: 800, color: "#2b1e0a", margin: "8px 0 3px" }}>Pásate a Premium</h4>
          <p style={{ fontSize: 11.5, color: "rgba(43,30,10,0.75)", margin: "0 0 11px", lineHeight: 1.4 }}>Mejor posición y anuncios destacados dentro de la app.</p>
          <button onClick={() => { window.location.href = "/dashboard/premium"; }} style={{ width: "100%", height: 34, borderRadius: 8, border: "none", background: "#2b1e0a", color: "var(--gold-300)", fontSize: 12.5, fontWeight: 700, cursor: "pointer" }}>Mejorar plan</button>
        </div>
      </aside>

      {/* ═══ MAIN ══════════════════════════════════════════════════════════════ */}
      <div style={{ flex: 1, minWidth: 0 }}>

        {/* TOPBAR */}
        <header className="dash-topbar" style={{ display: "flex", alignItems: "center", gap: 14, padding: "22px 32px", borderBottom: "1px solid var(--border-subtle)", background: "rgba(250,247,252,0.82)", backdropFilter: "blur(10px)", position: "sticky", top: 0, zIndex: 20 }}>
          <button className="dash-burger" onClick={() => setNavOpen(true)} aria-label="Abrir menú" style={{ width: 42, height: 42, borderRadius: 10, border: "1px solid var(--border-default)", background: "#fff", cursor: "pointer", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <Menu size={20} style={{ color: "var(--ink-700)" }} />
          </button>
          <div style={{ minWidth: 0 }}>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 600, color: "var(--ink-900)", margin: 0, letterSpacing: "-0.01em" }}>{pageTitle}</h1>
            <p style={{ fontSize: 13.5, color: "var(--ink-500)", margin: "2px 0 0" }}>{pageSubtitle}</p>
          </div>
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 12 }}>
            <div className="dash-search" style={{ display: "flex", alignItems: "center", gap: 9, height: 42, padding: "0 14px", background: "#fff", border: "1px solid var(--border-default)", borderRadius: 999, width: 230 }}>
              <Search size={17} style={{ color: "var(--ink-400)", flexShrink: 0 }} />
              <input placeholder="Buscar…" style={{ flex: 1, minWidth: 0, border: "none", outline: "none", background: "transparent", fontSize: 13.5, color: "var(--ink-900)", fontFamily: "var(--font-sans)" }} />
            </div>
            <button aria-label="Notificaciones" onClick={() => toast("No tienes notificaciones nuevas")} style={{ position: "relative", width: 42, height: 42, borderRadius: 999, background: "#fff", border: "1px solid var(--border-default)", cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
              <Bell size={19} style={{ color: "var(--ink-700)" }} />
              <span style={{ position: "absolute", top: 9, right: 10, width: 8, height: 8, borderRadius: "50%", background: "var(--danger-500)", border: "2px solid #fff" }} />
            </button>
            <button onClick={runPrimaryAction} style={{ display: "inline-flex", alignItems: "center", gap: 8, height: 42, padding: "0 18px", borderRadius: 10, background: "var(--brand)", color: "#fff", border: "none", fontSize: 14, fontWeight: 700, cursor: "pointer", boxShadow: "var(--shadow-brand)" }}>
              {paIcon}{paLabel}
            </button>
          </div>
        </header>

        {/* ════ PERFIL ════════════════════════════════════════════════════════ */}
        {view === "perfil" && (
          <div style={{ padding: "26px 32px 56px" }}>
            {/* Toggle + bar */}
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20, flexWrap: "wrap" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 2, background: "#fff", border: "1px solid var(--border-default)", borderRadius: 10, padding: 3 }}>
                {(["A", "B"] as Layout[]).map((l) => (
                  <button key={l} onClick={() => setLayout(l)} style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "8px 15px", borderRadius: 8, border: "none", cursor: "pointer", fontSize: 13.5, fontWeight: 700, background: layout === l ? "var(--ink-900)" : "transparent", color: layout === l ? "var(--gold-300)" : "var(--ink-600)" }}>
                    {l === "A" ? <><LayoutPanelLeft size={16} />Vitrina</> : <><PencilRuler size={16} />Editor</>}
                  </button>
                ))}
              </div>
              <div style={{ flex: 1, minWidth: 220, display: "flex", alignItems: "center", gap: 12, background: "#fff", border: "1px solid var(--border-subtle)", borderRadius: 10, padding: "9px 16px" }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: "var(--ink-800)", whiteSpace: "nowrap" }}>Perfil {profilePct}% completo</span>
                <span style={{ flex: 1, height: 8, borderRadius: 999, background: "var(--ink-150,#ede9f2)", overflow: "hidden", display: "block" }}>
                  <span style={{ display: "block", height: "100%", width: `${profilePct}%`, background: "linear-gradient(90deg,var(--brand),var(--gold-500))", borderRadius: 999 }} />
                </span>
              </div>
              <button onClick={() => toast("Abriendo tu perfil público…")} style={{ display: "inline-flex", alignItems: "center", gap: 8, height: 42, padding: "0 16px", borderRadius: 10, border: "1px solid var(--border-default)", background: "#fff", color: "var(--ink-800)", fontSize: 13.5, fontWeight: 700, cursor: "pointer" }}>
                <ExternalLink size={16} />Ver perfil público
              </button>
            </div>

            {/* ─── Vitrina ─── */}
            {layout === "A" && (
              <div>
                {/* Cover */}
                <div style={{ position: "relative", height: 280, borderRadius: 16, overflow: "hidden", boxShadow: "var(--shadow-sm)" }}>
                  <img src={business.cover} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(28,22,34,0.86),rgba(28,22,34,0.05) 60%)" }} />
                  <label style={{ position: "absolute", top: 16, right: 16, display: "inline-flex", alignItems: "center", gap: 7, background: "rgba(255,255,255,0.92)", borderRadius: 999, padding: "8px 14px", cursor: coverUploading ? "default" : "pointer", fontSize: 13, fontWeight: 700, color: "var(--ink-900)", opacity: coverUploading ? 0.7 : 1 }}>
                    <ImageIcon size={15} />{coverUploading ? "Subiendo…" : "Cambiar portada"}
                    <input type="file" accept="image/*" disabled={coverUploading} style={{ display: "none" }}
                      onChange={(e) => { const f = e.target.files?.[0]; if (f) uploadCover(f); e.target.value = ""; }} />
                  </label>
                  <div style={{ position: "absolute", left: 24, right: 24, bottom: 22, display: "flex", alignItems: "flex-end", gap: 18 }}>
                    <div style={{ width: 88, height: 88, borderRadius: 14, background: "var(--brand)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-display)", fontSize: 34, fontWeight: 600, flexShrink: 0, border: "3px solid #fff", boxShadow: "var(--shadow-md)" }}>
                      {business.initials}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 6 }}>
                        <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--gold-300)" }}>{business.category}</span>
                        <span style={{ fontSize: 11, fontWeight: 700, background: "rgba(255,255,255,0.15)", color: "#fff", borderRadius: 999, padding: "2px 8px", display: "inline-flex", alignItems: "center", gap: 4 }}><BadgeCheck size={12} />Verificado</span>
                        <span style={{ fontSize: 11, fontWeight: 700, background: "rgba(221,197,155,0.25)", color: "var(--gold-300)", borderRadius: 999, padding: "2px 8px", border: "1px solid rgba(221,197,155,0.4)" }}>Premium</span>
                      </div>
                      <h2 style={{ fontFamily: "var(--font-display)", fontSize: 34, fontWeight: 600, color: "#fff", margin: 0, letterSpacing: "-0.01em", lineHeight: 1.05 }}>{business.name}</h2>
                      <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 8, color: "rgba(255,255,255,0.92)", fontSize: 14, fontWeight: 600, flexWrap: "wrap" }}>
                        <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><Star size={16} style={{ color: "var(--gold-300)", fill: "var(--gold-300)" }} />{business.rating} · {business.reviews} reseñas</span>
                        <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><MapPin size={15} style={{ color: "var(--gold-300)" }} />{business.address}</span>
                      </div>
                    </div>
                    <button onClick={() => setLayout("B")} style={{ display: "inline-flex", alignItems: "center", gap: 7, background: "#fff", border: "none", borderRadius: 10, padding: "10px 16px", cursor: "pointer", fontSize: 13.5, fontWeight: 700, color: "var(--ink-900)", flexShrink: 0 }}>
                      <Pencil size={15} style={{ color: "var(--brand)" }} />Editar
                    </button>
                  </div>
                </div>

                {/* 2-col grid */}
                <div className="dash-grid-2" style={{ display: "grid", gridTemplateColumns: "1.7fr 1fr", gap: 20, marginTop: 20, alignItems: "start" }}>
                  <div style={{ display: "grid", gap: 20 }}>
                    {/* Acerca de */}
                    <div style={CARD}>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                        <h3 style={{ fontSize: 16, fontWeight: 800, color: "var(--ink-900)", margin: 0 }}>Acerca de</h3>
                        <button onClick={() => setLayout("B")} style={{ width: 32, height: 32, borderRadius: 8, border: "1px solid var(--border-default)", background: "#fff", cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                          <Pencil size={15} style={{ color: "var(--ink-600)" }} />
                        </button>
                      </div>
                      <p style={{ fontSize: 14.5, color: "var(--ink-700)", lineHeight: 1.6, margin: 0 }}>{business.about}</p>
                    </div>
                    {/* Especialidades */}
                    <div style={CARD}>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                        <h3 style={{ fontSize: 16, fontWeight: 800, color: "var(--ink-900)", margin: 0 }}>Especialidades</h3>
                        <span style={{ fontSize: 13, color: "var(--ink-500)" }}>Aparecen en tu listado</span>
                      </div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 9 }}>
                        {business.specialties.map((sp) => (
                          <span key={sp} style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "var(--plum-100)", color: "var(--plum-700)", border: "1px solid #d8bfec", borderRadius: 999, padding: "7px 14px", fontSize: 13, fontWeight: 600 }}>
                            <Sparkles size={13} style={{ color: "var(--gold-500)" }} />{sp}
                          </span>
                        ))}
                        <button onClick={() => setLayout("B")} style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#fff", border: "1px dashed var(--border-default)", borderRadius: 999, padding: "7px 14px", fontSize: 13, fontWeight: 700, color: "var(--ink-600)", cursor: "pointer" }}>
                          <Plus size={14} />Agregar
                        </button>
                      </div>
                    </div>
                    {/* Galería */}
                    <div style={CARD}>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                        <h3 style={{ fontSize: 16, fontWeight: 800, color: "var(--ink-900)", margin: 0 }}>Galería</h3>
                        <span style={{ fontSize: 13, color: "var(--ink-500)" }}>{gallery.length} fotos</span>
                      </div>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(150px,1fr))", gap: 12 }}>
                        {gallery.map((g) => (
                          <div key={g.id} style={{ position: "relative", aspectRatio: "1/1", borderRadius: 10, overflow: "hidden", background: "var(--surface-beige)" }}>
                            <img src={g.url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                            <button onClick={() => deleteGalleryPhoto(g.id)} aria-label="Eliminar foto" style={{ position: "absolute", top: 6, right: 6, width: 28, height: 28, borderRadius: 8, border: "none", background: "rgba(28,22,34,0.6)", color: "#fff", cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                              <Trash2 size={14} />
                            </button>
                          </div>
                        ))}
                        <label style={{ aspectRatio: "1/1", borderRadius: 10, border: "1px dashed var(--border-default)", background: "var(--ink-50,#f9f5ff)", cursor: galleryUploading ? "default" : "pointer", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6, color: "var(--ink-500)", opacity: galleryUploading ? 0.7 : 1 }}>
                          <Plus size={22} /><span style={{ fontSize: 12, fontWeight: 700 }}>{galleryUploading ? "Subiendo…" : "Subir foto"}</span>
                          <input type="file" accept="image/*" disabled={galleryUploading} style={{ display: "none" }}
                            onChange={(e) => { const f = e.target.files?.[0]; if (f) uploadGalleryPhoto(f); e.target.value = ""; }} />
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Right sticky */}
                  <div style={{ display: "grid", gap: 20, position: "sticky", top: 104 }}>
                    <div style={CARD}>
                      <h3 style={{ fontSize: 16, fontWeight: 800, color: "var(--ink-900)", margin: "0 0 14px" }}>Estado del perfil</h3>
                      <div style={{ display: "grid", gap: 11 }}>
                        {checks.map((ck) => (
                          <div key={ck.label} style={{ display: "flex", alignItems: "center", gap: 11 }}>
                            <span style={{ width: 24, height: 24, borderRadius: 999, background: ck.done ? "var(--success-100)" : "var(--ink-100)", display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                              {ck.done ? <Check size={14} style={{ color: "var(--success-500)" }} /> : <Plus size={14} style={{ color: "var(--ink-400)" }} />}
                            </span>
                            <span style={{ fontSize: 14, fontWeight: 600, color: ck.done ? "var(--ink-800)" : "var(--ink-500)" }}>{ck.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div style={CARD}>
                      <h3 style={{ fontSize: 16, fontWeight: 800, color: "var(--ink-900)", margin: "0 0 14px" }}>Contacto</h3>
                      <div style={{ display: "grid", gap: 13, marginBottom: 16 }}>
                        <div style={{ display: "flex", gap: 11, alignItems: "center" }}><Phone size={17} style={{ color: "var(--brand)", flexShrink: 0 }} /><span style={{ fontSize: 14, color: "var(--ink-700)" }}>{business.phone}</span></div>
                        <div style={{ display: "flex", gap: 11, alignItems: "center" }}><AtSign size={17} style={{ color: "var(--brand)", flexShrink: 0 }} /><span style={{ fontSize: 14, color: "var(--ink-700)" }}>{business.instagram}</span></div>
                        <div style={{ display: "flex", gap: 11, alignItems: "flex-start" }}><MapPin size={17} style={{ color: "var(--brand)", flexShrink: 0, marginTop: 2 }} /><span style={{ fontSize: 14, color: "var(--ink-700)", lineHeight: 1.45 }}>{business.address}</span></div>
                      </div>
                      <button onClick={() => toast("Abriendo WhatsApp…")} style={{ width: "100%", height: 48, borderRadius: 10, border: "none", background: "#25D366", color: "#fff", fontSize: 14, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                        <MessageCircle size={18} />Escribir por WhatsApp
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ─── Editor ─── */}
            {layout === "B" && (
              <div className="dash-grid-2" style={{ display: "grid", gridTemplateColumns: "1.5fr 0.9fr", gap: 24, alignItems: "start" }}>
                <div style={{ display: "grid", gap: 18 }}>
                  {/* Identidad */}
                  <div style={CARD}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
                      <span style={{ width: 34, height: 34, borderRadius: 10, background: "var(--surface-beige)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}><Store size={18} style={{ color: "var(--brand)" }} /></span>
                      <h3 style={{ fontSize: 16, fontWeight: 800, color: "var(--ink-900)", margin: 0 }}>Identidad del negocio</h3>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                      <label style={{ display: "block" }}><span style={FIELD_LABEL}>Nombre</span><input value={profileForm.name} onChange={(e) => setProfileForm((f) => ({ ...f, name: e.target.value }))} style={FIELD_INPUT} /></label>
                      <label style={{ display: "block" }}><span style={FIELD_LABEL}>Categoría</span><input value={profileForm.category} onChange={(e) => setProfileForm((f) => ({ ...f, category: e.target.value }))} style={FIELD_INPUT} /></label>
                      <label style={{ display: "block", gridColumn: "1 / -1" }}><span style={FIELD_LABEL}>Descripción</span><textarea value={profileForm.bio} onChange={(e) => setProfileForm((f) => ({ ...f, bio: e.target.value }))} style={FIELD_TEXTAREA} /></label>
                      <label style={{ display: "block" }}><span style={FIELD_LABEL}>WhatsApp</span><input value={profileForm.whatsapp} onChange={(e) => setProfileForm((f) => ({ ...f, whatsapp: e.target.value }))} placeholder="50412345678" style={FIELD_INPUT} /></label>
                      <label style={{ display: "block" }}><span style={FIELD_LABEL}>Instagram</span><input value={profileForm.instagram} onChange={(e) => setProfileForm((f) => ({ ...f, instagram: e.target.value }))} placeholder="@tunegocio" style={FIELD_INPUT} /></label>
                      <label style={{ display: "block", gridColumn: "1 / -1" }}><span style={FIELD_LABEL}>Dirección</span><input value={profileForm.address} onChange={(e) => setProfileForm((f) => ({ ...f, address: e.target.value }))} placeholder="Col. Palmira, Tegucigalpa" style={FIELD_INPUT} /></label>
                    </div>
                    <button onClick={saveProfile} disabled={savingProfile} style={{ marginTop: 18, height: 46, padding: "0 20px", borderRadius: 10, border: "none", background: "var(--brand)", color: "#fff", fontSize: 14, fontWeight: 700, cursor: savingProfile ? "default" : "pointer", opacity: savingProfile ? 0.7 : 1, boxShadow: "var(--shadow-brand)", display: "inline-flex", alignItems: "center", gap: 8 }}>
                      <Check size={17} />{savingProfile ? "Guardando…" : "Guardar cambios"}
                    </button>
                  </div>
                  {/* Especialidades editor */}
                  <div style={CARD}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                      <span style={{ width: 34, height: 34, borderRadius: 10, background: "var(--surface-beige)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}><Sparkles size={18} style={{ color: "var(--brand)" }} /></span>
                      <h3 style={{ fontSize: 16, fontWeight: 800, color: "var(--ink-900)", margin: 0 }}>Especialidades</h3>
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 9, marginBottom: 14 }}>
                      {profileForm.specialties.length === 0 && <span style={{ fontSize: 13, color: "var(--ink-400)" }}>Aún no agregas especialidades.</span>}
                      {profileForm.specialties.map((sp) => (
                        <span key={sp} style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "var(--plum-100)", color: "var(--plum-700)", border: "1px solid #d8bfec", borderRadius: 999, padding: "7px 10px 7px 14px", fontSize: 13, fontWeight: 600 }}>
                          {sp}
                          <button type="button" onClick={() => removeSpec(sp)} aria-label={`Quitar ${sp}`} style={{ border: "none", background: "transparent", cursor: "pointer", color: "var(--plum-700)", display: "inline-flex", padding: 0 }}><X size={13} /></button>
                        </span>
                      ))}
                    </div>
                    <div style={{ display: "flex", gap: 8 }}>
                      <input value={newSpec} onChange={(e) => setNewSpec(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addSpec(); } }} placeholder="Ej. Balayage, Fade, Barba…" style={{ ...FIELD_INPUT, flex: 1 }} />
                      <button type="button" onClick={addSpec} style={{ height: 46, padding: "0 18px", borderRadius: 10, border: "none", background: "var(--brand)", color: "#fff", fontSize: 14, fontWeight: 700, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 7 }}><Plus size={16} />Agregar</button>
                    </div>
                    <p style={{ fontSize: 12, color: "var(--ink-400)", margin: "10px 0 0" }}>Se guardan con “Guardar cambios”.</p>
                  </div>
                  {/* Horario */}
                  <div style={CARD}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                      <span style={{ width: 34, height: 34, borderRadius: 10, background: "var(--surface-beige)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}><Clock size={18} style={{ color: "var(--brand)" }} /></span>
                      <h3 style={{ fontSize: 16, fontWeight: 800, color: "var(--ink-900)", margin: 0 }}>Horario de atención</h3>
                    </div>
                    <div style={{ display: "grid", gap: 2 }}>
                      {hours.map((hr) => (
                        <div key={hr.d} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "11px 0", borderBottom: "1px solid var(--border-subtle)" }}>
                          <span style={{ fontSize: 14, fontWeight: 600, color: "var(--ink-800)" }}>{hr.d}</span>
                          <span style={{ fontSize: 14, fontWeight: 600, color: hr.h === "Cerrado" ? "var(--ink-400)" : "var(--ink-800)" }}>{hr.h}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Phone preview */}
                <div style={{ position: "sticky", top: 104 }}>
                  <div style={CARD}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                      <Smartphone size={16} style={{ color: "var(--ink-500)" }} />
                      <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--ink-500)" }}>Vista previa en la app</span>
                    </div>
                    <div style={{ background: "var(--ink-900)", borderRadius: 34, padding: 9, boxShadow: "var(--shadow-lg)", maxWidth: 280, margin: "0 auto" }}>
                      <div style={{ background: "#faf7fc", borderRadius: 26, overflow: "hidden" }}>
                        <div style={{ position: "relative", height: 150 }}>
                          <img src={business.cover} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(28,22,34,0.7),transparent 60%)" }} />
                          <span style={{ position: "absolute", top: 12, left: "50%", transform: "translateX(-50%)", width: 74, height: 16, background: "var(--ink-900)", borderRadius: 999, display: "block" }} />
                        </div>
                        <div style={{ padding: 16 }}>
                          <div style={{ display: "inline-flex", alignItems: "center", gap: 5, background: "#e0f0ff", color: "#1d6fad", borderRadius: 999, padding: "4px 9px", fontSize: 10.5, fontWeight: 700, marginBottom: 8 }}><BadgeCheck size={12} />Negocio verificado</div>
                          <h4 style={{ fontFamily: "var(--font-display)", fontSize: 21, fontWeight: 600, color: "var(--ink-900)", margin: 0, lineHeight: 1.1 }}>{business.name}</h4>
                          <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 7, fontSize: 12.5, color: "var(--ink-600)" }}>
                            <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}><Star size={13} style={{ color: "var(--gold-400)", fill: "var(--gold-400)" }} />{business.rating}</span>
                            <span>{business.category}</span>
                          </div>
                          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 12 }}>
                            {business.specialties.slice(0, 3).map((sp) => (
                              <span key={sp} style={{ background: "var(--plum-100)", color: "var(--plum-700)", borderRadius: 999, padding: "4px 10px", fontSize: 11, fontWeight: 600 }}>{sp}</span>
                            ))}
                          </div>
                          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 14, paddingTop: 14, borderTop: "1px solid var(--border-subtle)" }}>
                            <span style={{ fontSize: 12, color: "var(--ink-500)" }}>Desde <b style={{ color: "var(--ink-900)", fontSize: 15 }}>L {fromPrice}</b></span>
                            <span style={{ background: "var(--brand)", color: "#fff", borderRadius: 999, padding: "8px 16px", fontSize: 12.5, fontWeight: 700 }}>Reservar</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ════ SERVICIOS ═════════════════════════════════════════════════════ */}
        {view === "servicios" && (
          <div style={{ padding: "26px 32px 56px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 22 }}>
              {["Todos", ...CATS].map((c) => {
                const on = svcFilter === c;
                return (
                  <button key={c} onClick={() => setSvcFilter(c)} style={{ padding: "8px 16px", borderRadius: 999, border: `1px solid ${on ? "var(--ink-900)" : "var(--border-default)"}`, background: on ? "var(--ink-900)" : "#fff", color: on ? "var(--gold-300)" : "var(--ink-700)", fontSize: 13.5, fontWeight: 700, cursor: "pointer" }}>{c}</button>
                );
              })}
              <button onClick={() => openModal("service")} style={{ marginLeft: "auto", display: "inline-flex", alignItems: "center", gap: 7, height: 40, padding: "0 16px", borderRadius: 10, border: "none", background: "var(--brand)", color: "#fff", fontSize: 13.5, fontWeight: 700, cursor: "pointer", boxShadow: "var(--shadow-brand)" }}>
                <Plus size={17} />Agregar servicio
              </button>
            </div>
            <div style={{ display: "grid", gap: 26 }}>
              {serviceGroups.length === 0 && (
                <div style={{ textAlign: "center", padding: "60px 0", color: "var(--ink-400)" }}>
                  <Scissors size={40} style={{ marginBottom: 12, opacity: 0.4 }} />
                  <p style={{ fontSize: 15, fontWeight: 600, margin: 0 }}>No hay servicios en esta categoría</p>
                </div>
              )}
              {serviceGroups.map((grp) => (
                <div key={grp.cat}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                    <span style={{ width: 32, height: 32, borderRadius: 10, background: "var(--surface-beige)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}><span style={{ color: "var(--brand)" }}>{grp.icon}</span></span>
                    <h3 style={{ fontSize: 17, fontWeight: 800, color: "var(--ink-900)", margin: 0 }}>{grp.cat}</h3>
                    <span style={{ fontSize: 13, fontWeight: 600, color: "var(--ink-400)" }}>· {grp.items.length}</span>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(320px,1fr))", gap: 14 }}>
                    {grp.items.map((s) => (
                      <div key={s.id} style={{ ...CARD, padding: "18px 20px", display: "flex", flexDirection: "column", gap: 10, opacity: s.active ? 1 : 0.62 }}>
                        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 10 }}>
                          <div style={{ minWidth: 0 }}>
                            <div style={{ fontSize: 15.5, fontWeight: 700, color: "var(--ink-900)" }}>{s.name}</div>
                            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, marginTop: 4, fontSize: 13, color: "var(--ink-500)" }}><Clock size={14} />{s.duration_min} min</div>
                          </div>
                          <span style={{ fontSize: 18, fontWeight: 800, color: "var(--ink-900)", whiteSpace: "nowrap" }}>
                            <span style={{ fontSize: 13, color: "var(--gold-500)", fontWeight: 700 }}>L</span> {s.price.toLocaleString("es-HN")}
                          </span>
                        </div>
                        <p style={{ fontSize: 13.5, color: "var(--ink-600)", lineHeight: 1.5, margin: 0, flex: 1 }}>{s.description}</p>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, borderTop: "1px solid var(--border-subtle)", paddingTop: 12 }}>
                          <label style={{ display: "inline-flex", alignItems: "center", gap: 9, cursor: "pointer" }}>
                            <Switch checked={s.active} onChange={() => toggleService(s.id)} />
                            <span style={{ fontSize: 12.5, fontWeight: 700, color: s.active ? "var(--success-500)" : "var(--ink-400)" }}>{s.active ? "Activo" : "Oculto"}</span>
                          </label>
                          <div style={{ display: "flex", gap: 6 }}>
                            <button onClick={() => openModal("service", s)} style={{ width: 34, height: 34, borderRadius: 8, border: "1px solid var(--border-default)", background: "#fff", cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center" }}><Pencil size={15} style={{ color: "var(--ink-600)" }} /></button>
                            <button onClick={() => deleteService(s.id)} style={{ width: 34, height: 34, borderRadius: 8, border: "1px solid var(--border-default)", background: "#fff", cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center" }}><Trash2 size={15} style={{ color: "var(--ink-600)" }} /></button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ════ ANUNCIOS ══════════════════════════════════════════════════════ */}
        {view === "anuncios" && (
          <div style={{ padding: "26px 32px 56px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 16, marginBottom: 22 }}>
              {[
                { value: String(activos), label: "Anuncios activos", icon: <Megaphone size={21} />, iconBg: "var(--surface-plum)", iconColor: "var(--brand)" },
                { value: String(promos.length), label: "Anuncios totales", icon: <CalendarCheck size={21} />, iconBg: "var(--success-100)", iconColor: "var(--success-500)" },
              ].map((ps, i) => (
                <div key={i} style={{ ...CARD, padding: "18px 20px", display: "flex", alignItems: "center", gap: 14 }}>
                  <span style={{ width: 44, height: 44, borderRadius: 10, background: ps.iconBg, display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><span style={{ color: ps.iconColor }}>{ps.icon}</span></span>
                  <div>
                    <div style={{ fontSize: 26, fontWeight: 800, color: "var(--ink-900)", letterSpacing: "-0.02em", lineHeight: 1 }}>{ps.value}</div>
                    <div style={{ fontSize: 13, color: "var(--ink-500)", marginTop: 3 }}>{ps.label}</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
              <h3 style={{ fontSize: 17, fontWeight: 800, color: "var(--ink-900)", margin: 0 }}>Tus anuncios <span style={{ color: "var(--ink-400)", fontWeight: 600 }}>· {promos.length}</span></h3>
              <button onClick={() => openModal("promo")} style={{ display: "inline-flex", alignItems: "center", gap: 7, height: 40, padding: "0 16px", borderRadius: 10, border: "none", background: "var(--brand)", color: "#fff", fontSize: 13.5, fontWeight: 700, cursor: "pointer", boxShadow: "var(--shadow-brand)" }}><Plus size={17} />Crear anuncio</button>
            </div>
            {promos.length === 0 ? (
              <div style={{ textAlign: "center", padding: "60px 0", color: "var(--ink-400)" }}>
                <Megaphone size={40} style={{ marginBottom: 12, opacity: 0.4 }} />
                <p style={{ fontSize: 15, fontWeight: 600, margin: 0 }}>Aún no tienes anuncios</p>
              </div>
            ) : (
            <div style={{ display: "grid", gap: 14 }}>
              {promos.map((p) => {
                const st = promoStatus(p);
                const pal = STATUS_PAL[st] || STATUS_PAL["Activa"];
                return (
                  <div key={p.id} style={{ ...CARD, padding: 0, overflow: "hidden", display: "flex", alignItems: "stretch", opacity: p.active ? 1 : 0.7, border: "1px solid var(--border-subtle)" }}>
                    <div style={{ width: 200, flexShrink: 0, background: bannerOf(p.discount_type), padding: 20, display: "flex", flexDirection: "column", justifyContent: "space-between", position: "relative", overflow: "hidden" }}>
                      <Sparkles size={60} style={{ position: "absolute", top: -8, right: -8, color: "rgba(255,255,255,0.16)" }} />
                      <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "rgba(255,255,255,0.82)", position: "relative" }}>{p.discount_type === "fixed" ? "Monto fijo" : p.discount_value != null ? "Descuento" : "Anuncio"}</span>
                      <div style={{ fontFamily: "var(--font-display)", fontSize: 34, fontWeight: 700, color: "#fff", lineHeight: 1, position: "relative" }}>{discountLabel(p)}</div>
                    </div>
                    <div style={{ flex: 1, minWidth: 0, padding: "18px 22px", display: "flex", flexDirection: "column", gap: 8 }}>
                      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 10 }}>
                        <div style={{ minWidth: 0 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 9, flexWrap: "wrap" }}>
                            <span style={{ fontSize: 16, fontWeight: 800, color: "var(--ink-900)" }}>{p.title}</span>
                            <span style={{ padding: "4px 11px", borderRadius: 999, fontSize: 11.5, fontWeight: 700, background: pal[0], color: pal[1] }}>{st}</span>
                          </div>
                          {p.description ? <p style={{ fontSize: 13.5, color: "var(--ink-600)", margin: "6px 0 0", lineHeight: 1.5 }}>{p.description}</p> : null}
                          <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 8, fontSize: 13, color: "var(--ink-500)", flexWrap: "wrap" }}>
                            <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}><Calendar size={14} />Vence: {fmtDate(p.valid_until)}</span>
                          </div>
                        </div>
                        <Switch checked={p.active} onChange={() => togglePromo(p)} />
                      </div>
                      <div style={{ display: "flex", alignItems: "center", marginTop: "auto", paddingTop: 10 }}>
                        <div style={{ marginLeft: "auto", display: "flex", gap: 6 }}>
                          <button onClick={() => openModal("promo", p)} style={{ width: 34, height: 34, borderRadius: 8, border: "1px solid var(--border-default)", background: "#fff", cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center" }}><Pencil size={15} style={{ color: "var(--ink-600)" }} /></button>
                          <button onClick={() => deletePromo(p.id)} style={{ width: 34, height: 34, borderRadius: 8, border: "1px solid var(--border-default)", background: "#fff", cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center" }}><Trash2 size={15} style={{ color: "var(--ink-600)" }} /></button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            )}
          </div>
        )}

        {/* ════ EQUIPO ════════════════════════════════════════════════════════ */}
        {view === "equipo" && isBusiness && (
          <div style={{ padding: "26px 32px 56px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 22 }}>
              <span style={{ fontSize: 14, color: "var(--ink-500)" }}>{team.length} {team.length === 1 ? "miembro" : "miembros"}</span>
              <button onClick={() => openModal("team")} style={{ marginLeft: "auto", display: "inline-flex", alignItems: "center", gap: 7, height: 40, padding: "0 16px", borderRadius: 10, border: "none", background: "var(--brand)", color: "#fff", fontSize: 13.5, fontWeight: 700, cursor: "pointer", boxShadow: "var(--shadow-brand)" }}><UserPlus size={17} />Agregar miembro</button>
            </div>
            {team.length === 0 ? (
              <div style={{ textAlign: "center", padding: "60px 0", color: "var(--ink-400)" }}>
                <Users size={40} style={{ marginBottom: 12, opacity: 0.4 }} />
                <p style={{ fontSize: 15, fontWeight: 600, margin: 0 }}>Aún no has agregado a tu equipo</p>
              </div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: 14 }}>
                {team.map((m) => (
                  <div key={m.id} style={CARD}>
                    <div style={{ display: "flex", alignItems: "center", gap: 13 }}>
                      <span style={{ width: 52, height: 52, borderRadius: 999, background: "#fce7f3", color: "#be185d", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 17, fontWeight: 700, flexShrink: 0, overflow: "hidden" }}>
                        {m.image_url ? <img src={m.image_url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : getInitials(m.name)}
                      </span>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 15.5, fontWeight: 700, color: "var(--ink-900)" }}>{m.name}</div>
                        <div style={{ fontSize: 13, color: "var(--ink-500)" }}>{m.role}</div>
                      </div>
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6, margin: "14px 0", minHeight: 22 }}>
                      {m.service_ids.length === 0 ? (
                        <span style={{ fontSize: 12.5, color: "var(--ink-400)", fontStyle: "italic" }}>Sin servicios asignados</span>
                      ) : m.service_ids.map((sid) => (
                        <span key={sid} style={{ background: "var(--ink-100)", color: "var(--ink-700)", borderRadius: 999, padding: "5px 11px", fontSize: 12, fontWeight: 600 }}>{serviceName(sid)}</span>
                      ))}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 6, borderTop: "1px solid var(--border-subtle)", paddingTop: 13 }}>
                      <button onClick={() => openModal("team", m)} style={{ width: 34, height: 34, borderRadius: 8, border: "1px solid var(--border-default)", background: "#fff", cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center" }}><Pencil size={15} style={{ color: "var(--ink-600)" }} /></button>
                      <button onClick={() => deleteTeam(m.id)} style={{ width: 34, height: 34, borderRadius: 8, border: "1px solid var(--border-default)", background: "#fff", cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center" }}><Trash2 size={15} style={{ color: "var(--ink-600)" }} /></button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ════ PLACEHOLDER ═══════════════════════════════════════════════════ */}
        {(["agenda", "clientes", "reportes"] as View[]).includes(view) && (
          <div style={{ padding: "26px 32px", display: "flex", alignItems: "center", justifyContent: "center", minHeight: 440 }}>
            <div style={{ textAlign: "center", maxWidth: 380 }}>
              <span style={{ width: 64, height: 64, borderRadius: 16, background: "var(--surface-beige)", display: "inline-flex", alignItems: "center", justifyContent: "center", margin: "0 auto" }}>
                {view === "agenda" ? <Calendar size={28} style={{ color: "var(--brand)" }} /> : view === "clientes" ? <Users2 size={28} style={{ color: "var(--brand)" }} /> : <BarChart3 size={28} style={{ color: "var(--brand)" }} />}
              </span>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 600, color: "var(--ink-900)", margin: "18px 0 6px" }}>{pageTitle}</h3>
              <p style={{ fontSize: 14.5, lineHeight: 1.55, color: "var(--ink-500)", margin: "0 0 20px" }}>Este módulo es parte del kit de negocio de Estilia. Tu enfoque ahora está en perfil, servicios, anuncios y equipo.</p>
              <button onClick={() => setView("perfil")} style={{ display: "inline-flex", alignItems: "center", gap: 7, height: 42, padding: "0 18px", borderRadius: 10, border: "1px solid var(--border-default)", background: "#fff", color: "var(--ink-800)", fontSize: 13.5, fontWeight: 700, cursor: "pointer" }}>
                <ArrowLeft size={16} />Volver al perfil
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ═══ DRAWER ════════════════════════════════════════════════════════════ */}
      {modalType && (
        <div style={{ position: "fixed", inset: 0, zIndex: 80, display: "flex", justifyContent: "flex-end" }}>
          <div onClick={closeModal} style={{ position: "absolute", inset: 0, background: "rgba(28,22,34,0.45)" }} />
          <div style={{ position: "relative", width: 480, maxWidth: "92vw", height: "100%", background: "var(--bg-page,#faf7fc)", boxShadow: "var(--shadow-xl)", display: "flex", flexDirection: "column" }}>
            {/* header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, padding: "20px 24px", borderBottom: "1px solid var(--border-subtle)", background: "#fff" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
                <span style={{ width: 36, height: 36, borderRadius: 10, background: "var(--surface-beige)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                  {modalType === "service" ? <Scissors size={19} style={{ color: "var(--brand)" }} /> : modalType === "promo" ? <Megaphone size={19} style={{ color: "var(--brand)" }} /> : <UserPlus size={19} style={{ color: "var(--brand)" }} />}
                </span>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: 21, fontWeight: 600, color: "var(--ink-900)", margin: 0 }}>{modalTitleMap[modalType] || ""}</h3>
              </div>
              <button onClick={closeModal} style={{ width: 36, height: 36, borderRadius: 8, border: "1px solid var(--border-default)", background: "#fff", cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                <X size={18} style={{ color: "var(--ink-700)" }} />
              </button>
            </div>

            {/* body */}
            <div style={{ flex: 1, overflowY: "auto", padding: 24 }}>
              {/* Service form */}
              {modalType === "service" && (
                <div style={{ display: "grid", gap: 18 }}>
                  <label style={{ display: "block" }}><span style={FIELD_LABEL}>Nombre del servicio</span><input value={form.svcTitle || ""} onChange={(e) => upd("svcTitle", e.target.value)} placeholder="Ej. Fade + barba" style={FIELD_INPUT} /></label>
                  <label style={{ display: "block" }}><span style={FIELD_LABEL}>Categoría</span>
                    <select value={form.svcCat || "Barbería"} onChange={(e) => upd("svcCat", e.target.value)} style={FIELD_SELECT}>
                      <option>Barbería</option><option>Color</option><option>Barba & afeitado</option><option>Spa & facial</option><option>Uñas</option>
                    </select>
                  </label>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    <label style={{ display: "block" }}><span style={FIELD_LABEL}>Duración (min)</span><input type="number" value={form.svcDur || ""} onChange={(e) => upd("svcDur", e.target.value)} placeholder="45" style={FIELD_INPUT} /></label>
                    <label style={{ display: "block" }}><span style={FIELD_LABEL}>Precio (HNL)</span><input type="number" value={form.svcPrice || ""} onChange={(e) => upd("svcPrice", e.target.value)} placeholder="350" style={FIELD_INPUT} /></label>
                  </div>
                  <label style={{ display: "block" }}><span style={FIELD_LABEL}>Descripción</span><textarea value={form.svcDesc || ""} onChange={(e) => upd("svcDesc", e.target.value)} placeholder="¿Qué incluye este servicio?" style={FIELD_TEXTAREA} /></label>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, background: "#fff", border: "1px solid var(--border-subtle)", borderRadius: 10, padding: "14px 16px" }}>
                    <div><div style={{ fontSize: 14, fontWeight: 700, color: "var(--ink-900)" }}>Visible para reservar</div><div style={{ fontSize: 12.5, color: "var(--ink-500)" }}>Los clientes pueden agendarlo</div></div>
                    <Switch checked={!!form.svcActive} onChange={(v) => upd("svcActive", v)} size="md" />
                  </div>
                </div>
              )}

              {/* Promo form */}
              {modalType === "promo" && (
                <div style={{ display: "grid", gap: 18 }}>
                  <div style={{ borderRadius: 14, overflow: "hidden", background: form.promoType === "fixed" ? "linear-gradient(120deg,#9a6910,var(--gold-500))" : "linear-gradient(120deg,var(--plum-700),var(--plum-500))", padding: 20, position: "relative" }}>
                    <Sparkles size={54} style={{ position: "absolute", top: -6, right: -6, color: "rgba(255,255,255,0.16)" }} />
                    <span style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", color: "rgba(255,255,255,0.82)", position: "relative", display: "block" }}>{form.promoType === "fixed" ? "Monto fijo" : "Descuento"}</span>
                    <div style={{ fontFamily: "var(--font-display)", fontSize: 30, fontWeight: 700, color: "#fff", lineHeight: 1.05, marginTop: 4, position: "relative" }}>{form.promoValue ? (form.promoType === "fixed" ? `L ${form.promoValue}` : `${form.promoValue}%`) : "—"}</div>
                    <div style={{ fontSize: 14, color: "rgba(255,255,255,0.9)", marginTop: 4, position: "relative" }}>{form.promoTitle || "Título de tu anuncio"}</div>
                  </div>
                  <label style={{ display: "block" }}><span style={FIELD_LABEL}>Título del anuncio</span><input value={form.promoTitle || ""} onChange={(e) => upd("promoTitle", e.target.value)} placeholder="Ej. 20% en tu primer corte" style={FIELD_INPUT} /></label>
                  <label style={{ display: "block" }}><span style={FIELD_LABEL}>Descripción</span><textarea value={form.promoDesc || ""} onChange={(e) => upd("promoDesc", e.target.value)} placeholder="Detalles de la promoción" style={FIELD_TEXTAREA} /></label>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    <label style={{ display: "block" }}><span style={FIELD_LABEL}>Tipo de descuento</span>
                      <select value={form.promoType || "percentage"} onChange={(e) => upd("promoType", e.target.value)} style={FIELD_SELECT}>
                        <option value="percentage">Porcentaje (%)</option><option value="fixed">Monto fijo (L)</option>
                      </select>
                    </label>
                    <label style={{ display: "block" }}><span style={FIELD_LABEL}>Valor</span><input type="number" value={form.promoValue || ""} onChange={(e) => upd("promoValue", e.target.value)} placeholder={form.promoType === "fixed" ? "650" : "20"} style={FIELD_INPUT} /></label>
                  </div>
                  <label style={{ display: "block" }}><span style={FIELD_LABEL}>Válido hasta</span><input type="date" value={form.promoUntil || ""} onChange={(e) => upd("promoUntil", e.target.value)} style={FIELD_INPUT} /></label>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, background: "#fff", border: "1px solid var(--border-subtle)", borderRadius: 10, padding: "14px 16px" }}>
                    <div><div style={{ fontSize: 14, fontWeight: 700, color: "var(--ink-900)" }}>Activar ahora</div><div style={{ fontSize: 12.5, color: "var(--ink-500)" }}>Se mostrará en tu perfil</div></div>
                    <Switch checked={!!form.promoActive} onChange={(v) => upd("promoActive", v)} size="md" />
                  </div>
                </div>
              )}

              {/* Team form */}
              {modalType === "team" && (
                <div style={{ display: "grid", gap: 18 }}>
                  {/* Foto del miembro */}
                  <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <div style={{ width: 72, height: 72, borderRadius: 999, overflow: "hidden", background: "#fce7f3", color: "#be185d", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, fontWeight: 700, flexShrink: 0 }}>
                      {form.tmImageUrl
                        ? <img src={form.tmImageUrl} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        : (form.tmName ? getInitials(form.tmName) : <UserPlus size={26} />)}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <label style={{ display: "inline-flex", alignItems: "center", gap: 8, height: 40, padding: "0 16px", borderRadius: 10, border: "1px solid var(--border-default)", background: "#fff", color: "var(--ink-800)", fontSize: 13.5, fontWeight: 700, cursor: tmUploading ? "default" : "pointer", opacity: tmUploading ? 0.6 : 1 }}>
                        <ImageIcon size={16} />{tmUploading ? "Subiendo…" : (form.tmImageUrl ? "Cambiar foto" : "Subir foto")}
                        <input type="file" accept="image/*" disabled={tmUploading} style={{ display: "none" }}
                          onChange={(e) => { const f = e.target.files?.[0]; if (f) uploadTeamPhoto(f); e.target.value = ""; }} />
                      </label>
                      {form.tmImageUrl && (
                        <button type="button" onClick={() => upd("tmImageUrl", "")} style={{ height: 40, padding: "0 12px", borderRadius: 10, border: "1px solid var(--border-default)", background: "#fff", color: "var(--ink-500)", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Quitar</button>
                      )}
                    </div>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    <label style={{ display: "block" }}><span style={FIELD_LABEL}>Nombre</span><input value={form.tmName || ""} onChange={(e) => upd("tmName", e.target.value)} placeholder="Ej. Andrea Maradiaga" style={FIELD_INPUT} /></label>
                    <label style={{ display: "block" }}><span style={FIELD_LABEL}>Rol / cargo</span><input value={form.tmRole || ""} onChange={(e) => upd("tmRole", e.target.value)} placeholder="Ej. Barbero senior" style={FIELD_INPUT} /></label>
                  </div>
                  <div>
                    <span style={{ ...FIELD_LABEL, display: "block", marginBottom: 9 }}>Servicios que ofrece</span>
                    {services.length === 0 ? (
                      <p style={{ fontSize: 13, color: "var(--ink-500)", margin: 0 }}>Primero agrega servicios en la sección “Servicios”.</p>
                    ) : (
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                        {services.map((s) => {
                          const on = (form.tmServiceIds || []).includes(s.id);
                          return (
                            <button key={s.id} type="button" onClick={() => toggleTmService(s.id)} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "7px 13px", borderRadius: 999, cursor: "pointer", fontSize: 13, fontWeight: 600, background: on ? "var(--plum-100)" : "#fff", color: on ? "var(--plum-700)" : "var(--ink-600)", border: `1px solid ${on ? "#d8bfec" : "var(--border-default)"}` }}>
                              {on ? <Check size={13} /> : <Plus size={13} />}{s.name}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* footer */}
            <div style={{ display: "flex", gap: 12, padding: "18px 24px", borderTop: "1px solid var(--border-subtle)", background: "#fff" }}>
              <button onClick={closeModal} style={{ flex: 1, height: 48, borderRadius: 10, border: "1px solid var(--border-default)", background: "#fff", color: "var(--ink-800)", fontSize: 14.5, fontWeight: 700, cursor: "pointer" }}>Cancelar</button>
              <button onClick={onSave} style={{ flex: 1.4, height: 48, borderRadius: 10, border: "none", background: "var(--brand)", color: "#fff", fontSize: 14.5, fontWeight: 700, cursor: "pointer", boxShadow: "var(--shadow-brand)", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                <Check size={18} />{saveLabelMap[modalType] || "Guardar"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ═══ TOAST ═════════════════════════════════════════════════════════════ */}
      <Toast msg={toastMsg} show={toastShow} />
    </div>
  );
}
