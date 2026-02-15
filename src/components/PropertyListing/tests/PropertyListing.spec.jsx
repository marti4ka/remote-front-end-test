import React from 'react';
import { render, screen } from '@testing-library/react';
import { within } from '@testing-library/dom';
import PropertyListing from '../PropertyListing';
import useGetProperties from '../useGetProperties';

jest.mock('../useGetProperties');
const mockUseGetProperties = jest.mocked(useGetProperties);

const MOCK_PROPERTIES = require('./mockProperties.json');

describe('PropertyListing', () => {
    it('should render property cards', async () => {
        mockUseGetProperties.mockReturnValue({properties: MOCK_PROPERTIES, loading: false, error: null});
        render(<PropertyListing />);
        const propertiesList = screen.getByRole('list');
        const propertyCards = await within(propertiesList).findAllByRole('listitem');
        expect(propertyCards).toHaveLength(3);
    });

    it('should show loading', async () => {
        mockUseGetProperties.mockReturnValue({properties: [], loading: true, error: null});
        render(<PropertyListing />);
        const loadingText = screen.getByText('Loading');
        expect(loadingText).not.toBeNull();
    });

    it('should show error', async () => {
        mockUseGetProperties.mockReturnValue({properties: MOCK_PROPERTIES, loading: false, error: "Something went wrong."});
        render(<PropertyListing />);
        const ErrorText = screen.getByText('Error');
        expect(ErrorText).not.toBeNull();
    });
});
