import React from 'react';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { ExpansionPanel } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';

interface CategoryProps {
    isOpen: boolean;
    setMenu: () => void;
    title: string;
}

const Category: React.FunctionComponent<CategoryProps> = ({ title, isOpen, setMenu, children }) => (
    <ListItem className="interface-list__item">
        <ExpansionPanel expanded={isOpen} className="interface-category">
            <ExpansionPanelSummary
                onClick={setMenu}
                expandIcon={<ExpandMoreIcon />}
                className="interface-category__summary"
            >
                {title}
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className="interface-category__details">{children}</ExpansionPanelDetails>
        </ExpansionPanel>
    </ListItem>
);

export default Category;
