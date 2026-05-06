import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const Profile = () => {
    const { user, logout, getProfile } = useAuth();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Refresh profile data when component mounts
        const loadProfile = async () => {
            setLoading(true);
            try {
                await getProfile();
            } catch (error) {
                console.error('Failed to load profile:', error);
            } finally {
                setLoading(false);
            }
        };

        loadProfile();
    }, [getProfile]);

    const handleLogout = async () => {
        await logout();
    };

    if (loading) {
        return <div className="profile-loading">Loading profile...</div>;
    }

    if (!user) {
        return <div className="profile-error">No user data available</div>;
    }

    return (
        <div className="profile">
            <h2>Welcome, {user.name}!</h2>

            <div className="profile-info">
                <div className="info-item">
                    <strong>Name:</strong> {user.name}
                </div>
                <div className="info-item">
                    <strong>Email:</strong> {user.email}
                </div>
                <div className="info-item">
                    <strong>User ID:</strong> {user.id}
                </div>
                {user.created_at && (
                    <div className="info-item">
                        <strong>Member since:</strong> {new Date(user.created_at).toLocaleDateString()}
                    </div>
                )}
            </div>

            <button onClick={handleLogout} className="logout-button">
                Logout
            </button>
        </div>
    );
};

export default Profile;