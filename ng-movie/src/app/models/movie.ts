export interface Movie {
  id?: number;
  title: string;
  phase: string;
  categoryName?: string;
  releaseYear?: number;
  runningTime?: number;
  ratingName?: string;
  discFormatName?: string;
  numberDiscs?: number;
  viewingFormatName?: string;
  aspectRatioName?: string;
  status?: number;
  releaseDate?: string;
  budget?: string;
  gross?: string;
  timeStamp?: string;
  edition?: string;
  hide?: boolean;
  castAndCrew?: {
    actors?: string[],
    producers?: string[]
  }
}

