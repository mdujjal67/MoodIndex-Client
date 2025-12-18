import { useContext, useEffect, useState } from "react";
import { MdWorkspacePremium } from "react-icons/md";
import { AuthContext } from "../../Contexts/AuthContext";
import ProfilePictureUpdater from "../../components/profilePictureUpdater";
import UpdateProfileForm from "../../components/updateProfileForm";

const UserProfile = () => {
  const { user } = useContext(AuthContext);

  const [dbUserName, setDbUserName] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.title = "MoodIndex | User-Profile";

    if (!user?.email) return;

    fetch(`http://localhost:9000/users/${user.email}`)
      .then(res => res.json())
      .then(data => {
        setDbUserName(data?.name || "");
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, [user?.email]);

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-spinner loading-lg text-indigo-600"></span>
      </div>
    );
  }

  const displayName = user.displayName || dbUserName || "MoodIndex User";

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center pt-16">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8">

        <div className="flex flex-col items-center">
          <ProfilePictureUpdater user={user} />

          <h2 className="text-3xl font-bold text-indigo-900">
            {displayName}
          </h2>

          <div className="flex items-center bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-xs font-bold mt-2">
            <MdWorkspacePremium />
            <span className="ml-1">New User</span>
          </div>
        </div>

        <div className="mt-6 border-t pt-4">
          <div className="flex justify-between bg-gray-50 p-3 rounded-lg">
            <span className="text-sm text-gray-500">Email</span>
            <span className="text-sm font-medium">{user.email}</span>
          </div>
        </div>

        <button
          onClick={() => document.getElementById("update_modal").showModal()}
          className="btn w-full mt-6 py-3 border-none bg-[#00396a] hover:bg-gray-400 text-white rounded-lg"
        >
          Update Profile
        </button>
      </div>

      {/* MODAL */}
      <dialog id="update_modal" className="modal">
        <UpdateProfileForm user={user} currentDbName={dbUserName} />
      </dialog>
    </div>
  );
};

export default UserProfile;
