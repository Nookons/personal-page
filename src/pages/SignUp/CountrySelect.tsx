// src/components/SignUp/CountrySelect.tsx
import React from 'react';
import { Select, Skeleton } from 'antd';
import { Country } from '../../types/Country';

interface CountrySelectProps {
    countries: Country[];
    loading: boolean;
    selectedCountry: string;
    setSelectedCountry: (value: string) => void;
}

const CountrySelect: React.FC<CountrySelectProps> = ({ countries, loading, selectedCountry, setSelectedCountry }) => {
    return (
        <div className="sm:col-span-6">
            <label htmlFor="country" className="block text-sm/6 font-medium text-gray-900">
                Country
            </label>
            {!loading ? (
                <Select
                    showSearch
                    allowClear
                    size="large"
                    style={{ width: '100%' }}
                    placeholder="Please select"
                    value={selectedCountry}
                    onChange={setSelectedCountry}
                    options={countries.map(el => ({
                        value: el.name.common,
                        label: el.name.common
                    }))}
                    filterOption={(input, option) => {
                        if (!option) return false;
                        return option.label.toLowerCase().includes(input.toLowerCase());
                    }}
                />
            ) : (
                <div className="w-full mt-2 overflow-x-clip">
                    <Skeleton.Input style={{ width: 440 }} size="large" />
                </div>
            )}
        </div>
    );
};

export default CountrySelect;
