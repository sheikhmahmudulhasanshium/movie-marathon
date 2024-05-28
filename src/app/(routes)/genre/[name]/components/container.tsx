import React from 'react';
import useGenre from '../../../../../../actions/get-genre';
import Card from '../../../components/Card';

const Container: React.FC = () => {
    const { movieIds, loading, error } = useGenre('Action');
    
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className='flex flex-col gap-y-8'>
            <p className='text-4xl text-center py-8'>Showing Movies & TV Shows Action Genre</p>
            
            <div className='flex flex-col'>
                <p className='text-4xl font-serif font-thin'>Action :</p>
                <div className='grid grid-cols-2 gap-4'>
                    {movieIds.map((movie, index) => (
                        <div className='flex' key={index}>
                            <Card movie={movie} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Container;
