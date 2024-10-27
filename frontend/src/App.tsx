import React, { useEffect, useState } from 'react';
import { fetchMembers, addMember, deleteMember, updateMemberStatus, updateMember } from './services/membersApi';
import { MemberForm } from './components/MemberForm';
import { KanbanColumn } from './components/KanbanColumn';
import { Member } from './interfaces/types';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function App() {
  const [members, setMembers] = useState<Member[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentMember, setCurrentMember] = useState<Member | null>(null);

  useEffect(() => {
    const loadMembers = async () => {
      try {
        const data = await fetchMembers();
        setMembers(data);
      } catch (error) {
        console.error('Error fetching members:', error);
      }
    };

    loadMembers();
  }, []);

  const handleAddMember = async (newMemberData:Member) => {
    try {
      const newMember = await addMember(newMemberData);
      setMembers([...members, newMember]);
    } catch (error) {
      console.error('Error adding member:', error);
      alert('Failed to add member. Please try again.');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteMember(id);
      setMembers(members.filter(member => member.id !== id));
    } catch (error) {
      console.error('Error deleting member:', error);
      alert('Failed to delete member. Please try again.');
    }
  };

  const handleUpdateMember = async (updatedMemberData:any) => {
    try {
      const updatedMember = await updateMember(currentMember?.id as number, updatedMemberData);
      setMembers(members.map(member => (member.id === currentMember?.id ? { ...member, ...updatedMember } : member)));
      setIsEditing(false);
      setCurrentMember(null);
    } catch (error) {
      console.error('Error updating member:', error);
      alert('Failed to update member. Please try again.');
    }
  };

  const handleUpdateStatus = async (id: number, newStatus: string) => {
    try {
      const updatedMember = await updateMemberStatus(id, newStatus);
      setMembers(members.map(member => (member.id === id ? { ...member, status: newStatus } : member)));
    } catch (error) {
      console.error('Error updating member status:', error);
      alert('Failed to update member status. Please try again.');
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
    <div className="bg-sky-200 min-h-screen p-10">
      <header className="flex justify-center mb-8">
        <h1 className="text-3xl font-bold text-gray-700">Kanban Board</h1>
      </header>

      <div className="flex gap-10">
        {/* Form Section */}
        <MemberForm
          isEditing={isEditing}
          onAddMember={handleAddMember}
          onUpdateMember={handleUpdateMember}
          currentMember={currentMember}
          setIsEditing={setIsEditing}
        />

        {/* Kanban Board Section */}
        <div className="flex-1 grid grid-cols-4 gap-4">
          {['Unclaimed', 'First Contact', 'Preparing Work Offer', 'Send to Therapist'].map((status) => (
            <KanbanColumn
              key={status}
              status={status}
              members={members}
              handleDelete={handleDelete}
              handleEdit={(member) => {
                setCurrentMember(member);
                setIsEditing(true);
              }}
              handleUpdateStatus={handleUpdateStatus}
            />
          ))}
        </div>
      </div>
    </div>
    </DndProvider>
  );
}

export default App;
