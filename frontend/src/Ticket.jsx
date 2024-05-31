import PropTypes from 'prop-types';

export default function Ticket({ trip, onSubmit }) {
  return (
    <form onSubmit={onSubmit}>
      <fieldset id="fieldset">
        <div>
        <p>Reservation:</p>
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
        <input
            defaultValue={trip.price}
            id="price"            
            type="number"
            disabled
          />
        {/* <p id="price" value={trip.price} className="highlight">
          {trip.price}
        </p> */}
          <span title="NEAR Tokens">Ⓝ</span>
        </div>
        <button type="submit">
          Buy
        </button>
      </fieldset>
    </form>
  );
}

Ticket.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  trip: PropTypes.object.isRequired
};