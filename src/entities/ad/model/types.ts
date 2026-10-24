export interface Ad {
  id: string;
  category: string;
  title: string;
  url?: string | null;
  img?: string | null;
}

export interface AdState {
  ads: Ad[];
  currentAd: Ad | null;
  loading: boolean;
  error: string | null;
}

export interface AdsResponse {
  ads: Ad[];
}
