import Location from "./location";

interface Hostel {
  _id?: string;
  food?: boolean;
  washroom?: boolean;
  cctv?: boolean;
  parking?: boolean;
  wifi?: boolean;
  laundry?: boolean;
  geyser?: boolean;
  fan?: boolean;
  studyTable?: boolean;
  locker?: boolean;
  cupboard?: boolean;
  doctorOnCall?: boolean;
  matress?: boolean;
  prePayment?: boolean;
  postPayment?: boolean;
  img?: string[];
  address?: string;
  coord?: Location;
  price?: number;
  city?: string;
}

export default Hostel;
