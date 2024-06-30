import Board from '@/components/task/Board';
import { getAllTaskAssignment } from '@/lib/data';
import React from 'react';

const Page = async () => {
  const data = await getAllTaskAssignment();

  return <Board board={data} />;
};

export default Page;