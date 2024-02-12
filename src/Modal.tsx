import React, { useState } from "react";
import "./Modal.css";

interface ModalProps {
  closeModal: () => void;
  handleSubmit: (title: string, content: string) => void; // Adjusted function signature to accept title and content
}

const Modal: React.FC<ModalProps> = ({ closeModal, handleSubmit }) => {
  const [title, setTitle] = useState<string>(""); // State for title
  const [content, setContent] = useState<string>(""); // State for content

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value); // Update title state when input changes
  };

  const handleContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value); // Update content state when textarea changes
  };

  const handleFormSubmit = () => {
    // Logic to handle form submission
    handleSubmit(title, content);
    closeModal(); // Close the modal after submission
  };

  const handleCancel = () => {
    closeModal(); // Close the modal without submitting
  };

  return (
    <div className="modal-background">
      <div className="modal-content">
        <input
          type="text"
          placeholder="Add Title..."
          value={title}
          onChange={handleTitleChange} // Call handleTitleChange when input changes
        />
        <textarea
          className="content-input"
          placeholder="Add Content..."
          value={content}
          onChange={handleContentChange} // Call handleContentChange when textarea changes
        />
        <div className="modal-buttons">
          <button onClick={handleFormSubmit}>Submit</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
