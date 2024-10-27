import React from 'react';
import { KanbanCardProps } from '../interfaces/types';
import { useDrag } from 'react-dnd';



export const KanbanCard: React.FC<KanbanCardProps> = ({ member, handleDelete, handleEdit, handleUpdateStatus }) => {
  
  const [{ isDragging }, drag] = useDrag({
    type: 'CARD',
    item: { member },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  return (
    <div  ref={drag} className={`bg-white rounded-lg p-4 shadow-sm hover:shadow-lg transition duration-150  ${isDragging ? 'opacity-50' : ''}`}>
    <div className='flex justify-between'>
      <h4 className="font-semibold text-gray-800">{member.name}</h4>
      <h4 className=" text-gray-800">{member.age}</h4>
      </div>
      <p className="text-sm text-gray-600">{member.email}</p>
      <p className="text-sm font-thin text-gray-600">{member.phone}</p>

      <div className="mt-4 flex justify-between">
        <button
          onClick={() => handleEdit(member)}
          className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600"
        >
          Edit
        </button>
        <button
          onClick={() => handleDelete(member.id)}
          className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700"
        >
          Delete
        </button>
      </div>
      <div className="mt-3 space-x-2 flex flex-col justify-between items-center gap-2">
        {['Unclaimed', 'First Contact', 'Preparing Work Offer', 'Send to Therapist'].map((status) => (
          <button
            key={status}
            onClick={() => handleUpdateStatus(member.id, status)}
            className={`text-xs px-2 py-1 rounded-md ${member.status === status ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          >
            {status}
          </button>
        ))}
      </div>
    </div>
  );
};
