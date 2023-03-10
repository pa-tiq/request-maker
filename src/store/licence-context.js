import { createContext, useState } from 'react';
import useHttp from '../hooks/use-http';

export const LicenceContext = createContext({
  ticket: {},
  userData: [],
  isLoading: false,
  error: null,
  fetchTicket: async (ticketId) => {},
  fetchHDT: async (userId) => {},
});

const LicenceContextProvider = (props) => {
  const httpObj = useHttp();
  const [ticket, setTicket] = useState({});
  const [userData, setUserData] = useState([]);

  const fetchTicket = async (ticketId) => {
    let ticket = ticketId ? ticketId : 6273
    const requestConfig = {
      url: `https://zoo.cigs.eb.mil.br/apiticket/find/${ticket}`,
      //url: `https://zoo.cigs.eb.mil.br/api/institutions/find/${ticket}`,
    };
    const updateLicences = (newFiles) => {
      setTicket(newFiles);
    };
    httpObj.sendRequest(requestConfig, updateLicences);
  };  
  
  const fetchHDT = async (userId) => {
    let id = userId ? userId : 50
    const requestConfig = {
      url: `https://zoo.cigs.eb.mil.br/api/reservations/user/${id}`,
      headers: {
        Accept : 'application/json, text/plain, */*',
        Authorization: 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjUwLCJsb2dpbiI6IjEyMzQ1Njc4OTkiLCJuYW1lIjoiU1NJIFNTSSIsImZpcnN0QWNjZXNzIjpmYWxzZSwicm9sZUlkIjo0LCJpYXQiOjE2NzMwMTg3MjAsImV4cCI6MTY3MzAyMjMyMH0.Dpv2_Kcl6mPuJXV4_dMxTPNSfiqpo6LgKpqOtfkrQfQ',
      },
    };
    const updateLicences = (newFiles) => {
      setUserData(newFiles);
    };
    httpObj.sendRequest(requestConfig, updateLicences);
  };

  return (
    <LicenceContext.Provider
      value={{
        ticket: ticket,
        userData: userData,
        isLoading: httpObj.isLoading,
        error: httpObj.error,
        fetchTicket: fetchTicket,
        fetchHDT: fetchHDT,
      }}
    >
      {props.children}
    </LicenceContext.Provider>
  );
};

export default LicenceContextProvider;
