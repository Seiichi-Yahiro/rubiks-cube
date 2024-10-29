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
    <ListItem className="!bg-white">
        <Accordion
            expanded={isOpen}
            TransitionProps={{ unmountOnExit: true }}
            className="w-full"
        >
            <AccordionSummary
                onClick={setMenu}
                expandIcon={<ExpandMore />}
                className="h-12 ![min-height:unset]"
            >
                <Typography>{title}</Typography>
            </AccordionSummary>
            <AccordionDetails className="!p-1">{children}</AccordionDetails>
        </Accordion>
    </ListItem>
);

export default Category;
