import { NearBindgen, near, call, view, Vector, AccountId } from 'near-sdk-js'
import { Ticket } from './model'
import { PostedMessage } from './model'


@NearBindgen({})
class TicketBook {
  instances: Vector<Ticket> = new Vector<Ticket>("v-uid");

  @call({ payableFunction: true })
  buy_ticket({ price, text }: { price: string, text: string }) {
    const sender: string = near.predecessorAccountId();

    const ticket: Ticket = { sender, price, text };
    this.instances.push(ticket);
  }


  @view({})
  get_tickets({ userId, from_index = 0, limit = 10 }: { userId: string, from_index: number, limit: number }): Ticket[] {
    return this.instances.toArray().filter((ticket) => ticket.sender === userId).slice(from_index, from_index + limit);
  }

  @view({})
  // Returns an array of messages.
  get_all_tickets({}: {}): Ticket[] {
    return this.instances.toArray();
  }

  @view({})
  total_tickets(): number { return this.instances.length }
}

@NearBindgen({})
class Comment {
  messages: Vector<PostedMessage> = new Vector<PostedMessage>("v-uid");

  @call({ payableFunction: true })
  // Public - Adds a new message.
  add_message({ text }: { text: string }) {
    // If the user attaches more than 0.1N the message is premium
    const sender = near.predecessorAccountId();

    const message: PostedMessage = { sender, text };
    this.messages.push(message);
  }

  @view({})
  // Returns an array of messages.
  get_messages({ from_index = 0, limit = 10 }: { from_index: number, limit: number }): PostedMessage[] {
    return this.messages.toArray().slice(from_index, from_index + limit);
  }

  @view({})
  total_messages(): number { return this.messages.length }
}
