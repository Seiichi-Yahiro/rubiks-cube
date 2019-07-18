import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import { ListItemText } from '@material-ui/core';

interface CategoryProps {
    isOpen: boolean;
    setMenu: () => void;
    title: string;
    style?: React.CSSProperties;
}

const Category: React.FunctionComponent<CategoryProps> = ({ title, isOpen, setMenu, children, style }) => (
    <>
        <ListItem button={true} onClick={setMenu} selected={isOpen} className="interface-list__item" style={style}>
            <ListItemText primary={title} />
            {isOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={isOpen} timeout="auto" unmountOnExit={true}>
            {children}
        </Collapse>
    </>
);

export default Category;
