import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { event } from "@/lib/tournaments";

// Vorschaubild beim Teilen (WhatsApp, Instagram, Facebook, ...). Ohne Foto, damit die Datei klein bleibt.
export const alt = `${event.edition}. ${event.name} · ${event.dateRange} · ${event.venue}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const navy = "#1b2336";
const gold = "#ecbc2c";
const red = "#d8323a";

export default async function Image() {
  const [regular, semibold, logo] = await Promise.all([
    readFile(join(process.cwd(), "lib/fonts/GoogleSansFlex-400.ttf")),
    readFile(join(process.cwd(), "lib/fonts/GoogleSansFlex-600.ttf")),
    readFile(join(process.cwd(), "public/logo100.png")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          position: "relative",
          width: "100%",
          height: "100%",
          backgroundColor: navy,
          backgroundImage: `radial-gradient(circle at 78% 50%, #46546f 0%, ${navy} 60%)`,
          fontFamily: "Google Sans Flex",
          color: "white",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: 40,
            top: -60,
            fontSize: 620,
            fontWeight: 600,
            letterSpacing: -40,
            lineHeight: 1,
            color: gold,
          }}
        >
          40
        </div>
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `linear-gradient(to right, ${navy} 0%, ${navy} 45%, rgba(27,35,54,0.6) 65%, rgba(27,35,54,0) 100%)`,
          }}
        />

        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", position: "relative", padding: 64, width: "100%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
            <img src={`data:image/png;base64,${logo.toString("base64")}`} width={70} height={80} />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ fontSize: 26, fontWeight: 600 }}>{event.host}</div>
              <div style={{ fontSize: 20, letterSpacing: 4, color: gold, textTransform: "uppercase" }}>Das Jubiläumsturnier</div>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 96, fontWeight: 600, lineHeight: 1, letterSpacing: -2, textTransform: "uppercase" }}>
              {`${event.edition}. ${event.name}`}
            </div>
            <div style={{ marginTop: 24, fontSize: 40, fontWeight: 600 }}>{event.dateRange}</div>
            <div style={{ marginTop: 8, fontSize: 30, color: "rgba(255,255,255,0.75)" }}>{event.venue}</div>
          </div>

          <div style={{ display: "flex" }}>
            <div style={{ display: "flex", backgroundColor: red, padding: "12px 24px", fontSize: 26, fontWeight: 600 }}>
              {`Jetzt Team anmelden · Meldeschluss ${event.registrationDeadline}`}
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Google Sans Flex", data: regular, style: "normal", weight: 400 },
        { name: "Google Sans Flex", data: semibold, style: "normal", weight: 600 },
      ],
    },
  );
}
