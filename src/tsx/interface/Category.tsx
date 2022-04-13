import React from 'react';
import { ExpandMore } from '@mui/icons-material';
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    ListItem,
} from '@mui/material';

interface ICategoryProps {
    isOpen: boolean;
    setMenu: () => void;
    title: string;
    children: React.ReactNode;
}

const Category: React.FunctionComponent<ICategoryProps> = ({
    title,
    isOpen,
    setMenu,
    children,
}) => (
    <ListItem className="interface-list__item">
        <Accordion
            expanded={isOpen}
            TransitionProps={{ unmountOnExit: true }}
            className="interface-category"
        >
            <AccordionSummary
                onClick={setMenu}
                expandIcon={<ExpandMore />}
                className="interface-category__summary"
            >
                <Typography>{title}</Typography>
            </AccordionSummary>
            <AccordionDetails className="interface-category__details">
                {children}
            </AccordionDetails>
        </Accordion>
    </ListItem>
);

export default Category;
