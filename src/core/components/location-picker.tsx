"use client"

import type React from "react"

import { useState, useEffect, useRef, forwardRef, useImperativeHandle } from "react"
import { MapPin, Navigation, RotateCcw, Copy, Check, Search, AlertCircle } from "lucide-react"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import { Badge } from "./ui/badge"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

export interface LocationValue {
  lat: number
  lng: number
  address?: string
}

export interface LocationPickerProps {
  value?: LocationValue | null
  onChange?: (location: LocationValue | null) => void
  onBlur?: () => void
  name?: string
  id?: string
  label?: string
  description?: string
  placeholder?: string
  required?: boolean
  disabled?: boolean
  error?: string
  className?: string
  mapHeight?: number
  defaultZoom?: number
  defaultCenter?: [number, number]
  showCurrentLocation?: boolean
  showSearch?: boolean
  showCoordinates?: boolean
  showCopyButton?: boolean
  searchPlaceholder?: string
}

export interface LocationPickerRef {
  focus: () => void
  blur: () => void
  reset: () => void
  getCurrentLocation: () => void
}

declare global {
  interface Window {
    L: any
  }
}

const LocationPicker = forwardRef<LocationPickerRef, LocationPickerProps>(
  (
    {
      value,
      onChange,
      onBlur,
      name,
      id,
      label,
      description,
      placeholder = "Click on the map or search for a location",
      required = false,
      disabled = false,
      error,
      className,
      mapHeight = 400,
      defaultZoom = 13,
      defaultCenter = [40.7128, -74.006],
      showCurrentLocation = true,
      showSearch = true,
      showCoordinates = true,
      showCopyButton = true,
      searchPlaceholder = "Search for a location or address...",
    },
    ref,
  ) => {
    const [selectedLocation, setSelectedLocation] = useState<LocationValue | null>(value || null)
    const [isLoadingLocation, setIsLoadingLocation] = useState(false)
    const [mapLoaded, setMapLoaded] = useState(false)
    const [copied, setCopied] = useState(false)
    const [isFocused, setIsFocused] = useState(false)
    const mapRef = useRef<HTMLDivElement>(null)
    const mapInstanceRef = useRef<any>(null)
    const markerRef = useRef<any>(null)
    const searchInputRef = useRef<HTMLInputElement>(null)

    const [searchQuery, setSearchQuery] = useState("")
    const [isSearching, setIsSearching] = useState(false)
    const [searchSuggestions, setSearchSuggestions] = useState<any[]>([])
    const [showSuggestions, setShowSuggestions] = useState(false)

    // Sync external value changes
    useEffect(() => {
      if (value !== selectedLocation) {
        setSelectedLocation(value || null)
        if (value && mapInstanceRef.current) {
          updateMapLocation(value)
        }
      }
    }, [value])

    // Expose methods via ref
    useImperativeHandle(ref, () => ({
      focus: () => {
        searchInputRef.current?.focus()
      },
      blur: () => {
        searchInputRef.current?.blur()
        setIsFocused(false)
      },
      reset: () => {
        handleReset()
      },
      getCurrentLocation: () => {
        handleGetCurrentLocation()
      },
    }))

    useEffect(() => {
      // Load Leaflet CSS and JS
      const loadLeaflet = async () => {
        if (typeof window !== "undefined" && !window.L) {
          // Load CSS
          const link = document.createElement("link")
          link.rel = "stylesheet"
          link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          document.head.appendChild(link)

          // Load JS
          const script = document.createElement("script")
          script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
          script.onload = () => {
            setMapLoaded(true)
          }
          document.head.appendChild(script)
        } else if (window.L) {
          setMapLoaded(true)
        }
      }

      loadLeaflet()
    }, [])

    useEffect(() => {
      if (mapLoaded && mapRef.current && !mapInstanceRef.current && !disabled) {
        // Initialize map
        const map = window.L.map(mapRef.current).setView(defaultCenter, defaultZoom)

        // Add OpenStreetMap tiles
        window.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: "© OpenStreetMap contributors",
        }).addTo(map)

        // Add click event listener
        map.on("click", (e: any) => {
          if (disabled) return

          const { lat, lng } = e.latlng
          const newLocation: LocationValue = {
            lat: Number(lat.toFixed(6)),
            lng: Number(lng.toFixed(6)),
          }

          handleLocationChange(newLocation)
          reverseGeocode(lat, lng)
        })

        mapInstanceRef.current = map

        // Set initial location if provided
        if (selectedLocation) {
          updateMapLocation(selectedLocation)
        }
      }
    }, [mapLoaded, disabled])

    const updateMapLocation = (location: LocationValue) => {
      if (!mapInstanceRef.current) return

      // Remove existing marker
      if (markerRef.current) {
        mapInstanceRef.current.removeLayer(markerRef.current)
      }

      // Add new marker
      markerRef.current = window.L.marker([location.lat, location.lng])
        .addTo(mapInstanceRef.current)
        .bindPopup(location.address || `${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}`)

      // Center map on location
      mapInstanceRef.current.setView([location.lat, location.lng], defaultZoom)
    }

    const handleLocationChange = (location: LocationValue | null) => {
      setSelectedLocation(location)
      onChange?.(location)
    }

    const reverseGeocode = async (lat: number, lng: number) => {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`,
        )
        const data = await response.json()

        if (data.display_name) {
          const updatedLocation: LocationValue = {
            lat: Number(lat.toFixed(6)),
            lng: Number(lng.toFixed(6)),
            address: data.display_name,
          }
          handleLocationChange(updatedLocation)
        }
      } catch (error) {
        console.error("Geocoding error:", error)
      }
    }

    const handleGetCurrentLocation = () => {
      if (!navigator.geolocation || disabled) {
        toast("Geolocation not supported")
        return
      }

      setIsLoadingLocation(true)

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          const location: LocationValue = {
            lat: Number(latitude.toFixed(6)),
            lng: Number(longitude.toFixed(6)),
          }

          handleLocationChange(location)
          updateMapLocation(location)
          reverseGeocode(latitude, longitude)
          setIsLoadingLocation(false)

          toast("Location selected")
        },
        (_) => {
          setIsLoadingLocation(false)
          toast("Location error")
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000,
        },
      )
    }

    const searchLocation = async (query: string) => {
      if (!query.trim() || disabled) return

      setIsSearching(true)
      setShowSuggestions(false)

      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=1&addressdetails=1`,
        )
        const data = await response.json()

        if (data && data.length > 0) {
          const result = data[0]
          const lat = Number.parseFloat(result.lat)
          const lng = Number.parseFloat(result.lon)

          const location: LocationValue = {
            lat: Number(lat.toFixed(6)),
            lng: Number(lng.toFixed(6)),
            address: result.display_name,
          }

          handleLocationChange(location)
          updateMapLocation(location)

          toast("Location found")
        } else {
          toast("Location not found")
        }
      } catch (error) {
        toast("Search error")
      } finally {
        setIsSearching(false)
      }
    }

    const getSuggestions = async (query: string) => {
      if (!query.trim() || query.length < 3 || disabled) {
        setSearchSuggestions([])
        setShowSuggestions(false)
        return
      }

      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5&addressdetails=1`,
        )
        const data = await response.json()
        setSearchSuggestions(data || [])
        setShowSuggestions(true)
      } catch (error) {
        console.error("Suggestion error:", error)
        setSearchSuggestions([])
        setShowSuggestions(false)
      }
    }

    const handleSearchInputChange = (value: string) => {
      setSearchQuery(value)

      // Debounce suggestions
      const timeoutId = setTimeout(() => {
        getSuggestions(value)
      }, 300)

      return () => clearTimeout(timeoutId)
    }

    const selectSuggestion = (suggestion: any) => {
      setSearchQuery(suggestion.display_name)
      setShowSuggestions(false)
      searchLocation(suggestion.display_name)
    }

    const handleSearchSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      setShowSuggestions(false)
      searchLocation(searchQuery)
    }

    const handleReset = () => {
      if (disabled) return

      handleLocationChange(null)
      setSearchQuery("")
      setSearchSuggestions([])
      setShowSuggestions(false)

      if (mapInstanceRef.current && markerRef.current) {
        mapInstanceRef.current.removeLayer(markerRef.current)
        markerRef.current = null
      }
    }

    const copyCoordinates = async () => {
      if (selectedLocation && !disabled) {
        const coordinates = `${selectedLocation.lat}, ${selectedLocation.lng}`
        try {
          await navigator.clipboard.writeText(coordinates)
          setCopied(true)
          setTimeout(() => setCopied(false), 2000)
          toast("Copied!")
        } catch (error) {
          toast("Copy failed")
        }
      }
    }

    const handleFocus = () => {
      setIsFocused(true)
    }

    const handleBlur = () => {
      setIsFocused(false)
      onBlur?.()
    }

    const fieldId = id || name || "location-picker"
    const hasError = !!error
    const isRequired = required

    return (
      <div className={cn("space-y-2", className)}>
        {/* Label */}
        {label && (
          <Label htmlFor={fieldId} className={cn("text-sm font-medium", hasError && "text-red-600")}>
            {label}
            {isRequired && <span className="text-red-500 ml-1">*</span>}
          </Label>
        )}

        {/* Description */}
        {description && (
          <p className="text-sm text-gray-600" id={`${fieldId}-description`}>
            {description}
          </p>
        )}

        <Card
          className={cn(
            "transition-colors",
            isFocused && "ring-2 ring-blue-500 ring-offset-2",
            hasError && "border-red-500",
            disabled && "opacity-50 cursor-not-allowed",
          )}
        >
          <CardContent className="p-4 space-y-4">
            {/* Search Input */}
            {showSearch && (
              <form onSubmit={handleSearchSubmit} className="relative">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 z-10 pointer-events-none">
                      <Search className="h-4 w-4" />
                    </div>
                    <Input
                      ref={searchInputRef}
                      type="text"
                      id={fieldId}
                      name={name}
                      placeholder={searchPlaceholder}
                      value={searchQuery}
                      onChange={(e) => handleSearchInputChange(e.target.value)}
                      onFocus={() => {
                        handleFocus()
                        searchQuery.length >= 3 && setShowSuggestions(true)
                      }}
                      onBlur={() => {
                        setTimeout(() => setShowSuggestions(false), 200)
                        handleBlur()
                      }}
                      disabled={disabled || isSearching}
                      aria-describedby={description ? `${fieldId}-description` : error ? `${fieldId}-error` : undefined}
                      aria-invalid={hasError}
                      aria-required={isRequired}
                      className={cn("pl-10", hasError && "border-red-500 focus-visible:ring-red-500")}
                    />

                    {/* Search Suggestions */}
                    {showSuggestions && searchSuggestions.length > 0 && !disabled && (
                      <div className="absolute z-10 w-full mt-1 bg-background border border-border rounded-md shadow-lg max-h-60 overflow-y-auto">
                        {searchSuggestions.map((suggestion, index) => (
                          <button
                            key={index}
                            type="button"
                            onClick={() => selectSuggestion(suggestion)}
                            className="w-full px-4 py-2 text-left hover:bg-muted focus:bg-muted focus:outline-none border-b border-border last:border-b-0"
                          >
                            <div className="font-medium text-sm">
                              {suggestion.name || suggestion.display_name.split(",")[0]}
                            </div>
                            <div className="text-xs text-muted-foreground truncate">{suggestion.display_name}</div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <Button type="submit" disabled={disabled || isSearching || !searchQuery.trim()}>
                    {isSearching ? "Searching..." : "Search"}
                  </Button>
                </div>
              </form>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-2">
              {showCurrentLocation && (
                <Button
                  type="button"
                  onClick={handleGetCurrentLocation}
                  disabled={disabled || isLoadingLocation}
                  variant="outline"
                  size="sm"
                >
                  <Navigation className="h-4 w-4 mr-2" />
                  {isLoadingLocation ? "Getting Location..." : "Current Location"}
                </Button>
              )}

              {selectedLocation && (
                <>
                  <Button type="button" onClick={handleReset} disabled={disabled} variant="outline" size="sm">
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Reset
                  </Button>

                  {showCopyButton && (
                    <Button type="button" onClick={copyCoordinates} disabled={disabled} variant="outline" size="sm">
                      {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                      {copied ? "Copied!" : "Copy"}
                    </Button>
                  )}
                </>
              )}
            </div>

            {/* Map Container */}
            <div className="relative">
              <div
                ref={mapRef}
                className={cn(
                  "w-full rounded-lg border border-gray-300 bg-gray-100",
                  disabled && "pointer-events-none opacity-50",
                )}
                style={{ height: `${mapHeight}px` }}
                role="application"
                aria-label="Interactive map for location selection"
                tabIndex={disabled ? -1 : 0}
              />

              {!mapLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                    <p className="text-sm text-gray-600">Loading map...</p>
                  </div>
                </div>
              )}

              {mapLoaded && !selectedLocation && !disabled && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="bg-white/90 px-4 py-2 rounded-lg shadow-md">
                    <p className="text-sm text-gray-600">{placeholder}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Selected Location Info */}
            {selectedLocation && showCoordinates && (
              <div className="space-y-3 p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span className="font-medium text-sm">Selected Location</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs">
                        Lat
                      </Badge>
                      <span className="font-mono text-sm">{selectedLocation.lat}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs">
                        Lng
                      </Badge>
                      <span className="font-mono text-sm">{selectedLocation.lng}</span>
                    </div>
                  </div>

                  {selectedLocation.address && (
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <Badge variant="secondary" className="text-xs mt-0.5">
                          Address
                        </Badge>
                        <span className="text-sm leading-relaxed">{selectedLocation.address}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Error Message */}
        {hasError && (
          <div className="flex items-center gap-2 text-sm text-destructive" id={`${fieldId}-error`}>
            <AlertCircle className="h-4 w-4" />
            {error}
          </div>
        )}

        {/* Hidden input for form submission */}
        <input
          type="hidden"
          name={name}
          value={selectedLocation ? JSON.stringify(selectedLocation) : ""}
          aria-hidden="true"
        />
      </div>
    )
  },
)

LocationPicker.displayName = "LocationPicker"

export default LocationPicker
