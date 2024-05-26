import { NearBindgen, near, call, view, Vector } from 'near-sdk-js'
import { Ticket } from './model'

@NearBindgen({})
class TicketBook {
  instances: Vector<Ticket> = new Vector<Ticket>("v-uid");

  @call({ payableFunction: true })
    buy_ticket({ price, text }: {price: string, text: string }) {
       const sender = near.predecessorAccountId();

    const ticket: Ticket = { sender, price, text };
    this.instances.push(ticket);
  }

  @view({})
    get_tickets({ from_index = 0, limit = 10 }: { from_index: number, limit: number }): Ticket[] {
    return this.instances.toArray().slice(from_index, from_index + limit);
  }

  @view({})
  total_tickets(): number { return this.instances.length }
}