import React from 'react';
import useGetProperties from './useGetProperties'
import PropertyCard from '../PropertyCard';
import './PropertyListing.scss';

const PropertyListing = () => {
    const { properties, error, loading } = useGetProperties();
    if (error) {
        return <div>Error</div>
    }
    if (loading) {
        return <div>Loading</div>
    }

    return (
        <ul className="PropertyListing">
            {properties.map((property, index) => (
                <li key={index}>
                    <PropertyCard {...property} />
                </li>
            ))}
        </ul>
    );
};

export default PropertyListing;
