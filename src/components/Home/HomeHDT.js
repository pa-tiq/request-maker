import React, { useContext, useEffect, useState } from 'react';
import { LicenceContext } from '../../store/licence-context';
import classes from './Home.module.css';

const HomeHDT = () => {
  const licenceContext = useContext(LicenceContext);

  const [ticketId, setTicketId] = useState(50);
  const [makeRequest, setMakeRequest] = useState(true);

  const tickedIdChangeHandler = (e) => {
    setTicketId(e.target.value);
  };

  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      setMakeRequest(true);
    }
  }

  const makeRequestHandler = (e) => {
    setMakeRequest(true);
  };

  useEffect(() => {
    async function getLicences() {
      await licenceContext.fetchHDT(ticketId);
    }
    if (makeRequest) {
      getLicences();
      setMakeRequest(false);
    }
  }, [makeRequest]);

  let results = <h3>Nada ainda</h3>;

  if (licenceContext.userData) {
    let coisas = [];
    licenceContext.userData.forEach((item) => {
      for (const [key, value] of Object.entries(item)) {
        coisas.push({ key, value });
      }
    });
    results = (
      <>
        {coisas.map((item, idx) => {
          return (
            <div key={idx}>
              <h3>{`${item.key} - ${
                typeof item.value === 'object' && item.value
                  ? Object.entries(item.value)
                  : item.value
              }`}</h3>
            </div>
          );
        })}
      </>
    );
  }

  return (
    <section className={classes.homepage}>
      <div className={classes.home}>
        <label>User ID</label>
        <input
          type='number'
          onChange={tickedIdChangeHandler}
          value={ticketId}
          onKeyDown={handleKeyDown}
        />
        <button type='submit' onClick={makeRequestHandler}>
          Request
        </button>
        {results}
      </div>
    </section>
  );
};

export default HomeHDT;
