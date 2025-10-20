
export interface GeoLocation {
  latitude: number;
  longitude: number;
}

export interface MapDetails {
  uri: string;
  title: string;
  placeAnswerSources?: {
    reviewSnippets: {
      uri: string;
      title: string;
      text: string;
    }[];
  }[];
}

export interface MapChunk {
  maps: MapDetails;
}

export type GroundingChunk = MapChunk;
