// ModalForm.js
import React from "react";
import "./AddLocationModal.css"; // Import your CSS for styles

const AddLocationModal = ({ onClose, onAdd, setFormData }: any) => {
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevState: any) => ({ ...prevState, [name]: value }));
  };

  //   const handleChange = (
  //     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  //   ) => {
  //     const { name, value } = e.target;
  //     setFormData((prevData: FormData) => ({
  //       ...prevData,
  //       [name]: value,
  //     }));
  //   };

  const onAddEvent = (e: any) => {
    e.preventDefault();
    onAdd(e);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Add event</h2>
        <form onSubmit={onAddEvent}>
          <div className="form-group">
            <label htmlFor="name">Event name:</label>
            <input type="text" name="name" onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Description:</label>
            <textarea name="description" onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="message">Category:</label>

            <select
              id="category"
              name="category"
              onChange={handleChange}
              required
            >
              <option value="">Select</option>
              <option value="festival">Festival</option>
              <option value="childrens_event">Childrens event</option>
            </select>
          </div>

          <div className="form-actions">
            <button
              className="regular-button modal-button"
              type="button"
              onClick={onClose}
            >
              Cancel
            </button>
            <button className="primary-button modal-button" type="submit">
              Add event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddLocationModal;
