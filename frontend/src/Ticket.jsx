import PropTypes from 'prop-types';
import './Ticket.css';

export default function Ticket({ trip, onSubmit }) {
  return (
    <form onSubmit={onSubmit}>
      <fieldset id="fieldset">
        <div>
          <p>Бронювання</p>
          <h1>НАЗВА: </h1>
          <input
            id="text"
            required
            disabled
            defaultValue={trip.title}
          />
          {/* <p id="text" value={trip.title} className="highlight">
          {trip.title}
        </p> */}
        </div>
        <div>
        <h1>ЦІНА: </h1>
          <input
            defaultValue={trip.price}
            id="price"
            type="number"
            disabled
          />
          {/* <p id="price" value={trip.price} className="highlight">
          {trip.price}
        </p> */}
        </div>
        <button type="submit">
          Забронювати
        </button>
      </fieldset>
    </form>
  );
}

Ticket.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  trip: PropTypes.object.isRequired
};