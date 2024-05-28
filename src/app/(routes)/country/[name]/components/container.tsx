import React from 'react';
import useCountry from '../../../../../../actions/get-country';
import Card from '../../../components/Card';
import Link from 'next/link';
import { Countries,countryInitials } from '../../../../../../type';
interface ContainerProps {
    country: string;
}

const Container: React.FC<ContainerProps> = ({ country }) => {
    const { movieIds, loading, error } = useCountry(country);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    // Check if movieIds array is empty
    if (movieIds.length === 0) {
        return <div className='h-screen pt-4'>No movie currently available in &quot;{country}&quot; country.</div>; // Don't render anything if the country has no movies
    }

    return (
        <div className='flex flex-col gap-y-8 justify-between'>
            <p className=' text-center py-8'>Showing Movies & TV Shows from &quot;{country}&quot; Country</p>
            
            <div className='flex flex-col justify-between px-4'>
                <div className='flex space-x-4 text-4xl font-serif font-thin pb-8'>
                    <p className=''>{country} </p>
                    <img
                                    alt={country}
                                    src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${countryInitials[country]}.svg`}
                                    className='w-10 h-10'
                                />
                    <p>:</p>
                </div>
                <div className='grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5'>
                    {movieIds.map((movie, index) => (
                        <div className='flex ' key={index}>
                            <Card movie={movie} />
                        </div>
                    ))}
                    
                </div>
                
            </div>
            <Link href='/country'><div className=' bg-cyan-950 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded  text-center flex justify-center items-center mx-44 flex-1'>See all</div></Link>
        </div>
    );
};

export default Container;
