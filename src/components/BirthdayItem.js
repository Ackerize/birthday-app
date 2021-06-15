import React from "react";
import { useHistory } from 'react-router-dom'
import { fomartItemDate, diffDays } from "../utils/constants";

export const BirthdayItem = ({ id, person, birthday }) => {
  const history = useHistory();
  const days = diffDays(birthday);
  return (
    <div className="birthday-item-container" onClick={() => history.push(`/birthday/${id}`)}>
      <div className="birthday-name-container">
        <p className="birthday-person">{person}</p>
        <p className="birthday-date">{`Birthday on ${fomartItemDate(
          birthday
        )}`}</p>
      </div>
      <div className="birthday-timer">
        {days === 0 ? <span>{`today`}</span> : <span>{`${days} days`}</span>}
      </div>
    </div>
  );
};
