import React from 'react';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { ExpansionPanel } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';

interface ICategoryProps {
    isOpen: boolean;
    setMenu: () => void;
    title: string;
}

const Category: React.FunctionComponent<ICategoryProps> = ({ title, isOpen, setMenu, children }) => (
    <ListItem className="interface-list__item">
        <ExpansionPanel expanded={isOpen} TransitionProps={{ unmountOnExit: true }} className="interface-category">
            <ExpansionPanelSummary
                onClick={setMenu}
                expandIcon={<ExpandMoreIcon />}
                className="interface-category__summary"
            >
                <Typography>{title}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className="interface-category__details">{children}</ExpansionPanelDetails>
        </ExpansionPanel>
    </ListItem>
);

export default Category;
