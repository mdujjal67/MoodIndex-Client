import React, { useContext, useState, useRef } from 'react';
import { FaCamera, FaUpload, FaUser } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { AuthContext } from '../Contexts/AuthContext';

const ProfilePictureUpdater = () => {
    const { updateUserPhotoURL, user } = useContext(AuthContext); 
    const [isDragging, setIsDragging] = useState(false);
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef(null);

    // ⭐️ Retrieve the ImgBB key you stored in your firebaseConfig via env
    const IMGBB_API_KEY = import.meta.env.VITE_IMGBB_API_KEY;

    const handleFileUpload = async (file) => {
        if (!file || !user) return;
        
        // Basic file type check
        if (!file.type.startsWith('image/')) {
            toast.error('Only image files are allowed.');
            return;
        }

        setUploading(true);

        // 1. Prepare FormData for ImgBB
        const formData = new FormData();
        formData.append('image', file);

        try {
            // 2. Upload to ImgBB
            const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
                method: 'POST',
                body: formData
            });
            const data = await response.json();

            if (data.success) {
                // ⭐️ ADDING CACHE BUSTER: This ensures the browser sees it as a "new" image
                const photoURL = `${data.data.display_url}?t=${Date.now()}`;

                // 3. Update Firebase Auth Profile (immediate UI update)
                await updateUserPhotoURL(photoURL); 

                // 4. Update MongoDB 
                const res = await fetch(`http://localhost:9000/users/${user.email}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ 
                        photoURL: photoURL, 
                        name: user.displayName 
                    })
                });

                if (!res.ok) throw new Error('Database update failed');
                
                toast.success('Profile picture updated successfully!');
            } else {
                throw new Error('ImgBB upload failed');
            }
        } catch (error) {
            console.error('Update Error:', error);
            toast.error(error.message || 'Failed to update picture.');
        } finally {
            setUploading(false);
        }
    };

    // --- Interaction Handlers ---
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

    return (
        <div 
            className="relative w-32 h-32 rounded-full mb-4 ring-4 ring-indigo-500 ring-offset-4 ring-offset-white cursor-pointer group"
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => !uploading && fileInputRef.current.click()}
        >
            <input 
                type="file" 
                ref={fileInputRef} 
                onChange={(e) => handleFileUpload(e.target.files[0])} 
                className="hidden" 
                accept="image/*"
                disabled={uploading}
            />

            {/* Profile Image Display */}
            {user?.photoURL ? (
                <img
                    className="rounded-full w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-50"
                    src={user.photoURL}
                    alt='Profile'
                    onError={(e) => {
                        e.target.src = `https://ui-avatars.com/api/?name=${user.displayName || 'User'}&background=random`;
                    }}
                />
            ) : (
                <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center">
                    <FaUser className="text-6xl text-indigo-300" />
                </div>
            )}
            
            {/* Overlay UI */}
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
                    <div className="flex flex-col items-center">
                        <span className="loading loading-spinner loading-sm mb-1"></span>
                        <span className="text-[10px] font-bold">UPLOADING</span>
                    </div>
                ) : isDragging ? (
                    <>
                        <FaUpload className="text-2xl mb-1" />
                        <span className="text-xs">Drop it!</span>
                    </>
                ) : (
                    <>
                        <FaCamera className="text-2xl mb-1" />
                        <span className="text-[10px] uppercase font-bold">Change</span>
                    </>
                )}
            </div>
        </div>
    );
};

export default ProfilePictureUpdater;