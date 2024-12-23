import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import React from 'react';
import ColorPicker from 'src/tsx/interface/ColorPicker';

const Settings: React.FC = () => {
    return (
        <List disablePadding={true} dense={true} className="w-full">
            <ListItem>
                <ColorPicker />
            </ListItem>
        </List>
    );
};

export default React.memo(Settings);
