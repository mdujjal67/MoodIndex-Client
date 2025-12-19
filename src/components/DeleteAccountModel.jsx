import React, { useContext, useState } from 'react';
import { AuthContext } from '../Contexts/AuthContext';
import { useNavigate } from 'react-router';
import { auth } from '../Firebase/firebase.config';
import Swal from 'sweetalert2'; // Use Swal instead of toast for the final message

const DeleteAccountModal = () => {
  const { deleteAccount, user, setLoading: setGlobalLoading } = useContext(AuthContext);
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const providers = auth.currentUser?.providerData?.map(p => p.providerId) || [];
  const isEmailUser = providers.includes('password');
  const isGoogleUser = providers.includes('google.com');

  const handleDelete = async () => {
    if (isEmailUser && !password) {
      Swal.fire({ icon: 'error', title: 'Oops...', text: 'Please enter your password to confirm.' });
      return;
    }

    setLoading(true);
    if (setGlobalLoading) setGlobalLoading(true);

    try {
      const userEmail = user?.email;

      // 1. Delete from Firebase
      await deleteAccount(password);

      // 2. Delete from MongoDB
      if (userEmail) {
        await fetch(`http://localhost:9000/users/${userEmail}`, { 
            method: 'DELETE' 
        });
      }

      // ⭐️ SUCCESS: Using Swal ensures the message stays visible during redirect
      Swal.fire({
        title: 'Account Deleted',
        text: 'Your account and history have been permanently wiped.',
        icon: 'success',
        timer: 2000,
        showConfirmButton: false
      });

      // Redirect
      navigate('/');

    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Deletion Failed',
        text: error.message || "Please try logging out and back in before deleting."
      });
    } finally {
      setLoading(false);
      if (setGlobalLoading) setGlobalLoading(false);
    }
  };

  return (
    <div className="modal-box">
      <h3 className="font-bold text-lg text-red-600">Delete Account</h3>
      <p className="py-2 text-gray-500">This action cannot be undone. All your assessment history will be wiped.</p>
      
      {isEmailUser && (
        <div className="form-control w-full mt-4">
          <label className="label">
            <span className="label-text font-semibold">Confirm Password</span>
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            className="input input-bordered w-full border-red-200"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      )}

      {!isEmailUser && isGoogleUser && (
        <div className="bg-blue-50 p-4 rounded-lg mt-4 border border-blue-100">
          <p className="text-sm text-blue-800 font-medium">
            Logged in via Google. A verification popup may appear.
          </p>
        </div>
      )}

      <div className="modal-action">
        <button
          className="btn btn-error w-full text-white"
          onClick={handleDelete}
          disabled={loading}
        >
          {loading ? "Wiping Data..." : "Delete Permanently"}
        </button>
      </div>
    </div>
  );
};

export default DeleteAccountModal;