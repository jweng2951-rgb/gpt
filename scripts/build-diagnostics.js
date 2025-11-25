// simple diagnostic to run during build (not auto-invoked)
console.log("Nexus Music build diagnostics");
if (!process.env.DATABASE_URL) {
  console.warn("Warning: DATABASE_URL is not set");
} else {
  console.log("DATABASE_URL is set");
}
if (!process.env.JWT_SECRET) console.warn("Warning: JWT_SECRET not set");
