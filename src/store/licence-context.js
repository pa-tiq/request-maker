import { createContext, useState } from 'react';
import useHttp from '../hooks/use-http';

export const LicenceContext = createContext({
  licences: {},
  isLoading: false,
  error: null,
  fetchLicences: async (ticketId) => {},
});

const LicenceContextProvider = (props) => {
  const httpObj = useHttp();
  const [licences, setLicences] = useState({});

  const fetchLicences = async (ticketId) => {
    let ticket = ticketId ? ticketId : 6273
    const requestConfig = {
      url: `https://zoo.cigs.eb.mil.br/apiticket/find/${ticket}`,
    };
    const updateLicences = (newFiles) => {
      setLicences(newFiles);
    };
    httpObj.sendRequest(requestConfig, updateLicences);
  };

  return (
    <LicenceContext.Provider
      value={{
        licences: licences,
        isLoading: httpObj.isLoading,
        error: httpObj.error,
        fetchLicences: fetchLicences,
      }}
    >
      {props.children}
    </LicenceContext.Provider>
  );
};

export default LicenceContextProvider;
