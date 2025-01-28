export interface Plant {
  id: string;
  thumbnail_image: string;
  embed: string;
  webp: string;
  gif: string;
  plant_name: string;
  price: number;
}

export interface Category {
  category: string;
  description: string;
  plants: Plant[];
}

export interface HouseplantData {
  houseplants: Category[];
}

export interface CartItem extends Plant {
  quantity: number;
}
