import { renderHook, waitFor } from '@testing-library/react';
import useGetProperties from '../useGetProperties';

const MOCK_PROPERTIES = require('./mockProperties.json');

describe('useGetProperties', () => {
    it('should return properties', async () => {
        global.fetch = jest.fn();
        fetch.mockResolvedValueOnce({ ok: true, json: async () => MOCK_PROPERTIES });
        
        const { result } = renderHook(() => useGetProperties());
        await waitFor(() => expect(result.current.loading).toBeFalsy());

        const { properties, loading, error } = result.current;
        expect(properties).toHaveLength(3);
        expect(error).toBeNull();
        expect(loading).toBeFalsy();
    });

    it('should return error', async () => {
        global.fetch = jest.fn();
        fetch.mockResolvedValueOnce({ ok: false, json: async () => [] });
        
        const { result } = renderHook(() => useGetProperties());
        await waitFor(() => expect(result.current.loading).toBeFalsy());

        const { properties, loading, error } = result.current;
        expect(properties).toHaveLength(0);
        expect(error).not.toBeNull();
        expect(loading).toBeFalsy();
    });

    it('should be loading error', async () => {
        global.fetch = jest.fn();
        fetch.mockResolvedValueOnce({ ok: true, json: async () => [] });
        
        const { result } = renderHook(() => useGetProperties());
        await waitFor(() => expect(result.current.loading).toBeTruthy());
    });
});