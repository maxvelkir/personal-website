const routes = [];
let outlet = null;
let currentPath = null;
let afterRouteCallback = null;

export function addRoute(path, handler) {
  routes.push({ path, handler });
}

export function setOutlet(selector) {
  outlet = document.querySelector(selector);
  if (!outlet) throw new Error(`Router outlet "${selector}" not found`);
}

export function onAfterRoute(cb) {
  afterRouteCallback = cb;
}

export function navigate(path, pushState = true) {
  path = normalizePath(path);
  if (path === currentPath) return;

  const route = matchRoute(path);
  if (!route) return;

  if (pushState) window.history.pushState({ path }, "", path);

  currentPath = path;
  render(route);
}

export function resolve() {
  const path = normalizePath(window.location.pathname);
  const route = matchRoute(path);
  if (!route) return;

  currentPath = path;
  render(route);
}

function matchRoute(path) {
  return (
    routes.find((r) => r.path === path) || routes.find((r) => r.path === "*")
  );
}

function normalizePath(path) {
  if (!path || path === "") return "/";
  if (path !== "/" && path.endsWith("/")) return path.slice(0, -1);
  return path;
}

function render(route) {
  if (!outlet) return;

  outlet.innerHTML =
    typeof route.handler === "function" ? route.handler() : route.handler;

  if (afterRouteCallback) afterRouteCallback(route.path);
  window.scrollTo({ top: 0, behavior: "smooth" });
}
