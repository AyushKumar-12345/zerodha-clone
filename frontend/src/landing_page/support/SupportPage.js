import React from 'react';
import SupportHero from './SupportHero';
import CreateTicket from './CreateTicket';

function SupportPage() {
  return ( 
    <>
      {/* 1. Dynamic Support Portal Search Banner */}
      <SupportHero />
      
      {/* 2. Categorized Ticketing Matrix Directory */}
      <CreateTicket />
    </>
  );
}

export default SupportPage;