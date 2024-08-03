interface Rooms {
  _id: string;
  flat?: boolean;
  waterFacility?: boolean;
  furnished?: boolean;
  balcony?: boolean;
  waterTank?: boolean;
  wifi?: boolean;
  noOfRooms?: string;
  maxPeople?: string;
  paymentmode?: string;
  noticePeriod?: string;
  restrictions?: string;
  securityDeposite?: string;
  address?: string;
  coord?: Location;
  img: string[];
}

export default Rooms;
