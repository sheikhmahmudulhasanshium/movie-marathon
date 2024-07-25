"use client";
import { useSearchParams, useRouter } from "next/navigation";
import useProfile from "../../../../../../actions/get-profile";
import { format, parseISO } from "date-fns";
import React from 'react';
import { GiWorld } from "react-icons/gi";
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import 'react-vertical-timeline-component/style.min.css';
import Loading from "@/app/(routes)/components/loading";

const Profile: React.FC = () => {
    const searchParams = useSearchParams();
    const profileName = searchParams.get("director");
    const tmdbId = searchParams.get('tmdbId');
    const { profileData, loading, error } = useProfile(profileName, tmdbId);
    const router = useRouter();

    if (loading) {
        return <Loading/>;
    }

    if (error || !profileData) {
        return <div>Error: {error || 'No profile data available'}</div>;
    }

    const formattedData = profileData;
    console.log(formattedData);

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

    const formatBirthday = (birthday: string): string => {
        const birthDate = parseISO(birthday);
        const age = Math.floor((new Date().getTime() - birthDate.getTime()) / (365.25 * 24 * 60 * 60 * 1000));
        return `${format(birthDate, 'd MMMM yyyy')} (${age} years old)`;
    };

    const handleRedirect = (media_type: string|undefined, id: number) => {
        const mediaType=media_type==='movie'?'movies':'tv-shows'
        router.push(`/${mediaType}/${id}`);
    };

    return (
        <div className="flex flex-col items-center my-12 mx-14 ">
            <div className="grid grid-cols-12 gap-4 ">
                <div className="flex justify-start items-start col-span-6 rounded-2xl flex-col">
                    <img
                        className="rounded-lg shadow-md w-5/12"
                        src={`https://media.themoviedb.org/t/p/w300_and_h450_bestv2/${formattedData.profile_path}`}
                        alt={formattedData.name}
                    />
                    <div className="flex flex-col pt-8 space-y-4">
                        <p className="text-3xl py-4">Personal Information</p>
                        <div className="flex justify-start items-center gap-4 text-lg">
                            <p>Original Name :</p>
                            <p>{formattedData.original_name}</p>
                        </div>
                        
                        <div className="flex justify-start items-center gap-4 text-lg">
                            <p>Known For:</p>
                            <p>{formattedData.known_for_department}</p>
                        </div>
                        <div className="flex justify-start gap-4 text-lg">
                            <p>Gender:</p>
                            <p>{genderLabel(formattedData.gender)}</p>
                        </div>
                        <div className="flex justify-start gap-4 text-lg">
                            <p>Birthday:</p>
                            <p>{formattedData.birthday ? formatBirthday(formattedData.birthday) : 'N/A'}</p>
                        </div>
                        <div className="flex flex-col justify-start gap-4 text-lg">
                            <p>Place of Birth:</p>
                            <p>{formattedData.place_of_birth || 'N/A'}.</p>
                        </div>
                        <div className="flex flex-col justify-start gap-4 text-lg">
                            <p>Also Known As:</p>
                            {formattedData.also_known_as?.map((aka, index) => <p key={index} className="text-base">{aka},</p>)}
                        </div>
                        {formattedData.homepage && (
                            <div className="flex flex-col justify-start gap-4 text-lg">
                                <p>Homepage:</p>
                                <a href={formattedData.homepage} target="_blank" rel="noopener noreferrer" className="text-blue-500 flex justify-start items-center gap-4"><GiWorld className="text-gray-400"/>{formattedData.homepage}</a>
                            </div>
                        )}
                    </div>
                </div>
                <div className="col-span-6 flex flex-col justify-start items-start">
                    <p className="text-4xl pb-4">{formattedData.name}</p>
                    {formattedData.name !== formattedData.original_name && <p className="text-2xl pb-4">({formattedData.original_name})</p>}
                    <p className="text-2xl">Biography</p>
                    <p className="flex text-justify font-thin">{formattedData.biography || 'Biography not available'}</p>
                    {formattedData.known_for && formattedData.known_for.length > 0 && (
                        <>
                            <p className="text-2xl pt-4">Known For</p>
                            <div className="gap-4  grid grid-cols-4 justify-center items-center">
                                {formattedData.known_for.map((work, index) => (
                                    <div key={index}>
                                        <img
                                            className="rounded-lg shadow-md w-24"
                                            src={`https://media.themoviedb.org/t/p/w185${work.poster_path}`}
                                            alt={work.title || work.name}
                                        />
                                        <p className="">{work.title || work.name}</p>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}

                    {formattedData.combined_credits?.cast && formattedData.combined_credits.cast.length > 0 && (
                        <>
                            <p className="text-2xl py-4">Acting</p>
                            <div className="gap-4 empty overflow-y-scroll flex ">
                                <VerticalTimeline animate={true}  layout="1-column-left" className=" text-3xl ">

                                    {formattedData.combined_credits.cast.map((work, index) => (
                                        work.media_type && work.id && (
                                            <VerticalTimelineElement className="vertical-timeline-element--work "
                                                visible={true}
                                                position={"right"}
                                                key={index} 
                                                contentStyle={{ background: '#fff', color: '#000' }}
                                                contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
                                                iconStyle={{ background: 'rgb(33, 150, 243)', color: '#0ff' }}
                                                date={work.release_date ? format(parseISO(work.release_date), "d MMMM yyyy") : ' '}
                                                icon={
                                                    <img
                                                        className="rounded-full w-10 h-10"
                                                        src={`https://media.themoviedb.org/t/p/w185${work.poster_path}`}
                                                        alt={work.title || work.name}
                                                    />
                                                }
                                                onTimelineElementClick={() => handleRedirect(work.media_type, work.id)}
                                            >

                                                <div className="flex space-x-4 px-2  my-2 rounded-lg">
                                                    <div >
                                                    <p className="vertical-timeline-element-title">{work.title || work.name}</p> 
                                                    <p className="vertical-timeline-element-title">({work.media_type})</p>
                                                    </div>
                                                    
                                                    
                                                    {work.character && <p className="vertical-timeline-element-title text-slate-500">As {work.character}</p>}
                                                </div>
                                            </VerticalTimelineElement>
                                        )
                                    ))}
                                </VerticalTimeline>

                            </div>
                            <div>
                                <p className="text-2xl py-4">Directing</p>

                                {formattedData.combined_credits.crew.map((work) =>(
                                    work.media_type && work.id && ((work.job!="actor") && (work.job="director")) &&(
                                    <div key={work.id} className="flex">
                                        <p>{work.name}</p>
                                        <p>{work.character}</p>
                                        <p>{work.job}</p>

                                        <img
                                                        className="rounded-full w-10 h-10"
                                                        src={`https://media.themoviedb.org/t/p/w185${work.poster_path}`}
                                                        alt={work.title || work.name}
                                                    />
                                    </div>)
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
