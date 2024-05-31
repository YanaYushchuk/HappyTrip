import PropTypes from 'prop-types';
import './Ticket.css';

export default function Ticket({ trip, onSubmit }) {
  return (
    <form className="ticket-form" onSubmit={onSubmit}>
      <fieldset id="fieldset" className="ticket-fieldset">
        <div className="booking-heading">
          <label className="ticket-label bigger-text">Бронювання</label>
          <br />
          <label htmlFor="title" className="ticket-label">Назва:</label>
          <input
            id="title"
            type="text"
            required
            disabled
            defaultValue={trip.title}
            className="ticket-input"
          />
        </div>
        <div className="price-container">
          <label htmlFor="price" className="ticket-label">Ціна: <span className="highlight">{trip.price} Ⓝ</span></label>
        </div>

        <div className="button-container">
          <button type="submit" className="round-button" onClick={onSubmit}>
            Забронювати
          </button>
        </div>
      </fieldset>
    </form>
  );
}

Ticket.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  trip: PropTypes.object.isRequired
};
