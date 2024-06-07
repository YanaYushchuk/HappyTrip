import React, { useState, useContext } from 'react';
import axios from "axios";
import { UserContext } from './UserContext.jsx';


const CommentForm = ({ tripId }) => {
  console.log('tripId:', tripId); // Додайте цей рядок для перевірки
  const { user } = useContext(UserContext);
  const [comment, setComment] = useState('');
  console.log('Comment:', comment);
  console.log('User:', user);


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!tripId) {
      console.error('tripId is undefined');
      return;
    }

    try {
      const response = await axios.post(`/trip/${tripId}/comments`, {
        description: comment, // Використовуємо значення з стану comment
        users: [user.user_id],
        trips: [tripId],
      });

      console.log('Коментар успішно створено:', response.data);
      // setComment(''); // Очищаємо текстове поле після успішного відправлення
    } catch (error) {
      console.error('Помилка під час створення коментаря:', error);
    }
  };

  return (
    <div>
      {user ? (
        <form onSubmit={handleSubmit}>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Напишіть свій коментар..."
          />
          <button type="submit">Відправити</button>
        </form>
      ) : (
        <p>Будь ласка, авторизуйтесь для залишення коментаря.</p>
      )}
    </div>
  );
};

export default CommentForm;
