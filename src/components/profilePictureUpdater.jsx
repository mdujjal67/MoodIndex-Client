// File: components/ProfilePictureUpdater.jsx (Adjusted)

import React, { useContext, useState, useRef, useCallback } from 'react';
import { FaCamera, FaUpload, FaUser } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { AuthContext } from '../Contexts/AuthContext';
// ⭐️ IMPORTANT: You need to import Firebase Storage functions
// Example: import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
// And get your storage instance: const storage = getStorage(app); 

// Mock Storage Functions (REPLACE THESE WITH YOUR REAL FIREBASE STORAGE LOGIC)
const mockUploadImage = async (file, userUid) => {
    // --- MOCKING FOR DEMO ---
    console.log(`Uploading file ${file.name} for user ${userUid}...`);
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay
    
    // In a real app, this should be the actual URL from Firebase Storage
    const mockUrl = `https://picsum.photos/seed/${userUid}${Date.now()}/200/200`;
    return mockUrl; 
};
// ------------------------------

const ProfilePictureUpdater = ({ user }) => {
    const { updateUserPhotoURL, user: currentUser } = useContext(AuthContext); // Assume updateUserPhotoURL exists in AuthContext
    const [isDragging, setIsDragging] = useState(false);
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef(null);

    // Function to handle image upload
    const handleFileUpload = async (file) => {
        if (!file || !currentUser) return;
        
        // Basic file type check
        if (!file.type.startsWith('image/')) {
            toast.error('Only image files are allowed.');
            return;
        }

        // ⭐️ Destructure email and displayName from the current user object
        const { email, displayName } = currentUser; 

        setUploading(true);
        try {
            // ⭐️ 1. Upload to Firebase Storage
            const photoURL = await mockUploadImage(file, currentUser.uid); // Use your real upload function

            // ⭐️ 2. Update Firebase Auth Profile (Needed for immediate UI update)
            await updateUserPhotoURL(photoURL); 

            // ⭐️ 3. Update MongoDB using the generalized PATCH /users/:email route
            await fetch(`http://localhost:9000/users/${email}`, { // 👈 URL IS NOW /users/:email
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                // ⭐️ CORRECT BODY: Send the fields to be updated
                body: JSON.stringify({ 
                    photoURL: photoURL, 
                    name: displayName // Sending name to ensure MongoDB is consistent
                })
            })
            .then(res => {
                if (!res.ok) {
                    return res.json().then(err => { throw new Error(err.message || 'MongoDB update failed.'); });
                }
                return res.json();
            });
            
            toast.success('Profile picture updated successfully!');
        } catch (error) {
            console.error('Image Upload Error:', error);
            toast.error(error.message || 'Failed to update picture. Please try again.');
        } finally {
            setUploading(false);
        }
    };

    // --- Drag and Drop Handlers ---
    const handleDragEnter = (e) => { e.preventDefault(); setIsDragging(true); };
    const handleDragLeave = (e) => { e.preventDefault(); setIsDragging(false); };
    const handleDragOver = (e) => { e.preventDefault(); setIsDragging(true); };
    
    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFileUpload(e.dataTransfer.files[0]);
        }
    };

    // --- Click Handler ---
    const handleChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            handleFileUpload(e.target.files[0]);
        }
    };
    
    const openFileSelection = () => {
        if (!uploading && fileInputRef.current) { 
            fileInputRef.current.click();
        }
    };

    return (
        <div 
            className="relative w-32 h-32 rounded-full mb-4 ring-4 ring-indigo-500 ring-offset-4 ring-offset-white cursor-pointer group"
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={openFileSelection}
        >
            <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleChange} 
                className="hidden" 
                accept="image/*"
                disabled={uploading}
            />

            {/* Current Profile Image */}
            {user?.photoURL ? (
                <img
                    className="rounded-full w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-50"
                    src={user.photoURL}
                    alt={`${user.displayName || 'User'}'s profile`}
                />
            ) : (
                <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center">
                    <FaUser className="text-6xl text-indigo-300" />
                </div>
            )}
            
            {/* Overlay for Drag/Drop or Click */}
            <div 
                className={`absolute inset-0 rounded-full flex flex-col items-center justify-center transition-all duration-300 text-white ${
                    uploading 
                        ? 'bg-gray-700 opacity-80' 
                        : isDragging 
                            ? 'bg-indigo-600 opacity-90' 
                            : 'bg-black opacity-0 group-hover:opacity-60'
                }`}
            >
                {uploading ? (
                    <>
                        <svg className="animate-spin h-5 w-5 text-white mb-2" viewBox="0 0 24 24"> 
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span className="text-sm">Uploading...</span>
                    </>
                ) : isDragging ? (
                    <>
                        <FaUpload className="text-2xl mb-1" />
                        <span className="text-sm">Drop here to upload</span>
                    </>
                ) : (
                    <>
                        <FaCamera className="text-2xl mb-1" />
                        <span className="text-sm">Click or Drag to Change</span>
                    </>
                )}
            </div>
        </div>
    );
};

export default ProfilePictureUpdater;