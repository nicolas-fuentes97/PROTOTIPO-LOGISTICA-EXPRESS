import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { Truck, Navigation, MapPin } from "lucide-react";

interface Vehicle {
  id: number;
  lat: number;
  lng: number;
  status: string;
  speed: string;
  cargo: string;
}

interface TrafficMapProps {
  vehicles: Vehicle[];
  onVehicleClick: (id: number) => void;
  selectedVehicle: number | null;
}

export default function TrafficMap({
  vehicles,
  onVehicleClick,
  selectedVehicle,
}: TrafficMapProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();

  // Calles principales de Santiago
  const streets = [
    // Calles horizontales (Este-Oeste)
    {
      x1: 0,
      y1: 150,
      x2: 1000,
      y2: 150,
      width: 10,
      color: "#9ca3af",
      name: "Av. Providencia",
    },
    {
      x1: 0,
      y1: 250,
      x2: 1000,
      y2: 250,
      width: 12,
      color: "#9ca3af",
      name: "Av. Libertador B. O'Higgins",
    },
    {
      x1: 0,
      y1: 350,
      x2: 1000,
      y2: 350,
      width: 8,
      color: "#9ca3af",
      name: "Av. Apoquindo",
    },
    {
      x1: 0,
      y1: 450,
      x2: 1000,
      y2: 450,
      width: 10,
      color: "#9ca3af",
      name: "Av. Vicuña Mackenna",
    },
    {
      x1: 0,
      y1: 100,
      x2: 1000,
      y2: 100,
      width: 6,
      color: "#a8a29e",
    },
    {
      x1: 0,
      y1: 200,
      x2: 1000,
      y2: 200,
      width: 6,
      color: "#a8a29e",
    },
    {
      x1: 0,
      y1: 300,
      x2: 1000,
      y2: 300,
      width: 6,
      color: "#a8a29e",
    },
    {
      x1: 0,
      y1: 400,
      x2: 1000,
      y2: 400,
      width: 6,
      color: "#a8a29e",
    },
    {
      x1: 0,
      y1: 500,
      x2: 1000,
      y2: 500,
      width: 6,
      color: "#a8a29e",
    },

    // Calles verticales (Norte-Sur)
    {
      x1: 200,
      y1: 0,
      x2: 200,
      y2: 600,
      width: 10,
      color: "#9ca3af",
      name: "Av. Vicuña Mackenna",
    },
    {
      x1: 400,
      y1: 0,
      x2: 400,
      y2: 600,
      width: 8,
      color: "#9ca3af",
      name: "Av. Bulnes",
    },
    {
      x1: 600,
      y1: 0,
      x2: 600,
      y2: 600,
      width: 10,
      color: "#9ca3af",
      name: "Av. Tobalaba",
    },
    {
      x1: 800,
      y1: 0,
      x2: 800,
      y2: 600,
      width: 8,
      color: "#9ca3af",
      name: "Av. Irarrázaval",
    },
    {
      x1: 100,
      y1: 0,
      x2: 100,
      y2: 600,
      width: 6,
      color: "#a8a29e",
    },
    {
      x1: 300,
      y1: 0,
      x2: 300,
      y2: 600,
      width: 6,
      color: "#a8a29e",
    },
    {
      x1: 500,
      y1: 0,
      x2: 500,
      y2: 600,
      width: 6,
      color: "#a8a29e",
    },
    {
      x1: 700,
      y1: 0,
      x2: 700,
      y2: 600,
      width: 6,
      color: "#a8a29e",
    },
    {
      x1: 900,
      y1: 0,
      x2: 900,
      y2: 600,
      width: 6,
      color: "#a8a29e",
    },
  ];

  // Rutas de vehículos alineadas con las calles
  const vehicleRoutes = [
    // Vehículo 101: Por Av. Providencia (horizontal)
    {
      vehicleId: 101,
      path: [
        [100, 150],
        [300, 150],
        [500, 150],
        [700, 150],
      ],
      color: "#06b6d4",
    },
    // Vehículo 102: Por Av. Alameda (horizontal)
    {
      vehicleId: 102,
      path: [
        [150, 250],
        [400, 250],
        [650, 250],
        [900, 250],
      ],
      color: "#06b6d4",
    },
    // Vehículo 103: Por Av. Tobalaba (vertical) - Detenido
    {
      vehicleId: 103,
      path: [
        [600, 100],
        [600, 200],
        [600, 300],
        [600, 350],
      ],
      color: "#ef4444",
    },
    // Vehículo 104: Ruta mixta (gira en intersección)
    {
      vehicleId: 104,
      path: [
        [800, 500],
        [800, 400],
        [800, 350],
        [700, 350],
        [600, 350],
        [500, 350],
      ],
      color: "#06b6d4",
    },
    // Vehículo 105: Por Av. Bulnes (vertical) - Retornando
    {
      vehicleId: 105,
      path: [
        [400, 450],
        [400, 400],
        [400, 350],
        [400, 300],
        [400, 250],
      ],
      color: "#10b981",
    },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationTime = 0;

    const animate = () => {
      // Fondo estilo Google Maps (gris claro)
      ctx.fillStyle = "#e5e7eb";
      ctx.fillRect(0, 0, 1000, 600);

      // Dibujar bloques de edificios/áreas (manzanas)
      ctx.fillStyle = "#f3f4f6";
      for (let i = 0; i < 1000; i += 100) {
        for (let j = 0; j < 600; j += 100) {
          if ((i + j) % 200 === 0) {
            ctx.fillRect(i + 10, j + 10, 80, 80);
          }
        }
      }

      // Áreas verdes (parques)
      ctx.fillStyle = "#bbf7d0";
      ctx.fillRect(450, 80, 100, 60);
      ctx.fillRect(750, 420, 90, 70);
      ctx.fillRect(50, 280, 80, 80);

      // Dibujar calles
      streets.forEach((street) => {
        ctx.strokeStyle = street.color;
        ctx.lineWidth = street.width;
        ctx.lineCap = "butt";
        ctx.beginPath();
        ctx.moveTo(street.x1, street.y1);
        ctx.lineTo(street.x2, street.y2);
        ctx.stroke();

        // Líneas centrales (efecto carretera) solo en calles principales
        if (street.width > 7) {
          ctx.strokeStyle = "#fef3c7";
          ctx.lineWidth = 1.5;
          ctx.setLineDash([12, 12]);
          ctx.beginPath();
          ctx.moveTo(street.x1, street.y1);
          ctx.lineTo(street.x2, street.y2);
          ctx.stroke();
          ctx.setLineDash([]);
        }

        // Bordes de calles (aceras)
        ctx.strokeStyle = "#d1d5db";
        ctx.lineWidth = 1;

        // Para calles horizontales
        if (street.y1 === street.y2) {
          ctx.beginPath();
          ctx.moveTo(street.x1, street.y1 - street.width / 2);
          ctx.lineTo(street.x2, street.y2 - street.width / 2);
          ctx.stroke();

          ctx.beginPath();
          ctx.moveTo(street.x1, street.y1 + street.width / 2);
          ctx.lineTo(street.x2, street.y2 + street.width / 2);
          ctx.stroke();
        }

        // Para calles verticales
        if (street.x1 === street.x2) {
          ctx.beginPath();
          ctx.moveTo(street.x1 - street.width / 2, street.y1);
          ctx.lineTo(street.x2 - street.width / 2, street.y2);
          ctx.stroke();

          ctx.beginPath();
          ctx.moveTo(street.x1 + street.width / 2, street.y1);
          ctx.lineTo(street.x2 + street.width / 2, street.y2);
          ctx.stroke();
        }
      });

      // Dibujar rutas de vehículos con animación
      vehicleRoutes.forEach((route) => {
        ctx.strokeStyle = route.color + "99"; // 60% opacity
        ctx.lineWidth = 4;
        ctx.setLineDash([18, 12]);
        ctx.lineCap = "round";

        // Animación de líneas punteadas
        ctx.lineDashOffset = -animationTime * 2;

        ctx.beginPath();
        route.path.forEach((point, index) => {
          if (index === 0) {
            ctx.moveTo(point[0], point[1]);
          } else {
            ctx.lineTo(point[0], point[1]);
          }
        });
        ctx.stroke();
        ctx.setLineDash([]);

        // Dibujar waypoints de la ruta
        route.path.forEach((point, index) => {
          if (index > 0 && index < route.path.length - 1) {
            ctx.fillStyle = route.color + "60";
            ctx.beginPath();
            ctx.arc(point[0], point[1], 5, 0, Math.PI * 2);
            ctx.fill();

            ctx.strokeStyle = route.color;
            ctx.lineWidth = 2;
            ctx.stroke();
          }
        });
      });

      // Centro de distribución
      const centerX = 600;
      const centerY = 250;

      // Pulso animado
      const pulseRadius =
        25 + Math.sin(animationTime / 10) * 10;
      ctx.fillStyle = "#10b98140";
      ctx.beginPath();
      ctx.arc(centerX, centerY, pulseRadius, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#10b981";
      ctx.beginPath();
      ctx.arc(centerX, centerY, 12, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 12, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = "#10b981";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 18, 0, Math.PI * 2);
      ctx.stroke();

      // Incrementar tiempo de animación
      animationTime += 1;

      // Continuar animación
      animationFrameRef.current =
        requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []); // Sin dependencias - solo se ejecuta al montar

  // Convertir coordenadas lat/lng a posiciones en el mapa
  const getVehiclePosition = (vehicleId: number) => {
    const route = vehicleRoutes.find(
      (r) => r.vehicleId === vehicleId,
    );
    if (!route || route.path.length === 0)
      return { x: 50, y: 50 };

    // Usar la última posición de la ruta
    const lastPoint = route.path[route.path.length - 1];
    return { x: lastPoint[0], y: lastPoint[1] };
  };

  return (
    <div className="relative w-full h-full bg-slate-950">
      <canvas
        ref={canvasRef}
        width={1000}
        height={600}
        className="w-full h-full"
      />

      {/* Vehículos como elementos DOM */}
      {vehicles.map((vehicle) => {
        const pos = getVehiclePosition(vehicle.id);
        const percentX = (pos.x / 1000) * 100;
        const percentY = (pos.y / 600) * 100;

        const color =
          vehicle.status === "En ruta"
            ? "cyan"
            : vehicle.status === "Detenido"
              ? "red"
              : "emerald";

        const isSelected = selectedVehicle === vehicle.id;

        return (
          <motion.div
            key={vehicle.id}
            className="absolute"
            style={{
              left: `${percentX}%`,
              top: `${percentY}%`,
              transform: "translate(-50%, -50%)",
            }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.2 }}
            onClick={() => onVehicleClick(vehicle.id)}
          >
            {/* Pulso animado para vehículos en ruta */}
            {vehicle.status === "En ruta" && (
              <motion.div
                className={`absolute inset-0 -m-6 bg-${color}-500 rounded-full opacity-50`}
                animate={{
                  scale: [1, 1.8, 1],
                  opacity: [0.6, 0, 0.6],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            )}

            {/* Icono del vehículo */}
            <div
              className={`relative w-12 h-12 rounded-full flex items-center justify-center shadow-lg cursor-pointer transition-all
                ${color === "cyan" ? "bg-gradient-to-br from-cyan-500 to-cyan-600 shadow-cyan-500/50 ring-2 ring-cyan-400/30" : ""}
                ${color === "red" ? "bg-gradient-to-br from-red-500 to-red-600 shadow-red-500/50 ring-2 ring-red-400/30" : ""}
                ${color === "emerald" ? "bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-emerald-500/50 ring-2 ring-emerald-400/30" : ""}
                ${isSelected ? "ring-4 ring-white/80 scale-110" : ""}
              `}
            >
              {vehicle.status === "En ruta" ? (
                <Navigation className="w-6 h-6 text-white" />
              ) : (
                <Truck className="w-6 h-6 text-white" />
              )}
            </div>

            {/* Tooltip */}
            {isSelected && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-14 left-1/2 -translate-x-1/2 bg-slate-900/95 backdrop-blur-sm border border-slate-700 rounded-lg p-3 shadow-2xl z-50 whitespace-nowrap"
              >
                <div className="text-white mb-1">
                  Vehículo {vehicle.id}
                </div>
                <div className="text-slate-400 text-xs space-y-0.5">
                  <div>
                    Estado:{" "}
                    <span className={`text-${color}-400`}>
                      {vehicle.status}
                    </span>
                  </div>
                  <div>
                    Velocidad:{" "}
                    <span className="text-white">
                      {vehicle.speed}
                    </span>
                  </div>
                  <div>
                    Carga:{" "}
                    <span className="text-white">
                      {vehicle.cargo}
                    </span>
                  </div>
                </div>
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-slate-700"></div>
              </motion.div>
            )}
          </motion.div>
        );
      })}

      {/* Etiquetas de calles principales */}
      <div className="absolute top-[23%] left-4 text-xs text-slate-600 bg-white/80 px-2 py-1 rounded shadow-sm">
        Av. Providencia
      </div>
      <div className="absolute top-[40%] left-4 text-xs text-slate-600 bg-white/80 px-2 py-1 rounded shadow-sm">
        Av. Lib. B. O&rsquo;Higgins
      </div>
      <div className="absolute top-[73%] left-4 text-xs text-slate-600 bg-white/80 px-2 py-1 rounded shadow-sm">
        Av. Vicuña Mackenna
      </div>
      <div className="absolute top-4 left-[18%] text-xs text-slate-600 bg-white/80 px-2 py-1 rounded shadow-sm">
        Av. Vicuña Mackenna
      </div>
      <div className="absolute top-4 left-[58%] text-xs text-slate-600 bg-white/80 px-2 py-1 rounded shadow-sm">
        Av. Tobalaba
      </div>

      {/* Centro de distribución label */}
      <div className="absolute top-[40%] left-[60%] -translate-x-1/2 -translate-y-12 text-xs text-emerald-600 bg-white/95 px-3 py-1.5 rounded-lg border border-emerald-400/50 shadow-md">
        <MapPin className="w-3 h-3 inline mr-1" />
        Centro de Distribución
      </div>

      {/* Leyenda */}
      <div className="absolute bottom-4 right-4 bg-slate-900/95 backdrop-blur-sm border border-slate-800 rounded-lg p-3 z-[1000]">
        <p className="text-white text-sm mb-2">
          Estado de Vehículos
        </p>
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-cyan-500 rounded-full ring-2 ring-cyan-400/30"></div>
            <span className="text-slate-400 text-xs">
              En Ruta
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full ring-2 ring-red-400/30"></div>
            <span className="text-slate-400 text-xs">
              Detenido
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-emerald-500 rounded-full ring-2 ring-emerald-400/30"></div>
            <span className="text-slate-400 text-xs">
              Retornando
            </span>
          </div>
        </div>
      </div>

      {/* Indicador de tiempo real */}
      <div className="absolute top-4 left-4 bg-slate-900/95 backdrop-blur-sm border border-slate-800 rounded-lg px-3 py-2 flex items-center gap-2">
        <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
        <span className="text-emerald-400 text-xs">
          Live Tracking • Santiago, Chile
        </span>
      </div>
    </div>
  );
}