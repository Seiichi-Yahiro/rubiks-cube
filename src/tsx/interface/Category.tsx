import React from 'react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';

interface ICategoryProps {
    isOpen: boolean;
    setMenu: () => void;
    title: string;
}

const Category: React.FunctionComponent<ICategoryProps> = ({ title, isOpen, setMenu, children }) => (
    <ListItem className="interface-list__item">
        <Accordion expanded={isOpen} TransitionProps={{ unmountOnExit: true }} className="interface-category">
            <AccordionSummary onClick={setMenu} expandIcon={<ExpandMoreIcon />} className="interface-category__summary">
                <Typography>{title}</Typography>
            </AccordionSummary>
            <AccordionDetails className="interface-category__details">{children}</AccordionDetails>
        </Accordion>
    </ListItem>
);

export default Category;
