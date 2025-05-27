interface BranchStatus {
  code: number;
  message: string;
}

interface BranchPhotos {
  [key: string]: any;
}

interface BranchOpeningHours {
  [day: string]: {
    open: string;
    close: string;
  }[];
}

export interface PacketaBranch {
  id: number;
  name: string;
  special?: string;
  available?: string;
  place: string;
  street: string;
  city: string;
  zip: string;
  country: string;
  currency: string;
  status: BranchStatus;
  displayFrontend: number;
  exportedUntil?: string; // YYYY-MM-DD
  enterableUntil?: string; // YYYY-MM-DD
  openUntil?: string; // YYYY-MM-DD
  openSince?: string; // YYYY-MM-DD
  directions?: string;
  directionsCar?: string;
  directionsPublic?: string;
  wheelchairAccessible: string;
  creditCardPayment: string;
  dressingRoom: number;
  claimAssistant: number;
  packetConsignment: number;
  latitude: number;
  longitude: number;
  url: string;
  maxWeight: number;
  holidayStart?: string; // YYYY-MM-DD
  holidayEnd?: string; // YYYY-MM-DD
  labelRouting?: string;
  labelName?: string;
  photos: BranchPhotos;
  openingHours: BranchOpeningHours;
}

export interface PacketaCarrier {
  id: string;
  name: string;
  available: "true" | "false"
  pickupPoints: "true" | "false"
  apiAllowed: "true" | "false"
  separateHouseNumber: "true" | "false"
  customsDeclarations: "true" | "false"
  requiresEmail: "true" | "false"
  requiresPhone: "true" | "false"
  requiresSize: "true" | "false"
  disallowsCod: "true" | "false"
  country: string;
  currency: string;
  maxWeight: string; // Comes as string
  labelRouting?: string;
  labelName?: string;
}
