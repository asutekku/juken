import React, { useState, useEffect } from 'react';
import { useStoreState } from 'easy-peasy';
import _ from 'lodash';

import Review from 'src/screens/Review/Review';
import Login from 'src/screens/Login/Login';

import initEvents from 'src/features/events/initEvents';
import logEvent from 'src/features/events/logEvent';
import setUserAnalytics from 'src/features/events/setUserAnalytics';

export default () => {

  const token = useStoreState(s => s.token.data);
  const user = useStoreState(s => s.user.data);

  const [ demo, setDemo ] = useState(false);
  const [ appleDemo, setAppleDemo ] = useState(false);

  useEffect(() => {

    initEvents();

    if (user) {
      setUserAnalytics(user, () => {
        logEvent('juken_Load', {
          user: _.get(user, 'data.username')
        })
      });
    } else {
      logEvent('juken_Load')
    }
    
  }, [])

  if (demo) {
    return (
      <Review
        demo
        appleDemo={appleDemo}
        stopDemo={() => {
          setDemo(false);
          setAppleDemo(false);
        }}
      />
    );
  }

  if (!token) {
    return (
      <Login
        startDemo={apple => {
          if (apple) setAppleDemo(true);
          setDemo(true)
        }}
      />
    );
  }

  return <Review />;
};
