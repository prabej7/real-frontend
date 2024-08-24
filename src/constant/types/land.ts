interface Land {
  _id: string;
  size?: string;
  parking?: boolean;
  waterTank?: boolean;
  balcony?: boolean;
  furnished?: boolean;
  roadSize?: string;
  distance?: string;
  img?: string[];
  coord?: {
    lat?: number;
    lon?: number;
  };
  price?: number;
  address?: string;
  city?: string;
}

export default Land;
