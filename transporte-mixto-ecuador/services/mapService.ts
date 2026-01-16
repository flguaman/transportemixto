import type { Stop } from "@/types"
import { MAP_CONFIG } from "@/constants"

export class MapService {
  private static instance: MapService
  private leaflet: any = null

  static getInstance(): MapService {
    if (!MapService.instance) {
      MapService.instance = new MapService()
    }
    return MapService.instance
  }

  async loadLeaflet() {
    if (this.leaflet) return this.leaflet

    if (typeof window !== "undefined") {
      this.leaflet = await import("leaflet")
      return this.leaflet
    }

    return null
  }

  createMap(container: HTMLElement) {
    if (!this.leaflet || !container) return null

    const map = this.leaflet.map(container).setView(MAP_CONFIG.CENTER, MAP_CONFIG.ZOOM)

    this.leaflet
      .tileLayer(MAP_CONFIG.TILE_URL, {
        attribution: MAP_CONFIG.ATTRIBUTION,
      })
      .addTo(map)

    return map
  }

  createTerminalIcon() {
    if (!this.leaflet) return null

    return this.leaflet.divIcon({
      html: `<div style="background: #16a34a; width: 20px; height: 20px; border-radius: 50%; border: 2px solid white; display: flex; align-items: center; justify-content: center;">
               <svg width="12" height="12" fill="white" viewBox="0 0 24 24">
                 <path d="M12 2L2 7v10c0 5.55 3.84 10 9 11 1.16.21 2.76.21 3.91 0C20.16 27 24 22.55 24 17V7l-10-5z"/>
               </svg>
             </div>`,
      className: "custom-div-icon",
      iconSize: [20, 20],
      iconAnchor: [10, 10],
    })
  }

  createStopIcon() {
    if (!this.leaflet) return null

    return this.leaflet.divIcon({
      html: `<div style="background: #2563eb; width: 16px; height: 16px; border-radius: 50%; border: 2px solid white;"></div>`,
      className: "custom-div-icon",
      iconSize: [16, 16],
      iconAnchor: [8, 8],
    })
  }

  createPopupContent(stop: Stop): string {
    return `
      <div style="min-width: 200px;">
        <h3 style="margin: 0 0 8px 0; font-weight: bold; color: #16a34a;">${stop.name}</h3>
        <p style="margin: 0 0 4px 0; color: #666;"><strong>${stop.city}, ${stop.province}</strong></p>
        <p style="margin: 0 0 8px 0; font-size: 12px; color: #888;">
          ${stop.type === "terminal" ? "🏢 Terminal Principal" : "🚏 Parada Intermedia"}
        </p>
        <div style="margin-bottom: 8px;">
          <strong>Rutas:</strong><br>
          ${stop.routes.map((route) => `<span style="background: #f0f9ff; padding: 2px 6px; border-radius: 4px; font-size: 11px; margin: 2px;">${route}</span>`).join(" ")}
        </div>
        <div style="font-size: 12px; color: #666;">
          <div>📞 ${stop.phone}</div>
          <div>🕒 ${stop.hours}</div>
          <div>👥 Capacidad: ${stop.capacity} vehículos</div>
        </div>
      </div>
    `
  }

  addStopMarkers(map: any, stops: Stop[], onStopClick?: (stop: Stop) => void) {
    if (!this.leaflet || !map) return

    const terminalIcon = this.createTerminalIcon()
    const stopIcon = this.createStopIcon()

    stops.forEach((stop) => {
      const icon = stop.type === "terminal" ? terminalIcon : stopIcon
      const marker = this.leaflet.marker([stop.lat, stop.lng], { icon }).addTo(map)

      const popupContent = this.createPopupContent(stop)
      marker.bindPopup(popupContent)

      if (onStopClick) {
        marker.on("click", () => onStopClick(stop))
      }
    })
  }

  calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
    const R = 6371 // Earth's radius in kilometers
    const dLat = ((lat2 - lat1) * Math.PI) / 180
    const dLng = ((lng2 - lng1) * Math.PI) / 180
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) * Math.sin(dLng / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c
  }

  findNearestStops(userLat: number, userLng: number, stops: Stop[], limit = 5): Stop[] {
    return stops
      .map((stop) => ({
        ...stop,
        distance: this.calculateDistance(userLat, userLng, stop.lat, stop.lng),
      }))
      .sort((a, b) => a.distance - b.distance)
      .slice(0, limit)
  }
}
