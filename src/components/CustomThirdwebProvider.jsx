import React from 'react';
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { CustomQueryClientProvider } from '../hooks/useQueryClient';

export const CustomThirdwebProvider = ({ children, ...props }) => {
    return (
        <CustomQueryClientProvider>
            <ThirdwebProvider {...props}>
                {children}
            </ThirdwebProvider>
        </CustomQueryClientProvider>
    );
};