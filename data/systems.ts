type System = {
  name: string
  key?: string
  tgdbPlatformId?: number
}

export const systems: System[] = [
  { name: 'Microsoft Windows', key: 'microsoft_windows', tgdbPlatformId: 1 },
  { name: 'Microsoft Xbox 360', key: 'microsoft_xbox_360', tgdbPlatformId: 15 },
  { name: 'Microsoft Xbox', key: 'microsoft_xbox', tgdbPlatformId: 14 },
  { name: 'Nintendo 3DS', key: 'nintendo_3ds', tgdbPlatformId: 4912 },
  { name: 'Nintendo 64', key: 'nintendo_64', tgdbPlatformId: 3 },
  { name: 'Nintendo DS', key: 'nintendo_ds', tgdbPlatformId: 8 },
  { name: 'Nintendo GameCube', key: 'nintendo_gamecube', tgdbPlatformId: 2 },
  { name: 'Nintendo Switch', key: 'nintendo_switch', tgdbPlatformId: 4971 },
  { name: 'Nintendo Wii U', key: 'nintendo_wii_u', tgdbPlatformId: 38 },
  { name: 'Nintendo Wii', key: 'nintendo_wii', tgdbPlatformId: 9 },
  { name: 'Sega Dreamcast', key: 'sega_dreamcast', tgdbPlatformId: 16 },
  { name: 'Sega Saturn', key: 'sega_saturn', tgdbPlatformId: 17 },
  { name: 'Sony PlayStation 2', key: 'sony_playstation_2', tgdbPlatformId: 11 },
  { name: 'Sony PlayStation 3', key: 'sony_playstation_3', tgdbPlatformId: 12 },
  {
    name: 'Sony PlayStation 4',
    key: 'sony_playstation_4',
    tgdbPlatformId: 4919,
  },
  {
    name: 'Sony PlayStation 5',
    key: 'sony_playstation_5',
    tgdbPlatformId: 4980,
  },
  {
    name: 'Sony PlayStation Portable',
    key: 'sony_playstation_portable',
    tgdbPlatformId: 13,
  },
  {
    name: 'Sony PlayStation Vita',
    key: 'sony_playstation_vita',
    tgdbPlatformId: 39,
  },
  { name: 'Sony PlayStation', key: 'sony_playstation', tgdbPlatformId: 10 },
]
