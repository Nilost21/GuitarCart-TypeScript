export type Guitar = {
    id: string;
    name: string;  
    image: string;
    description: string;
    price: number;
  }


  export type CartItem = Guitar & {
    quantity: number;
  }

