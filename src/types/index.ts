export type FacilityDocument = {
  created_at: Date;
  id: string;
  location: {
    latitude: number;
    longitude: number;
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
  updated_at: Date;
};
