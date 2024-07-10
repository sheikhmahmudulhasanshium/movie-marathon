"use client";
import { useSearchParams } from "next/navigation";
import useProfile from "../../../../../../actions/get-profile";

const Profile: React.FC = () => {
    const searchParams = useSearchParams();
    const profileName = searchParams.get("actor");
    const tmdbId = searchParams.get('tmdbId');
    const { profileData, loading, error } = useProfile(profileName, tmdbId);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!profileData) {
        return <div>No profile data available</div>;
    }

    const genderLabel = (gender: number): string => {
        switch (gender) {
            case 1:
                return 'Female';
            case 2:
                return 'Male';
            case 3:
                return 'Non-binary';
            default:
                return 'Not specified';
        }
    };
    return (
        <div className="flex flex-col items-center my-12 mx-14 ">
            <div className="grid grid-cols-12 gap-4 ">
                <div className="flex justify-start items-start col-span-6 rounded-2xl flex-col">
                    <img
                        className="rounded-lg shadow-md w-5/12"
                        src={`https://media.themoviedb.org/t/p/w300_and_h450_bestv2/${profileData.profile_path}`}
                        alt={profileData.name}
                    />
                    <div className="flex flex-col pt-8 space-y-4">
                        <p className="text-3xl py-4">Personal Information</p>
                        <div className="flex justify-start items-center gap-4 text-lg">
                            <p>Known For:</p>
                            <p>{profileData.known_for_department}</p>
                        </div>
                        <div className="flex justify-start gap-4 text-lg">
                            <p>Gender:</p>
                            <p>{genderLabel(profileData.gender)}</p>
                        </div>
                        <div className="flex justify-start gap-4 text-lg">
                            <p>Birthday:</p>
                            <p>{profileData.birthday}</p>
                        </div>
                        <div className="flex flex-col justify-start gap-4 text-lg">
                            <p>Place of Birth:</p>
                            <p>{profileData.place_of_birth}.</p>
                        </div>
                        <div className="flex flex-col justify-start gap-4 text-lg">
                            <p>Also Known As:</p>
                            {profileData.also_known_as?.map((aka,index)=><p key={index} className="text-base">{aka},</p>)}
                        </div>
                    </div>
                </div>
                <div className="col-span-6 flex flex-col justify-start items-start">
                    <p className="text-4xl pb-4">{profileData.name}</p>
                    <p>{profileData.original_name}</p>
                    <p className="text-2xl">Biography</p>
                    <p className="flex text-justify font-thin">{profileData.biography}</p>
                    {profileData.known_for&&<>
                    <p className="text-2xl pt-4">Known For</p>
                    <div className="flex gap-4 bg-black">
                        
                            {profileData.known_for?.map((work,index)=>(
                                <div key={index}>
                                    <p>{work.name}</p>
                                </div>
                            ))
                        }
                    </div></>}
                </div>
            </div>
        </div>
    );
};

export default Profile;
