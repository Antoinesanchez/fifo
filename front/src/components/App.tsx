import React, { useState, useEffect } from 'react';
import '../styles/App.css';
import Header from './Header';
import ActionList from './ActionList';
import Queue from './Queue';
import { socket } from '../helpers/sockets';
import { currentStateHelper } from '../helpers/apiHelper';
import { actionCreditProps } from './ActionCredit';

interface socketState {
  actionList: string[];
  creditList: Record<string, number>;
}

function App() {
  // socket state
  const [isConnected, setIsConnected] = useState(socket.connected);

  // business logic state
  const [actions, setActions] = useState<Array<string>>([]);
  const [creditState, setCreditState] = useState<Array<actionCreditProps>>([]);

  useEffect(() => {
    const onConnect = () => {
      setIsConnected(true);
    };

    // unused: uncomment if needed
    // const onDisconnect = () => {
    //   setIsConnected(false);
    // };

    // both action will have same behavior but it should be different events, should those behavior differ someday
    const onRemoveActionEvent = (state: socketState) => {
      const { actionList, creditList } = state;
      setActions(actionList);
      const creditState = formatCreditList(creditList);
      setCreditState(creditState);
    };

    const onCreditResetEvent = (state: socketState) => {
      const { actionList, creditList } = state;
      setActions(actionList);
      const creditState = formatCreditList(creditList);
      setCreditState(creditState);
    };

    socket.emit('connection');
    socket.on('remove first action', onRemoveActionEvent);
    socket.on('resetted credits', onCreditResetEvent);

    fetchState();

    return () => {
      socket.off('connect', onConnect);
      socket.off('remove first action', onRemoveActionEvent);
      socket.off('resetted credits', onCreditResetEvent);
    };
  }, []);

  const formatCreditList = (
    creditList: Record<string, number>,
  ): actionCreditProps[] => {
    return Object.entries(creditList).map((entry) => ({
      name: entry[0],
      currentCredit: entry[1],
    }));
  };

  const fetchState = async (): Promise<void> => {
    const state = await currentStateHelper();
    const { actionList, creditList } = state;
    setActions(actionList);
    const creditState = formatCreditList(creditList);
    setCreditState(creditState);
  };

  const pushAction = (name: string) => {
    setActions([...actions, name]);
  };

  return (
    <div className="App">
      <Header actions={creditState} />
      <ActionList pushAction={pushAction} />
      <Queue actions={actions} />
    </div>
  );
}

export default App;
