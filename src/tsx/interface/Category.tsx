import ExpandMore from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import type { PopoverOrigin } from '@mui/material/Popover';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import React, { useCallback, useState } from 'react';
import tailwindFullConfig from 'src/utils/tailwindConfig';

interface ICategoryProps {
    isOpen: boolean;
    setMenu: () => void;
    title: string;
    icon: React.ReactNode;
    children: React.ReactNode;
}

const Category: React.FC<ICategoryProps> = ({
    title,
    icon,
    isOpen,
    setMenu,
    children,
}) => {
    const isMdQuery = useMediaQuery(
        `(min-width: ${tailwindFullConfig.theme.screens.md})`,
    );

    return (
        <ListItem className="!bg-white !px-0">
            {isMdQuery ? (
                <AccordionCategory
                    className="w-full"
                    isOpen={isOpen}
                    setMenu={setMenu}
                    title={title}
                >
                    {children}
                </AccordionCategory>
            ) : (
                <PopoverCategory isOpen={isOpen} setMenu={setMenu} icon={icon}>
                    {children}
                </PopoverCategory>
            )}
        </ListItem>
    );
};

interface IAccordionCategoryProps extends Omit<ICategoryProps, 'icon'> {
    className?: string;
}

const AccordionCategory: React.FC<IAccordionCategoryProps> = ({
    isOpen,
    title,
    setMenu,
    children,
    className,
}) => (
    <Accordion
        expanded={isOpen}
        TransitionProps={{ unmountOnExit: true }}
        className={className}
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
);

interface PopoverCategory extends Omit<ICategoryProps, 'title'> {
    className?: string;
}

const anchorOrigin: PopoverOrigin = {
    vertical: 'bottom',
    horizontal: 'left',
};

const PopoverCategory: React.FC<PopoverCategory> = ({
    isOpen,
    icon,
    setMenu,
    children,
    className,
}) => {
    const [anchor, setAnchor] = useState<HTMLButtonElement | null>(null);

    const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (isOpen) {
            setMenu();
            setMenu();
        } else {
            setMenu();
        }

        setAnchor(event.currentTarget);
    };

    const handleClose = useCallback(() => {
        setAnchor(null);
    }, [setAnchor]);

    return (
        <div className={className}>
            <IconButton onClick={onClick}>{icon}</IconButton>
            <Popover
                anchorOrigin={anchorOrigin}
                open={anchor !== null && isOpen}
                anchorEl={anchor}
                onClose={handleClose}
            >
                {children}
            </Popover>
        </div>
    );
};

export default Category;
