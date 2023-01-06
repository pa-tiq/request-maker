import React, { Suspense } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Layout from './components/MainHeader/Layout';
import LoadingSpinner from './components/UI/LoadingSpinner/LoadingSpinner';
import LicenceContextProvider from './store/licence-context';
import classes from './App.module.css';
import HomeHDT from './components/Home/HomeHDT';

const Home = React.lazy(() => import('./components/Home/Home'));

function App() {
  return (
    <Layout>
      <Suspense
        fallback={
          <div className='centered'>
            <LoadingSpinner />
          </div>
        }
      >
        <main className={classes.main}>
          <LicenceContextProvider>
            <Routes>
              <Route path='/' element={<Navigate to='/ticket' />} />
              <Route path='/ticket' element={<Home />} />
              <Route path='/hdt' element={<HomeHDT />} />
            </Routes>
          </LicenceContextProvider>
        </main>
      </Suspense>
    </Layout>
  );
}

export default App;
