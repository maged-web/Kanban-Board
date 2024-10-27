import React from 'react';
import { KanbanColumnProps } from '../interfaces/types';
import { getCardCount } from '../utils/memberUtils';
import { KanbanCard } from './KanbanCard';
import { useDrop } from 'react-dnd';

export const KanbanColumn: React.FC<KanbanColumnProps> = ({
  status,
  members,
  handleDelete,
  handleEdit,
  handleUpdateStatus,
}) => {
  const [, drop] = useDrop({
    accept: 'CARD',
    drop: (item: any) => {
      if (item.member.status !== status) {
        handleUpdateStatus(item.member.id, status);
      }
    },
  });
  
  return (
    
    <div ref={drop} className="bg-sky-300 border rounded-lg p-4 shadow-md space-y-3 column" >
      <div className="flex justify-between">
        <h3 className="text-lg font-bold text-gray-700 mb-4">{status}</h3>
        <p className="bg-white p-2 rounded-full flex justify-center items-center">{getCardCount(members, status)}</p>
      </div>
      <div className="space-y-3">
        {members.filter((member) => member.status === status).map((member) => (
          <KanbanCard
            key={member.id}
            member={member}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            handleUpdateStatus={handleUpdateStatus}
          />
        ))}
      </div>
    </div>
  );
};
