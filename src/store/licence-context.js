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
      url: `https://zoocigs.eb.mil.br/apiticket/find/${ticket}`,
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
      //url: `https://zoocigs.eb.mil.br/api/reservations/user/${id}`,
      url: `https://zoocigs.eb.mil.br/api/v1/user/${id}`,
      headers: {
        Accept: 'application/json, text/plain, */*',
        Authorization:
          'Bearer ' +
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjYyLCJsb2dpbiI6IjEyMzQ1Njc4OTkiLCJuYW1lIjoiU1NJU1NJIiwiZmlyc3RBY2Nlc3MiOmZhbHNlLCJyb2xlSWQiOjQsImlhdCI6MTY4Nzk2NTQ0MCwiZXhwIjoxNjg3OTY5MDQwfQ.scM1l2fKGhzyL7RIK7Ac9asvCZhPN2L-I5Nb2XhUKPg',
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
