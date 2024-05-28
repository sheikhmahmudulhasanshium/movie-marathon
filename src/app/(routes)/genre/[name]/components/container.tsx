import React from 'react';
import useGenre from '../../../../../../actions/get-genre';
import Card from '../../../components/Card';
import Link from 'next/link';

interface ContainerProps {
    genre: string;
}

const Container: React.FC<ContainerProps> = ({ genre }) => {
    const { movieIds, loading, error } = useGenre(genre);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    // Check if movieIds array is empty
    if (movieIds.length === 0) {
        return <div className='h-screen pt-4'>No movie currently available in &quot;{genre}&quot; genre.</div>; // Don't render anything if the genre has no movies
    }

    return (
        <div className='flex flex-col gap-y-8 justify-between'>
            <p className=' text-center py-8'>Showing Movies & TV Shows from &quot;{genre}&quot; Genre</p>
            
            <div className='flex flex-col justify-between px-4'>
                <p className='text-4xl font-serif font-thin pb-8'>{genre} :</p>
                <div className='grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5'>
                    {movieIds.map((movie, index) => (
                        <div className='flex ' key={index}>
                            <Card movie={movie} />
                        </div>
                    ))}
                    
                </div>
                
            </div>
            <Link href='/genre'><div className=' bg-cyan-950 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded  text-center flex justify-center items-center mx-44 flex-1'>See all</div></Link>
        </div>
    );
};

export default Container;
