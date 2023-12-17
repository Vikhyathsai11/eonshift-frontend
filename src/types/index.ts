export type FirebaseDate = {
  nanoseconds: number;
  seconds: number;
};

export type FacilityDocument = {
  created_at: FirebaseDate;
  updated_at: FirebaseDate;
  id: string;
  location: {
    _lat: number;
    _long: number;
  };
  name: string;
  owner_id: string;
  total_consumption: {
    current_energy_usage: number;
    daily_average_usage: number;
    peak_usage: number;
    carbon_footprint: number;
  };
  type: string;
};

export type DeviceDocument = {
  created_at: FirebaseDate;
  updated_at: FirebaseDate;
  energy_usage: number;
  status: string;
  id: string;
};
