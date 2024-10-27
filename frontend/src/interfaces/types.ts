export interface Member {
    id: number;
    title:string;
    name: string;
    age: number;
    email: string;
    phone: string;
    status: string;
}

export interface MemberFormProps {
  isEditing: boolean;
  onAddMember: (formData: any) => void;
  onUpdateMember: (formData: any) => void;
  currentMember: Member | null;
  setIsEditing: (value: boolean) => void;
}
export interface KanbanCardProps {
  member: Member;
  handleDelete: (id: number) => void;
  handleEdit: (member: Member) => void;
  handleUpdateStatus: (id: number, newStatus: string) => void;
}
export interface KanbanColumnProps {
  status: string;
  members: Member[];
  handleDelete: (id: number) => void;
  handleEdit: (member: Member) => void;
  handleUpdateStatus: (id: number, newStatus: string) => void;
}