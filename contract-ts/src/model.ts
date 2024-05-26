export const POINT_ONE = '100000000000000000000000';

export class Ticket {
  sender: string;
  price: string;
  text: string;

  constructor({ sender, price, text }: Ticket) {
    this.price = price;
    this.sender = sender;
    this.text = text;
  }
}