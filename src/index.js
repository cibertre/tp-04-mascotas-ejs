const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const path = require("node:path");
const { leerJson } = require("./archivos");
const PORT = 3000;
const rutaDatos = path.join(__dirname, "..", "datos", "mascotas.json");

async function main() {
    const mascotas = await leerJson(rutaDatos);
    const app = express();
    app.set("view engine", "ejs");
    app.set("views", path.join(__dirname, "..", "views"));
    app.use(expressLayouts);
    app.set("layout", "layouts/main");

    app.use(express.static(path.join(__dirname, "..", "public")));
    app.use(express.urlencoded({ extended: false }));

    app.get("/api/mascotas", (req, res) => {
        res.json(mascotas);
    });

    app.get("/", (req, res) => {
        res.render("inicio", { titulo: "Mimosos" });
    });

    app.get("/mascotas", (req, res) => {
    // Si el JSON está vacío o no tiene datos, pasamos un array vacío [] como respaldo
    res.render("mascotas/lista", {
        titulo: "Mascotas en adopción",
        mascotas: mascotas || []
    });
    });

    app.get("/mascotas/nueva", (req, res) => {
        res.render("mascotas/nueva", {
            titulo: "Nueva mascota",
            error: null,
            valores: {},
        });
    });

    app.get("/mascotas/:id", (req, res) => {
        const id = Number(req.params.id);
        const mascota = mascotas.find((elemento) => elemento.id === id);
        if (!mascota) {
            return res.status(404).render("no-encontrado", {
                titulo: "Mascota no encontrada",
                mensaje: "No existe una mascota con ese identificador.",
            });
        }
        res.render("mascotas/detalle", {
            titulo: mascota.nombre,
            mascota,
        });
    });

    app.post("/mascotas", (req, res) => {
        const { nombre, especie, raza, edad, descripcion } = req.body;
        const nombreLimpio = String(nombre ?? "").trim();
        const especieLimpia = String(especie ?? "").trim();
        const razaLimpia = String(raza ?? "").trim();
        const descripcionLimpia = String(descripcion ?? "").trim(); // <-- Agregado
        const edadNumerica = Number(edad);

        if (
            !nombreLimpio ||
            !especieLimpia ||
            !razaLimpia ||
            !Number.isFinite(edadNumerica) ||
            edadNumerica <= 0
        ) {
            return res.status(400).render("mascotas/nueva", {
                titulo: "Nueva mascota",
                error: "Completá todos los campos con valores válidos.",
                valores: req.body,
            });
        }

        const ultimoId = mascotas.reduce(
            (mayorId, mascota) => Math.max(mayorId, mascota.id),
            0,
        );

        mascotas.push({
            id: ultimoId + 1,
            nombre: nombreLimpio,
            especie: especieLimpia,
            raza: razaLimpia,
            edad: edadNumerica,
            descripcion: descripcionLimpia,
        });

        res.redirect("/mascotas");
    });

    app.listen(PORT, () => {
        console.log(`Aplicación disponible en http://localhost:${PORT}`);
    });
}

main().catch((error) => {
    console.error("No se pudo iniciar la aplicación:", error);
    process.exitCode = 1;
});