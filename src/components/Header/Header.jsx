/** @format */

import React, { useState, useEffect } from "react";
import { FaUser, FaSignOutAlt, FaSave, FaFile } from "react-icons/fa";
import "./style.css";
import SaveFilePopUp from "../SaveFilePopUp/SaveFilePopUp";

export default function Header({ setIsLogin, setUser, user, text , openPopup , onClose}) {
  const [userFiles, setUserFiles] = useState(user.files);

  useEffect(() => {
    if (user && user.files) {
      setUserFiles(user.files);
    } else {
      setUserFiles([]);
    }
  }, [user]);

  const handleLogout = () => {
    setIsLogin(false);
  };

  const handleSaveFile = () => {
    openPopup(<SaveFilePopUp onClose={onClose} file={text} userName={user.username}  setUser={setUser}/>);
  };

  return (
    <header className="header">
      <div className="user-info">
        <FaUser className="user-icon" />
        <p className="user-name">{user?.username || "Guest"}</p>
      </div>
      
      <div className="user-files">
        {userFiles && userFiles.length > 0 ? (
          userFiles.map((file, index) => (
            <div key={index} className="file-card">
              <FaFile className="file-icon" />
              <span className="file-name">{file.name}</span>
            </div>
          ))
        ) : (
          <p className="no-files">No saved files</p>
        )}
      </div>
      
      <div className="action-buttons">
        <button className="save-btn" onClick={handleSaveFile}>
          <FaSave className="btn-icon" />
          <span>Save</span>
        </button>
        <button className="logout-btn" onClick={handleLogout}>
          <FaSignOutAlt className="btn-icon" />
          <span>Logout</span>
        </button>
      </div>
    </header>
  );
}