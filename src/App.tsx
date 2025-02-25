import { lazy, Suspense, useState } from 'react';
import { Button } from './components/ui/button';
import { Route, Routes } from 'react-router';
import ListView from './pages/tasks/ListView';

const BoardView = lazy(() => import('@/pages/tasks/BoardView'));
const TimelineView = lazy(() => import('@/pages/tasks/TimelineView'));

const App = () => {
  const [count, setCount] = useState(0);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Button onClick={() => setCount(count + 1)}>Count is {count}</Button>
      <Routes>
        <Route path="/" element={<ListView />} />
        <Route path="/board" element={<BoardView />} />
        <Route path="/timeline" element={<TimelineView />} />
      </Routes>
    </Suspense>
  );
}

export default App;
