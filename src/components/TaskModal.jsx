import React from "react";

const TaskModal = ({ show, taskForm, setTaskForm, onSubmit, onClose, editTask }) => {
  if (!show) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="bg-white p-6 rounded-lg">
        <h2>{editTask ? "Edit Task" : "Create Task"}</h2>
        <form onSubmit={onSubmit}>
          {/* Inputs */}
          <button type="submit">{editTask ? "Update" : "Create"}</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
