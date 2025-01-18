// src/components/SignUp/TermsCheckbox.tsx
import React from 'react';
import { Checkbox } from 'antd';

interface TermsCheckboxProps {
    agreedToTerms: boolean;
    setAgreedToTerms: (checked: boolean) => void;
}

const TermsCheckbox: React.FC<TermsCheckboxProps> = ({ agreedToTerms, setAgreedToTerms }) => {
    return (
        <div className="sm:col-span-6">
            <div className="flex items-center">
                <Checkbox
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                >
                    I agree to the terms and conditions
                </Checkbox>
            </div>
        </div>
    );
};

export default TermsCheckbox;
