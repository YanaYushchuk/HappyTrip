import { AccountId } from "near-sdk-js";

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

export class PostedMessage {
  sender: string;
  text: string;

  constructor({ sender, text }: PostedMessage) {
    this.sender = sender;
    this.text = text;
  }
}