import React from 'react';
import './MemberList.scss';


const MemberList = ({ members, onEdit, onDelete }) => {
  return (
    <div className="member-list">
      <h2>Existing Members</h2>
      <ul className="list-group">
        {members.map((member) => (
          <li key={member.id} className="list-group-item d-flex justify-content-between align-items-center">
            <span>{member.name}</span>
            <div>
              <button className="btn btn-secondary mr-2" onClick={() => onEdit(member)}>Edit</button>
              <button className="btn btn-danger" onClick={() => onDelete(member.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MemberList;
